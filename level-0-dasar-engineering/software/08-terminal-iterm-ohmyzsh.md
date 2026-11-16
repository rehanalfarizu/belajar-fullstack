# 📦 Software 08 — Terminal, iTerm2 & Shell Customization

## Apa itu Terminal?

**Terminal** = Interface untuk ketik command text ke komputer. Developer hidup di terminal.

```
TERMINAL = cara kita "bicara" dengan komputer via TEXT
┌─────────────────────────────────────────────────┐
│ Last login: Sat May 31 12:00:00 on ttys000      │
│ MacBook-Pro:~ username$ _                        │
│                                                 │
│ → Ketik command → Tekan Enter                   │
│ ← computer balas / jalankan perintah            │
└─────────────────────────────────────────────────┘
```

---

## 1. Konsep Dasar Terminal

### Anatomy Prompt

```
username@hostname:~$ command argument
│        │         │ │
│        │         │ └─ arguments (parameter)
│        │         └─ command (perintah)
│        └─ hostname (nama komputer)
└─ username (yang login)
```

### Contoh Prompt

```
Muhammads-MacBook-Pro:~ rehanalfarizu$
│                      │  │
│                      │  └─ ~ = home directory
│                      └─ hostname
└─ username
```

### Perbedaan Empat Simbol Direktori

1. `~` — home folder (`/Users/username`).
2. `/` — root (akar tertinggi).
3. `.` — current directory.
4. `..` — parent directory.

---

## 2. Perintah Dasar Terminal

### Navigasi

Tujuh perintah dasar navigasi:

1. `pwd` — print working directory, lihat direktori sekarang.
2. `ls` — list isi direktori.
3. `ls -la` — list detail (termasuk hidden file).
4. `ls -lh` — list dengan ukuran human-readable.
5. `cd Documents` — masuk folder Documents.
6. `cd ..` — mundur satu level.
7. `cd -` — ke direktori sebelumnya.

Contoh tambahan:

```bash
ls -la | grep ".js"   # filter hanya .js
cd ~                  # ke home (/Users/username)
cd /                  # ke root
clear                 # atau Ctrl + L untuk clear screen
```

### File & Folder

Sepuluh perintah untuk file dan folder:

1. `mkdir belajar-fullstack` — buat folder.
2. `mkdir -p folder/anak/grandchild` — buat folder bertingkat.
3. `touch README.md` — buat file baru.
4. `cp source.txt destination.txt` — copy file.
5. `cp -r folder-satu folder-dua` — copy folder rekursif.
6. `mv oldname.txt newname.txt` — rename file.
7. `mv file.txt /path/to/destination/` — pindahkan file.
8. `rm file.txt` — hapus file.
9. `rm -rf folder-name` — hapus folder tanpa konfirmasi (hati-hati).
10. `cat README.md` — tampilkan isi file.

Contoh tambahan untuk baca file besar:

```bash
less README.md           # scroll (q untuk quit)
head -20 README.md       # 20 baris pertama
tail -20 README.md       # 20 baris terakhir
tail -f server.log       # follow log secara real-time
```

---

## 3. iTerm2 (Terminal Replacement)

### Install

```bash
brew install --cask iterm2
```

### Fitur iTerm2

Enam fitur unggulan iTerm2:

1. Split panes — bagi layar horizontal atau vertikal.
2. Searchable history — cari command yang sudah diketik.
3. Profile — tampilan yang bisa dikustomisasi.
4. Hotkey window — tekan hotkey untuk popup terminal.
5. Multiple tabs — banyak sesi dalam satu window.
6. Better copy/paste — salin tempel lebih natural.

### Split Pane

Empat shortcut utama split pane:

1. `Cmd + D` — split vertically (bagi kanan).
2. `Cmd + Shift + D` — split horizontally (bagi bawah).
3. `Cmd + W` — tutup pane.
4. `Cmd + Option + Arrow` — switch antar pane.

### Profile (Custom Theme)

Enam langkah membuat profile:

1. Preferences → Profiles → `+` (new).
2. Name: "Code Dark".
3. Tab Colors → Background: `#1E1E1E`.
4. Tab Colors → Text: `#D4D4D4`.
5. Tab Terminal → Font: JetBrains Mono 14.
6. Tab Keys → Left Option key: Normal.
7. Set as Default: centang.

### Hotkey Window

Empat langkah setup hotkey:

1. Preferences → Keys → Hotkey → Configure.
2. Centang "Show/hide iTerm2 with a system-wide hotkey".
3. Set hotkey: `Ctrl + Space` (atau sesuai selera).
4. Sekarang tekan `Ctrl + Space` di mana saja untuk popup terminal.

---

## 4. Oh-My-Zsh (Shell Enhancement)

Oh-My-Zsh = plugin manager untuk zsh. Bikin terminal lebih powerful & cantik.

### Install

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Plugin yang Direkomendasikan

Edit `~/.zshrc` dengan `code ~/.zshrc`. Delapan plugin yang umum diaktifkan:

1. `git` — git shortcuts (`ga = git add`, `gst = git status`).
2. `node` — node shortcuts.
3. `npm` — npm shortcuts.
4. `vscode` — code command integration.
5. `z` — jump ke folder yang sering dikunjungi.
6. `docker` — docker shortcuts.
7. `extract` — auto extract (`.zip`, `.tar`, dll).
8. `zsh-autosuggestions` — auto suggest command (install terpisah).
9. `zsh-syntax-highlighting` — highlight syntax (install terpisah).

### Install Powerlevel10k (Theme)

Empat langkah:

1. Install font dan theme:

```bash
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

2. Edit `~/.zshrc`:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

3. Install recommended fonts:

```bash
brew install --cask font-meslo-lg-nerd-font
```

4. Restart terminal — setup wizard akan muncul.

### Powerlevel10k Setup

Empat langkah menjawab wizard:

1. Restart terminal.
2. Setup wizard berjalan otomatis.
3. Jawab pertanyaan konfirmasi: diamond, lock, pyramid (semua `y`).
4. Pilih style sesuai selera dan aktifkan instant prompt mode.

---

## 5. ~/.zshrc (Konfigurasi Shell)

File ini di-load setiap buka terminal baru.

```bash
# Edit ~/.zshrc
code ~/.zshrc
```

### Bagian Penting dalam `~/.zshrc`

Enam blok konfigurasi:

1. **PATH configuration** — Homebrew, NVM, pyenv, npm-global.
2. **ALIAS (shortcut commands)** — untuk ls, navigasi, git, node, dan docker.
3. **OH-MY-ZSH config** — theme dan plugin.
4. **MISC** — history, auto update, dan color support.

Contoh blok PATH:

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

export PATH="$HOME/.npm-global/bin:$PATH"
```

Contoh alias untuk navigasi dan git:

```bash
alias ll='ls -lah'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias docs='cd ~/Documents'
alias proj='cd ~/Documents/belajar-fullstack'

alias gs='git status'
alias ga='git add .'
alias gc='git commit'
alias gp='git push'
alias gl='git log --oneline -10'
alias gco='git checkout'
alias gcb='git checkout -b'
```

Alias untuk Node dan Docker:

```bash
alias ni='npm install'
alias nrd='npm run dev'
alias nrs='npm run start'
alias nrt='npm test'

alias dps='docker ps'
alias dex='docker exec -it'
alias dlogs='docker logs -f'
alias dstop='docker stop'
```

Pengaturan tambahan:

```bash
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history

export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxHxEdabagacad
```

### Reload `~/.zshrc`

```bash
source ~/.zshrc
# atau:
. ~/.zshrc
```

---

## 6. Keyboard Shortcuts Terminal

### Navigasi

Enam shortcut navigasi di dalam baris:

1. `Ctrl + A` — pindah ke awal baris.
2. `Ctrl + E` — pindah ke akhir baris.
3. `Ctrl + B` — mundur satu karakter.
4. `Ctrl + F` — maju satu karakter.
5. `Alt + B` — mundur satu kata.
6. `Alt + F` — maju satu kata.

### Editing

Tujuh shortcut editing:

1. `Ctrl + U` — hapus dari cursor ke awal.
2. `Ctrl + K` — hapus dari cursor ke akhir.
3. `Ctrl + W` — hapus satu kata sebelumnya.
4. `Ctrl + Y` — paste (undo delete).
5. `Ctrl + C` — cancel, hentikan proses.
6. `Ctrl + D` — EOF atau logout.
7. `Ctrl + Z` — pause process, lanjut dengan `fg`.

### History

Empat shortcut untuk history:

1. `↑` — command sebelumnya.
2. `↓` — command berikutnya.
3. `Ctrl + R` — search history interaktif.
4. `Ctrl + L` — clear screen.

### Terminal Navigation

Lima shortcut terminal:

1. `Tab` — auto-complete.
2. `Tab + Tab` — suggestion.
3. `Ctrl + C` — cancel command.
4. `Ctrl + Z` — background process.
5. `exit` — keluar shell atau session.

---

## 7. Search History (Ctrl + R)

```bash
# Tekan Ctrl + R
(reverse-i-search)`':

# Ketik keyword
(reverse-i-search)`git': git push -u origin main

# Tekan Enter untuk jalankan
# Tekan Esc untuk exit
# Tekan ← → untuk edit command
```

Dua contoh pencarian lebih spesifik:

- Hanya yang mengandung "git": tekan `Ctrl + R`, ketik `git`.
- Hanya yang mengandung "npm install": tekan `Ctrl + R`, ketik `npm install`.

---

## 8. Cheatsheet Perintah Bermanfaat

Empat kategori perintah bermanfaat:

1. **Cari file** — `find . -name "*.js"`, `find / -name "node" 2>/dev/null`.
2. **Grep (cari teks dalam file)** — `grep "function" *.js`, `grep -r "TODO" ./src`, `grep -i "error" server.log`.
3. **Pipe (gabungkan command)** — `cat file.txt | grep "keyword" | sort | uniq`, `ls -la | grep ".js"`, `npm list | grep "express"`.
4. **Redirect output** — `command > output.txt` (overwrite), `command >> output.txt` (append).
5. **Process management** — `ps aux | grep node`, `kill -9 PID`, `top`.
6. **Network** — `ping google.com`, `curl -I https://example.com`, `lsof -i :3000`.

---

## 9. Troubleshooting

### Terminal error: "Permission denied"

```bash
# Cek permission file
ls -la filename.txt

# Fix permission
chmod 644 filename.txt       # file
chmod 755 folder             # folder
```

### Command not found

```bash
# Cek apakah command ada
which node
which git
which npm

# Install command (misal npm)
brew install node

# Refresh PATH
source ~/.zshrc
```

### "Do you want to install command line developer tools?"

```bash
# Install Xcode CLI tools
xcode-select --install

# Cek apakah sudah terinstall
xcode-select -p
```

---

## Checklist

Tujuh poin yang harus sudah tercapai:

1. Terminal basics: `cd`, `ls`, `mkdir`, `rm`, `cp`, `mv`.
2. iTerm2 terinstall dan terkonfigurasi.
3. Oh-My-Zsh terinstall.
4. Powerlevel10k theme sudah aktif (kalau mau).
5. `~/.zshrc` sudah dikonfigurasi (aliases, PATH).
6. Bisa pakai `Ctrl+R` untuk search history.
7. Bisa pakai `Tab` untuk auto-complete.
8. Split panes di iTerm2 berfungsi.

---

**Next:**

- Kembali ke Software 01: Visual Studio Code.
- Atau ke Tutorial: Dev Environment Setup.
