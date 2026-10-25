# Little Hafizah 🌙 — My Little Steps to the Qur'an

Aplikasi belajar Iqra, membaca, menghafal, dan murajaah Al-Qur'an untuk anak perempuan (3–12 tahun).
Berjalan di laptop, tablet, dan ponsel, dan bisa dipasang sebagai aplikasi (PWA). Tanpa iklan, tanpa akun, tanpa chat.

## Isi folder (hanya 14 file)
```
index.html, style.css, data.js, core.js, app.js   → aplikasi
manifest.webmanifest, sw.js, icons/               → PWA (bisa dipasang & offline)
tools/ambil-quran-kemenag.mjs                    → opsional: simpan teks Kemenag ke data/quran/
data/quran/                                       → kosong (diisi oleh alat di atas, opsional)
```

## Pasang di GitHub Pages
1. Buat repository baru (Public), misalnya `little-hafizah`.
2. Klik **uploading an existing file**, seret **isi** folder ini, lalu **Commit changes**.
3. **Settings → Pages → Deploy from a branch → main → / (root) → Save.**
4. Buka `https://NAMA-AKUN.github.io/little-hafizah/`.
5. iPad/iPhone: buka di Safari → **Bagikan → Tambah ke Layar Utama**.

## Sumber konten (tidak ada yang dikarang)
| Konten | Sumber | Catatan |
|---|---|---|
| Teks Arab, latin, terjemahan | **Qur'an Kemenag** (quran.kemenag.go.id) | Dimuat saat surah dibuka, lalu disimpan di perangkat. Urutan: salinan di `data/quran/` → API Kemenag → salinan keluaran API Kemenag di github.com/dyazincahya/quran-json-kemenag. Teks ditampilkan apa adanya; aplikasi hanya memeriksa jumlah ayat. |
| Daftar surah & juz | `data.js` | Hanya nomor, nama Latin, arti, jumlah ayat (total 6.236) dan awal juz untuk navigasi. Tidak berisi teks ayat. |
| Audio tilawah | everyayah.com (per ayat) | Abu Bakr Asy-Syatri (qari di Qur'an Kemenag), Alafasy, Al-Husary, Al-Minshawi. Periksa ketentuan penggunaan sesuai kebutuhan Anda. |
| Audio qariah / suara perempuan | Belum tersedia | Orang tua dapat menambahkan sumber rekaman berizin (pola URL) di Mode Orang Tua → Pengaturan. |
| Suara pemandu | Suara perempuan bawaan perangkat | Hanya untuk instruksi dan motivasi; tidak pernah dipakai untuk ayat atau doa. |
| Iqra 1–6 | **Tidak disertakan** | Materi Iqra dilindungi hak cipta. Orang tua mengimpor halaman berizin (mis. sesuai ketentuan iqraonline.com) di Mode Orang Tua → Iqra. Tanpa impor, jilid tampil "Belum tersedia". |
| Doa dari Al-Qur'an | Qur'an Kemenag | Teks ayat dimuat dari sumber yang sama (QS 20:114, 17:24, 14:41, 2:201, 43:13–14). |
| Doa dari hadis | Ditulis dengan rujukan | Berlabel "Mohon dicek orang tua/guru" sampai dicentang di Mode Orang Tua → Doa. |
| Pelafalan doa | Rekaman Bunda/Ayah | Direkam di Mode Orang Tua → Rekaman; disimpan hanya di perangkat. |

**Agar teks Al-Qur'an tetap ada walau API Kemenag berubah atau menolak akses dari situs lain**, jalankan sekali (Node.js 18+):
```
node tools/ambil-quran-kemenag.mjs
```
Lalu unggah folder `data/quran/` (114 file) ke GitHub. Jika unggah lewat browser terasa berat, cukup lewati langkah ini: aplikasi tetap mengambil teks dari Kemenag saat dibuka, dan orang tua bisa menekan **Mode Orang Tua → Laporan & data → Simpan semua 114 surah untuk offline**.

## Fitur
- Membuat karakter (wajah, kulit, mata, senyum, rambut/hijab, pakaian, motif, aksesori, latar) dengan pratinjau langsung, dan bisa diganti di **My Character**.
- Dashboard: target harian, surah yang dihafal, bacaan terakhir, murajaah hari ini, waktu mengaji, kebun bunga, lencana, minggu ini.
- Al-Qur'an 114 surah / 30 juz: cari, favorit, sedang dihafal, belum selesai; mode ayat per ayat dan mode mushaf; mode fokus; audio per ayat, per surah, ulang 3×; tandai dibaca / hafalan; bookmark.
- Hafalan: Listen, Repeat, Read Along, Memorize, Recall, Review; ulang 1/3/5/10×; jeda menirukan; lanjut otomatis; penilaian diri anak ("masih perlu latihan" / "aku bisa").
- Murajaah: jadwal 1 → 3 → 7 → 14 → 30 hari; "masih sulit" kembali ke besok. Ini panduan latihan, bukan jaminan.
- Setoran: status **lancar** hanya diberikan orang tua/guru (Mode Orang Tua → Setoran hafalan). Tidak ada penilaian tajwid otomatis.
- Doa sehari-hari per kategori, dengan sumber dan status pengecekan.
- Perjalanan Khatam (taman → awan → langit berbintang), kalender, bintang, lencana, item karakter yang terbuka lewat lencana. Tidak ada penalti saat hari terlewat.
- Mode Orang Tua (PIN): progres, setoran, Iqra (impor, audio, konfirmasi naik jilid), cek doa, rekaman, pengaturan audio/hijab/pengingat istirahat/target, beberapa profil anak, laporan cetak/PDF, ekspor & pulihkan data.

## Privasi
Semua data (nama panggilan, karakter, progres, rekaman, halaman Iqra) disimpan **hanya di perangkat**. Tidak ada server, akun, iklan, pelacak, atau pengiriman data. PIN disimpan sebagai hash.

## Catatan teknis
Dibuat dengan HTML/CSS/JavaScript murni (tanpa proses build) agar bisa diunggah langsung lewat browser ke GitHub Pages. Data terpisah dari tampilan (`data.js`, `core.js`, `app.js`). Setelah memperbarui file, naikkan `VERSION` di `sw.js` (misalnya `lh-v2`).
