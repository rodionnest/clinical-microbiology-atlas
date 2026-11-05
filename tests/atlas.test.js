import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {SPECIES,PROFILES,DRUGS,SOURCES,STATUSES,getCell,getSpecies} from '../data.js';
import {filterProfiles,sortProfiles,shuffle,csvExport} from '../core.js';
import {QUESTIONS} from '../questions.js';
const profile=id=>PROFILES.find(p=>p.id===id);
test('all clinical rules and questions have valid, traceable provenance',()=>{
  assert.equal(new Set(PROFILES.map(p=>p.id)).size,PROFILES.length);
  assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,QUESTIONS.length);
  for(const p of PROFILES){assert.ok(getSpecies(p));assert.ok(SOURCES[p.source]);for(const [id,c]of Object.entries(p.cells)){assert.ok(DRUGS.some(d=>d.id===id));assert.ok(STATUSES[c.status]);assert.ok(SOURCES[c.source]);assert.ok(c.section);}}
  for(const q of QUESTIONS){assert.ok(SOURCES[q.source]);assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.explanation);}
});
test('critical distinctions prevent false susceptible interpretation',()=>{
  assert.equal(getCell(profile('kpneumo-base'),'amp').status,'ER');
  assert.equal(getCell(profile('ecoli-esbl'),'mem').status,'AST');
  assert.equal(getCell(profile('ecoli-esbl'),'cro').status,'MECH');
  assert.equal(getCell(profile('saureus-mrsa'),'oxa').status,'AR');
  assert.equal(getCell(profile('saureus-mrsa'),'cpt').status,'AST');
  assert.equal(getCell(profile('efaecium-vana'),'van').status,'AR');
  assert.equal(getCell(profile('efaecium-vana'),'tec').status,'AR');
  assert.equal(getCell(profile('efaecium-vanb'),'tec').status,'AST');
  assert.equal(getCell(profile('efaecalis-base'),'gen').status,'ER');
  assert.equal(getCell(profile('efaecalis-hlar'),'gen').status,'AR');
  assert.equal(getCell(profile('ecoli-base'),'fid').status,'ND');
});
test('variants preserve species resistance, except explicit HLAR replacement',()=>{
  for(const p of PROFILES.filter(p=>p.type!=='baseline'))for(const [d,c]of Object.entries(profile(p.speciesId+'-base').cells))if(c.status==='ER'&&!(p.id==='efaecalis-hlar'&&d==='gen'))assert.equal(getCell(p,d).status,'ER',p.id+':'+d);
});
test('the eight DTR agents are not falsely converted into modern EUCAST R',()=>{
  for(const id of ['tzp','caz','fep','atm','ipm','mem','cip','lev'])assert.equal(getCell(profile('paer-dtr'),id).status,'MECH');
  assert.equal(getCell(profile('paer-dtr'),'cza').status,'AST');
});
test('combined filtering uses the selected drug, not any drug status',()=>{
  const rows=filterProfiles({gram:'positive',drug:'van',status:'AR'});
  assert.deepEqual(rows.map(p=>p.id).sort(),['efaecium-vana','efaecium-vanb']);
  assert.equal(filterProfiles({gram:'negative',drug:'van',status:'ES'}).length,0);
  assert.ok(filterProfiles({drug:'amp',status:'ER'}).some(p=>p.id==='kpneumo-base'));
});
test('search supports Russian aliases, Latin names and mechanism terms',()=>{
  assert.ok(filterProfiles({search:'  КИШЕЧНАЯ  '}).every(p=>p.speciesId==='ecoli'));
  assert.equal(filterProfiles({search:'NDM'}).length,1);
  assert.ok(filterProfiles({search:'клиндамицин'}).length>0);
  assert.equal(filterProfiles({search:'no-such-bacterium-xyz'}).length,0);
});
test('unknown data can be intentionally filtered without being treated as susceptible',()=>{
  assert.ok(filterProfiles({drug:'fid',status:'ND'}).some(p=>p.speciesId==='ecoli'));
  assert.equal(filterProfiles({drug:'fid'}).length,1);
});
test('sorting is stable, non-mutating and clinically labelled',()=>{
  const original=PROFILES.map(p=>p.id);const sorted=sortProfiles(PROFILES,'drug','van');
  for(let i=1;i<sorted.length;i++)assert.ok(STATUSES[getCell(sorted[i-1],'van').status].rank<=STATUSES[getCell(sorted[i],'van').status].rank);
  assert.deepEqual(PROFILES.map(p=>p.id),original);
  assert.equal(getSpecies(sortProfiles(PROFILES,'name')[0]).name,'Acinetobacter baumannii');
});
test('every sortable column supports both directions, including every antibiotic',()=>{
  const columns=[['name',''],['gram',''],['profile',''],['intrinsic',''],['susceptible',''],...DRUGS.map(d=>['drug',d.id])];
  for(const [by,drug]of columns){const asc=sortProfiles(PROFILES,by,drug,'asc').map(p=>p.id);const desc=sortProfiles(PROFILES,by,drug,'desc').map(p=>p.id);assert.deepEqual(desc,[...asc].reverse(),by+':'+drug);}
});
test('CSV export is scoped and includes sources and a BOM for Cyrillic',()=>{
  const csv=csvExport([profile('efaecium-vana')],SOURCES);
  assert.ok(csv.startsWith('\uFEFF'));assert.ok(csv.includes('Enterococcus faecium'));assert.ok(csv.includes('https://www.eucast.org/'));assert.ok(!csv.includes('Klebsiella pneumoniae'));
});
test('question shuffling preserves unique answers and leaves the input intact',()=>{
  const input=[0,1,2,3],shuffled=shuffle(input,()=>0.2);assert.deepEqual(input,[0,1,2,3]);assert.deepEqual([...shuffled].sort(),input);
});
test('all images and local entry-point assets exist',()=>{
  for(const s of SPECIES)assert.ok(existsSync(new URL('../'+s.image,import.meta.url)),s.image);
  for(const file of ['index.html','styles.css','app.js','assets/hero.svg','assets/favicon.svg'])assert.ok(existsSync(new URL('../'+file,import.meta.url)),file);
  assert.ok(!readFileSync(new URL('../index.html',import.meta.url),'utf8').includes('src="/'));
});
