// Offline teaching lab, NOT a production receiver or fulfilment policy.
// Run: node examples/ipn-raw-body-lab.mjs
// All payloads and the secret below are synthetic public fixtures.
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import assert from 'node:assert/strict';
const secret = 'public-lab-fixture-not-a-production-secret';
const sign = raw => createHmac('sha512', secret).update(raw).digest('hex');
const rows = [];
function receiver() {
  const seen = new Set(); // Demonstrates the restart limitation; never a durable inbox.
  return (raw, signature) => {
    if (typeof signature !== 'string' || !/^[a-f0-9]{128}$/i.test(signature)) return 'reject_signature';
    const expected = Buffer.from(sign(raw), 'hex');
    if (!timingSafeEqual(Buffer.from(signature, 'hex'), expected)) return 'reject_signature';
    let event;
    try { event = JSON.parse(raw.toString('utf8')); } catch { return 'reject_json'; }
    if (!event || typeof event !== 'object' || Array.isArray(event) || !event.payment_id || !event.payment_status) return 'reject_shape';
    const deliveryHash = createHash('sha256').update(raw).digest('hex');
    if (seen.has(deliveryHash)) return 'exact_redelivery';
    seen.add(deliveryHash);
    // No order update, funds movement or fulfilment is performed by this lab.
    return 'record_for_business_validation';
  };
}
const receive = receiver();
const raw = Buffer.from('{"actually_paid":"1","order_id":"注文-例","payment_id":"demo-1","payment_status":"partially_paid"}');
function check(name, result, expected) { assert.equal(result, expected, name); rows.push({ name, result }); }
check('UTF-8 raw body', receive(raw, sign(raw)), 'record_for_business_validation');
check('Same bytes redelivered', receive(raw, sign(raw)), 'exact_redelivery');
const altered = Buffer.from(raw.toString().replace('"1"', '"9"'));
check('Changed amount with old signature', receive(altered, sign(raw)), 'reject_signature');
const pretty = Buffer.from(JSON.stringify(JSON.parse(raw), null, 2));
check('Reserialized JSON with old signature', receive(pretty, sign(raw)), 'reject_signature');
check('Short signature', receive(raw, 'abcd'), 'reject_signature');
check('Non-hex signature', receive(raw, 'z'.repeat(128)), 'reject_signature');
check('Updated amount, same payment/status, new valid signature', receive(altered, sign(altered)), 'record_for_business_validation');
const malformed = Buffer.from('{');
check('Signed malformed JSON', receive(malformed, sign(malformed)), 'reject_json');
check('Receiver restart loses memory deduplication', receiver()(raw, sign(raw)), 'record_for_business_validation');
console.log(JSON.stringify({ runtime: process.version, cases: rows, passed: rows.length, productionReady: false, limitation: 'Exact-byte deduplication only. Use a durable inbox and transactional business idempotency; independently validate payment/order/currency/amount and authoritative status. A valid signature is not proof that an order may be fulfilled.' }, null, 2));
