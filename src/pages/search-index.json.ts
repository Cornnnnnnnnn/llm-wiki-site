import {catalog} from '../lib/catalog';
export async function GET(){
 const entries=await catalog();
 // Deliberately omit frontmatter source references and related/private IDs.
 const index=entries.map(e=>({id:e.id,text:[e.data.title,e.data.summary,e.data.subject,...e.data.tags,e.body||''].join('\n').normalize('NFKC').toLowerCase()}));
 return new Response(JSON.stringify(index),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}
