# Kode yang Rapi dan Folder yang Teratur

Kode dibaca jauh lebih sering daripada ditulis: oleh kamu sendiri minggu depan,
oleh reviewer, dan oleh pewawancara yang membuka GitHub-mu. Kode yang rapi bukan
soal gaya. Kode yang rapi lebih mudah dicari bug-nya, lebih mudah diubah, dan
lebih mudah dijelaskan.

Latihan untuk materi ini: [Latihan Kode Rapi](../materi-praktikum/02-latihan-kode-rapi/README.md).
Tempat kamu menulis kode sehari-hari: [latihan-saya](../../latihan-saya/README.md).

---

## 1. Ciri kode spaghetti dan obatnya

| Gejala | Kenapa buruk | Obat |
|---|---|---|
| Nama `d`, `t`, `x2`, `data1` | harus menebak isinya | nama yang menjelaskan (bagian 2.1) |
| Satu fungsi 100 baris | tidak bisa dipahami sekaligus, sulit dites | satu fungsi satu tugas (2.2) |
| `if` bersarang 4 tingkat | alur sulit diikuti | guard clause / early return (2.3) |
| Angka `0.11`, `75000` tersebar | tidak tahu artinya, sulit diubah | konstanta bernama (2.4) |
| Hitung dan `console.log` campur | tidak bisa dites, tidak bisa dipakai ulang | pisahkan logika dan tampilan (2.5) |
| Kode sama di-copy 3 tempat | ubah satu, lupa yang lain | fungsi bersama (2.6) |
| Error ditelan diam-diam | bug tidak ketahuan | tangani error dengan jelas (2.8) |

---

## 2. Sepuluh aturan

### 2.1 Nama yang menjelaskan

- Variabel = kata benda: `daftarMahasiswa`, `totalBayar`.
- Fungsi = kata kerja: `hitungDiskon()`, `ambilUser()`.
- Boolean = pertanyaan ya/tidak: `sudahLunas`, `isActive`, `hasError`.
- Array = jamak: `users`, `daftarPesanan`.
- Hindari singkatan kecuali yang umum (`id`, `url`, `i` di loop pendek).
- **Pilih satu bahasa** untuk nama, Indonesia atau Inggris, lalu konsisten di
  satu proyek. Untuk proyek portofolio, bahasa Inggris lebih umum dipakai.

| Buruk | Baik |
|---|---|
| `let d = 0;` | `let diskon = 0;` |
| `function proses(k)` | `function hitungTotalBelanja(keranjang)` |
| `if (flag)` | `if (sudahLogin)` |
| `const arr = []` | `const pesananAktif = []` |

### 2.2 Satu fungsi, satu tugas

Kalau menjelaskan fungsimu butuh kata "dan" ("menghitung total **dan** mencetak
struk **dan** mengirim email"), pecah fungsinya. Pedoman kasar: kalau lebih dari
sekitar 20 baris atau tidak muat di layar, cek apakah bisa dipecah.

### 2.3 Guard clause: keluar lebih awal

Sebelum:

```js
function bisaCheckout(user, keranjang) {
  if (user) {
    if (user.terverifikasi) {
      if (keranjang.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

Sesudah (hasilnya sama untuk semua kasus):

```js
function bisaCheckout(user, keranjang) {
  if (!user) return false;
  if (!user.terverifikasi) return false;
  return keranjang.length > 0;
}
```

Tangani kasus gagal di atas, lalu sisanya adalah jalur utama tanpa sarang.

### 2.4 Tidak ada angka ajaib

```js
// Buruk: 0.11 itu apa? kalau pajak naik, cari di mana saja?
const total = subtotal + subtotal * 0.11;

// Baik
const TARIF_PAJAK = 0.11;
const total = subtotal + subtotal * TARIF_PAJAK;
```

Konstanta ditulis `HURUF_BESAR_DENGAN_GARIS_BAWAH` dan dikumpulkan di atas file
atau di file `config`.

### 2.5 Pisahkan hitungan dari tampilan

Fungsi yang **menghitung** sebaiknya mengembalikan nilai (`return`), bukan
langsung `console.log` atau mengubah DOM. Bagian yang menampilkan dibuat terpisah.
Manfaatnya: fungsi hitung bisa dites, dan bisa dipakai ulang di CLI, API, maupun
React.

### 2.6 Jangan ulang diri, tapi jangan terburu-buru

Kode yang sama muncul tiga kali? Jadikan fungsi. Baru muncul dua kali dan
bentuknya mungkin berbeda nanti? Biarkan dulu. Abstraksi yang salah lebih mahal
daripada sedikit duplikasi.

### 2.7 Komentar menjelaskan *kenapa*, bukan *apa*

```js
// Buruk: komentar mengulang kodenya
// tambah 1 ke i
i++;

// Baik: menjelaskan alasan yang tidak terlihat dari kode
// Tanggal dari API dalam UTC, jadi dikonversi ke WIB sebelum dibandingkan
const tanggalLokal = keWib(pesanan.createdAt);
```

Kalau butuh komentar untuk menjelaskan *apa* yang dilakukan kode, biasanya nama
variabel atau fungsinya yang perlu diperbaiki.

### 2.8 Error ditangani, bukan ditelan

```js
// Buruk: error hilang, kamu tidak pernah tahu ada masalah
try { simpan(data); } catch (e) {}

// Baik: catat, lalu kembalikan pesan yang jelas
try {
  simpan(data);
} catch (error) {
  console.error("Gagal menyimpan pesanan:", error.message);
  throw error;
}
```

### 2.9 `const` dulu, dan jangan ubah data diam-diam

Pakai `const` secara default, `let` hanya kalau nilainya memang berubah, dan
jangan pakai `var`. Untuk array/object, buat salinan baru (`map`, `filter`,
`[...arr]`, `{ ...obj }`) daripada mengubah aslinya, supaya fungsi lain yang
memakai data yang sama tidak ikut berubah tanpa disadari.

### 2.10 Biar alat yang merapikan format

- **Prettier**: merapikan spasi, indentasi, tanda kutip otomatis. Pasang ekstensi
  Prettier di VS Code dan aktifkan *Format On Save*. Konfigurasinya sudah ada di
  `latihan-saya/.prettierrc.json`.
- **ESLint**: menemukan kesalahan seperti variabel tidak terpakai atau `==` yang
  seharusnya `===`. Dipasang per proyek mulai Fase 3 dengan
  `npm init @eslint/config@latest`.

Dengan alat ini, kamu tidak perlu berdebat soal titik koma. Fokus ke nama dan
struktur.

---

## 3. Contoh utuh: sebelum dan sesudah

Program menghitung rata-rata dan nilai huruf mahasiswa. Kedua versi menghasilkan
output yang **persis sama**.

**Sebelum** — jalan, tapi spaghetti:

```js
var d = [["Andi", 85, 90, 78], ["Budi", 60, 55, 70], ["Citra", 95, 88, 92], ["Dewi", 40, 65, 50]];
var r = [];
for (var i = 0; i < d.length; i++) {
  var t = 0;
  for (var j = 1; j < d[i].length; j++) { t = t + d[i][j]; }
  var a = t / (d[i].length - 1);
  if (a >= 85) { r.push(d[i][0] + ": " + a.toFixed(1) + " A"); } else {
    if (a >= 70) { r.push(d[i][0] + ": " + a.toFixed(1) + " B"); } else {
      if (a >= 55) { r.push(d[i][0] + ": " + a.toFixed(1) + " C"); } else { r.push(d[i][0] + ": " + a.toFixed(1) + " D"); }
    }
  }
}
var l = 0;
for (var k = 0; k < d.length; k++) { var t2 = 0; for (var m = 1; m < d[k].length; m++) { t2 += d[k][m]; } if (t2 / (d[k].length - 1) >= 70) l++; }
console.log(r.join("\n"));
console.log("Lulus: " + l + " dari " + d.length);
```

Masalahnya: nama satu huruf, data dalam array tanpa label (`d[i][0]` itu apa?),
rata-rata dihitung dua kali dengan dua loop berbeda, `if` bersarang tiga tingkat,
dan teks output diulang empat kali.

**Sesudah**:

```js
const BATAS_LULUS = 70;
const SKALA_HURUF = [
  { minimal: 85, huruf: "A" },
  { minimal: 70, huruf: "B" },
  { minimal: 55, huruf: "C" },
  { minimal: 0, huruf: "D" },
];

const daftarMahasiswa = [
  { nama: "Andi", nilai: [85, 90, 78] },
  { nama: "Budi", nilai: [60, 55, 70] },
  { nama: "Citra", nilai: [95, 88, 92] },
  { nama: "Dewi", nilai: [40, 65, 50] },
];

function hitungRataRata(angka) {
  const total = angka.reduce((jumlah, n) => jumlah + n, 0);
  return total / angka.length;
}

function tentukanHuruf(rataRata) {
  return SKALA_HURUF.find((skala) => rataRata >= skala.minimal).huruf;
}

function buatRapor(mahasiswa) {
  return mahasiswa.map(({ nama, nilai }) => {
    const rataRata = hitungRataRata(nilai);
    return {
      nama,
      rataRata,
      huruf: tentukanHuruf(rataRata),
      lulus: rataRata >= BATAS_LULUS,
    };
  });
}

function cetakRapor(rapor) {
  for (const { nama, rataRata, huruf } of rapor) {
    console.log(`${nama}: ${rataRata.toFixed(1)} ${huruf}`);
  }
  const jumlahLulus = rapor.filter((baris) => baris.lulus).length;
  console.log(`Lulus: ${jumlahLulus} dari ${rapor.length}`);
}

cetakRapor(buatRapor(daftarMahasiswa));
```

Output kedua versi:

```text
Andi: 84.3 B
Budi: 61.7 C
Citra: 91.7 A
Dewi: 51.7 D
Lulus: 2 dari 4
```

Yang berubah:

- Data diberi label (`{ nama, nilai }`), bukan posisi array.
- Batas nilai jadi data (`SKALA_HURUF`), bukan `if` bersarang. Menambah nilai
  "E" cukup menambah satu baris.
- Rata-rata dihitung di satu tempat (`hitungRataRata`).
- Hitungan (`buatRapor`) terpisah dari tampilan (`cetakRapor`).

Urutan kerja yang sehat: **buat jalan dulu → buat benar → baru buat rapi**.
Jangan memaksakan rapi sejak baris pertama, tapi jangan berhenti sebelum rapi.

---

## 4. Struktur folder

Folder yang rapi menjawab pertanyaan "kode untuk X ada di mana?" tanpa perlu
mencari.

### 4.1 Latihan harian

Semua latihanmu ditulis di `latihan-saya/`, bukan di dalam folder `LEVEL-*`.
Folder kurikulum tetap bersih sebagai bahan, folder latihan berisi hasil kerjamu.
Strukturnya dijelaskan di [README latihan-saya](../../latihan-saya/README.md).

### 4.2 API Express (mulai Minggu 9)

```text
api-catatan/
├── src/
│   ├── app.js              ← membuat app Express, memasang middleware + routes
│   ├── server.js           ← hanya app.listen(); dipisah supaya app bisa dites
│   ├── routes/
│   │   └── catatan.routes.js      ← peta URL ke controller
│   ├── controllers/
│   │   └── catatan.controller.js  ← baca req, panggil service, kirim res
│   ├── services/
│   │   └── catatan.service.js     ← aturan bisnis, tidak kenal req/res
│   ├── db/
│   │   ├── pool.js                ← koneksi database
│   │   └── catatan.repository.js  ← query SQL
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── error-handler.js
│   └── utils/
├── .env.example            ← daftar variabel environment tanpa nilai rahasia
├── .gitignore              ← minimal: node_modules, .env
├── package.json
└── README.md
```

Alur satu request:

```text
request → routes → controller → service → repository → database
                         ↓
response ←───────── controller (status code + JSON)
```

| Lapisan | Boleh | Tidak boleh |
|---|---|---|
| routes | menentukan URL dan middleware | berisi logika |
| controller | membaca `req`, memanggil service, mengirim `res` | menulis SQL |
| service | aturan bisnis ("deadline minimal 14 hari") | menyentuh `req`/`res` |
| repository | query SQL | aturan bisnis |

Untuk aplikasi kecil, service dan repository boleh digabung dulu. Yang penting
**logika tidak menumpuk di file routes**.

### 4.3 Aplikasi React dengan Vite (mulai Minggu 12)

```text
web-catatan/
├── src/
│   ├── main.jsx            ← titik masuk
│   ├── App.jsx             ← router
│   ├── pages/              ← satu file per halaman, mengambil data
│   │   ├── CatatanListPage.jsx
│   │   └── LoginPage.jsx
│   ├── components/         ← potongan UI yang dipakai ulang, menerima props
│   │   ├── CatatanCard.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/              ← custom hook, misalnya useCatatan.js
│   ├── api/                ← semua fetch ke backend di satu tempat
│   │   └── catatan.api.js
│   └── utils/
├── .env.example
└── package.json
```

Aturan sederhana: **pages mengambil data, components menampilkan data**. Fetch
tidak ditulis di sembarang komponen, tapi lewat `api/`.

### 4.4 Proyek portofolio (Minggu 15–18)

```text
nama-proyek/
├── server/       ← struktur 4.2
├── client/       ← struktur 4.3
├── docs/
│   ├── prd.md
│   ├── erd.md
│   └── api.md
├── README.md     ← screenshot, link live, cara menjalankan, keputusan teknis
└── .gitignore
```

Folder `docs/` berisi spesifikasi yang kamu tulis di Minggu 15 dengan format
studi kasus [membaca dokumen](05-membaca-dokumen-teknis.md).

### 4.5 Penamaan file dan folder

| Jenis | Format | Contoh |
|---|---|---|
| file JS biasa | kebab-case | `hitung-diskon.js`, `catatan.service.js` |
| komponen React | PascalCase | `CatatanCard.jsx` |
| latihan berurutan | nomor dua digit + nama soal | `03-fizzbuzz.js` |
| folder | kebab-case, huruf kecil | `minggu-03`, `api-catatan` |

Hindari spasi, huruf besar-kecil campur di nama folder, dan nama seperti
`baru.js`, `fix-final2.js`, atau `test123`.

---

## 5. Git yang rapi

- **Commit kecil**: satu commit = satu perubahan yang bisa dijelaskan dalam satu
  kalimat.
- **Format pesan**: `jenis: ringkasan`. Jenis yang dipakai:
  `feat` (fitur baru), `fix` (perbaikan bug), `refactor` (rapikan tanpa mengubah
  perilaku), `docs` (dokumentasi), `test`, `chore` (urusan lain).

```text
feat: tambah endpoint POST /catatan
fix: validasi judul kosong mengembalikan 400
refactor: pisahkan query catatan ke repository
docs: catat sesi minggu 09
```

Hindari pesan seperti `update`, `fix bug`, atau `asdf`. Riwayat commit adalah
bukti cara kerjamu yang bisa dilihat pewawancara.

---

## 6. Checklist sebelum commit

- [ ] Kode jalan dan sudah dicoba dengan input aneh (kosong, salah tipe, batas)
- [ ] Nama variabel dan fungsi bisa dipahami tanpa komentar
- [ ] Tidak ada `console.log` sisa debugging
- [ ] Tidak ada kode yang dikomentari "jaga-jaga" (riwayatnya sudah ada di Git)
- [ ] Tidak ada angka ajaib
- [ ] Sudah diformat Prettier
- [ ] Tidak ada `.env`, password, atau token yang ikut ter-commit
- [ ] Pesan commit mengikuti format `jenis: ringkasan`
