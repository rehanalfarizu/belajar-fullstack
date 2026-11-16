# Tutorial 01 — Setup Workspace Web Developer

## Tujuan
Persiapan lengkap: install software, konfigurasi VSCode, dan buat folder kerja agar siap belajar web development.

---

## Bagian1: Install VSCode

### Cara Install (Pilih Salah Satu)

**Opsi A: Download Langsung**
1. Buka https://code.visualstudio.com
2. Klik tombol Download for macOS
3. Drag file `.app` ke folder Applications

**Opsi B: Homebrew (macOS)**
```bash
brew install --cask visual-studio-code
```

**Verifikasi:**
```bash
code --version
# Output: x.x.x (contoh: 1.85.0)
```

---

## Bagian 2: Install Extension VSCode

Buka VSCode → tekan `Cmd + Shift + X` → ketik nama extension → Install.

### Extension Wajib (minimal):

| # | Nama Extension | Fungsi |
|---|---------------|--------|
| 1 | Live Server | Auto-refresh browser saat save |
| 2 | Prettier | Auto-format kode |
| 3 | HTML CSS Support | IntelliSense untuk CSS class |
| 4 | Auto Rename Tag | Otomatis rename tag penutup |

### Install via Command Line:
```bash
code --install-extension ritwickdey.live-server
code --install-extension esbenp.prettier-vscode
code --install-extension eiminssas.html-css-support
code --install-extension formulahendry.auto-rename-tag
```

---

## Bagian 3: Konfigurasi VSCode

Tekan `Cmd + ,` (macOS) atau `Ctrl + ,` (Windows) untuk buka Settings.

### Settings yang Direkomendasikan:

```json
{
  "editor.formatOnSave": true,
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "emmet.includeLanguages": {
    "html": "html"
  },
  "files.autoSave": "afterDelay",
  "liveServer.settings.root": "/"
}
```

### Font yang Direkomendasikan:
```json
{
  "editor.fontFamily": "Fira Code, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true
}
```

---

## Bagian 4: Buat Folder Kerja

```bash
# Buka terminal (Cmd + Space → ketik "terminal")

# Buat folder utama
mkdir -p ~/belajar-web/level-1

# Buka folder di VSCode
code ~/belajar-web/level-1
```

**Struktur folder yang dibuat:**
```
belajar-web/
└── level-1/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Bagian 5: Install Google Chrome

```bash
# macOS
brew install --cask google-chrome

# Atau download langsung
# https://www.google.com/chrome
```

**Verifikasi:**
```bash
open -a "Google Chrome"
```

---

## Mini-Challenge

Buat folder `belajar-web/level-1/` dan buka di VSCode. Buat file `index.html` kosong. Pastikan:
- [ ] VSCode terinstall dan bisa dibuka
- [ ] Minimal 2 extension sudah terinstall (Live Server + Prettier)
- [ ] Folder `belajar-web/level-1/` sudah dibuat
- [ ] File `index.html` sudah dibuat dan dibuka dengan VSCode
- [ ] Google Chrome terinstall

---

## Ringkasan

```
Software yang sudah terinstall:
├── VSCode (text editor)
├── Google Chrome (browser)
├── Extension: Live Server
├── Extension: Prettier
└── Extension: HTML CSS Support

Folder kerja:
~/belajar-web/level-1/
```

---

**Lanjut ke:** [02-html-dari-nol.md](./02-html-dari-nol.md)
