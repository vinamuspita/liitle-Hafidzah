// Mengambil teks Al-Qur'an (Arab, latin, terjemahan) dari API Qur'an Kemenag dan menyimpannya ke data/quran/<nomor>.json
// Jalankan sekali dari folder aplikasi:  node tools/ambil-quran-kemenag.mjs     (butuh Node.js 18+)
// Data disimpan apa adanya dari sumber; aplikasi hanya memeriksa jumlah ayat.
import { writeFile, mkdir } from 'node:fs/promises';
const COUNT=[7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6];
await mkdir('data/quran',{recursive:true});
let ok=0;
for(let n=1;n<=114;n++){
  const url=`https://web-api.qurankemenag.net/quran-ayah?start=0&limit=1000&surah=${n}`;
  try{
    const r=await fetch(url,{headers:{'Accept':'application/json','Origin':'https://quran.kemenag.go.id','Referer':'https://quran.kemenag.go.id/'}});
    const j=await r.json();const data=Array.isArray(j)?j:j.data;
    if(!Array.isArray(data)||data.length!==COUNT[n-1]){console.log(`⚠️  Surah ${n}: jumlah ayat ${data&&data.length} (seharusnya ${COUNT[n-1]})`);continue}
    await writeFile(`data/quran/${n}.json`,JSON.stringify({source:'web-api.qurankemenag.net (quran.kemenag.go.id)',fetched:new Date().toISOString().slice(0,10),data}));
    ok++;console.log(`✅ Surah ${n} (${data.length} ayat)`);
  }catch(e){console.log(`❌ Surah ${n}: ${e.message}`)}
  await new Promise(r=>setTimeout(r,250));
}
console.log(`Selesai: ${ok}/114 surah tersimpan di data/quran/`);
