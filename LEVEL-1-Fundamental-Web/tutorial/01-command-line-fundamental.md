# Command Line Fundamental (Terminal / Command Prompt)

## 1. Apa itu Command Line?

**Command Line** (Terminal / Command Prompt / Shell) adalah cara mengontrol komputer menggunakan **teks/command**, bukan klik mouse.

```
GUI (Graphical User Interface)     → Klik-klik mouse
CLI (Command Line Interface)       → Ketik perintah teks
```

### Kenapa Harus Belajar Command Line?
```
1. Lebih cepat untuk tugas repetitif
2. Dibutuhkan untuk Git, Node.js, Python, dll
3. Bisa automasi tugas dengan script
4. Kontrol lebih presisi terhadap komputer
5. Skill wajib semua developer
```

---

## 2. Terminal di macOS (zsh/bash)

### Cara Membuka Terminal:
1. Tekan `Cmd + Space` → ketik "Terminal" → Enter
2. Atau cari di Applications → Utilities → Terminal

### Struktur Dasar Prompt:
```
MacBookPro:~ namauser$
│        │      │
│        │      └── nama user saat ini
│        └── nama komputer
└─────────────── direktori saat ini (tilde = home)
```

### Struktur Dasar Prompt (Linux):
```
username@hostname:~$ 
│        │       │
│        │       └── direktori saat ini
│        └── nama komputer
└─────────── nama user
```

---

## 3. Perintah Dasar Navigasi

### a. Melihat Direktori Saat Ini (pwd)
```bash
pwd        # Print Working Directory
```
**Contoh output:**
```
/Users/macbookpro/Documents/belajar-fullstack
```

### b. Melihat Isi Direktori (ls)
```bash
ls                    # Lihat file & folder
ls -l                 # Lihat detail (permission, size, date)
ls -a                 # Lihat termasuk file tersembunyi (hidden)
ls -la                # Gabungan: detail + tersembunyi
```
**Contoh output `ls -la`:**
```
drwxr-xr-x   5  macbookpro  staff   160 May 31 14:00 .
drwxr-xr-x   4  macbookpro  staff   128 May 31 13:30 ..
-rw-r--r--   1  macbookpro  staff  2048 May 31 14:00 README.md
-rw-r--r--   1  macbookpro  staff   512 May 31 13:45  .gitignore
drwxr-xr-x  12  macbookpro  staff   384 May 31 13:30 materi-teori
```

**Penjelasan kolom:**
```
drwxr-xr-x   5   macbookpro  staff   160  May 31 14:00  .
 │        │        │          │      │      │       │
 │        │        │          │      │      │       └── nama file/folder
 │        │        │          │      │      └── tanggal modifikasi
 │        │        │          │      └── ukuran (bytes)
 │        │        │          └── grup
 │        │        └── owner
 │        └── jumlah link
 └── tipe: d=directory, -=file
```

### c. Pindah Direktori (cd)
```bash
cd nama-folder           # masuk ke folder
cd ..                    # mundur 1 folder
cd ../..                 # mundur 2 folder
cd ~                     # ke home directory
cd /                     # ke root (folder paling atas di Mac)
cd Documents             # relatif dari posisi saat ini
cd /Users/macbookpro/Documents  # absolute path (path lengkap)
cd -                     # kembali ke direktori sebelumnya
```

**Contoh:**
```bash
# Dari home, masuk ke Documents
cd Documents

# Dari Documents, masuk ke belajar-fullstack
cd belajar-fullstack

# Cek lokasi
pwd
# Output: /Users/macbookpro/Documents/belajar-fullstack

# Mundur ke Documents
cd ..

# Langsung ke Documents dari mana saja
cd ~/Documents
```

---

## 4. Perintah untuk Membuat & Mengelola File/Folder

### a. Membuat Folder (mkdir)
```bash
mkdir nama-folder          # buat 1 folder
mkdir folder1 folder2      # buat banyak folder sekaligus
mkdir -p project/src/components   # buat folder bersarang (parent + child)
```

**Contoh:**
```bash
mkdir javascript-latihan
mkdir -p backend/{routes,controllers,models,middleware}
```

### b. Membuat File (touch)
```bash
touch index.html                 # buat file kosong
touch app.js style.css main.css  # buat banyak file sekaligus
touch README.md .gitignore       # termasuk file tersembunyi
```

### c. Melihat Isi File (cat)
```bash
cat nama-file.txt      # tampilkan seluruh isi file
cat file1.txt file2.txt   # gabung isi 2 file
```

### d. Menyalin File (cp)
```bash
cp source.txt destination.txt     # salin file
cp file1.txt file2.txt folder/   # salin banyak file ke folder
cp -r folder-sumber folder-tujuan    # salin folder beserta isinya
```

### e. Memindahkan / Mengubah Nama (mv)
```bash
mv old-name.txt new-name.txt     # rename file
mv file.txt folder/             # pindahkan file ke folder
mv file.txt folder/new-name.txt  # pindahkan + rename sekaligus
mv folder-sumber folder-tujuan  # pindahkan folder
```

### f. Menghapus (rm)
```bash
rm nama-file.txt              # hapus 1 file
rm file1.txt file2.txt        # hapus banyak file
rm -r folder/                 # hapus folder beserta isinya
rm -rf folder/               # paksa hapus folder (tanpa konfirmasi)
```

> ⚠️ **PERHATIAN**: `rm -rf` HAPUS PERMANEN. Tidak ada trash bin. Benar-benar hilang!

---

## 5. Mencari & Menyaring Output

### a. Melihat File Secara Bertahap (head / tail)
```bash
head -n 20 file.txt    # tampilkan 20 baris pertama
tail -n 20 file.txt    # tampilkan 20 baris terakhir
tail -f log.txt        # monitor file secara real-time (follow)
```

**Contoh penggunaan `tail -f`:**
```bash
tail -f server.log   # pantau log server saat berjalan
```

### b. Mencari Teks dalam File (grep)
```bash
grep "keyword" file.txt           # cari baris yang mengandung keyword
grep -r "keyword" folder/         # cari di semua file dalam folder
grep -i "keyword" file.txt        # case-insensitive (huruf besar/kecil sama)
grep -n "keyword" file.txt        # tampilkan nomor baris
grep -v "keyword" file.txt        # tampilkan baris yang TIDAK mengandung keyword
```

**Contoh:**
```bash
grep -n "function" app.js      # Cari baris yang mengandung "function" di app.js
grep -r "TODO" ./src/          # Cari semua TODO di folder src
```

### c. Mengurutkan Output (sort)
```bash
sort file.txt            # urutkan abc
sort -r file.txt         # urutkan terbalik (z-a)
sort -n file.txt        # urutkan sebagai angka
```

### d. Mencari File (find)
```bash
find . -name "*.js"              # cari semua file .js
find . -name "README.md"        # cari file README.md
find . -type d -name "node_modules"  # cari folder node_modules
find . -size +100M              # cari file > 100MB
```

---

## 6. Pipes & Redirects (Menghubungkan Perintah)

### a. Pipe (|) — Output dari perintah A jadi input ke perintah B
```bash
# Contoh: lihat output ls yang panjang, pakai less biar bisa scroll
ls -la | less

# Contoh: cari dalam hasil ls
ls -la | grep ".js"

# Contoh: hitung jumlah file
ls | wc -l
```

### b. Redirect Output ke File (>)
```bash
# Simpan output ke file (timpa jika ada)
ls -la > daftar-file.txt

# Tambahkan ke file (append)
echo "Baris baru" >> daftar-file.txt

# Simpan hasil grep ke file
grep -n "function" app.js > hasil-cari.txt
```

---

## 7. Utility Commands

### a. wc (Word Count)
```bash
wc -l file.txt      # hitung jumlah baris
wc -w file.txt      # hitung jumlah kata
wc file.txt        # baris, kata, karakter
```

### b. du (Disk Usage)
```bash
du -sh folder/      # ukuran folder (human readable)
du -sh *            # ukuran semua item di direktori ini
```

### c. df (Disk Free)
```bash
df -h               # lihat sisa ruang disk (format mudah dibaca)
```

### d. uname (System Info)
```bash
uname -a            # info sistem lengkap
uname -r            # kernel version
```

---

## 8. Keyboard Shortcuts di Terminal

| Shortcut | Fungsi |
|---|---|
| `Ctrl + C` | Batalkan proses yang sedang jalan |
| `Ctrl + Z` | Suspend proses (pause) |
| `Ctrl + D` | End of file / keluar dari shell |
| `Ctrl + L` | Clear screen (sama seperti `clear`) |
| `Ctrl + A` | Pindah ke awal baris |
| `Ctrl + E` | Pindah ke akhir baris |
| `Ctrl + U` | Hapus seluruh baris |
| `Ctrl + K` | Hapus dari cursor ke akhir baris |
| `↑` / `↓` | Navigasi history command |
| `Tab` | Auto-complete nama file/folder |
| `Tab` (2x) | Tampilkan semua kemungkinan |

---

## 9. Environment Variables & Path

### Melihat Environment Variables:
```bash
env                # semua environment variable
echo $PATH         # lihat variable PATH
echo $HOME         # lihat home directory
echo $USER         # lihat username
```

### Membuat Alias (Shortcut Perintah):
```bash
# Buka file .zshrc (konfigurasi shell macOS)
nano ~/.zshrc

# Tambahkan alias
alias ll='ls -la'
alias gs='git status'
alias ..='cd ..'
alias ...='cd ../..'

# Simpan: Ctrl + O → Enter → Ctrl + X
```

### Mengatur PATH:
```bash
# Lihat PATH saat ini
echo $PATH

# Tambah folder ke PATH (sementara, hilang setelah terminal ditutup)
export PATH=$PATH:/folder/baru

# Tambah permanen → taruh di ~/.zshrc
export PATH=$PATH:/usr/local/bin
```

---

## 10. Menjalankan Program / Script

### Menjalankan File:
```bash
node app.js              # jalankan file JavaScript
python script.py         # jalankan file Python
php index.php            # jalankan file PHP
./program                # jalankan program binary
```

### Background Process:
```bash
node server.js &         # jalankan di background (&)
jobs                     # lihat proses background
fg                       # bring ke foreground
bg                       # resume process di background
```

### Melihat Proses:
```bash
ps aux                   # semua proses yang berjalan
ps aux | grep node       # cari proses node
kill PID                 # matikan proses by PID
kill -9 PID              # paksa matikan proses
```

---

## 11. Download dari Internet (curl / wget)

```bash
# Download file
curl -O https://example.com/file.zip

# Download dengan nama tertentu
curl -o myfile.zip https://example.com/file.zip

# wget (jika tersedia)
wget https://example.com/file.zip
```

---

## 12. Contoh Workflow Lengkap

### Workflow Membuat Project Baru:
```bash
# 1. Pindah ke direktori kerja
cd ~/Documents

# 2. Buat folder project baru
mkdir project-baru
cd project-baru

# 3. Buat file-file project
touch README.md index.html style.css app.js

# 4. Lihat struktur
ls -la

# 5. Lihat isi file
cat README.md
```

### Workflow Clone GitHub Repo:
```bash
# 1. Buka terminal di folder yang diinginkan
cd ~/Documents

# 2. Clone repo
git clone https://github.com/username/repo-name.git

# 3. Masuk ke folder repo
cd repo-name

# 4. Lihat isi
ls -la
```

---

## 13. Troubleshooting

### Masalah: "Command not found"
```
Penyebab: Perintah tidak ada atau belum di PATH
Solusi:
1. Cek ejaan perintah
2. Cek apakah software sudah terinstall
3. Cek apakah perlu install dengan brew/apt/npm
```

### Masalah: "Permission denied"
```
Penyebab: Tidak punya akses tulis
Solusi:
1. Gunakan sudo untuk sementara: sudo <perintah>
2. Atau ubah permission: chmod +x script.sh
3. Atau ubah owner: chown user:group file
```

### Masalah: "No such file or directory"
```
Penyebab: Folder/file tidak ada atau salah path
Solusi:
1. Cek path dengan pwd
2. Cek dengan ls
3. Gunakan Tab untuk auto-complete
```

---

## Ringkasan Perintah

```
Navigasi
pwd        → di mana saya sekarang?
ls         → ada apa di sini?
ls -la     → detail semua file + tersembunyi
cd         → masuk folder
cd ..      → mundur

File & Folder
mkdir      → buat folder
touch      → buat file kosong
cp         → salin
mv         → pindahkan / rename
rm         → hapus file
rm -rf     → hapus folder (paksa)

Cari & Baca
cat        → lihat isi file
grep       → cari teks dalam file
find       → cari file
head/tail  → lihat sebagian isi file
wc         → hitung baris/ kata

Lainnya
|          → piping (sambung perintah)
>          → simpan output ke file
env        → lihat environment variable
chmod      → ubah permission file
sudo       → jalankan sebagai superuser
```

---

**Lanjut ke:** `tutorial/02-git-github-fundamental.md` untuk belajar version control!

atau lanjut ke `software/01-visual-studio-code.md` untuk setup editor.
