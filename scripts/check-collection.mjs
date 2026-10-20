// Offline contract checks for the public example; no API calls or credentials.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const collection = JSON.parse(await readFile(new URL('../postman/omniwallet-sandbox.collection.json', import.meta.url), 'utf8'));
assert.equal(collection.info.schema, 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json');
assert.equal(collection.variable.length, 1);
assert.deepEqual(collection.variable[0], {key:'base_url', value:'https://omniwallet-dev.ewin888.com/api', type:'string'});
assert.deepEqual(collection.item.map(item => item.request.url), [
  '{{base_url}}/v1/status', '{{base_url}}/v1/currencies', '{{base_url}}/v1/full-currencies',
]);
for (const [index, item] of collection.item.entries()) {
  assert.equal(item.request.method, 'GET');
  assert.deepEqual(item.request.auth, {type:'noauth'});
  assert.equal(item.request.body, undefined);
  assert.equal(item.event, undefined);
  assert.equal(item.request.event, undefined);
  assert.deepEqual(item.request.header, index === 0 ? [] : [{key:'x-api-key',value:'{{vault:omniwallet_sandbox_api_key}}'}]);
}
assert.equal(collection.auth, undefined);
assert.equal(collection.event, undefined);
console.log('Collection checks passed: sandbox default, 3 GET requests, local Vault references, no mutation or network execution.');
