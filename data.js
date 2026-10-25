/* Little Hafizah — data that is NOT Qur'an text.
   Qur'an Arabic text, transliteration and translation are always loaded from the Kemenag source at runtime (see app.js: QuranSource).
   This file only holds an index (surah number, Latin name, meaning, ayah count) for navigation before the text is loaded. */
"use strict";
const SURAH_INDEX=[
[1,"Al-Fatihah","Pembukaan",7],[2,"Al-Baqarah","Sapi Betina",286],[3,"Ali 'Imran","Keluarga Imran",200],[4,"An-Nisa'","Perempuan",176],[5,"Al-Ma'idah","Hidangan",120],
[6,"Al-An'am","Binatang Ternak",165],[7,"Al-A'raf","Tempat Tertinggi",206],[8,"Al-Anfal","Harta Rampasan Perang",75],[9,"At-Taubah","Pengampunan",129],[10,"Yunus","Yunus",109],
[11,"Hud","Hud",123],[12,"Yusuf","Yusuf",111],[13,"Ar-Ra'd","Guruh",43],[14,"Ibrahim","Ibrahim",52],[15,"Al-Hijr","Al-Hijr",99],
[16,"An-Nahl","Lebah",128],[17,"Al-Isra'","Perjalanan Malam",111],[18,"Al-Kahf","Gua",110],[19,"Maryam","Maryam",98],[20,"Taha","Taha",135],
[21,"Al-Anbiya'","Para Nabi",112],[22,"Al-Hajj","Haji",78],[23,"Al-Mu'minun","Orang-Orang Mukmin",118],[24,"An-Nur","Cahaya",64],[25,"Al-Furqan","Pembeda",77],
[26,"Asy-Syu'ara'","Para Penyair",227],[27,"An-Naml","Semut",93],[28,"Al-Qasas","Kisah-Kisah",88],[29,"Al-'Ankabut","Laba-Laba",69],[30,"Ar-Rum","Bangsa Romawi",60],
[31,"Luqman","Luqman",34],[32,"As-Sajdah","Sajdah",30],[33,"Al-Ahzab","Golongan yang Bersekutu",73],[34,"Saba'","Saba'",54],[35,"Fatir","Pencipta",45],
[36,"Yasin","Yasin",83],[37,"As-Saffat","Barisan-Barisan",182],[38,"Sad","Sad",88],[39,"Az-Zumar","Rombongan",75],[40,"Gafir","Maha Pengampun",85],
[41,"Fussilat","Yang Dijelaskan",54],[42,"Asy-Syura","Musyawarah",53],[43,"Az-Zukhruf","Perhiasan",89],[44,"Ad-Dukhan","Kabut",59],[45,"Al-Jasiyah","Yang Berlutut",37],
[46,"Al-Ahqaf","Bukit Pasir",35],[47,"Muhammad","Muhammad",38],[48,"Al-Fath","Kemenangan",29],[49,"Al-Hujurat","Kamar-Kamar",18],[50,"Qaf","Qaf",45],
[51,"Az-Zariyat","Angin yang Menerbangkan",60],[52,"At-Tur","Bukit Tur",49],[53,"An-Najm","Bintang",62],[54,"Al-Qamar","Bulan",55],[55,"Ar-Rahman","Yang Maha Pengasih",78],
[56,"Al-Waqi'ah","Hari Kiamat",96],[57,"Al-Hadid","Besi",29],[58,"Al-Mujadalah","Gugatan",22],[59,"Al-Hasyr","Pengusiran",24],[60,"Al-Mumtahanah","Perempuan yang Diuji",13],
[61,"As-Saff","Barisan",14],[62,"Al-Jumu'ah","Jumat",11],[63,"Al-Munafiqun","Orang-Orang Munafik",11],[64,"At-Tagabun","Pengungkapan Kesalahan",18],[65,"At-Talaq","Talak",12],
[66,"At-Tahrim","Pengharaman",12],[67,"Al-Mulk","Kerajaan",30],[68,"Al-Qalam","Pena",52],[69,"Al-Haqqah","Hari Kiamat",52],[70,"Al-Ma'arij","Tempat Naik",44],
[71,"Nuh","Nuh",28],[72,"Al-Jinn","Jin",28],[73,"Al-Muzzammil","Orang yang Berselimut",20],[74,"Al-Muddassir","Orang yang Berkemul",56],[75,"Al-Qiyamah","Hari Kiamat",40],
[76,"Al-Insan","Manusia",31],[77,"Al-Mursalat","Malaikat yang Diutus",50],[78,"An-Naba'","Berita Besar",40],[79,"An-Nazi'at","Malaikat yang Mencabut",46],[80,"'Abasa","Bermuka Masam",42],
[81,"At-Takwir","Penggulungan",29],[82,"Al-Infitar","Terbelah",19],[83,"Al-Mutaffifin","Orang-Orang Curang",36],[84,"Al-Insyiqaq","Terbelah",25],[85,"Al-Buruj","Gugusan Bintang",22],
[86,"At-Tariq","Yang Datang pada Malam Hari",17],[87,"Al-A'la","Yang Mahatinggi",19],[88,"Al-Gasyiyah","Hari Kiamat",26],[89,"Al-Fajr","Fajar",30],[90,"Al-Balad","Negeri",20],
[91,"Asy-Syams","Matahari",15],[92,"Al-Lail","Malam",21],[93,"Ad-Duha","Duha",11],[94,"Asy-Syarh","Lapang",8],[95,"At-Tin","Buah Tin",8],
[96,"Al-'Alaq","Segumpal Darah",19],[97,"Al-Qadr","Kemuliaan",5],[98,"Al-Bayyinah","Bukti Nyata",8],[99,"Az-Zalzalah","Guncangan",8],[100,"Al-'Adiyat","Kuda yang Berlari Kencang",11],
[101,"Al-Qari'ah","Hari Kiamat",11],[102,"At-Takasur","Bermegah-megahan",8],[103,"Al-'Asr","Masa",3],[104,"Al-Humazah","Pengumpat",9],[105,"Al-Fil","Gajah",5],
[106,"Quraisy","Suku Quraisy",4],[107,"Al-Ma'un","Barang yang Berguna",7],[108,"Al-Kausar","Nikmat yang Berlimpah",3],[109,"Al-Kafirun","Orang-Orang Kafir",6],[110,"An-Nasr","Pertolongan",3],
[111,"Al-Lahab","Gejolak Api",5],[112,"Al-Ikhlas","Ikhlas",4],[113,"Al-Falaq","Subuh",5],[114,"An-Nas","Manusia",6]
].map(([n,latin,arti,ayat])=>({n,latin,arti,ayat}));
/* Start of each juz (surah, ayah) — standard division; replaced by the source's juz field once text is loaded. */
const JUZ_START=[[1,1],[2,142],[2,253],[3,93],[4,24],[4,148],[5,83],[6,111],[7,88],[8,41],[9,93],[11,6],[12,53],[15,1],[17,1],[18,75],[21,1],[23,1],[25,21],[27,56],[29,46],[33,31],[36,28],[39,32],[41,47],[46,1],[51,31],[58,1],[67,1],[78,1]];
/* Priority surahs for hafalan (in this learning order) */
const HAFALAN_ORDER=[1,112,113,114,108,103,105,106,107,109,110,111,97,99,100,101,102,104,93,94,95,96,98,87,88,89,90,91,92,78];

/* ---------- Doa library ----------
   kind "quran": the Arabic text is NOT stored here; it is shown from the Kemenag Qur'an data for the given ayah(s).
   kind "hadis": Arabic text with the hadith reference. status "perlu-cek" = please confirm against the cited book before teaching
   (parents can mark it as checked in Mode Orang Tua). Translations are meaning-based (terjemahan makna). */
const DOA=[
 {id:"tidur",icon:"🌙",judul:"Doa sebelum tidur",kat:"Tidur",kind:"hadis",ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",lat:"Bismikallāhumma amūtu wa aḥyā",arti:"Dengan nama-Mu ya Allah, aku mati dan aku hidup.",ref:"HR. al-Bukhari no. 6324 (dari Hudzaifah r.a.)",status:"perlu-cek"},
 {id:"bangun",icon:"☀️",judul:"Doa bangun tidur",kat:"Tidur",kind:"hadis",ar:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",lat:"Alḥamdu lillāhil-ladzī aḥyānā ba‘da mā amātanā wa ilaihin-nusyūr",arti:"Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kami kembali.",ref:"HR. al-Bukhari no. 6324",status:"perlu-cek"},
 {id:"makan",icon:"🍽️",judul:"Doa sebelum makan",kat:"Makan",kind:"hadis",ar:"بِسْمِ اللَّهِ",lat:"Bismillāh",arti:"Dengan nama Allah. (Jika lupa di awal: Bismillāhi awwalahu wa ākhirahu — dengan nama Allah di awal dan di akhirnya.)",ref:"HR. Abu Dawud no. 3767, at-Tirmidzi no. 1858",status:"perlu-cek"},
 {id:"selesai-makan",icon:"🤲",judul:"Doa sesudah makan",kat:"Makan",kind:"hadis",ar:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",lat:"Alḥamdu lillāhil-ladzī aṭ‘amanī hādzā wa razaqanīhi min ghairi ḥaulin minnī wa lā quwwah",arti:"Segala puji bagi Allah yang telah memberiku makanan ini dan memberikannya kepadaku tanpa daya dan kekuatan dariku.",ref:"HR. Abu Dawud no. 4023, at-Tirmidzi no. 3458",status:"perlu-cek"},
 {id:"masuk-wc",icon:"🚪",judul:"Doa masuk kamar mandi",kat:"Kamar mandi",kind:"hadis",ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",lat:"Allāhumma innī a‘ūdzu bika minal-khubutsi wal-khabā’its",arti:"Ya Allah, aku berlindung kepada-Mu dari setan laki-laki dan setan perempuan.",ref:"HR. al-Bukhari no. 142, Muslim no. 375",status:"perlu-cek"},
 {id:"keluar-wc",icon:"✨",judul:"Doa keluar kamar mandi",kat:"Kamar mandi",kind:"hadis",ar:"غُفْرَانَكَ",lat:"Ghufrānak",arti:"Aku memohon ampunan-Mu.",ref:"HR. Abu Dawud no. 30, at-Tirmidzi no. 7",status:"perlu-cek"},
 {id:"keluar-rumah",icon:"🏡",judul:"Doa keluar rumah",kat:"Rumah",kind:"hadis",ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",lat:"Bismillāhi tawakkaltu ‘alallāh, lā ḥaula wa lā quwwata illā billāh",arti:"Dengan nama Allah, aku bertawakal kepada Allah. Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah.",ref:"HR. Abu Dawud no. 5095, at-Tirmidzi no. 3426",status:"perlu-cek"},
 {id:"masuk-rumah",icon:"🏠",judul:"Doa masuk rumah",kat:"Rumah",kind:"umum",ar:"بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",lat:"Bismillāhi walajnā wa bismillāhi kharajnā wa ‘alallāhi rabbinā tawakkalnā",arti:"Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan kepada Allah Tuhan kami kami bertawakal.",ref:"HR. Abu Dawud no. 5096 — sebagian ulama menilai sanadnya lemah; umum diajarkan. Mengucapkan salam saat masuk rumah juga dianjurkan (QS. An-Nur: 61).",status:"perlu-cek"},
 {id:"masuk-masjid",icon:"🕌",judul:"Doa masuk masjid",kat:"Masjid",kind:"hadis",ar:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",lat:"Allāhummaftaḥ lī abwāba raḥmatik",arti:"Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",ref:"HR. Muslim no. 713",status:"perlu-cek"},
 {id:"keluar-masjid",icon:"🌿",judul:"Doa keluar masjid",kat:"Masjid",kind:"hadis",ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",lat:"Allāhumma innī as’aluka min faḍlik",arti:"Ya Allah, sesungguhnya aku memohon karunia-Mu.",ref:"HR. Muslim no. 713",status:"perlu-cek"},
 {id:"bersin",icon:"🤧",judul:"Ketika bersin",kat:"Sehari-hari",kind:"hadis",ar:"الْحَمْدُ لِلَّهِ",lat:"Alḥamdulillāh",arti:"Segala puji bagi Allah. Yang mendengar menjawab: Yarḥamukallāh (semoga Allah merahmatimu). Lalu yang bersin menjawab: Yahdīkumullāhu wa yuṣliḥu bālakum (semoga Allah memberimu petunjuk dan memperbaiki keadaanmu).",ref:"HR. al-Bukhari no. 6224",status:"perlu-cek"},
 {id:"cermin",icon:"🪞",judul:"Ketika bercermin",kat:"Sehari-hari",kind:"hadis",ar:"اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",lat:"Allāhumma anta ḥassanta khalqī fa ḥassin khuluqī",arti:"Ya Allah, Engkau telah membaguskan rupaku, maka baguskanlah akhlakku.",ref:"HR. Ahmad (Musnad, dari Ibnu Mas‘ud r.a.)",status:"perlu-cek"},
 {id:"ilmu",icon:"📚",judul:"Memohon ilmu yang bermanfaat",kat:"Belajar",kind:"hadis",ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",lat:"Allāhumma innī as’aluka ‘ilman nāfi‘an wa rizqan ṭayyiban wa ‘amalan mutaqabbalā",arti:"Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.",ref:"HR. Ibnu Majah no. 925",status:"perlu-cek"},
 {id:"belajar",icon:"✏️",judul:"Doa sebelum belajar",kat:"Belajar",kind:"quran",q:[[20,114]],catatan:"Doa “Rabbi zidnī ‘ilmā” (Ya Tuhanku, tambahkanlah ilmu kepadaku) ada di bagian akhir ayat ini.",ref:"QS. Taha: 114"},
 {id:"orang-tua",icon:"💗",judul:"Doa untuk kedua orang tua",kat:"Keluarga",kind:"quran",q:[[17,24]],catatan:"Doa untuk ayah dan ibu ada di bagian akhir ayat ini.",ref:"QS. Al-Isra’: 24"},
 {id:"orang-tua-2",icon:"👨‍👩‍👧",judul:"Doa untuk diri, orang tua, dan orang beriman",kat:"Keluarga",kind:"quran",q:[[14,41]],ref:"QS. Ibrahim: 41"},
 {id:"kebaikan",icon:"🌈",judul:"Doa kebaikan dunia dan akhirat",kat:"Sehari-hari",kind:"quran",q:[[2,201]],ref:"QS. Al-Baqarah: 201"},
 {id:"kendaraan",icon:"🚗",judul:"Doa naik kendaraan / bepergian",kat:"Bepergian",kind:"quran",q:[[43,13],[43,14]],catatan:"Bacaan “Subḥānal-ladzī sakhkhara lanā hādzā…” ada di ayat 13 (bagian akhir) dan ayat 14.",ref:"QS. Az-Zukhruf: 13–14"}
];

/* ---------- Iqra ----------
   No Iqra pages are bundled. Materials must come from a permitted source and are imported by a parent (Mode Orang Tua → Iqra). */
const IQRA_SOURCE={name:"iqraonline.com",url:"https://iqraonline.com/"};

/* ---------- Avatar options ---------- */
const AV={
 skin:["#FDE3CF","#F6CFAE","#E8B48A","#D29A6C","#A8704A","#7A4E33"],
 face:["bulat","oval","hati"],
 eyes:["bulat","senyum","berbinar"],
 mouth:["senyum","tertawa","manis"],
 cheek:["#FFB7C5","#FFC9A8","none"],
 hairStyle:["pendek","panjang lurus","panjang bergelombang","kuncir dua","kuncir kuda"],
 hairColor:["#2B1B14","#5A3825","#8A5A3B","#C08A52","#1F1F2E"],
 hijab:["tanpa","sederhana","bertingkat","dengan bros"],
 hijabColor:["#F7B6C8","#C8B6F2","#BDE7D6","#FFF1DC","#F2D38F","#FFFFFF","#9EC9F0"],
 outfit:["dress","gamis","atasan & rok","piyama","baju mengaji"],
 outfitColor:["#F7B6C8","#C8B6F2","#BDE7D6","#FFE7B8","#9EC9F0","#FFFFFF"],
 pattern:["polos","bunga","bintang","bulan"],
 acc:["tanpa","jepit","pita","mahkota bunga"],
 bag:["tanpa","tas mengaji","mushaf mini"],
 shoes:["sepatu","sandal"],
 bg:["taman","sajadah","langit malam","masjid"]
};
const UNLOCKS=[{key:"acc",val:"mahkota bunga",need:"little-reader",label:"Mahkota bunga"},{key:"pattern",val:"bulan",need:"murajaah-star",label:"Motif bulan"},{key:"bg",val:"langit malam",need:"little-hafizah",label:"Latar langit malam"}];
