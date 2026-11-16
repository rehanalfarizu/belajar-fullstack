# Software yang Dibutuhkan — LEVEL 0

Folder ini berisi panduan installasi software dasar yang diperlukan untuk memulai perjalanan software engineering. Semua software di bawah ini **wajib terinstall** sebelum melanjutkan ke materi berikutnya.

---

## Panduan Per Software (10 File)

Setiap software punya panduan sendiri di folder ini:

- [01 Visual Studio Code](01-visual-studio-code.md)
- [02 Node.js dan npm](02-nodejs-dan-npm.md)
- [03 Git Command Line](03-git-command-line.md)
- [04 Docker](04-docker.md)
- [05 PostgreSQL dan Database Tools](05-postgresql-dan-database.md)
- [06 API Testing Tools](06-api-testing-tools.md)
- [07 GitHub Desktop dan GUI Tools](07-github-desktop-gui.md)
- [08 Terminal, iTerm2, Oh-My-Zsh](08-terminal-iterm-ohmyzsh.md)
- [09 MongoDB Atlas dan Compass](09-mongodb-atlas-compass.md)
- [10 Browser dan DevTools](10-browser-devtools.md)

Docker, PostgreSQL, MongoDB, dan API client boleh ditunda sampai level yang memakainya.

---

## Ringkasan Cara Install

Empat software utama yang wajib terinstall di awal:

1. **Git** — Version control untuk melacak perubahan kode dan kolaborasi tim. Download di https://git-scm.com/download.
2. **VSCode** — Text editor dan IDE untuk menulis kode sehari-hari. Download di https://code.visualstudio.com.
3. **Node.js** — Runtime JavaScript untuk menjalankan kode JS di luar browser. Download di https://nodejs.org.
4. **npm** — Package manager untuk install library JavaScript. Sudah termasuk di dalam installer Node.js.

---

## Cara Install

### 1. Git

**macOS (via Homebrew):**

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
```

**Windows (via Git for Windows):**

1. Download dari https://git-scm.com/download/win.
2. Jalankan installer, pilih opsi "Use Git from the Windows Command Prompt".
3. Klik Next sampai selesai.

**Verifikasi:**

```bash
git --version
# Output contoh: git version 2.39.0
```

**Konfigurasi awal (wajib):**

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email@example.com"
```

---

### 2. VSCode

**macOS:**

```bash
# Via Homebrew
brew install --cask visual-studio-code

# Atau download .zip dari https://code.visualstudio.com
```

**Windows:**

1. Download installer dari https://code.visualstudio.com.
2. Jalankan file `.exe` dan ikuti instruksi.

**Verifikasi:**

```bash
code --version
# Output contoh: 1.85.0
```

**Extensions yang harus diinstall:**

- `Prettier - Code formatter` — otomatis merapikan format kode.
- `ESLint` — linting JavaScript untuk mendeteksi error.
- `GitLens` — fitur Git advanced langsung di VSCode.
- `Live Server` — live reload untuk development web.

---

### 3. Node.js

**macOS (via Node Version Manager — direkomendasikan):**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Atau via Homebrew
brew install node
```

**Windows:**

1. Download installer dari https://nodejs.org (pilih versi LTS).
2. Jalankan installer, centang opsi "Add to PATH".

**Verifikasi:**

```bash
node --version
# Output contoh: v20.10.0

npm --version
# Output contoh: 10.2.0
```

---

### 4. SSH Key untuk GitHub

Setelah install Git, setup SSH key agar bisa push ke GitHub tanpa memasukkan password setiap kali:

```bash
# Generate SSH key baru
ssh-keygen -t ed25519 -C "email@example.com"

# Tekan Enter untuk simpan di lokasi default
# Tambahkan passphrase (opsional tapi disarankan)

# Copy isi public key
cat ~/.ssh/id_ed25519.pub

# Paste ke GitHub: Settings → SSH and GPG Keys → New SSH Key
```

**Verifikasi:**

```bash
ssh -T git@github.com
# Output: Hi username! You've successfully authenticated...
```

---

## Checklist Sebelum Lanjut

Sembilan poin verifikasi terakhir sebelum melanjutkan ke materi teori:

1. `git --version` menampilkan versi Git.
2. `git config user.name` menampilkan nama user.
3. `git config user.email` menampilkan email user.
4. `code --version` menampilkan versi VSCode.
5. `node --version` menampilkan versi Node.js.
6. `npm --version` menampilkan versi npm.
7. `ssh -T git@github.com` berhasil login ke GitHub via SSH.
8. VSCode extensions terinstall: Prettier, ESLint, GitLens, dan Live Server.

---

**Lanjut ke:** [materi-teori/](../materi-teori/) untuk mulai belajar teori.
