# Latihan 05 — Form UX dan Async Validation

## Soal 01: Form UX — Focus Management dan Async Validation

### Tujuan
Memahami aspek UX dalam form handling: focus management, debounced async validation, dan visual feedback.

### Deskripsi
Buat `SearchableSignupForm` dengan focus management dan async username availability check.

**Fitur:**

1. **Auto-focus**: form input pertama (fullName) auto-focus saat mount
2. **Focus on error**: saat submit gagal, focus ke field pertama yang error
   ```js
   const firstErrorField = Object.keys(errors)[0];
   if (firstErrorField) {
     document.querySelector(`[name="${firstErrorField}"]`)?.focus();
   }
   ```
3. **Clear error on focus**: error message hilang saat user mulai memperbaiki field
4. **Async username check**: debounced 300ms, check availability via API
5. **Loading indicator**: tampilkan spinner/skeleton saat checking username
6. **Availability feedback**: visual feedback (green check / red X) setelah check selesai

**Username Availability Check:**
```js
const [usernameStatus, setUsernameStatus] = useState({
  checking: false,
  available: null, // null | true | false
  error: null,
});

const abortRef = useRef(null);

const checkUsername = async (username) => {
  if (username.length < 3) {
    setUsernameStatus({ checking: false, available: null, error: null });
    return;
  }

  // Cancel previous request
  if (abortRef.current) abortRef.current.abort();
  abortRef.current = new AbortController();

  setUsernameStatus({ checking: true, available: null, error: null });

  try {
    await new Promise(r => setTimeout(r, 500)); // simulate API
    const taken = ["admin", "root", "test", "demo", "user"];
    const available = !taken.includes(username.toLowerCase());
    setUsernameStatus({ checking: false, available, error: null });
  } catch (err) {
    if (err.name !== "AbortError") {
      setUsernameStatus({ checking: false, available: null, error: "Gagal check username" });
    }
  }
};
```

**Debounced Check:**
```js
const debouncedCheck = useRef(
  debounce((val) => checkUsername(val), 300)
).current;

const handleUsernameChange = (e) => {
  const val = e.target.value;
  setForm(prev => ({ ...prev, username: val }));
  debouncedCheck(val);
};
```

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
```js
const toggleSkill = (skill) => {
  setFormData(prev => {
    const skills = prev.step2.skills.includes(skill)
      ? prev.step2.skills.filter(s => s !== skill)
      : [...prev.step2.skills, skill];
    return { ...prev, step2: { ...prev.step2, skills } };
  });
};
```

**Step Navigation:**
```js
const validateCurrentStep = () => {
  const stepData = formData[`step${currentStep}`];
  const stepErrors = validateStep(currentStep, stepData);
  setErrors(stepErrors);
  return Object.keys(stepErrors).length === 0;
};

const handleNext = () => {
  if (validateCurrentStep()) {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  }
};

const handleBack = () => {
  setCurrentStep(prev => Math.max(prev - 1, 1));
};
```

**Progress Indicator:**
```jsx
<div className="step-indicator">
  {[1, 2, 3, 4].map(step => (
    <div
      key={step}
      className={`step ${step === currentStep ? "active" : ""} ${step < currentStep ? "completed" : ""}`}
    >
      <span className="step-number">{step < currentStep ? "✓" : step}</span>
      <span className="step-label">{labels[step]}</span>
    </div>
  ))}
</div>
```

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