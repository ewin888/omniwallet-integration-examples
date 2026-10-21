import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {cases,runCase,publicFixtureSecret,originalBody} from '../docs/demo-core.mjs';
for(const item of cases){
 const result=await runCase(item.id);
 assert.equal(result.valid,item.expected,item.id);
 const signedBody=item.resign?item.body:originalBody;
 assert.equal(result.signature,createHmac('sha512',publicFixtureSecret).update(signedBody).digest('hex'),item.id+' Node/WebCrypto parity');
 assert.equal(result.byteLength,Buffer.byteLength(item.body,'utf8'));
}
assert.deepEqual(JSON.parse(cases[0].body),JSON.parse(cases[1].body));
assert.notEqual(cases[0].body,cases[1].body);
await assert.rejects(()=>runCase('unknown'),/Unknown fixture/);
await assert.rejects(()=>runCase('original',{}),/Web Crypto/);
const html=await readFile(new URL('../docs/index.html',import.meta.url),'utf8');
for(const id of ['original-body','body','signature','size','result','explanation',...cases.map(c=>c.id)])assert.ok(html.includes(`id="${id}"`),id);
assert.ok(html.includes("connect-src 'none'"));
assert.ok(!/<form\b|<input\b|<iframe\b/.test(html));
const elements=new Map();
const element=id=>{
 if(!elements.has(id))elements.set(id,{textContent:'',dataset:{},attributes:{},listeners:{},setAttribute(key,value){this.attributes[key]=value;},addEventListener(key,fn){this.listeners[key]=fn;}});
 return elements.get(id);
};
globalThis.document={getElementById:element};
await import('../docs/demo.mjs');
assert.equal(element('result').textContent,'Signature matches');
for(const item of cases){
 element(item.id).listeners.click();
 for(let i=0;i<100 && element('result').textContent==='Checking synthetic signature…';i++)await new Promise(resolve=>setTimeout(resolve,5));
 assert.equal(element('body').textContent,item.body);
 assert.equal(element('result').textContent,item.expected?'Signature matches':'Signature rejected');
 assert.equal(element(item.id).attributes['aria-pressed'],'true');
}
delete globalThis.document;
console.log('Browser lab: four cases match Node HMAC, UTF-8 checks, error paths and DOM interactions passed. No network or payment requests executed. Visual browser QA not included.');
