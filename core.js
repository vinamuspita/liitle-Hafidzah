"use strict";
/* ===== helpers ===== */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const today=(d=new Date())=>d.toISOString().slice(0,10);
const addDays=(iso,n)=>{const d=new Date(iso+"T12:00:00");d.setDate(d.getDate()+n);return today(d)};
const pad3=n=>String(n).padStart(3,"0");
const SURAH=n=>SURAH_INDEX[n-1];
const TOTAL_AYAT=SURAH_INDEX.reduce((s,x)=>s+x.ayat,0); // 6236
function juzOf(s,a){let j=1;for(let i=0;i<30;i++){const [js,ja]=JUZ_START[i];if(s>js||(s===js&&a>=ja))j=i+1}return j}
function juzRange(j){const [s0,a0]=JUZ_START[j-1];const nx=JUZ_START[j];const out=[];for(let s=s0;s<=(nx?nx[0]:114);s++){const from=s===s0?a0:1;const to=nx&&s===nx[0]?nx[1]-1:SURAH(s).ayat;if(to>=from)out.push([s,from,to])}return out}
function juzAyatCount(j){return juzRange(j).reduce((t,[s,f,e])=>t+e-f+1,0)}

/* ===== local storage (profiles, progress, settings) ===== */
const LS={get(k,d){try{const v=localStorage.getItem("lh:"+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem("lh:"+k,JSON.stringify(v));return true}catch(e){toast("Penyimpanan perangkat penuh.");return false}}};
/* ===== IndexedDB (Qur'an cache, recordings, imported Iqra pages) ===== */
const IDB={db:null,open(){return this.db?Promise.resolve(this.db):new Promise((res,rej)=>{if(!window.indexedDB)return rej(new Error("no idb"));const r=indexedDB.open("little-hafizah",1);r.onupgradeneeded=()=>{const d=r.result;["quran","rec","iqra"].forEach(n=>d.objectStoreNames.contains(n)||d.createObjectStore(n))};r.onsuccess=()=>{this.db=r.result;res(this.db)};r.onerror=()=>rej(r.error)})},
 async get(st,k){try{const d=await this.open();return await new Promise(r=>{const q=d.transaction(st).objectStore(st).get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(undefined)})}catch(e){return undefined}},
 async put(st,k,v){try{const d=await this.open();await new Promise((r,j)=>{const t=d.transaction(st,"readwrite");t.objectStore(st).put(v,k);t.oncomplete=r;t.onerror=()=>j(t.error)});return true}catch(e){return false}},
 async del(st,k){try{const d=await this.open();d.transaction(st,"readwrite").objectStore(st).delete(k)}catch(e){}},
 async keys(st){try{const d=await this.open();return await new Promise(r=>{const q=d.transaction(st).objectStore(st).getAllKeys();q.onsuccess=()=>r(q.result||[]);q.onerror=()=>r([])})}catch(e){return []}}};

/* ===== Qur'an source: Kemenag =====
   Order: (1) cached copy on this device, (2) copy downloaded into this repo by tools/ambil-quran-kemenag.mjs,
   (3) the Kemenag API used by quran.kemenag.go.id, (4) the verbatim copy of that API output in github.com/dyazincahya/quran-json-kemenag.
   Text is shown exactly as received; the app only checks that the ayah count matches. */
const QuranSource={
 sources:[
  {id:"lokal",label:"Salinan data Kemenag di aplikasi ini",url:n=>`data/quran/${n}.json`},
  {id:"kemenag",label:"API Qur’an Kemenag (quran.kemenag.go.id)",url:n=>`https://web-api.qurankemenag.net/quran-ayah?start=0&limit=1000&surah=${n}`},
  {id:"mirror",label:"Salinan keluaran API Kemenag (github.com/dyazincahya/quran-json-kemenag)",url:n=>`https://raw.githubusercontent.com/dyazincahya/quran-json-kemenag/main/surah/${n}.json`}],
 mem:{},
 pick(o,keys){for(const k of keys){const v=k.split(".").reduce((x,p)=>x&&x[p],o);if(v!==undefined&&v!==null&&v!=="")return v}return null},
 normalize(raw,n){let arr=Array.isArray(raw)?raw:(raw&&(raw.data||raw.ayahs||raw.verses||raw.result))||[];if(!Array.isArray(arr)&&arr&&Array.isArray(arr.ayahs))arr=arr.ayahs;if(!Array.isArray(arr))return null;
  const ay=arr.map((x,i)=>({a:+(this.pick(x,["ayah","ayah_number","number_in_surah","nomor","verse","number"])||i+1),ar:this.pick(x,["arabic","ayah_text","text_arabic","teks_arab","arab","text"]),lat:this.pick(x,["latin","transliteration","teks_latin","latin_text"]),id:this.pick(x,["translation","terjemahan","translation_id","text_id","idn"]),juz:+(this.pick(x,["juz_id","juz"])||0)||null,page:+(this.pick(x,["page","halaman","page_number"])||0)||null,
   surahAr:this.pick(x,["surah.arabic","surah.name_arabic","surah.arabic_name","surah.name"]),type:this.pick(x,["surah.type","surah.revelation","surah.tempat_turun"])}));
  return ay.filter(x=>x.ar)},
 async load(n){if(this.mem[n])return this.mem[n];const c=await IDB.get("quran",n);if(c&&c.ayat&&c.ayat.length===SURAH(n).ayat){this.mem[n]=c;return c}
  const errs=[];for(const s of this.sources){try{const r=await fetch(s.url(n),{cache:"no-store"});if(!r.ok){errs.push(s.id+": "+r.status);continue}const j=await r.json();const ayat=this.normalize(j,n);
   if(!ayat||ayat.length!==SURAH(n).ayat){errs.push(s.id+": jumlah ayat tidak cocok");continue}
   const rec={n,ayat,source:s.label,fetched:today()};await IDB.put("quran",n,rec);this.mem[n]=rec;return rec}catch(e){errs.push(s.id+": "+(e.message||"gagal"))}}
  const err=new Error("Teks surah belum bisa dimuat.");err.details=errs;throw err},
 async cachedList(){return (await IDB.keys("quran")).map(Number)}
};

/* ===== audio ===== */
const RECITERS=[
 {id:"shaatree",name:"Abu Bakr Asy-Syatri",note:"Qari yang dipakai di Qur’an Kemenag (versi per ayat dari everyayah.com)",tpl:"https://everyayah.com/data/Abu%20Bakr%20Ash-Shaatree_128kbps/{SSS}{AAA}.mp3"},
 {id:"alafasy",name:"Mishary Rashid Alafasy",note:"everyayah.com",tpl:"https://everyayah.com/data/Alafasy_128kbps/{SSS}{AAA}.mp3"},
 {id:"husary",name:"Mahmoud Khalil Al-Husary (Murattal)",note:"everyayah.com · tempo pelan, cocok untuk menghafal",tpl:"https://everyayah.com/data/Husary_128kbps/{SSS}{AAA}.mp3"},
 {id:"minshawy",name:"Muhammad Siddiq Al-Minshawi (Murattal)",note:"everyayah.com",tpl:"https://everyayah.com/data/Minshawy_Murattal_128kbps/{SSS}{AAA}.mp3"}];
function reciterList(){const c=(App.settings.customReciters||[]);return RECITERS.concat(c)}
function audioUrl(s,a){const r=reciterList().find(x=>x.id===App.settings.reciter)||RECITERS[0];return r.tpl.replace("{SSS}",pad3(s)).replace("{AAA}",pad3(a)).replace("{S}",s).replace("{A}",a)}
const Player={el:new Audio(),queue:[],qi:0,rep:1,repLeft:0,gap:0,onAyah:null,onEnd:null,stopped:true,timer:null,
 play(list,{repeat=1,gap=0,onAyah,onEnd}={}){this.stop();this.queue=list;this.qi=0;this.rep=repeat;this.repLeft=repeat;this.gap=gap;this.onAyah=onAyah;this.onEnd=onEnd;this.stopped=false;this._go()},
 _go(){if(this.stopped)return;const it=this.queue[this.qi];if(!it){this.stopped=true;this.onEnd&&this.onEnd();return}this.onAyah&&this.onAyah(it,this.rep-this.repLeft+1,this.rep);
  this.el.src=it.url||audioUrl(it.s,it.a);this.el.play().catch(e=>{this.stopped=true;this.onEnd&&this.onEnd(e);toast("Audio tidak dapat diputar. Periksa internet atau pilih qari lain di Mode Orang Tua.")})},
 _ended(){if(this.stopped)return;this.repLeft--;const next=()=>{if(this.repLeft<=0){this.qi++;this.repLeft=this.rep}this._go()};if(this.gap>0)this.timer=setTimeout(next,this.gap*1000);else next()},
 pause(){this.el.pause()},resume(){this.el.play().catch(()=>{})},stop(){this.stopped=true;clearTimeout(this.timer);try{this.el.pause()}catch(e){}},
 get playing(){return !this.stopped&&!this.el.paused}};
Player.el.addEventListener("ended",()=>Player._ended());
Player.el.addEventListener("error",()=>{if(!Player.stopped){Player.stopped=true;toast("Audio tidak dapat diputar. Periksa internet atau pilih qari lain.");Player.onEnd&&Player.onEnd(new Error("audio"))}});
/* instruction voice (Indonesian, female voice if the device has one) — never used for Qur'an or doa */
const FEMALE=/female|damayanti|gadis|google bahasa indonesia|samantha|karen|victoria|zira|aria|jenny|sonia|libby|emma/i,MALE=/\bmale\b|ardi|rizki|daniel|alex\b|david|mark|james|george/i;
function guide(text){try{if(!App.settings.guideVoice||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="id-ID";const v=speechSynthesis.getVoices().filter(v=>/^(id|in)/i.test(v.lang)).sort((a,b)=>(FEMALE.test(b.name)&&!MALE.test(b.name))-(FEMALE.test(a.name)&&!MALE.test(a.name)))[0];if(v)u.voice=v;u.pitch=v&&FEMALE.test(v.name)?1.1:1.3;u.rate=.92;speechSynthesis.speak(u)}catch(e){}}
/* parent recordings (stay on this device) */
const Rec={mr:null,chunks:[],async start(){const st=await navigator.mediaDevices.getUserMedia({audio:true});this.chunks=[];this.mr=new MediaRecorder(st);this.mr.ondataavailable=e=>this.chunks.push(e.data);this.mr.start()},
 stop(){return new Promise(r=>{if(!this.mr)return r(null);this.mr.onstop=()=>{const b=new Blob(this.chunks,{type:this.mr.mimeType||"audio/webm"});this.mr.stream.getTracks().forEach(t=>t.stop());this.mr=null;r(b)};this.mr.stop()})}};

/* ===== effects ===== */
let toastT;function toast(m){let e=$(".toast");if(!e){e=document.createElement("div");e.className="toast";e.setAttribute("role","status");document.body.appendChild(e)}e.textContent=m;clearTimeout(toastT);toastT=setTimeout(()=>e.remove(),3200)}
function sparkle(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const c=document.createElement("div");c.className="sparkle";c.setAttribute("aria-hidden","true");for(let i=0;i<18;i++){const s=document.createElement("span");s.textContent=["✦","★","✧","❀"][i%4];s.style.left=(10+Math.random()*80)+"%";s.style.animationDelay=(Math.random()*.5)+"s";s.style.color=["#F2C46D","#F4A7BE","#B9A3E8","#8FD4B6"][i%4];c.appendChild(s)}document.body.appendChild(c);setTimeout(()=>c.remove(),2200)}
function modal(html,bind){const m=document.createElement("div");m.className="modal";m.innerHTML=`<div class="box" role="dialog" aria-modal="true">${html}</div>`;document.body.appendChild(m);m.addEventListener("click",e=>{if(e.target===m||e.target.closest("[data-close]"))m.remove()});bind&&bind(m);return m}

/* ===== avatar (layered SVG) ===== */
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=((n>>8)&255)+amt,b=(n&255)+amt;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function avatarSVG(a,size=220){a=Object.assign({skin:AV.skin[1],face:"bulat",eyes:"bulat",mouth:"senyum",cheek:AV.cheek[0],hairStyle:"panjang lurus",hairColor:AV.hairColor[0],hijab:"sederhana",hijabColor:AV.hijabColor[0],outfit:"gamis",outfitColor:AV.outfitColor[1],pattern:"bunga",acc:"tanpa",bag:"tanpa",shoes:"sepatu",bg:"taman"},a);
 const hj=a.hijab!=="tanpa",sk=a.skin,hc=a.hairColor,oc=a.outfitColor,od=shade(oc,-28),hjc=a.hijabColor,hjd=shade(hjc,-30);let g="";
 const pid="p"+Math.random().toString(36).slice(2,7);
 // background
 const BG={taman:`<rect width="240" height="260" rx="34" fill="#FFF6EC"/><circle cx="200" cy="46" r="20" fill="#FFE6A6"/><path d="M0 214 Q60 196 120 210 T240 206 V260 H0Z" fill="#CFEFDF"/><g fill="#F7B6C8"><circle cx="30" cy="214" r="6"/><circle cx="210" cy="220" r="6"/></g><g fill="#C8B6F2"><circle cx="48" cy="226" r="5"/><circle cx="192" cy="232" r="5"/></g>`,
  sajadah:`<rect width="240" height="260" rx="34" fill="#FFF6EC"/><rect x="40" y="150" width="160" height="104" rx="10" fill="#BDE7D6"/><rect x="50" y="160" width="140" height="84" rx="6" fill="none" stroke="#F2C46D" stroke-width="3"/><path d="M120 166 l14 18 h-28z" fill="#F2C46D"/>`,
  "langit malam":`<rect width="240" height="260" rx="34" fill="#3E3B6E"/><path d="M196 40 a18 18 0 1 0 12 30 a14 14 0 1 1 -12 -30z" fill="#F2D38F"/><g fill="#FFF1DC"><circle cx="40" cy="40" r="2.5"/><circle cx="76" cy="70" r="2"/><circle cx="160" cy="28" r="2"/><circle cx="24" cy="110" r="2"/><circle cx="214" cy="120" r="2.5"/></g><path d="M0 222 Q120 200 240 222 V260 H0Z" fill="#5B5796"/>`,
  masjid:`<rect width="240" height="260" rx="34" fill="#FDF0F5"/><g fill="#E9DDF7"><path d="M150 120 a30 30 0 0 1 60 0 v60 h-60z"/><rect x="214" y="90" width="10" height="90"/><circle cx="219" cy="86" r="6"/></g><path d="M0 214 Q60 200 120 210 T240 206 V260 H0Z" fill="#E8F6EF"/>`};
 g+=BG[a.bg]||BG.taman;
 // pattern
 const pat=a.pattern==="bunga"?`<circle cx="6" cy="6" r="2.4" fill="#fff" opacity=".85"/><circle cx="6" cy="6" r="1" fill="#F2C46D"/>`:a.pattern==="bintang"?`<path d="M6 2 l1.2 2.6 2.8 .4 -2 2 .5 2.8 -2.5-1.4 -2.5 1.4 .5-2.8 -2-2 2.8-.4z" fill="#fff" opacity=".85"/>`:a.pattern==="bulan"?`<path d="M7 2.5 a3.5 3.5 0 1 0 2.6 5.8 a2.8 2.8 0 1 1 -2.6 -5.8z" fill="#FFF1DC" opacity=".95"/>`:"";
 g+=`<defs><pattern id="${pid}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="${oc}"/>${pat}</pattern></defs>`;
 const fill=a.pattern==="polos"?oc:`url(#${pid})`;
 // hair back
 if(!hj){if(a.hairStyle==="panjang lurus")g+=`<path d="M70 92 Q66 170 82 196 H158 Q174 170 170 92Z" fill="${hc}"/>`;else if(a.hairStyle==="panjang bergelombang")g+=`<path d="M70 92 Q60 130 72 150 Q62 172 80 198 H160 Q178 172 168 150 Q180 130 170 92Z" fill="${hc}"/>`;
  else if(a.hairStyle==="kuncir kuda")g+=`<path d="M158 84 Q196 100 182 160 Q176 120 160 110Z" fill="${hc}"/>`;else if(a.hairStyle==="kuncir dua")g+=`<path d="M70 104 Q44 120 52 164 Q62 136 76 124Z M170 104 Q196 120 188 164 Q178 136 164 124Z" fill="${hc}"/>`}
 // legs & shoes
 g+=`<rect x="100" y="214" width="14" height="22" rx="6" fill="${sk}"/><rect x="126" y="214" width="14" height="22" rx="6" fill="${sk}"/>`;
 const shoeC=a.shoes==="sandal"?"#C9A27A":"#F4A7BE";g+=a.shoes==="sandal"?`<path d="M94 236 h24 v5 h-24z M122 236 h24 v5 h-24z" fill="${shoeC}"/><path d="M100 236 q7 -6 14 0 M128 236 q7 -6 14 0" stroke="${shoeC}" stroke-width="3" fill="none"/>`:`<path d="M94 234 q12 -8 24 0 v7 h-24z M122 234 q12 -8 24 0 v7 h-24z" fill="${shoeC}"/>`;
 // outfit
 const O={dress:`<path d="M92 140 Q120 132 148 140 L168 218 Q120 228 72 218Z" fill="${fill}"/><path d="M72 218 Q120 228 168 218" stroke="${od}" stroke-width="3" fill="none"/>`,
  gamis:`<path d="M90 140 Q120 132 150 140 L162 228 Q120 234 78 228Z" fill="${fill}"/><path d="M120 142 V226" stroke="${od}" stroke-width="2" opacity=".5"/>`,
  "atasan & rok":`<path d="M92 140 Q120 132 148 140 L152 176 H88Z" fill="${fill}"/><path d="M86 174 H154 L166 224 Q120 232 74 224Z" fill="${od}"/>`,
  piyama:`<path d="M92 140 Q120 132 148 140 L152 190 H88Z" fill="${fill}"/><rect x="92" y="188" width="56" height="40" rx="6" fill="${fill}"/><path d="M120 190 V228" stroke="${od}" stroke-width="2"/><g fill="#fff"><circle cx="120" cy="154" r="2"/><circle cx="120" cy="168" r="2"/></g>`,
  "baju mengaji":`<path d="M88 140 Q120 130 152 140 L164 228 Q120 236 76 228Z" fill="${fill}"/><path d="M104 140 L120 166 L136 140" fill="#FFFFFF" opacity=".9"/>`};
 g+=O[a.outfit]||O.gamis;
 // arms
 const sleeve=a.outfit==="atasan & rok"||a.outfit==="piyama"?fill:fill;
 g+=`<path d="M92 146 Q74 164 78 196" stroke="${od}" stroke-width="15" stroke-linecap="round" fill="none"/><path d="M148 146 Q166 164 162 196" stroke="${od}" stroke-width="15" stroke-linecap="round" fill="none"/><circle cx="78" cy="198" r="7" fill="${sk}"/><circle cx="162" cy="198" r="7" fill="${sk}"/>`;
 // bag / mushaf
 if(a.bag==="tas mengaji")g+=`<path d="M100 146 L160 196" stroke="#C9A27A" stroke-width="4"/><rect x="150" y="186" width="30" height="26" rx="6" fill="#F2D38F"/><path d="M156 194 h18" stroke="#fff" stroke-width="2"/>`;
 if(a.bag==="mushaf mini")g+=`<g transform="translate(64 182) rotate(-8)"><rect width="30" height="22" rx="3" fill="#2F7D6B"/><rect x="2" y="2" width="26" height="18" rx="2" fill="none" stroke="#F2C46D" stroke-width="1.6"/><path d="M15 6 l3 5 -3 5 -3 -5z" fill="#F2C46D"/></g>`;
 // neck & head
 g+=`<rect x="112" y="122" width="16" height="18" fill="${shade(sk,-14)}"/>`;
 const face=a.face==="oval"?`<ellipse cx="120" cy="90" rx="38" ry="44" fill="${sk}"/>`:a.face==="hati"?`<path d="M82 78 Q84 46 120 46 Q156 46 158 78 Q158 116 120 134 Q82 116 82 78Z" fill="${sk}"/>`:`<circle cx="120" cy="90" r="42" fill="${sk}"/>`;
 if(hj){// hijab: back drape, face opening, front
  g+=`<path d="M70 96 Q66 40 120 36 Q174 40 170 96 Q182 136 160 152 Q120 164 80 152 Q58 136 70 96Z" fill="${hjc}"/>`;
  if(a.hijab==="bertingkat")g+=`<path d="M78 140 Q120 170 162 140 Q168 160 150 172 Q120 182 90 172 Q72 160 78 140Z" fill="${hjd}"/>`;
  g+=face;g+=`<path d="M80 92 Q80 52 120 50 Q160 52 160 92 Q156 70 120 66 Q84 70 80 92Z" fill="${hjc}"/><path d="M80 92 Q78 120 96 134" stroke="${hjd}" stroke-width="3" fill="none"/><path d="M160 92 Q162 120 144 134" stroke="${hjd}" stroke-width="3" fill="none"/>`;
  if(a.hijab==="dengan bros")g+=`<circle cx="146" cy="138" r="6" fill="#F2C46D"/><circle cx="146" cy="138" r="2.4" fill="#fff"/>`}
 else{g+=face;// fringe
  g+=a.hairStyle==="pendek"?`<path d="M78 92 Q74 44 120 44 Q166 44 162 92 Q162 70 146 62 Q128 76 98 70 Q84 76 78 92Z" fill="${hc}"/><path d="M78 92 Q76 110 84 118" stroke="${hc}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M162 92 Q164 110 156 118" stroke="${hc}" stroke-width="8" fill="none" stroke-linecap="round"/>`:
   `<path d="M78 96 Q72 44 120 42 Q168 44 162 96 Q158 66 140 60 Q124 78 96 72 Q84 78 78 96Z" fill="${hc}"/>`;
  if(a.hairStyle==="kuncir dua")g+=`<circle cx="76" cy="104" r="6" fill="#F4A7BE"/><circle cx="164" cy="104" r="6" fill="#F4A7BE"/>`;
  if(a.hairStyle==="kuncir kuda")g+=`<circle cx="160" cy="84" r="5" fill="#F4A7BE"/>`}
 // eyes
 const E=a.eyes==="senyum"?`<path d="M100 92 q6 -7 12 0 M128 92 q6 -7 12 0" stroke="#3A2A33" stroke-width="3.4" fill="none" stroke-linecap="round"/>`:a.eyes==="berbinar"?`<g fill="#3A2A33"><ellipse cx="106" cy="92" rx="6" ry="7.5"/><ellipse cx="134" cy="92" rx="6" ry="7.5"/></g><g fill="#fff"><circle cx="108" cy="89" r="2.4"/><circle cx="136" cy="89" r="2.4"/><circle cx="104" cy="95" r="1.1"/><circle cx="132" cy="95" r="1.1"/></g>`:`<g fill="#3A2A33"><circle cx="106" cy="92" r="5"/><circle cx="134" cy="92" r="5"/></g><g fill="#fff"><circle cx="107.6" cy="90.4" r="1.6"/><circle cx="135.6" cy="90.4" r="1.6"/></g>`;
 g+=E+`<path d="M101 82 q5 -3 10 0 M129 82 q5 -3 10 0" stroke="${hj?"#6B4B3E":hc}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 if(a.cheek!=="none")g+=`<g fill="${a.cheek}" opacity=".7"><ellipse cx="96" cy="106" rx="7" ry="4.5"/><ellipse cx="144" cy="106" rx="7" ry="4.5"/></g>`;
 g+=a.mouth==="tertawa"?`<path d="M110 110 Q120 124 130 110Z" fill="#C8556E"/><path d="M114 113 Q120 117 126 113" fill="#fff"/>`:a.mouth==="manis"?`<path d="M114 112 q6 5 12 0" stroke="#C8556E" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="120" cy="113.5" r="1.4" fill="#C8556E"/>`:`<path d="M110 110 Q120 120 130 110" stroke="#C8556E" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
 // accessories (hair accessories only without hijab; crown works with both)
 if(a.acc==="jepit"&&!hj)g+=`<g transform="translate(140 60) rotate(20)"><rect width="18" height="7" rx="3.5" fill="#F2C46D"/><circle cx="4" cy="3.5" r="2" fill="#fff"/></g>`;
 if(a.acc==="pita"&&!hj)g+=`<g transform="translate(146 56)"><path d="M0 8 L-12 0 V16Z M0 8 L12 0 V16Z" fill="#F4A7BE"/><circle cy="8" r="4" fill="#E58AA6"/></g>`;
 if(a.acc==="mahkota bunga")g+=`<g>${[84,100,120,140,156].map((x,i)=>`<circle cx="${x}" cy="${i%2?50:56}" r="7" fill="${["#F7B6C8","#C8B6F2","#FFF1DC","#BDE7D6","#F7B6C8"][i]}"/><circle cx="${x}" cy="${i%2?50:56}" r="2.4" fill="#F2C46D"/>`).join("")}</g>`;
 return `<svg viewBox="0 0 240 260" width="${size}" height="${size*260/240}" role="img" aria-label="Avatar Little Hafizah" class="avatar">${g}</svg>`}
