# SOAL 01 — useState dan useEffect

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Memahami `useState` dengan functional update pattern
2. Memahami `useEffect` untuk side effects dan cleanup
3. Menggabungkan `useState` + `useEffect` untuk auto-update logic

---

## Briefing
`useEffect` adalah hook untuk menangani side effects — fetching data, subscriptions, memanipulasi DOM, setting timers. Cleanup function sangat penting untuk mencegah memory leaks.

---

## Deskripsi

### Soal 1A — TrafficLight Simulator
Component `TrafficLight` dengan:
- `currentLight`: `"red"` | `"yellow"` | `"green"` (default: `"red"`)
- `isAuto`: boolean (default: `true`)

Fitur:
1. Tiga lingkaran traffic light — yang aktif lebih terang/besar
2. Jika `isAuto === true`: auto cycling: red(3s) → green(3s) → yellow(1s) → repeat
3. Tombol toggle auto/manual
4. Manual: tiga tombol switch light
5. Countdown timer: "Red dalam 3... 2... 1..."

**Aturan:**
- Gunakan `useRef` untuk menyimpan interval ID
- Cleanup: `clearInterval` saat unmount atau switch ke manual
- Functional update: `setCountdown(prev => prev - 1)`

### Soal 1B — GitHub User Search
Component `GitHubUserSearch`:
- Input username + tombol Search
- Fetch dari `https://api.github.com/users/{username}`
- Loading state saat fetch
- Error state (404 / network error)
- Success: avatar, name, login, bio, followers, following, public repos, link

**Aturan:**
- Wajib gunakan `AbortController` untuk cancel request sebelumnya
- Cleanup: `abort()` di useEffect cleanup
- Handle `res.ok` check dan try/catch

---

## Syarat (Checklist)
- [ ] TrafficLight auto-cycling berhenti saat switch ke manual
- [ ] Cleanup interval berfungsi saat component unmount
- [ ] AbortController cancel request lama saat search baru
- [ ] Loading spinner tampil saat fetch
- [ ] Error message informatif saat username tidak ditemukan

---

## Expected Output
- TrafficLight: auto-cycling dengan countdown, bisa switch ke manual
- GitHub search: profile card muncul setelah search

---

## Cara Submit
1. Simpan sebagai `01-useState-useEffect.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai