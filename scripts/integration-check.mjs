// Creates only synthetic test content in a separate temporary website.
import {cpSync,mkdtempSync,writeFileSync,readFileSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const source=resolve('.');const fixture=mkdtempSync(join(tmpdir(),'wiki-integration-'));
for(const name of ['src','docs','config','content','public','astro.config.mjs','package.json','tsconfig.json'])cpSync(join(source,name),join(fixture,name),{recursive:true});
cpSync(join(source,'node_modules'),join(fixture,'node_modules'),{recursive:true,verbatimSymlinks:true});
const article=(id,title,related=[],visibility='public',status='reviewed',body='A traceable synthetic note.')=>`---\nid: ${id}\ntitle: ${title}\ntype: digital-note\nsubject: Verification\ntags: [fixture]\nlanguage: en\nvisibility: ${visibility}\nstatus: ${status}\nsummary: Synthetic test content only.\nsource:\n  kind: local-file\n  reference: /LOCAL_REFERENCE_SENTINEL/original.pdf\n  pages: [2]\nrelated: ${JSON.stringify(related)}\n---\n\n## First section\n\n${body}\n\n$$\nx^2 + y^2 = z^2\n$$\n`;
writeFileSync(join(fixture,'config/publications.yml'),'approved_ids: [test-alpha, test-beta]\n');
writeFileSync(join(fixture,'content/approved/test-alpha.md'),article('test-alpha','Synthetic alpha',['test-beta','hidden-note'],'public','reviewed','UniqueFulltextSentinel.'));
writeFileSync(join(fixture,'content/approved/test-beta.mdx'),article('test-beta','Synthetic beta',[],'public','reviewed','合成中文全文檢索測試專用。').replace('subject: Verification','subject: Other').replace('tags: [fixture]','tags: [other]').replace('language: en','language: zh-Hant'));
writeFileSync(join(fixture,'content/approved/hidden-note.md'),article('hidden-note','PRIVATE_TITLE_SENTINEL',[],'private','draft','PRIVATE_BODY_SENTINEL'));
writeFileSync(join(fixture,'content/approved/unlisted.md'),article('unlisted','UNLISTED_TITLE_SENTINEL'));
const env={...process.env,ASTRO_TELEMETRY_DISABLED:'1',BASE_PATH:'/llm-wiki/',SITE_URL:'https://example.org'};
function build(expectSuccess=true){const result=spawnSync(process.execPath,[join(fixture,'node_modules/astro/astro.js'),'build'],{cwd:fixture,env,encoding:'utf8'});if(expectSuccess)assert.equal(result.status,0,result.stdout+result.stderr);else assert.notEqual(result.status,0,'Expected publication to fail closed');return result;}
build();
const index=JSON.parse(readFileSync(join(fixture,'dist/search-index.json'),'utf8'));
assert.deepEqual(index.map(e=>e.id).sort(),['test-alpha','test-beta']);
assert.ok(index.find(e=>e.id==='test-alpha').text.includes('uniquefulltextsentinel'));
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
for(const file of files(join(fixture,'dist'))){const text=readFileSync(file).toString();for(const secret of ['PRIVATE_TITLE_SENTINEL','PRIVATE_BODY_SENTINEL','UNLISTED_TITLE_SENTINEL','LOCAL_REFERENCE_SENTINEL'])assert.ok(!text.includes(secret),`Leak: ${file}`);}
const html=readFileSync(join(fixture,'dist/articles/test-alpha/index.html'),'utf8');assert.ok(html.includes('class="katex"'));assert.ok(html.includes('first-section'));assert.ok(html.includes('/llm-wiki/articles/test-beta/'));
writeFileSync(join(fixture,'content/approved/test-alpha.md'),article('test-alpha','Synthetic alpha',[],'private','draft'));build(false);
console.log(JSON.stringify({fixture,passed:['subpath build','Markdown and restricted MDX','KaTeX','TOC','public relation','full-text index','private/unlisted/source-reference exclusion','invalid approved metadata fails closed']},null,2));
