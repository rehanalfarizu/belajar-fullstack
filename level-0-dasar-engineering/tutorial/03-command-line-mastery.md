# Tutorial 03 — Command Line Mastery

## Kenapa Command Line Penting?

Developer menghabiskan **50%+ waktu** di terminal. Makin fasih di command line, makin cepat kerja.

```
STATISTIK:
Developer rata-rata ketik 10.000+ command per bulan
Setiap shortcut yang dihafal = hemat 5 detik ×1000 = 1.4 jam per bulan
```

---

## 1. File& Directory Mastery

### Dasar:

```bash
pwd                 # Print Working Directory (di mana sekarang)
ls                  # List files
ls -la              # List + detail (termasuk hidden files)
cd Folder/          # Masuk folder
cd ..              # Mundur 1 level
cd ../..           # Mundur 2 level
cd ~               # Ke home directory
cd -               # Ke direktori sebelumnya
```

### Wildcard:

```bash
ls *.js            # Semua file .js
ls *.txt           # Semua file .txt
ls src/*.js        # Semua .js di folder src/
ls **/*.js         # Semua .js di semua subfolder (globstar)
```

### Buat & Hapus:

```bash
mkdir project         # Buat folder
mkdir -p a/b/c        # Buat nested folder
touch app.js          # Buat file kosong
touch README.md .env  # Buat multiple files

rm file.txt           # Hapus file
rm -rf folder/        # Hapus folder + isinya ⚠️
rm -i *.js            # Hapus dengan konfirmasi
```

### Copy & Move:

```bash
cp source.txt dest.txt          # Copy file
cp -r folder1/ folder2/        # Copy folder
mv oldname.txt newname.txt     # Rename
mv file.txt /path/to/dir/      # Move
```

---

## 2. Text Processing

### Baca File:

```bash
cat file.txt           # Tampilkan semua
head -20 file.txt     # 20 baris pertama
tail -20 file.txt    # 20 baris terakhir
tail -f log.txt       # Follow (real-time update)

less file.txt         # Scrollable view (q untuk quit)
more file.txt         # Scrollable (spasi = next page)
```

### Text Manipulation:

```bash
# Grep (cari teks)
grep "function" *.js              # Cari di semua .js
grep -r "TODO" ./src              # Cari rekursif
grep -i "error" server.log       # Case insensitive
grep -n "TODO" file.js           # Dengan line number
grep -c "import" *.js            # Count occurrences

# Sort & Uniq
sort file.txt           # Sort ascending
sort -r file.txt       # Sort descending
sort -u file.txt       # Sort + remove duplicates
uniq file.txt          # Remove consecutive duplicates
cat file.txt | sort | uniq   # Sort + unique

# Awk (extract column)
awk '{print $1}' file.txt      # Print kolom 1
awk -F',' '{print $2}' data.csv  # Kolom 2 dari CSV

# Sed (replace)
sed 's/old/new/g' file.txt     # Replace all
sed -i '' 's/old/new/g' file.txt  # Replace in-place
sed 's/old/new/2' file.txt    # Replace hanya kemunculan ke-2
```

---

## 3. Pipe & Redirection

### Pipe (|):

```bash
# Output dari command kiri jadi input command kanan
cat file.txt | grep "keyword" | sort
ls -la | grep ".js" | wc -l        # Count .js files
ps aux | grep node                  # Cari process node
history | grep git                 # Cari command git dari history

# Tee (simpan + tampilkan)
cat file.txt | tee copy.txt         # Tampilkan + save ke file
```

### Redirection:

```bash
command > output.txt     # Redirect stdout ke file (overwrite)
command >> output.txt    # Append ke file
command 2> error.txt   # Redirect stderr ke file
command &> all.txt      # Redirect stdout + stderr
command > out.txt 2>&1  # Redirect stderr ke stdout
```

### xargs:

```bash
# Output jadi arguments
grep -r "TODO" . | xargs grep "fix"     # cari hasil grep di dalam grep
echo "a.js b.js c.js" | xargs rm       # hapus file yang di-echo
find . -name "*.js" | xargs wc -l       # count lines semua .js
```

---

## 4. Process Management

### Lihat Process:

```bash
ps aux                 # Semua process
ps aux | grep node     # Cari process node
top                    # Monitor real-time (q untuk quit)
htop                   # top yang lebih bagus (install dulu: brew install htop)
```

### Kill Process:

```bash
kill PID              # Graceful kill
kill -9 PID           # Force kill ⚠️
killall node          # Kill semua process node

# Cari PID dulu
lsof -i :3000         # Port 3000 dipakai oleh process apa?
lsof -i :3000 | grep LISTEN
```

### Background Process:

```bash
# Jalankan di background
node server.js &
node server.js > output.log &

# Lihat background jobs
jobs

# Bring to foreground
fg %1

# Send to background
bg %1
```

---

## 5. Network Commands

```bash
# Test koneksi
ping google.com                  # Test internet
curl -I https://example.com       # HTTP headers
curl -v https://example.com      # Verbose (detail)

# Port scanning
lsof -i :3000                    # Port apa yang jalan?
lsof -i :3000-3010               # Range port

# Download
curl -O https://example.com/file.zip   # Download file
wget https://example.com/file.zip       # Download (alternatif)
curl -o output.json https://api.com/data  # Download + rename

# Local server
python3 -m http.server 8080      # Simple HTTP server
npx serve .                       # Static file server
```

---

## 6. System Info

```bash
# Hardware
df -h                   # Disk usage
du -sh folder/          # Folder size
du -h --max-depth=1     # Size per subfolder
free -h                 # Memory usage (Linux)
top -l 1 | head -10     # CPU + Memory (macOS)

# System
uname -a                # OS info
sw_vers                 # macOS version
whoami                  # Current user
hostname                # Computer name
uptime                  # How long running

# Version commands
node --version
npm --version
git --version
docker --version
python3 --version
```

---

## 7. Archive & Compression

```bash
# Compress
tar -cvf archive.tar folder/           # Create .tar
tar -czvf archive.tar.gz folder/      # Create .tar.gz (gzip)
zip -r archive.zip folder/             # Create .zip

# Extract
tar -xvf archive.tar                   # Extract .tar
tar -xzvf archive.tar.gz              # Extract .tar.gz
unzip archive.zip                     # Extract .zip

# Extract specific file from tar
tar -xvf archive.tar path/to/file
```

---

## 8. Find & Locate

```bash
# Find (search by name/type)
find . -name "*.js"                   # Cari semua .js
find . -name "*.js" -type f           # File saja
find . -type d -name "node_modules"   # Cari folder
find . -size +100M                   # File > 100MB
find . -mtime -7                     # File modified < 7 hari
find . -name "*.js" -exec rm {} \;    # Hapus semua .js

# Locate (indexed search, perlu setup dulu)
locate filename
```

---

## 9. tmux — Terminal Multiplexer

tmux = split terminal jadi banyak panel/window.

### Install:

```bash
brew install tmux
```

### Basic tmux:

```bash
tmux new -s mysession          # Buat session baru
tmux ls # List session
tmux attach -t mysession       # Attach ke session
tmux kill-session -t mysession # Kill session
```

### tmux Shortcuts (setelah Ctrl+B):

```
Ctrl+B c → New window
Ctrl+B n        → Next window
Ctrl+B p        → Previous window
Ctrl+B % → Split vertical
Ctrl+B "        → Split horizontal
Ctrl+B o        → Switch pane
Ctrl+B d        → Detach (keluar tanpa close)
Ctrl+B [ → Copy mode (scroll)
Ctrl+B ?        → Help (semua shortcut)
```

### Session Workflow:

```bash
# 1 window =1 project
tmux new -s belajar-fullstack

# Split panes:
# Ctrl+B % → panel kanan (editor)
# Ctrl+B " → panel bawah (terminal)
# Ctrl+B o → switch antar pane

# Di panel bawah:
# cd ~/Documents/belajar-fullstack
# npm run dev

# Di panel kanan:
# code .

# Detach: Ctrl+B d
# Lain kali saat ingin kembali:
tmux attach -t belajar-fullstack
```

---

## 10. Aliases & Functions

### Permanent Aliases (di ~/.zshrc):

```bash
code ~/.zshrc
# Tambahkan:

# ─── Git shortcuts ───
alias gs='git status'
alias ga='git add .'
alias gc='git commit'
alias gca='git commit --amend'
alias gp='git push'
alias gpf='git push --force-with-lease'
alias gpl='git pull'
alias gl='git log --oneline -10'
alias gcb='git checkout -b'
alias gco='git checkout'
alias gpod='git pull origin develop'
alias gstash='git stash'
alias gstashpop='git stash pop'

# ─── Node shortcuts ───
alias ni='npm install'
alias nrd='npm run dev'
alias nrs='npm run start'
alias nrt='npm test'
alias nrb='npm run build'

# ─── Docker shortcuts ───
alias dps='docker ps'
alias dpsa='docker ps -a'
alias dex='docker exec -it'
alias dlogs='docker logs -f'
alias dstop='docker stop'
alias drm='docker rm'
alias drmi='docker rmi'
alias dprune='docker system prune -a'

# ─── File shortcuts ───
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias docs='cd ~/Documents'
alias proj='cd ~/Documents/belajar-fullstack'

# ─── Safety ───
alias rm='rm -i'           # Confirm sebelum hapus
alias cp='cp -i'           # Confirm sebelum copy
alias mv='mv -i'           # Confirm sebelum move
```

### Functions (Lebih Cerdas):

```bash
# Buat folder + masuk sekaligus
mkcd() { mkdir -p "$1" && cd "$1"; }

# Extract apapun
extract() {
  if [ -f $1 ]; then
    case $1 in
      *.tar.bz2) tar xjf $1 ;;
      *.tar.gz) tar xzf $1 ;;
      *.bz2) bunzip2 $1 ;;
      *.rar) unrar x $1 ;;
      *.gz) gunzip $1 ;;
      *.tar) tar xf $1 ;;
      *.tbz2) tar xjf $1 ;;
      *.tgz) tar xzf $1 ;;
      *.zip) unzip $1 ;;
      *.Z) uncompress $1 ;;
      *) echo "'$1' cannot be extracted via extract()" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}

# Commit + push satu command
gpnow() {
  git add .
  git commit -m "$1"
  git push
}

# Kill port
killport() {
  lsof -ti :$1 | xargs kill -9
}
```

### Reload ~/.zshrc:

```bash
source ~/.zshrc
```

---

## 11. One-Liners Berfeito

```bash
# Count lines of code
find . -name "*.js" -not -path "*/node_modules/*" | xargs wc -l | tail -1

# Find largest files
find . -type f -size +10M -exec ls -lh {} \; | sort -k5 -h

# Top10 largest folders
du -sh */ | sort -rh | head -10

# Replace text in all files
find . -name "*.js" -exec sed -i '' 's/old/new/g' {} +

# Download + extract in one command
curl -L https://example.com/archive.tar.gz | tar xz

# HTTP server one-liner
python3 -m http.server 8080

# Watch file changes
fswatch -o . | xargs -n1 echo "Changed"

# JSON pretty print
cat file.json | python3 -m json.tool

# Generate random password
openssl rand -base64 32
```

---

## Checklist

```
✅ Basic commands (ls, cd, mkdir, rm, cp, mv)
✅ Pipe& redirection (|, >, >>)
✅ Grep & find
✅ Process management (ps, kill, top)
✅ Network (curl, lsof)
✅ tmux basics (split, attach, detach)
✅ Buat 5+ aliases di ~/.zshrc
✅ Buat 2+ functions di ~/.zshrc
```

---

**Next:**
- Tutorial 04: VS Code Productivity Setup
- Atau lanjut ke LEVEL-1: HTML Fundamental
