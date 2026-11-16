# Latihan 05 — Form UX dan Async Validation

## Soal 01: Form UX — Focus Management dan Async Validation

### Tujuan
Memahami aspek UX dalam form handling: focus management, debounced async validation, dan visual feedback.

### Deskripsi
Buat `SearchableSignupForm` dengan focus management dan async username availability check.

**Fitur:**

1. **Auto-focus**: form input pertama (fullName) auto-focus saat mount
2. **Focus on error**: saat submit gagal, focus ke field pertama yang error
   Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 01 — Focus ke field error pertama").

   Petunjuk: bagaimana mencari elemen input dari nama field-nya, dan kapan fokus dipindahkan (sebelum atau sesudah error ditampilkan)?
3. **Clear error on focus**: error message hilang saat user mulai memperbaiki field
4. **Async username check**: debounced 300ms, check availability via API
5. **Loading indicator**: tampilkan spinner/skeleton saat checking username
6. **Availability feedback**: visual feedback (green check / red X) setelah check selesai

**Username Availability Check:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 01 — Cek ketersediaan username").

Petunjuk: ada empat keadaan status (belum dicek, sedang cek, tersedia, tidak tersedia/gagal). Bagaimana membatalkan permintaan lama sebelum memulai yang baru? Untuk simulasi API, daftar username yang sudah dipakai: `admin`, `root`, `test`, `demo`, `user`.

**Debounced Check:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 01 — Debounce cek username").

Petunjuk: kenapa fungsi debounce harus dibuat sekali saja dan bukan di tiap render? Apa yang dipakai untuk menyimpan instans yang sama antar render? (Fungsi `debounce` boleh kamu tulis sendiri atau ambil dari library.)

**Form Fields:**
```js
{
  fullName: "",
  email: "",
  username: "",
  password: "",
}
```

**Validation Rules:**
- fullName: required, min 2 chars
- email: required, valid email format
- username: required, min 3 chars, alphanumeric, available (async)
- password: required, min 8 chars

**Submit Flow:**
1. Validate all fields
2. Check username availability (jika belum checked atau changed)
3. Jika semua valid → simulate API call (1 detik) → success
4. Jika invalid → focus ke field pertama yang error

### Aturan
- AbortController untuk cancel previous username check request
- Debounce 300ms sebelum melakukan async check
- Jika username berubah setelah check, status reset ke null
- Submit tetap disabled jika username availability check sedang berlangsung

### Pertanyaan Analisis
1. Mengapa debounce diperlukan untuk async validation? Apa yang terjadi tanpa debounce?
2. Kapan sebaiknya async validation dilakukan? Apakah semua field perlu async validation?
3. Bagaimana UX berbeda antara synchronous dan asynchronous validation dari perspektif user?

---

## Soal 02: Multi-step Form dengan Progress Indicator

### Tujuan
Memahami multi-step form (wizard) pattern dengan state management per step dan progress tracking.

### Deskripsi
Buat `JobApplicationForm` — multi-step form untuk melamar pekerjaan.

**Steps:**
```
Step 1: Personal Info     → fullName, email, phone, address
Step 2: Professional Info → currentTitle, yearsExperience, skills (multi-select)
Step 3: Documents → resume (file upload UI), coverLetter (textarea)
Step 4: Review& Submit   → review semua data, agree to terms, submit
```

**State Structure:**
```js
{
  currentStep: 1,
  formData: {
    step1: { fullName: "", email: "", phone: "", address: "" },
    step2: { currentTitle: "", yearsExperience: 0, skills: [] },
    step3: { resume: null, coverLetter: "" },
    step4: { agreeToTerms: false },
  },
  errors: {},
  touched: {},
}
```

**Available Skills:**
```js
const AVAILABLE_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "Java", "Go", "Rust", "SQL", "MongoDB", "Docker", "AWS",
  "Figma", "Git", "Agile/Scrum", "CI/CD"
];
```

**Multi-Select Skills:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 02 — toggleSkill").

Petunjuk: state-nya bersarang (`step2.skills`). Bagaimana memperbarui satu level dalam tanpa mengubah object lama? Bagaimana menambah atau membuang satu item dari array?

**Step Navigation:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 02 — Navigasi antar step").

Petunjuk: Next harus lolos validasi, Back tidak. Bagaimana menjaga nomor step tidak keluar dari 1 sampai 4? Siapa yang menyimpan fungsi `validateStep`?

**Progress Indicator:**
Belum ketemu? Tulis dulu versimu. Kalau benar-benar buntu, solusi ada di `../solusi-jangan-dibuka-dulu.md` (bagian "03-async-dan-multistep Soal 02 — Step indicator").

Petunjuk: satu elemen punya tiga keadaan (aktif, selesai, belum). Bagaimana menurunkan kelas CSS dan isi lingkaran dari `currentStep` saja?

**Fitur:**
1. Step indicator dengan visual progress (step aktif, completed, upcoming)
2. Validasi per step sebelum bisa next
3. Back button (tanpa validasi)
4. Step data tersimpan saat navigating antar steps
5. Review step menampilkan semua data dari semua steps
6. Final submit dengan loading state

### Aturan
- Setiap step memiliki validation rules sendiri
- Navigasi ke step berikutnya WAJIB melewati validasi step saat ini
- Navigasi ke step sebelumnya TIDAK memerlukan validasi
- Data dari step sebelumnya harus tetap ada saat kembali ke step tersebut
- Submit tidak bisa dilakukan jika agreeToTerms belum dicentang

### Pertanyaan Analisis
1. Apa keuntungan multi-step form dibanding single form yang panjang?
2. Bagaimana cara menangani validasi yang bergantung pada data dari step lain?
3. Kapan sebaiknya menggunakan multi-step form vs single-page form?