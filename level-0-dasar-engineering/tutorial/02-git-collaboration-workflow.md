# Tutorial 02 — Git Collaboration Workflow

## Apa yang Akan Dipelajari?

Workflow Git untuk kolaborasi tim: branching, pull request, code review, dan merge.

```
GIT WORKFLOW DASAR:
┌────────┐    branch ┌─────────┐   PR    ┌────────┐
│ Feature │ ──────────→ │  Pull   │ ──────→ │ Main  │
│ Branch  │             │ Request │         │ (Prod) │
└────────┘             └─────────┘         └────────┘
 ↓
                         Code Review
                         + Approve
                         + Merge
```

---

## 1. Persiapan: Fork& Clone

### Fork Repository (di GitHub):

```
1. Buka repo di GitHub
2. Klik tombol "Fork" (kanan atas)
3. Pilih akun kamu
4. Repo sekarang ada di github.com/USERNAME/repo
```

### Clone Repository:

```bash
# Clone repo kamu (fork)
git clone https://github.com/USERNAME/repo.git

# Tambah remote upstream (repo asli)
cd repo
git remote add upstream https://github.com/ORIGINAL_OWNER/repo.git

# Cek remote
git remote -v
# Output:
# origin    https://github.com/USERNAME/repo.git (fetch)
# origin    https://github.com/USERNAME/repo.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/repo.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/repo.git (push)
```

---

## 2. Workflow: Feature Branch

### Diagram Alur Kerja:

```
main ──────────────────────────────────────────────
         ↘
          feature/login ────────────────────→ [PR] ──→ main
          (commit) (commit) (commit)
```

### Step-by-Step:

```bash
# 1. Pastikan di main + update terbaru
git checkout main
git pull upstream main

# 2. Buat branch baru
git checkout -b feature/user-login

# Atau dengan GitHub CLI:
gh pr create --base main --head feature/user-login

# 3. Edit kode
code .

# 4. Commit perubahan
git add .
git commit -m "feat(auth): add login form"

# 5. Push ke remote
git push -u origin feature/user-login
```

---

## 3. Pull Request (via GitHub)

### Buat PR:

```
1. Buka repo di GitHub
2. Akan muncul banner "Compare & pull request"
3. Klik "Compare & pull request"
4. Isi:
   - Base: main (branch tujuan)
   - Compare: feature/user-login (branch kamu)
   - Title: feat(auth): add login form
   - Description:
     ```markdown
     ## Apa yang diubah?
     - Tambah login form
     - Tambah validation
     - Tambah JWT auth

     ## Screenshot (jika ada UI)
     ![login-form](https://example.com/login-form.png)

     ## Testing
     - [ ] Test login dengan credential benar
     - [ ] Test login dengan password salah
     - [ ] Test redirect setelah login
     ```
5. Klik "Create pull request"
```

### PR Template (Buat Otomatis):

Buat file `.github/pull_request_template.md` di repo:

```markdown
## Summary
<!-- 1-3 kalimat: apa yang diubah dan mengapa -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
<!-- Checklist testing yang sudah dilakukan -->
- [ ] Unit test passed
- [ ] Integration test passed
- [ ] Manual test passed

## Screenshots (jika ada UI)
<!-- Paste screenshot di sini -->
```

---

## 4. Code Review

### Sebagai Reviewer:

```
1. Buka PR di GitHub
2. Baca deskripsi & perubahan
3. Klik tab "Files changed"
4. Review baris per baris:
   - Klik + di baris kode untuk kasih comment
   - Tulis feedback yang spesifik & actionable
5. Klik "Review" → pilih:
   - Comment     → kasih feedback tanpa approve
   - Approve    → setuju, bisa di-merge
   - Request changes → minta revisi dulu
```

### Comment Style:

```
❌ BAD: "Kode ini jelek"
✅ GOOD: "Kode ini bisa lebih readable kalau pakai early return:
   if (!user) return res.status(404).json({ error: 'Not found' })
   // rest of the code"
```

### Sebagai Author:

```
1. Baca semua comment reviewer
2. Reply/resolve comment
3. Push perbaikan:
   git add .
   git commit --amend
   git push --force-with-lease
4. Pastikan semua "Request changes" resolved
5. Minta review ulang
```

---

## 5. Merge PR

### Merge Options:

```
Squash and merge (REKOMENDASI untuk feature branch):
├── Commit history di main tetap bersih
├── Semua commit di branch jadi 1 commit di main
└── Commit message dari PR title

Merge commit:
├── Semua commit history dipertahankan
└── Merge commit otomatis dibuat

Rebase and merge:
├── Setiap commit di-apply satu per satu
├── History sangat bersih
└── Tidak ada merge commit
```

### Langkah Merge:

```
1. Pastikan semua review approved
2. Pastikan CI/CD tests passed (semua checklist hijau)
3. Klik "Squash and merge"
4. Edit commit message kalau perlu
5. Klik "Confirm squash and merge"
6. Branch di-merge ke main
7. Hapus branch (otomatis atau manual)
```

---

## 6. Sync Fork dengan Upstream

```bash
# 1. Checkout ke main
git checkout main

# 2. Fetch upstream
git fetch upstream

# 3. Merge perubahan upstream ke main
git merge upstream/main

# 4. Push ke origin (fork kamu)
git push origin main

# 5. Update feature branch dengan main terbaru
git checkout feature/user-login
git merge main
```

---

## 7. GitHub CLI (gh)

GitHub CLI = command line tool untuk GitHub operations.

### Install:

```bash
brew install gh
```

### Login:

```bash
gh auth login
# Pilih: GitHub.com → HTTPS → Yes → Enter credentials
```

### Common Commands:

```bash
# Clone repo
gh repo clone USERNAME/repo

# List PR
gh pr list

# Buat PR
gh pr create --title "feat: add login" --body "Deskripsi"

# View PR
gh pr view 1

# Checkout PR locally
gh pr checkout 1

# Merge PR
gh pr merge 1 --squash

# Close PR
gh pr close 1

# Status
gh pr status
```

---

## 8. Git Flow (Versi Formal)

### Branch Types:

```
main          → kode yang sedang di production
develop      → kode yang siap untuk release berikutnya
feature/*    → fitur baru
bugfix/*     → bug fix
hotfix/*     → urgent fix di production
release/*    → preparation untuk release
```

### Git Flow Commands:

```bash
# Initialize git flow
git flow init

# Start feature
git flow feature start user-login

# Finish feature
git flow feature finish user-login

# Start hotfix
git flow hotfix start bug-urgent

# Finish hotfix
git flow hotfix finish bug-urgent
```

---

## 9. Resolve Conflict

### Kenapa Conflict?

```
main:    A → B → C → D
                 ↘
feature:        E → F → G (conflict di sini)
```

### Cara Resolve:

```bash
# 1. Pull latest main
git checkout feature/user-login
git pull origin main

# 2. Kalau ada conflict, Git akan print file yang conflict
# Edit file conflict → hapus <<< === >>> markers

# Contoh conflict:
<<<<<<< HEAD
const name = "Andi";
=======
const fullName = "Andi Wijaya";
>>>>>>> abc123

# Pilih yang benar atau gabungkan:
const fullName = "Andi Wijaya";

# 3. Stage + commit
git add .
git commit -m "resolve: merge conflict"
git push
```

### Prevent Conflict:

```
1. Rebase branch kamu ke main sebelum buat PR:
   git fetch origin
   git rebase origin/main

2. Kalau conflict saat rebase:
   git rebase --continue

3. Force push (hati-hati!):
   git push --force-with-lease
```

---

## 10. Checklist Collaboration

```
SEBELUMKERJA:
□ Fork repo (kalau open source)
□ Clone repo kamu
□ Setup upstream remote
□ Buat feature branch dari main
□ git flow init (opsional)

SAAT KERJA:
□ Commit little& often (setiap fitur selesai = 1 commit)
□ Pakai conventional commit messages
□ Test sebelum push
□ Push secara berkala (backup)

SEBELUM PR:
□ Rebase ke main terbaru
□ Resolve conflict
□ Test semua fitur
□ Update dokumentasi kalau perlu

SAAT PR:
□ Tulis deskripsi yang jelas
□ Sertakan screenshot (jika UI)
□ Link issue yang terkait
□ Tunggu review

SETELAH MERGE:
□ Sync fork dengan upstream
□ Hapus feature branch (local & remote)
□ Update local main
```

---

## Troubleshooting

### Error: "Merge conflict"

→ Resolve conflict seperti step 8 di atas

### Error: "force push rejected"

```bash
# Jangan pakai --force kecuali sangat perlu
# Pakai --force-with-lease (lebih aman)
git push --force-with-lease origin feature-branch
```

### PR tidak bisa di-merge

```
1. Cek apakah ada conflict
2. Resolve conflict locally
3. Push perubahan
4. Tunggu CI/CD selesai
5. Request review ulang
```

---

**Next:**
- Tutorial 03: API Development Best Practices
- Atau lanjut ke LEVEL-1: HTML Fundamental
