import {cases,runCase,originalBody} from './demo-core.mjs';
import {messages} from './demo-i18n.mjs';
const language=document.documentElement?.lang;
const message=messages[language]??messages.en;
const byId=id=>document.getElementById(id);
byId('original-body').textContent=originalBody;
let generation=0;
async function select(id){
 const current=++generation;
 for(const item of cases)byId(item.id).setAttribute('aria-pressed',String(item.id===id));
 byId('result').textContent=message.checking;
 try{
  const result=await runCase(id);
  if(current!==generation)return;
  byId('body').textContent=result.body;
  byId('signature').textContent=result.signature;
  byId('size').textContent=message.bytes(result.byteLength);
  byId('result').textContent=result.valid?message.valid:message.invalid;
  byId('result').dataset.valid=String(result.valid);
  byId('explanation').textContent=message.explanations?.[id]??result.explanation;
 }catch(error){if(current===generation){byId('result').textContent=message.unavailable;byId('explanation').textContent=message.error??error.message;}}
}
for(const item of cases)byId(item.id).addEventListener('click',()=>select(item.id));
await select('original');
