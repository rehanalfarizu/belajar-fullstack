# 📦 Software 01 — Visual Studio Code

## Apa itu VS Code?

**Visual Studio Code (VS Code)** = Editor kode paling populer untuk developer. Gratis, ringan, dan extensible.

```
VS Code = Text editor + IDE features
├── Syntax highlighting (warna kode)
├── IntelliSense (auto-complete)
├── Debugger
├── Terminal built-in
├── Git integration
└── 50.000+ extensions
```

---

## 1. Install VS Code

### Via Homebrew (direkomendasikan):

```bash
brew install --cask visual-studio-code
```

### Via Website:

1. Buka https://code.visualstudio.com.
2. Klik "Download for macOS".
3. Drag ke Applications.

---

## 2. Setup `code` Command di Terminal

Tanpa ini, kamu tidak bisa ketik `code .` untuk buka VS Code dari terminal.

### Cara Otomatis:

1. Buka VS Code.
2. Tekan `Cmd + Shift + P`.
3. Ketik: `Shell Command: Install 'code' command in PATH`.
4. Tekan Enter.

### Cara Manual:

```bash
ln -s "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" /usr/local/bin/code
```

### Verifikasi:

```bash
code --version
# Output: 1.x.x
# commit: xxxxxxxx
```

---

## 3. Cara Pakai VS Code

### Navigasi Dasar

Delapan shortcut untuk navigasi file:

1. `Cmd + P` — Quick open file.
2. `Cmd + Shift + P` — Command Palette.
3. `Cmd + N` — File baru.
4. `Cmd + S` — Save.
5. `Cmd + W` — Tutup tab.
6. `Cmd + B` — Toggle sidebar.
7. `Cmd + J` — Toggle terminal.
8. `Cmd + Shift + N` — New window.

### Edit Kode

Sepuluh shortcut untuk mengedit kode dengan cepat:

1. `Cmd + C` — Copy.
2. `Cmd + V` — Paste.
3. `Cmd + X` — Cut (tanpa memilih).
4. `Cmd + Z` — Undo.
5. `Cmd + Shift + Z` — Redo.
6. `Cmd + D` — Pilih kata yang sama (multi-cursor).
7. `Cmd + Shift + L` — Pilih semua kemunculan.
8. `Alt + Up/Down` — Pindah baris ke atas atau bawah.
9. `Cmd + /` — Toggle comment.
10. `Alt + Shift + F` — Format document.

### Multi-Cursor (Fitur Kuat!)

Empat jurus multi-cursor:

1. Hold `Option + Click` — tambah cursor.
2. `Cmd + D` — pilih kata berikutnya.
3. `Cmd + Shift + L` — pilih semua kemunculan.
4. `Alt + Shift + Drag mouse` — buat block selection.

---

## 4. Essential Extensions

Buka VS Code → tekan `Cmd + Shift + X` → search nama extension.

### Wajib Install

Dua belas extension esensial yang langsung berguna:

1. **Prettier - Code formatter** — auto-format kode (`Cmd + Shift + F`).
2. **ESLint** — linter JavaScript dan TypeScript.
3. **GitLens — Git supercharged** — lihat siapa mengubah apa, kapan, dan mengapa.
4. **GitHub Pull Requests and Issues** — review PR langsung di VS Code.
5. **Error Lens** — tampilkan error langsung di baris kode.
6. **REST Client** — test API langsung dari file `.http`.
7. **Thunder Client** — alternatif Postman built-in.
8. **Tailwind CSS IntelliSense** — autocomplete class Tailwind.
9. **vscode-icons** — ikon folder dan file yang jelas.
10. **Auto Rename Tag** — otomatis rename tag pembuka dan penutup.
11. **Markdown All in One** — preview dan shortcut untuk `.md`.
12. **Live Server** — refresh otomatis saat save HTML.

### Cara Install Extension

Lima langkah instalasi extension:

1. Buka VS Code.
2. Tekan `Cmd + Shift + X`.
3. Ketik nama extension.
4. Klik "Install".
5. Klik "Reload" jika diperlukan.

### Cek Extension yang Sudah Terinstall

```
Cmd + Shift + X → ketik "@installed"
```

---

## 5. Settings (Pengaturan)

### Buka Settings

```
Cmd + ,  (Settings)
```

### Settings Penting

Tujuh setting yang langsung terasa dampaknya:

1. `editor.tabSize: 2` — ukuran tab 2 spasi.
2. `editor.detectIndentation: false` — deteksi indentasi otomatis dimatikan.
3. `editor.fontSize: 14` — ukuran font.
4. `editor.fontFamily: "Fira Code"` — font favorit dengan ligature.
5. `editor.lineNumbers: "on"` — nomor baris selalu tampil.
6. `editor.minimap.enabled: false` — minimap dimatikan agar lebih leluasa.
7. `files.autoSave: "afterDelay"` — auto-save setelah diam beberapa detik.

Contoh konfigurasi JSON:

```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "editor.fontSize": 14,
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "editor.lineNumbers": "on",
  "editor.minimap.enabled": false,
  "files.autoSave": "afterDelay",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.wordWrap": "on",
  "editor.bracketPairColorization.enabled": true
}
```

### Cara Edit Settings.json

```
Cmd + Shift + P → "Open Settings (JSON)"
```

---

## 6. Integrated Terminal

Buka terminal di VS Code:

```
Cmd + J  (toggle terminal)
Cmd + `  (toggle terminal - shortcut lain)
```

### Split Terminal

```
Cmd + Shift + 5 → "Split Terminal"
```

### Ganti Shell

```
Cmd + Shift + P → "Select Default Profile" → pilih zsh
```

---

## 7. Theme & Appearance

### Ganti Theme

```
Cmd + K → Cmd + T → pilih theme (Dark+, Dracula, One Dark Pro, dll)
```

### Icon Theme

```
Cmd + Shift + P → "File Icon Theme" → pilih vscode-icons
```

---

## 8. Workspace & Folder

### Buka Folder

```
Cmd + O → pilih folder
```

### Simpan Workspace

```
Cmd + Shift + P → "Save Workspace As..."
```

### Recent Workspaces

```
Cmd + P → ketik ">" → "Recent..."
```

---

## 9. Keyboard Shortcuts Cheatsheet

### Navigasi

Lima shortcut navigasi utama:

1. `Cmd + P` — Quick Open file.
2. `Cmd + Shift + P` — Command Palette.
3. `Cmd + B` — Toggle sidebar.
4. `Cmd + J` — Toggle terminal.
5. `Cmd + K Cmd + S` — Keyboard Shortcuts.

### Edit

Lima shortcut editing utama:

1. `Cmd + D` — Select next occurrence.
2. `Cmd + Shift + L` — Select all occurrences.
3. `Alt + Click` — Multi-cursor.
4. `Cmd + /` — Toggle comment.
5. `Alt + Shift + F` — Format document.

### File

Empat shortcut file:

1. `Cmd + N` — New file.
2. `Cmd + S` — Save.
3. `Cmd + W` — Close tab.

### Search

Tiga shortcut pencarian:

1. `Cmd + F` — Find.
2. `Cmd + H` — Find & Replace.
3. `Cmd + Shift + F` — Find in files (global search).

---

## 10. Troubleshooting

### VS Code tidak bisa buka terminal

```
Cmd + Shift + P → "Terminal: Create New Terminal"
```

### Command `code` tidak ditemukan

Empat langkah untuk mengatasi:

1. `Cmd + Shift + P`.
2. Ketik: "Shell Command: Install 'code' command in PATH".
3. Tekan Enter.
4. Tutup terminal, buka lagi.

### VS Code lambat

Tiga langkah untuk mempercepat:

1. Matikan extensions yang tidak perlu.
2. Nonaktifkan minimap: `"editor.minimap.enabled": false`.
3. Kurangi auto-save lag: `"files.autoSave": "afterDelay"`.

---

## Checklist

Tujuh poin yang harus sudah tercapai:

1. VS Code terinstall.
2. `code` command tersedia di terminal.
3. Minimal 5 extensions terinstall (Prettier, ESLint, GitLens, dll).
4. Font diganti (Fira Code atau JetBrains Mono).
5. Settings sudah disesuaikan (tab size 2, format on save).
6. Bisa buka folder dengan `code .`.
7. Bisa pakai multi-cursor.

---

**Next:**

- Lanjut ke Software 02: Node.js & npm.
- Atau ke Tutorial: Dev Environment Setup.
