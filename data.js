// Curated teaching rules, not patient AST results. Every populated cell has a source.
import {MICROGRAPHS} from './micrographs.js';
export const REVIEW_DATE = '2026-11-05';
export const SOURCES = {
  er: {title:'EUCAST · Expected Resistant Phenotypes',version:'v1.2 · январь 2023',url:'https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/Expected_Resistant_Phenotypes_v1.2_20230113.pdf',scope:'Ожидаемые резистентные фенотипы; выбранные пары вида и препарата.'},
  es: {title:'EUCAST · Expected Susceptible Phenotypes',version:'v1.1 · март 2022',url:'https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/Expected_Susceptible_Phenotypes_Tables_v1.1_20220325.pdf',scope:'Ожидаемая чувствительность; необычные результаты требуют подтверждения.'},
  enterobacterales: {title:'EUCAST · Expert Rules: Enterobacterales',version:'v3.3 · 30 июня 2024',url:'https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/ExpertRules_V3.3_20240630_Enterobacterales.pdf',scope:'AmpC, риск селекции устойчивости и правила интерпретации.'},
  staph: {title:'EUCAST · Expert Rules: Staphylococcus',version:'9 ноября 2025',url:'https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/Staphylococcus_ExpertRules_20251109.pdf',scope:'MRSA, пенициллиназа и индуцируемая устойчивость к клиндамицину.'},
  entero: {title:'EUCAST · Expert Rules: Enterococcus',version:'9 ноября 2025',url:'https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/Enterococcus_ExpertRules_20251109.pdf',scope:'VRE, vanA/vanB и высокоуровневая устойчивость к аминогликозидам.'},
  idsa: {title:'IDSA · AMR Guidance',version:'30 июля 2026',url:'https://www.idsociety.org/practice-guideline/amr-guidance/',scope:'ESBL, AmpC, CRE, DTR P. aeruginosa, CRAB. Используется для механизмов, а не переноса порогов CLSI в EUCAST.'},
  sir: {title:'EUCAST · Definition of S, I and R',version:'Действующие определения; проверено 05.11.2026',url:'https://www.eucast.org/bacteria/clinical-breakpoints-and-interpretation/definition-of-s-i-and-r/',scope:'S/I/R, WT и ECOFF. I — чувствительность при увеличенной экспозиции.'},
  breakpoints: {title:'EUCAST · Clinical Breakpoint Tables',version:'v16.1 · 24 июня 2026',url:'https://www.eucast.org/fileadmin/eucast/pdf/breakpoints/v_16.1_Breakpoint_Tables.pdf',scope:'Актуальные клинические пороги и примечания. Числовые пороги в атласе не воспроизводятся.'},
  mdr: {title:'Magiorakos et al. · Definitions of MDR, XDR and PDR',version:'Clinical Microbiology and Infection · 2012',url:'https://doi.org/10.1111/j.1469-0691.2011.03570.x',scope:'Исходные международные определения приобретённой множественной устойчивости. Нельзя механически переносить историческое I в современную систему EUCAST.'},
  morphology: {title:'CDC · Basic Bacterial ID from Gram Positive Stain',version:'Учебные материалы лабораторной диагностики',url:'https://reach.cdc.gov/sites/default/files/job-aids-resources/Basic-Bacterial-ID-from-Gram-Positive-StainFlowchart_508.pdf',scope:'Кокки в скоплениях и цепочках, палочки. Схемы атласа нарисованы самостоятельно.'},
  structure: {title:'Medical Microbiology · Structure (NCBI Bookshelf)',version:'4-е издание · 1996; только базовая морфология',url:'https://www.ncbi.nlm.nih.gov/books/NBK8477/',scope:'Учебный источник для формы бактерий. Для антибиотикорезистентности этот учебник не используется.'}
};
export const STATUSES = {
  ER:{label:'R₀',name:'Ожидаемая устойчивость',description:'Видовой ожидаемый резистентный фенотип EUCAST. В интерфейсе соответствует разделу природной / ожидаемой устойчивости.',rank:4},
  ES:{label:'S*',name:'Ожидаемая чувствительность',description:'Ожидаемый чувствительный фенотип EUCAST. Не является результатом S конкретного изолята и не определяет препарат выбора.',rank:0},
  AR:{label:'Rₐ',name:'Приобретённая устойчивость',description:'Устойчивость, определяющая указанный профиль или следующая из экспертного правила. Другие препараты оцениваются отдельно.',rank:5},
  MECH:{label:'↓',name:'Влияние механизма',description:'Механизм снижает активность или создаёт риск неэффективности. Это не автоматическая лабораторная категория R; нужна AST.',rank:3},
  AST:{label:'AST',name:'Требуется тестирование',description:'По виду или названному механизму нельзя установить чувствительность. Нужны AST и клинический контекст.',rank:1},
  ND:{label:'—',name:'Не включено',description:'Для этой пары правило в учебную выборку не включено. Это не чувствительность, не устойчивость и не утверждение об отсутствии breakpoint.',rank:2}
};
export const PROFILE_TYPES = {baseline:'Видовой профиль',resistant:'Резистентный',high:'Особо устойчивый*'};
export const DRUGS = [
  ['pen','Бензилпенициллин','PEN','Пенициллины'],['amp','Ампициллин','AMP','Пенициллины'],['amc','Амоксициллин/клавуланат','AMC','Пенициллины'],['tzp','Пиперациллин/тазобактам','TZP','Пенициллины'],['oxa','Оксациллин','OXA','Пенициллины'],
  ['cro','Цефтриаксон','CRO','Цефалоспорины'],['caz','Цефтазидим','CAZ','Цефалоспорины'],['fep','Цефепим','FEP','Цефалоспорины'],['cpt','Цефтаролин','CPT','Цефалоспорины'],['cza','Цефтазидим/авибактам','CZA','Цефалоспорины'],
  ['atm','Азтреонам','ATM','Монобактамы'],['etp','Эртапенем','ETP','Карбапенемы'],['mem','Меропенем','MEM','Карбапенемы'],['ipm','Имипенем','IPM','Карбапенемы'],
  ['van','Ванкомицин','VAN','Гликопептиды'],['tec','Тейкопланин','TEC','Гликопептиды'],['lzd','Линезолид','LZD','Оксазолидиноны'],['gen','Гентамицин','GEN','Аминогликозиды'],['cip','Ципрофлоксацин','CIP','Фторхинолоны'],['lev','Левофлоксацин','LEV','Фторхинолоны'],
  ['sxt','Триметоприм/сульфаметоксазол','SXT','Комбинация антифолатов'],['cli','Клиндамицин','CLI','Линкозамиды'],['col','Колистин','COL','Полимиксины'],['mtz','Метронидазол','MTZ','Нитроимидазолы'],['fid','Фидаксомицин','FID','Макроциклические антибиотики']
].map(([id,name,short,group])=>({id,name,short,group}));
export const SPECIES = [
 ['ecoli','Escherichia coli','Кишечная палочка','negative','rod','Enterobacterales','Палочки'],
 ['kpneumo','Klebsiella pneumoniae','Клебсиелла пневмонии','negative','rod','Enterobacterales','Палочки'],
 ['koxy','Klebsiella oxytoca','Клебсиелла окситока','negative','rod','Enterobacterales','Палочки'],
 ['ecloacae','Enterobacter cloacae complex','Комплекс E. cloacae','negative','rod','Enterobacterales','Палочки'],
 ['kaero','Klebsiella aerogenes','Клебсиелла аэрогенес','negative','rod','Enterobacterales','Палочки'],
 ['cfreund','Citrobacter freundii','Цитробактер фреунди','negative','rod','Enterobacterales','Палочки'],
 ['serratia','Serratia marcescens','Серрация марцесценс','negative','rod','Enterobacterales','Палочки'],
 ['morgan','Morganella morganii','Морганелла моргани','negative','rod','Enterobacterales','Палочки'],
 ['proteus','Proteus mirabilis','Протей мирабилис','negative','rod','Enterobacterales','Палочки'],
 ['paer','Pseudomonas aeruginosa','Синегнойная палочка','negative','rod','Неферментирующие','Палочки'],
 ['abaum','Acinetobacter baumannii','Ацинетобактер баумании','negative','coccobacillus','Неферментирующие','Коккобациллы'],
 ['steno','Stenotrophomonas maltophilia','Стенотрофомонада','negative','rod','Неферментирующие','Палочки'],
 ['bcep','Burkholderia cepacia complex','Комплекс B. cepacia','negative','rod','Неферментирующие','Палочки'],
 ['hinf','Haemophilus influenzae','Гемофильная палочка','negative','coccobacillus','Другие грамотрицательные','Коккобациллы'],
 ['morax','Moraxella catarrhalis','Моракселла катаралис','negative','diplo','Другие грамотрицательные','Диплококки'],
 ['nmen','Neisseria meningitidis','Менингококк','negative','diplo','Другие грамотрицательные','Диплококки'],
 ['saureus','Staphylococcus aureus','Золотистый стафилококк','positive','cluster','Стафилококки','Кокки в скоплениях'],
 ['sepi','Staphylococcus epidermidis','Эпидермальный стафилококк','positive','cluster','Стафилококки','Кокки в скоплениях'],
 ['spneu','Streptococcus pneumoniae','Пневмококк','positive','lancet','Стрептококки','Ланцетовидные диплококки'],
 ['spyog','Streptococcus pyogenes','Стрептококк группы A','positive','chain','Стрептококки','Кокки в цепочках'],
 ['efaecalis','Enterococcus faecalis','Энтерококк фекалис','positive','chain','Энтерококки','Кокки, пары и цепочки'],
 ['efaecium','Enterococcus faecium','Энтерококк фециум','positive','chain','Энтерококки','Кокки, пары и цепочки'],
 ['listeria','Listeria monocytogenes','Листерия моноцитогенес','positive','rod','Грамположительные палочки','Короткие палочки'],
 ['bfrag','Bacteroides fragilis','Бактероидес фрагилис','negative','rod','Анаэробы','Палочки'],
 ['cdiff','Clostridioides difficile','Клостридиоидес диффициле','positive','spore','Анаэробы','Спорообразующие палочки']
].map(([id,name,ru,gram,shape,group,morphology])=>({id,name,ru,gram,shape,group,morphology,micrograph:MICROGRAPHS[id]||null,image:MICROGRAPHS[id]?.src||`assets/${shape}-${gram}.svg`}));

const base = {};
function put(species,drugs,status,source,section,note='') {
  for(const s of species.split(' ')) for(const d of drugs.split(' ')) {
    base[s]??={};base[s][d]={status,source,section,note};
  }
}
const enterics='ecoli kpneumo koxy ecloacae kaero cfreund serratia morgan proteus';
const nonferment='paer abaum steno bcep';
const positive='saureus sepi spneu spyog efaecalis efaecium listeria';
put(enterics,'pen van tec lzd cli','ER','er','Таблица 1, преамбула');
put(nonferment,'pen van tec lzd cli','ER','er','Таблица 2, преамбула');
put('hinf morax nmen','van tec lzd cli','ER','er','Таблица 3, преамбула');
put(positive,'atm col','ER','er','Таблица 4, преамбула');
put('kpneumo','amp','ER','er','Правило 1.7');put('koxy','amp','ER','er','Правило 1.8');
put('ecloacae','amp amc','ER','er','Правило 1.3');put('kaero','amp amc','ER','er','Правило 1.6');put('cfreund','amp amc','ER','er','Правило 1.2');
put('serratia','amp col','ER','er','Правило 1.18');put('morgan','amp col','ER','er','Правило 1.10');put('proteus','col','ER','er','Правило 1.12');
put('paer','amp amc cro etp','ER','er','Правило 2.7');put('abaum','etp atm','ER','er','Правило 2.1');
put('steno','etp mem ipm gen','ER','er','Правило 2.8');put('bcep','gen col','ER','er','Правило 2.3');
put('saureus sepi','caz','ER','er','Правило 4.5');
put('efaecalis','cro caz fep cpt cza','ER','er','Правило 4.7','Цефалоспорины. Это не исключает специальные схемы синергии: таблица описывает отдельные препараты.');
put('efaecium','cro caz fep cpt cza','ER','er','Правило 4.9');
put('efaecalis efaecium','cpt cza','ER','breakpoints','Enterococcus, печатная стр. 40; Notes 8','Препарат не пригоден для лечения по EUCAST; при необходимости сообщается R. Это не утверждение о конкретном природном механизме.');
put('listeria','cro caz fep','ER','er','Правило 4.11');
put('efaecalis efaecium','gen','ER','er','Таблица 4, примечание 1','Низкоуровневая устойчивость. Синергия возможна при отсутствии HLAR; монотерапия и синергия — разные задачи.');
put('bfrag cdiff','atm gen col','ER','er','Таблица 5, преамбула');
put('cdiff','atm col','ER','er','Таблицы 4–5, преамбулы');
put('spyog','pen','ES','es','Правило 2.5');
put('saureus','van tec lzd','ES','es','Правило 2.1');put('sepi','van','ES','es','Правило 2.2');
put('spneu','van lzd','ES','es','Правило 2.4');
put('efaecalis','amp','ES','es','Правило 2.7');put('efaecalis efaecium','lzd','ES','es','Правило 2.6');
put('hinf','cro','ES','es','Правило 1.4');put('morax','cro','ES','es','Правило 1.5');put('nmen','cro','ES','es','Правило 1.6');
put('bfrag','mtz','ES','es','Правило 3.1');put('cdiff','mtz van fid','ES','es','Правило 3.2','Ожидаемая чувствительность не определяет предпочтительный препарат, путь введения или показание.');
// Explicit AST cells mean uncertainty, never inferred activity.
put('ecoli kpneumo koxy','cro caz fep tzp mem etp cip sxt','AST','idsa','Раздел 1','Наличие вида не предсказывает приобретённые механизмы; оценить изолят.');
put('ecloacae kaero cfreund','cro caz tzp','MECH','enterobacterales','Правило 3','Риск селекции дерепрессированных AmpC-мутантов даже при исходной чувствительности in vitro.');
put('ecloacae kaero cfreund','fep mem','AST','idsa','Раздел 2','Чувствительность конкретного изолята требуется подтвердить.');
put('paer','tzp caz fep atm mem ipm cip lev cza','AST','idsa','Раздел 4','Нельзя выводить чувствительность из названия вида.');
put('abaum','mem ipm','AST','idsa','Раздел 5','Карбапенеморезистентность определяется тестированием.');
put('steno','sxt','AST','idsa','Раздел 6','Оценивать по AST. Название вида не гарантирует чувствительность.');
put('saureus','pen amp oxa cpt','AST','staph','Правила 1–2','Необходимы данные о метициллинорезистентности и пенициллиназе. MSSA не равно WT.');
put('efaecalis efaecium','van tec','AST','entero','Правило 5','Оценка гликопептидов и vanA/vanB; наличие VRE не выводится из вида.');

export const PROFILES = SPECIES.map(s=>({id:`${s.id}-base`,speciesId:s.id,type:'baseline',label:'Базовый профиль',short:'Видовые правила',mechanism:'Приобретённый механизм не задан',note:'Справочный видовой профиль; приобретённый механизм не задан, а WT не установлен. Дикий тип (WT) определяется отдельно для пары «вид–препарат» и не гарантирует S. Природная / ожидаемая устойчивость сохраняется и у дикого типа.',source:'sir',section:'Wild type distributions and ECOFFs',cells:base[s.id]||{}}));
function variant(speciesId,id,type,label,short,mechanism,note,source,section,overrides){
  const cells={...base[speciesId]};
  for(const o of overrides){const [drugs,status,text,src=source,sec=section]=o;for(const d of drugs.split(' ')) if(cells[d]?.status!=='ER') cells[d]={status,note:text,source:src,section:sec};}
  PROFILES.push({id,speciesId,type,label,short,mechanism,note,source,section,cells});
}
const esblOverrides=[['amp cro caz fep atm','MECH','ESBL гидролизуют многие β-лактамы; итоговый S/I/R определяется AST.'],['mem etp','AST','Активность может сохраняться; подтвердить AST.'],['cip sxt gen','AST','Сопутствующая устойчивость не определяется одним ESBL.']];
for(const s of ['ecoli','kpneumo','koxy'])variant(s,`${s}-esbl`,'resistant','ESBL / БЛРС','ESBL','β-лактамазы расширенного спектра','Механизм не равен готовой антибиотикограмме. Не присваивайте всем β-лактамам R автоматически.','idsa','Раздел 1',esblOverrides);
for(const s of ['ecloacae','kaero','cfreund'])variant(s,`${s}-ampc`,'resistant','Дерепрессия AmpC','AmpC ↑','Повышенная экспрессия AmpC','Селекция устойчивости к цефалоспоринам III поколения может происходить во время терапии.','enterobacterales','Правило 3',[['cro caz tzp','MECH','Риск утраты активности из-за AmpC.'],['fep mem','AST','Нужна индивидуальная оценка AST.','idsa','Раздел 2']]);
variant('kpneumo','kpneumo-kpc','high','Карбапенемаза KPC','KPC','Сериновая карбапенемаза','Обнаружение карбапенемазы не определяет чувствительность ко всем резервным препаратам и не доказывает XDR.','idsa','Раздел 3.4',[['mem etp ipm cro caz fep','MECH','Гидролиз β-лактамов; клиническая категория по AST.'],['cza','AST','Возможна активность, но требуется тестирование.']]);
variant('kpneumo','kpneumo-ndm','high','Металло-β-лактамаза NDM','NDM / MBL','Металло-β-лактамаза','Авибактам не ингибирует NDM. Устойчивость к азтреонаму возможна из-за сопутствующих ферментов.','idsa','Раздел 3.5',[['mem etp ipm cro caz fep cza','MECH','NDM гидролизует традиционные β-лактамы; авибактам NDM не блокирует.'],['atm','AST','NDM сам не гидролизует азтреонам; сопутствующие β-лактамазы могут это делать.']]);
variant('kpneumo','kpneumo-oxa48','high','Карбапенемаза OXA-48-like','OXA-48-like','Сериновая карбапенемаза класса D','Не переносите профиль KPC или NDM на OXA-48-like. Учитывайте сопутствующие механизмы.','idsa','Раздел 3.6',[['mem etp ipm','MECH','Карбапенемаза: степень снижения чувствительности вариабельна.'],['cza cro caz fep','AST','Нужны AST и оценка сопутствующих механизмов.']]);
variant('paer','paer-dtr','high','Трудно поддающаяся лечению резистентность','DTR','Сочетание механизмов','DTR определён IDSA через нечувствительность к восьми препаратам: TZP, CAZ, FEP, ATM, IPM, MEM, CIP и LEV. Это отдельное определение; не переводите современную EUCAST I в R.','idsa','Раздел 4, определение DTR',[['tzp caz fep atm ipm mem cip lev','MECH','Входит в восемь препаратов определения DTR. Здесь не отображается лабораторная категория R.'],['cza','AST','Проверяется отдельно; DTR не означает устойчивость ко всем новым препаратам.']]);
variant('abaum','abaum-crab','high','Карбапенеморезистентный A. baumannii','CRAB','Карбапенеморезистентность','Учебный пример CRAB с подтверждённой устойчивостью к имипенему и меропенему. Это не универсальная антибиотикограмма всех CRAB.','idsa','Раздел 5',[['mem ipm','AR','R к обоим препаратам задан в этом учебном профиле. Другие категории нельзя вывести автоматически.']]);
variant('saureus','saureus-mrsa','resistant','Метициллинорезистентный S. aureus','MRSA','mecA/mecC · PBP2a','MRSA: обычные β-лактамы считаются неактивными. Цефтаролин и цефтобипрол тестируют отдельно. MRSA не означает VRE/VRSA или XDR.','staph','Правило 1',[['pen amp amc tzp oxa cro fep mem etp ipm','AR','Экспертное правило для метициллинорезистентности.'],['cpt','AST','Анти-MRSA цефалоспорин требует отдельного тестирования.']]);
variant('saureus','saureus-penicillinase','resistant','MSSA с пенициллиназой','MSSA · blaZ','Пенициллиназа; метициллинорезистентность исключена','MSSA описывает метициллиновый фенотип, а не отсутствие всех механизмов резистентности.','staph','Правила 1–2',[['pen amp','AR','Пенициллиназа: устойчивость к обычным пенициллинам.'],['oxa','AST','В этом профиле метициллинорезистентность исключена; клиническую интерпретацию выполняют по экспертным правилам.']]);
variant('saureus','saureus-imlsb','resistant','Индуцируемый MLSB-фенотип','iMLSB','Индуцируемая резистентность MLSB','Учебный профиль с положительным тестом индуцируемой устойчивости к клиндамицину.','staph','Правило 3',[['cli','AR','При положительном тесте индукции клиндамицин сообщается как R.']]);
variant('efaecium','efaecium-vana','high','Ванкомицинорезистентный · vanA','VRE · vanA','Изменение мишени гликопептидов','vanA определяет устойчивость к ванкомицину и тейкопланину, но не устанавливает XDR/PDR.','entero','Правило 5',[['van tec','AR','При обнаруженном vanA оба гликопептида сообщаются как R.']]);
variant('efaecium','efaecium-vanb','high','Ванкомицинорезистентный · vanB','VRE · vanB','Изменение мишени гликопептидов','При vanB тейкопланин оценивают отдельно; возможна селекция устойчивости.','entero','Правило 5',[['van','AR','vanB-ассоциированная устойчивость к ванкомицину.'],['tec','AST','Возможен чувствительный фенотип; это не гарантия, учесть экспертное правило.']]);
variant('efaecalis','efaecalis-hlar','resistant','Высокоуровневая устойчивость к гентамицину','HLAR','Высокоуровневая аминогликозидная резистентность','Положительный скрининг HLAR к гентамицину исключает соответствующую синергию. Стрептомицин тестируют отдельно.','entero','Правила 2–3',[]);
// Do not demand new AST for an oxacillin inference after MSSA has already been established.
delete PROFILES.find(p=>p.id==='saureus-penicillinase').cells.oxa;
// HLAR replaces the low-level species rule, not merely adds another drug resistance.
PROFILES.find(p=>p.id==='efaecalis-hlar').cells.gen={status:'AR',source:'entero',section:'Правила 2–3',note:'Высокоуровневая устойчивость: синергия с гентамицином утрачена. Стрептомицин проверяют отдельно.'};

export function getSpecies(p){return SPECIES.find(s=>s.id===p.speciesId);}
export function getCell(p,drug){return p.cells[drug]||{status:'ND',source:null,section:'',note:STATUSES.ND.description};}
