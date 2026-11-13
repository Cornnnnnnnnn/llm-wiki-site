import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,symlinkSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {readApprovals,isPublished,publicRelations} from '../src/lib/approvals.mjs';
import {publicationGuard,sourceGuard} from '../src/lib/publication-guard.mjs';
test('all three independent publication gates are necessary',()=>{
 for(const visibility of ['private','public'])for(const status of ['draft','reviewed'])for(const ids of [[],['note']])assert.equal(isPublished({id:'note',visibility,status},ids),visibility==='public'&&status==='reviewed'&&ids.length===1);
});
test('only public endpoints and confirmed relations produce one consistent edge',()=>{
 const entries=[{id:'a',data:{related:['b','secret','a']}},{id:'b',data:{related:['a']}},{id:'c',data:{related:[]}}];
 assert.deepEqual(publicRelations(entries),[{source:'a',target:'b'}]);
});
test('allowlist refuses traversal, duplicate IDs, missing files and symlink escapes',()=>{
 const root=mkdtempSync(join(tmpdir(),'wiki-policy-'));
 try{mkdirSync(join(root,'config'));mkdirSync(join(root,'content/approved'),{recursive:true});const config=join(root,'config/publications.yml');
  writeFileSync(config,'approved_ids: []');assert.deepEqual(readApprovals(root),[]);
  for(const value of ['[../secret]','[note, note]','[missing]']){writeFileSync(config,`approved_ids: ${value}`);assert.throws(()=>readApprovals(root));}
  writeFileSync(join(root,'outside.md'),'private');symlinkSync(join(root,'outside.md'),join(root,'content/approved/escape.md'));writeFileSync(config,'approved_ids: [escape]');assert.throws(()=>readApprovals(root));
  writeFileSync(join(root,'content/approved/note.md'),'approved');writeFileSync(config,'approved_ids: [note]');assert.deepEqual(readApprovals(root),['note']);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('rendered content rejects local files and active embeds',()=>{
 const guard=publicationGuard();for(const url of ['file:///private/note.pdf','../private/scan.png','/Users/private','javascript:alert(1)']) assert.throws(()=>guard({type:'element',tagName:'a',properties:{href:url}}));
 assert.throws(()=>guard({type:'element',tagName:'iframe',properties:{}}));
 assert.doesNotThrow(()=>guard({type:'element',tagName:'a',properties:{href:'https://example.org/paper'}}));
});
test('executable MDX cannot import a private source',()=>{
 const guard=sourceGuard();
 for(const type of ['mdxjsEsm','mdxJsxFlowElement','mdxFlowExpression','html'])assert.throws(()=>guard({type}));
 assert.throws(()=>guard({type:'image',url:'../private/scan.png'}));
 assert.doesNotThrow(()=>guard({type:'paragraph',children:[{type:'text',value:'A faithful note.'}]}));
});
