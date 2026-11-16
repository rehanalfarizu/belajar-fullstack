# 📦 Software 07 — GitHub Desktop & GUI Tools

## Apa itu GitHub Desktop?

**GitHub Desktop** = Aplikasi GUI untuk Git. Cocok untuk yang belum nyaman dengan command line.

```
GitHub Desktop = Visual interface untuk Git
├── Point-and-click (tanpa ketik command)
├── Visual branch management
├── Drag-and-drop staging
├── Built-in diff viewer
└── Seamless GitHub integration
```

---

## 1. Install GitHub Desktop

```bash
brew install --cask github
```

### Atau download dari:
```
https://desktop.github.com
```

---

## 2. Setup GitHub Desktop

### Langkah 1: Login ke GitHub
```
1. Buka GitHub Desktop
2. Klik "Sign in to GitHub.com"
3. Masukkan username & password (atau authorize via browser)
```

### Langkah 2: Configure Git
```
1. Klik menu: GitHub Desktop → Preferences
2. Tab "Git"
3. Isi:
   - Name: Muhammad Raihan Alfarizi
   - Email: muhammadraihanalfarizi@gmail.com
4. Klik "Save"
```

---

## 3. Clone Repository

### Dari GitHub.com:
```
1. Buka https://github.com/USERNAME/REPO-NAME
2. Klik tombol "Code" (green button)
3. Klik "Open with GitHub Desktop"
4. Pilih folder penyimpanan
5. Klik "Clone"
```

### Dari GitHub Desktop:
```
1. Klik menu: File → Clone Repository
2. Tab "GitHub.com"
3. Pilih repository dari list
4. Pilih local path (folder)
5. Klik "Clone"
```

### Dari URL:
```
1. File → Clone Repository
2. Tab "URL"
3. Masukkan: https://github.com/user/repo.git
4. Pilih folder
5. Klik "Clone"
```

---

## 4. Memahami Tampilan GitHub Desktop

```
┌──────────────────────────────────────────────────┐
│  [Branch: main ▼]        [Fetch] [Push]           │  ← Header
├──────────────────────────────────────────────────┤
│                                                   │
│  Changes              History                      │  ← Tab
│  ─────────────────────────────────────────────   │
│                                                   │
│  ▢ README.md  (+15, -3)                          │  ← Unstaged
│  ▢ index.js   (+25, -8)                          │  ← Unstaged
│                                                   │
│  ─────────────────────────────────────────────   │
│                                                   │
│  ▢ config.js    (+5, -2)                         │  ← Staged
│                                                   │
├──────────────────────────────────────────────────┤
│  Summary:_______________   [Commit to main]       │
│  Description:____________                             │
└──────────────────────────────────────────────────┘

AREA UTAMA:
┌─────────────────┬─────────────────────┐
│ Changes Tab     │ History Tab         │
│ = File yang     │ = Semua commit      │
│   berubah       │   yang sudah dibuat │
│                 │                     │
│ Unstaged        │ graph, pesan,       │
│ Staged          │ tanggal, author     │
└─────────────────┴─────────────────────┘
```

---

## 5. Workflow Dasar GitHub Desktop

### Step 1: Edit File
```
1. Buka repo di VS Code (File → Open Folder)
2. Edit file yang ingin diubah
3. Kembali ke GitHub Desktop → tab "Changes"
```

### Step 2: Stage Changes
```
1. Lihat list file yang berubah (Unstaged)
2. Centang file yang ingin di-commit (pindah ke Staged)
3. Atau klik "Stage All" (stage semua file)
```

### Step 3: Commit
```
1. Masukkan judul commit di field "Summary"
   Contoh: "feat: add user login page"
2. Opsional: masukkan deskripsi di field "Description"
3. Klik tombol "Commit to main"
```

### Step 4: Push
```
1. Klik "Push origin" di header
2. Commit akan di-push ke GitHub
3. Kalau remote belum di-set, klik "Publish repository"
```

---

## 6. Branch Management

### Buat Branch Baru:
```
1. Klik "Current branch" di header
2. Klik "New branch"
3. Masukkan nama branch
   Contoh: feature/user-auth
4. Klik "Create branch"
5. Branch otomatis switch
```

### Switch Branch:
```
1. Klik "Current branch"
2. Pilih branch dari list
3. Klik branch yang diinginkan
4. Klik "Switch branch"
```

### Merge Branch:
```
1. Pastikan di branch TARGET (contoh: main)
2. Menu: Branch → Merge into Current Branch
3. Pilih branch yang ingin di-merge
4. Klik "Merge into main"
```

### Resolve Conflict:
```
1. Kalau ada conflict, GitHub Desktop akan tampilkan
2. Klik file yang conflict
3. Pilih version yang ingin dipakai
4. Stage file → Commit
```

---

## 7. Pull (Update dari Remote)

```bash
# Manual: Klik "Fetch origin" → lalu "Pull origin"

# Atau:
# 1. Klik tab "History"
# 2. Lihat apakah ada commit baru dari remote
# 3. Klik "Pull origin"
```

---

## 8. History & Diff Viewer

### Lihat History:
```
1. Klik tab "History"
2. Setiap baris = 1 commit
3. Klik commit untuk lihat detail perubahan
```

### Lihat Diff (Perubahan):
```
1. Klik file di tab "Changes"
2. Panel kanan menampilkan:
   - Baris hijau = ditambahkan
   - Baris merah = dihapus
3. Klik "+" / "-" untuk toggle view
```

---

## 9. Revert (Undo Commit)

```
1. Klik tab "History"
2. Klik commit yang ingin di-undo
3. Menu: Branch → Revert on main
4. Commit baru akan dibuat (undo tanpa hapus history)
5. Push commit baru
```

---

## 10. Stash (Simpan Sementara)

```
1. Perubahan belum di-commit tapi perlu switch branch
2. Menu: Branch → Stash
3. Masukkan nama stash → "Stash"
4. Switch branch
5. Setelah selesai, Branch → "Restore stash"
```

---

## 11. Troubleshooting

### Error: "Authentication failed"

```
1. Preferences → Accounts
2. Klik "Sign out"
3. Sign in ulang
4. Pastikan GitHub credentials benar
```

### Error: "Please tell me who you are"

```
1. Preferences → Git
2. Isi Name & Email (harus sama dengan GitHub)
3. Klik "Save"
```

### Sync tidak bisa

```
1. Pastikan sudah login
2. Cek koneksi internet
3. Preferences → Accounts → reconnect
```

---

## 12. Git GUI Alternatives

### GitKraken:
```bash
brew install --cask gitkraken
```
- Full-featured GUI
- Support Git Flow
- Built-in merge tool

### Sourcetree (Atlassian):
```bash
brew install --cask sourcetree
```
- Gratis
- Visual branch management
- Git Flow integration

### GitHub CLI (Terminal, hybrid):
```bash
brew install gh
```

```bash
# Login
gh auth login

# Buat PR
gh pr create --title "feat: add auth" --body "Deskripsi"

# Review PR
gh pr view 1

# Checkout PR
gh pr checkout 1
```

---

## Checklist

```
✅ GitHub Desktop terinstall
✅ Login ke GitHub account
✅ Configure git name & email
✅ Clone repository
✅ Buat commit baru (stage + commit + push)
✅ Buat branch baru
✅ Switch branch
✅ Merge branch
✅ Revert commit
✅ Stash & restore
```

---

**Next:**
- Lanjut ke Software 08: Terminal & Shell Customization
- Atau ke Tutorial: Git Collaboration Workflow