export {};
const collection=document.querySelector<HTMLElement>('#collection');
const search=document.querySelector<HTMLInputElement>('#search')!;
const selects=['type','subject','tag'].map(id=>document.querySelector<HTMLSelectElement>('#'+id)!);
const cards=[...document.querySelectorAll<HTMLElement>('.article-card')];
const status=document.querySelector<HTMLElement>('#search-status')!;
let generation=0;
type SearchRecord={id:string,text:string};
let index:Promise<SearchRecord[]>|undefined;
async function filter(){
 const current=++generation;const q=search.value.trim().normalize('NFKC').toLowerCase();let found:Set<string>|undefined;let failed=false;
 if(q && cards.length){try{
  index??=fetch((collection?.dataset.base||'/')+'search-index.json').then(async response=>{if(!response.ok)throw new Error('Search index unavailable');return response.json()});
  const terms=q.split(/\s+/).filter(Boolean);
  found=new Set((await index!).filter(record=>terms.every(term=>record.text.includes(term))).map(record=>record.id));
 }catch{failed=true;index=undefined;}}
 if(current!==generation)return;
 let count=0;
 cards.forEach(card=>{const textMatch=!q||(found?found.has(card.dataset.id!):card.dataset.search!.includes(q));const match=textMatch&&(!selects[0].value||card.dataset.type===selects[0].value)&&(!selects[1].value||card.dataset.subject===selects[1].value)&&(!selects[2].value||JSON.parse(card.dataset.tags!).includes(selects[2].value));card.hidden=!match;if(match)count++;});
 const en=document.body.dataset.locale==='en';status.textContent=failed?collection?.dataset.error||'':cards.length?`${count} ${en?'articles':'篇文章'}`:'';
 const empty=document.querySelector<HTMLElement>('#no-results');if(empty)empty.hidden=count!==0;
}
let debounce:ReturnType<typeof setTimeout>;
search.addEventListener('input',()=>{clearTimeout(debounce);generation++;debounce=setTimeout(filter,180)});
selects.forEach(s=>s.addEventListener('change',filter));
document.querySelector('#reset')?.addEventListener('click',()=>{search.value='';selects.forEach(s=>s.value='');filter();search.focus()});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!(e.target instanceof HTMLInputElement)&&!(e.target instanceof HTMLTextAreaElement)&&!(e.target instanceof HTMLSelectElement)){e.preventDefault();search.focus()}});
