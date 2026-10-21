// Synthetic fixtures only. This is a signature experiment, not a payment receiver.
export const publicFixtureSecret = 'public-lab-fixture-not-a-production-secret';
export const originalBody = '{"actually_paid":"1","order_id":"注文-例","payment_id":"demo-1","payment_status":"partially_paid"}';
export const cases = [
  {id:'original',label:'Original body',body:originalBody,resign:false,expected:true,explanation:'The original UTF-8 bytes match their signature. The next step would be independent business validation; this is not permission to fulfil an order.'},
  {id:'format',label:'Reformat JSON',body:JSON.stringify(JSON.parse(originalBody),null,2),resign:false,expected:false,explanation:'The JSON values are unchanged, but whitespace changed the signed bytes. Preserve the raw request body before JSON parsing.'},
  {id:'amount',label:'Change the amount',body:originalBody.replace('"1"','"9"'),resign:false,expected:false,explanation:'The amount changed while the old signature stayed the same. The signature check must reject this body.'},
  {id:'updated',label:'Sign an updated body',body:originalBody.replace('"1"','"9"'),resign:true,expected:true,explanation:'A sender with the correct secret can sign a changed body. A valid signature alone does not prove an order is paid. Reconcile order, amount, asset, network and authoritative state.'}
];
export async function runCase(id,cryptoApi=globalThis.crypto){
  const selected=cases.find(item=>item.id===id);
  if(!selected)throw new Error('Unknown fixture');
  if(!cryptoApi?.subtle)throw new Error('This browser needs Web Crypto on HTTPS. You can run the offline Node.js lab instead.');
  const bytes=new TextEncoder();
  const key=await cryptoApi.subtle.importKey('raw',bytes.encode(publicFixtureSecret),{name:'HMAC',hash:'SHA-512'},false,['sign','verify']);
  const signedBody=selected.resign?selected.body:originalBody;
  const signature=await cryptoApi.subtle.sign('HMAC',key,bytes.encode(signedBody));
  const valid=await cryptoApi.subtle.verify('HMAC',key,signature,bytes.encode(selected.body));
  return {...selected,valid,byteLength:bytes.encode(selected.body).length,signature:Array.from(new Uint8Array(signature),byte=>byte.toString(16).padStart(2,'0')).join('')};
}
