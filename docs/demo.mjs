import {cases,runCase,originalBody} from './demo-core.mjs';
const byId=id=>document.getElementById(id);
byId('original-body').textContent=originalBody;
let generation=0;
async function select(id){
 const current=++generation;
 for(const item of cases)byId(item.id).setAttribute('aria-pressed',String(item.id===id));
 byId('result').textContent='Checking synthetic signature…';
 try{
  const result=await runCase(id);
  if(current!==generation)return;
  byId('body').textContent=result.body;
  byId('signature').textContent=result.signature;
  byId('size').textContent=`${result.byteLength} UTF-8 bytes`;
  byId('result').textContent=result.valid?'Signature matches':'Signature rejected';
  byId('result').dataset.valid=String(result.valid);
  byId('explanation').textContent=result.explanation;
 }catch(error){if(current===generation){byId('result').textContent='Interactive mode unavailable';byId('explanation').textContent=error.message;}}
}
for(const item of cases)byId(item.id).addEventListener('click',()=>select(item.id));
await select('original');
