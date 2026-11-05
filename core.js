import {DRUGS,PROFILES,STATUSES,getSpecies,getCell} from './data.js';
export const normalize = s=>String(s).toLocaleLowerCase('ru').replaceAll('ё','е').trim();
export function filterProfiles(filters={}) {
  const query=normalize(filters.search||'');
  return PROFILES.filter(p=>{
    const s=getSpecies(p);
    if(filters.gram&&s.gram!==filters.gram)return false;
    if(filters.profile&&p.type!==filters.profile)return false;
    if(filters.drug&&filters.status&&getCell(p,filters.drug).status!==filters.status)return false;
    if(filters.drug&&!filters.status&&getCell(p,filters.drug).status==='ND')return false;
    if(!filters.drug&&filters.status&&!DRUGS.some(d=>getCell(p,d.id).status===filters.status))return false;
    if(query){const drugNames=DRUGS.filter(d=>p.cells[d.id]).map(d=>`${d.name} ${d.short}`).join(' ');
      if(!normalize([s.name,s.ru,s.group,s.morphology,p.label,p.short,p.mechanism,drugNames].join(' ')).includes(query))return false;
    }return true;
  });
}
export function sortProfiles(rows,by='name',drug='',direction='asc'){
  const types={baseline:0,resistant:1,high:2};
  const count=(p,status)=>Object.values(p.cells).filter(c=>c.status===status).length;
  return [...rows].sort((a,b)=>{
    const sa=getSpecies(a),sb=getSpecies(b);
    const name=sa.name.localeCompare(sb.name,'en');
    let result=0;
    if(by==='name-desc')result=name;
    else if(by==='profile')result=types[a.type]-types[b.type];
    else if(by==='gram')result=sa.gram.localeCompare(sb.gram);
    else if(by==='intrinsic')result=count(a,'ER')-count(b,'ER');
    else if(by==='susceptible')result=count(a,'ES')-count(b,'ES');
    else if(by==='drug'&&drug)result=STATUSES[getCell(a,drug).status].rank-STATUSES[getCell(b,drug).status].rank;
    return (result||name||types[a.type]-types[b.type]||a.label.localeCompare(b.label,'ru'))*(by==='name-desc'||direction==='desc'?-1:1);
  });
}
export function shuffle(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function csvExport(rows,sourceMap){
  const quote=v=>'"'+String(v??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"';
  const lines=[['Вид','Грам','Профиль','Антибиотик','Статус','Пояснение','Источник','Раздел']];
  for(const p of rows)for(const d of DRUGS){const c=getCell(p,d.id);if(c.status==='ND')continue;lines.push([getSpecies(p).name,getSpecies(p).gram==='positive'?'Грам (+)':'Грам (−)',p.label,d.name,STATUSES[c.status].name,c.note||STATUSES[c.status].description,sourceMap[c.source]?.url,c.section]);}
  return '\uFEFF'+lines.map(row=>row.map(quote).join(';')).join('\r\n');
}
