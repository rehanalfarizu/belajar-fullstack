# CONTOH — Git Branching

## Contoh 1: Buat dan Pindah Branch

```bash
# Buat branch baru
$ git branch fitur-baru

# Lihat semua branch
$ git branch
  fitur-baru
* main

# Pindah ke branch baru
$ git checkout fitur-baru
Switched to branch 'fitur-baru'

# Lihat — sekarang di fitur-baru
$ git branch
* fitur-baru
  main
```

---

## Contoh 2: Buat + Pindah Sekaligus (Shortcut)

```bash
# Satu perintah: buat + langsung pindah
$ git checkout -b feature/dashboard
Switched to a new branch 'feature/dashboard'

# Atau di Git modern:
$ git switch -c feature/dashboard
Switched to a new branch 'feature/dashboard'
```

---

## Contoh 3: Merge Branch

```bash
# Di branch main, merge feature/dashboard
$ git checkout main
Switched to branch 'main'

$ git merge feature/dashboard
Updating a1b2c3d..d4e5f6g
Fast-forward
 dashboard.html | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 dashboard.html
```

---

## Contoh 4: Visualisasi Branch

```bash
# Lihat grafik branch
$ git log --oneline --graph --all
* d4e5f6g (HEAD -> main, origin/main) merge: fitur dashboard ke main
|\
| * c3b2a1f (feature/dashboard) feat: halaman dashboard
|/  
* a1b2c3d feat: README pertama
```

---

## Contoh 5: Hapus Branch

```bash
# Hapus branch yang sudah di-merge
$ git branch -d feature/dashboard
Deleted branch feature/dashboard (was c3b2a1f).

# Hapus branch yang BELUM di-merge (force)
$ git branch -D fitur-yang-belum-selesai
Deleted branch fitur-yang-belum-selesai (was e5f6g7h).
```

---

## Contoh 6: Workflow Tim Sederhana

```bash
# === ANDA ===
# Buat branch fitur baru
$ git checkout -b feature/tabel-harga
Switched to a new branch 'feature/tabel-harga'

# Edit & commit
$ cat > tabel.html << 'EOF'
<!DOCTYPE html>
<html>
<body>
  <h1>Daftar Harga</h1>
  <table>
    <tr><td>Produk A</td><td>Rp 10.000</td></tr>
  </table>
</body>
</html>
EOF

$ git add .
$ git commit -m "feat: halaman tabel harga"
$ git push -u origin feature/tabel-harga

# === TEMAN (di komputer mereka) ===
# Clone repo
$ git clone https://github.com/USERNAME/repo.git
$ cd repo

# Ambil branch teman
$ git fetch origin
$ git checkout -b feature/tabel-harga origin/feature/tabel-harga

# Review, lalu merge ke main mereka
$ git checkout main
$ git merge feature/tabel-harga
```
