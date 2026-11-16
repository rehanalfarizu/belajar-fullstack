# Fundamental Ilmu Komputer untuk Fullstack Developer

Tujuan modul ini bukan menghafal definisi. Tujuannya membangun model mental agar
kamu dapat menjelaskan apa yang terjadi dari tombol diklik sampai data tersimpan.

## 1. Data, bit, dan representasi

- Bit bernilai 0 atau 1; byte umumnya terdiri dari 8 bit.
- Angka, teks, gambar, dan instruksi program semuanya direpresentasikan sebagai
  data biner.
- Encoding memetakan karakter ke angka. Gunakan UTF-8 untuk web dan pahami bahwa
  jumlah karakter tidak selalu sama dengan jumlah byte.
- Integer memiliki rentang; floating point adalah aproksimasi. Untuk uang, pakai
  satuan terkecil berupa integer atau tipe desimal database.

Latihan: jelaskan mengapa `0.1 + 0.2 !== 0.3` di JavaScript dan buat strategi
menyimpan harga Rp10.500,75 tanpa kehilangan presisi.

## 2. CPU, memori, proses, dan thread

CPU mengeksekusi instruksi. RAM menyimpan data yang sedang dipakai dan jauh lebih
cepat daripada disk, tetapi bersifat sementara. Sistem operasi mengisolasi program
dalam proses. Satu proses dapat memiliki beberapa thread.

JavaScript di browser dan Node.js menjalankan kode pengguna terutama pada satu
event-loop thread. Operasi I/O dapat dikerjakan runtime/OS lalu callback-nya masuk
ke antrean. Ini menjelaskan mengapa I/O asynchronous efisien, tetapi loop CPU yang
berat tetap dapat memblokir aplikasi.

Latihan: prediksi urutan output `console.log`, Promise, dan `setTimeout`, kemudian
buktikan prediksi dengan menjalankan program.

## 3. File system dan proses

- Path absolut dimulai dari root; path relatif dihitung dari working directory.
- Permission membatasi read, write, dan execute.
- Environment variable membawa konfigurasi proses. Secret tidak boleh dimasukkan
  ke source code atau dikirim ke browser.
- Exit code `0` berarti sukses; nilai selain `0` berarti proses gagal.

## 4. Jaringan dari URL sampai response

Alur mental yang perlu dikuasai:

1. Browser memecah URL menjadi scheme, host, port, path, dan query.
2. DNS menerjemahkan nama host menjadi alamat IP.
3. Client membuat koneksi transport; HTTPS menambahkan TLS untuk autentikasi dan
   enkripsi.
4. HTTP mengirim method, path, headers, dan body.
5. Server memproses request, mengakses cache/database, lalu memberi status,
   headers, dan body.
6. Browser menerapkan cache, cookie, CORS, dan kebijakan keamanan sebelum
   JavaScript dapat memakai response.

Jangan menyamakan authentication, authorization, CORS, dan CSRF. Keempatnya
menjawab masalah berbeda.

## 5. Struktur data dan kompleksitas

| Struktur | Kekuatan utama | Contoh penggunaan |
|---|---|---|
| Array | Urutan dan akses indeks | daftar produk |
| Object/Map | Lookup berdasarkan key | user berdasarkan id |
| Set | Keunikan dan membership | role unik |
| Stack | LIFO | call stack, undo |
| Queue | FIFO | job/background task |
| Tree | Hierarki | DOM, kategori |
| Graph | Relasi umum | jaringan pertemanan |

Big-O menjelaskan pertumbuhan biaya ketika input membesar, bukan waktu pasti.
Bedakan `O(1)`, `O(log n)`, `O(n)`, `O(n log n)`, dan `O(n²)`. Selalu ukur setelah
memastikan algoritma benar; optimasi tanpa bukti sering memindahkan masalah.

## 6. Database dan konkurensi

Database memberi persistence, query, constraint, index, dan transaksi. Transaksi
menjaga sekumpulan operasi sebagai satu unit. Race condition terjadi ketika hasil
bergantung pada urutan operasi concurrent.

Contoh: dua request membeli stok terakhir. Pola `SELECT`, cek stok, lalu `UPDATE`
tanpa transaksi/locking dapat menjual stok dua kali. Constraint, atomic update,
transaction, dan isolation level adalah alat penyelesaiannya.

## Uji penguasaan

Kamu lulus modul bila mampu menggambar dan menjelaskan alur berikut tanpa catatan:

`klik UI → event handler → HTTP/TLS → route → service → SQL transaction → response → state UI`

Untuk setiap panah, sebutkan satu kegagalan yang mungkin terjadi, cara
mendeteksinya, dan cara memulihkannya.
