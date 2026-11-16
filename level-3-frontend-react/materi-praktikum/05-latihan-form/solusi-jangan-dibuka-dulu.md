# Solusi — JANGAN DIBUKA DULU

Kerjakan soal sampai buntu, tulis dulu apa yang sudah kamu coba, baru buka file ini untuk membandingkan.

## 02-validasi-per-field.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 10–54 (sebelum diubah)

```jsx
function validateField(name, value, allValues = {}) {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Nama lengkap wajib diisi";
      if (value.trim().length < 2) return "Nama minimal 2 karakter";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Nama hanya boleh huruf dan spasi";
      return null;

    case "email":
      if (!value) return "Email wajib diisi";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
      return null;

    case "username":
      if (!value) return "Username wajib diisi";
      if (value.length < 3) return "Username minimal 3 karakter";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username hanya huruf, angka, dan underscore";
      return null;

    case "password":
      if (!value) return "Password wajib diisi";
      if (value.length < 8) return "Password minimal 8 karakter";
      if (!/(?=.*[A-Z])/.test(value)) return "Minimal 1 huruf besar";
      if (!/(?=.*[a-z])/.test(value)) return "Minimal 1 huruf kecil";
      if (!/(?=.*\d)/.test(value)) return "Minimal 1 angka";
      return null;

    case "confirmPassword":
      if (!value) return "Konfirmasi password wajib diisi";
      if (value !== allValues.password) return "Password tidak cocok";
      return null;

    case "age":
      if (!value) return "Umur wajib diisi";
      const ageNum = parseInt(value, 10);
      if (isNaN(ageNum)) return "Umur harus angka";
      if (ageNum < 17) return "Minimal 17 tahun";
      if (ageNum > 100) return "Maksimal 100 tahun";
      return null;

    default:
      return null;
  }
}
// ============================================================
```

### Baris 103–118 (sebelum diubah)

```jsx
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 2) return { score, label: "Lemah", color: "#ef4444" };
  if (score <= 4) return { score, label: "Cukup", color: "#f59e0b" };
  if (score <= 5) return { score, label: "Kuat", color: "#22c55e" };
  return { score, label: "Sangat Kuat", color: "#16a34a" };
}
// ============================================================
```

### Baris 146–162 (sebelum diubah)

```jsx
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value, form);
    setErrors(prev => error ? { ...prev, [name]: error } : { ...prev, [name]: undefined });
  };

Error Display:
  {touched.email && errors.email && <span className="error">{errors.email}</span>}

Fitur:
  1. Error hanya tampil JIKA field sudah di-touch
  2. Error hilang saat user mulai mengetik di field tersebut
  3. Password strength meter visual (bar)
  4. Bio character counter: "X / 200 karakter"
  5. Submit attempt: semua field ditandai touched
// ============================================================
```

### Baris 277–291 (sebelum diubah)

```jsx
function validateAddress(form) {
  const errors = {};
  if (!form.country) errors.country = "Pilih negara";
  if (!form.city) errors.city = "Kota wajib diisi";
  if (!form.address) errors.address = "Alamat wajib diisi";
  if (form.postalCode) {
    const formats = { Indonesia: /^\d{5}$/, Singapore: /^\d{6}$/, Malaysia: /^\d{5}$/ };
    const regex = formats[form.country];
    if (regex && !regex.test(form.postalCode)) {
      errors.postalCode = `Kode pos untuk ${form.country} harus ${form.country === "Singapore" ? "6" : "5"} digit`;
    }
  }
  return errors;
}
// ============================================================
```

## 03-async-dan-multistep.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 11–32 (sebelum diubah)

```jsx
function simulateApiCall(data, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "taken@demo.com") {
        reject(new Error("Email sudah terdaftar"));
      } else {
        resolve({ success: true, data });
      }
    }, delay);
  });
}

checkUsernameAvailable(username) → Promise<{ available: boolean }>
function checkUsernameAvailable(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = ["admin", "root", "superuser", "test", "demo"];
      resolve({ available: !taken.includes(username.toLowerCase()) });
    }, 800);
  });
}
// ============================================================
```

### Baris 71–114 (sebelum diubah)

```jsx
    3. If errors → return
    4. setIsSubmitting(true)
    5. try: await simulateApiCall(values)
       - success: setSubmitResult({ type: "success", message })
       - reset form
    6. catch err:
       - setSubmitResult({ type: "error", message: err.message })
    7. finally: setIsSubmitting(false)

function SignupForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... validate ...
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      await simulateApiCall(values);
      setSubmitResult({ type: "success", message: "Pendaftaran berhasil!" });
      setValues({ name: "", email: "", password: "" });
      setTouched({});
} catch (err) {
      setSubmitResult({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* inputs */}
      {submitResult && <div className={`alert ${submitResult.type}`}>{submitResult.message}</div>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Mendaftar..." : "Daftar"}
      </button>
    </form>
  );
}
// ============================================================
```

### Baris 144–190 (sebelum diubah)

```jsx
function UsernameInput() {
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const abortRef = useRef(null);

  const checkUsername = async (val) => {
    if (val.length < 3) { setAvailable(null); return; }

    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setChecking(true);
    setAvailable(null);

    try {
      const result = await checkUsernameAvailable(val);
      setAvailable(result.available);
    } catch (err) {
      if (err.name !== "AbortError") setAvailable(null);
    } finally {
      setChecking(false);
    }
  };

  // Debounced: hanya check setelah 300ms tidak ada typing
  const debouncedCheck = useRef(
    debounce((val) => checkUsername(val), 300)
  ).current;

  const handleChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    debouncedCheck(val);
  };

  return (
    <div>
      <input name="username" value={username} onChange={handleChange} />
      {checking && <span>⏳ Checking...</span>}
      {available === true && <span>✓ Username tersedia</span>}
      {available === false && <span>⚠️ Username sudah digunakan</span>}
    </div>
  );
}
// ============================================================
```

### Baris 214–249 (sebelum diubah)

```jsx
function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => { ... };
  const handleBlur = (e) => { ... };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... validate all ...
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset };
}

Usage:
  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm(
    { name: "", email: "" },
    validate,
    async (values) => { await simulateApiCall(values); }
  );
// ============================================================
```

## 04-form-submission.jsx (blok jawaban yang tadinya dikomentari di starter)

### Baris 120–149 (sebelum diubah)

```jsx
const LOCATION_DATA = {
  Indonesia: {
    "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur"],
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Sleman"],
    "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Madiun"],
    "Bali": ["Denpasar", "Badung", "Kuta", "Ubud"],
  },
  Malaysia: {
    "Wilayah Persekutuan": ["Kuala Lumpur", "Putrajaya", "Labuan"],
    "Selangor": ["Shah Alam", "Petaling Jaya", "Subang Jaya"],
    "Penang": ["George Town", "Batu Ferringhi"],
  },
  Singapore: {
    "Singapore": ["Orchard", "Marina Bay", "Sentosa", "Jurong", "Ang Mo Kio"],
  },
};

Cascading Logic:



Computed options:
  const countryOptions = Object.keys(LOCATION_DATA);
  const provinceOptions = form.country ? Object.keys(LOCATION_DATA[form.country]) : [];
  const cityOptions = form.province ? LOCATION_DATA[form.country]?.[form.province] || [] : [];
  const districtOptions = form.city ? LOCATION_DATA[form.country]?.[form.province]?.[form.city] || [] : [];

Postal code auto-fill:
  const postalCodes = { Indonesia: { "DKI Jakarta": "10", "Jawa Barat": "40", ... }, ... };
// ============================================================
```

## 02-validasi-per-field.jsx — `function validateField` (implementasi yang tadinya ada di starter)

```jsx
function validateField(name, value, allValues = {}) {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Nama lengkap wajib diisi";
      if (value.trim().length < 2) return "Nama minimal 2 karakter";
      return null;

    case "email":
      if (!value) return "Email wajib diisi";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
      return null;

    case "username":
      if (!value) return "Username wajib diisi";
      if (value.length < 3) return "Username minimal 3 karakter";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username hanya huruf, angka, dan underscore";
      return null;

    case "password":
      if (!value) return "Password wajib diisi";
      if (value.length < 8) return "Password minimal 8 karakter";
      if (!/(?=.*[A-Z])/.test(value)) return "Minimal 1 huruf besar";
      if (!/(?=.*[a-z])/.test(value)) return "Minimal 1 huruf kecil";
      if (!/(?=.*\d)/.test(value)) return "Minimal 1 angka";
      return null;

    case "confirmPassword":
      if (!value) return "Konfirmasi password wajib diisi";
      if (value !== allValues.password) return "Password tidak cocok";
      return null;

    case "age":
      if (!value) return "Umur wajib diisi";
      const ageNum = parseInt(value, 10);
      if (isNaN(ageNum)) return "Umur harus angka";
      if (ageNum < 17) return "Minimal 17 tahun";
      if (ageNum > 100) return "Maksimal 100 tahun";
      return null;

    default:
      return null;
  }
}
```

## 02-validasi-per-field.jsx — `function getPasswordStrength` (implementasi yang tadinya ada di starter)

```jsx
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 2) return { score, label: "Lemah", color: "#ef4444" };
  if (score <= 4) return { score, label: "Cukup", color: "#f59e0b" };
  if (score <= 5) return { score, label: "Kuat", color: "#22c55e" };
  return { score, label: "Sangat Kuat", color: "#16a34a" };
}
```

## 01-controlled-components Soal 01 — handleChange satu untuk semua input

```js
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};
```

## 01-controlled-components Soal 01 — Array skills dinamis

```js
const handleSkillChange = (index, value) => {
  setForm(prev => {
    const skills = [...prev.skills];
    skills[index] = value;
    return { ...prev, skills };
  });
};

const addSkill = () => {
  setForm(prev => ({
    ...prev,
    skills: [...prev.skills, ""]
  }));
};

const removeSkill = (index) => {
  setForm(prev => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index)
  }));
};
```

## 01-controlled-components Soal 01 — Format salary

```js
const formatCurrency = (value) => {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("id-ID");
};

const handleSalaryBlur = (e) => {
  const formatted = formatCurrency(e.target.value);
  setForm(prev => ({ ...prev, salary: formatted }));
};
```

## 02-validasi-per-field Soal 01 — validateField

```js
function validateField(name, value, allValues = {}) {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Nama lengkap wajib diisi";
      if (value.trim().length < 2) return "Nama minimal 2 karakter";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Nama hanya boleh huruf dan spasi";
      return null;

    case "email":
      if (!value) return "Email wajib diisi";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
      return null;

    case "username":
      if (!value) return "Username wajib diisi";
      if (value.length < 3) return "Username minimal 3 karakter";
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username hanya huruf, angka, dan underscore";
      return null;

    case "password":
      if (!value) return "Password wajib diisi";
      if (value.length < 8) return "Password minimal 8 karakter";
      if (!/(?=.*[A-Z])/.test(value)) return "Minimal1 huruf besar";
      if (!/(?=.*[a-z])/.test(value)) return "Minimal 1 huruf kecil";
      if (!/(?=.*\d)/.test(value)) return "Minimal1 angka";
      return null;

    case "confirmPassword":
      if (!value) return "Konfirmasi password wajib diisi";
      if (value !== allValues.password) return "Password tidak cocok";
      return null;

    case "age":
      if (!value) return "Umur wajib diisi";
      const ageNum = parseInt(value, 10);
      if (isNaN(ageNum)) return "Umur harus angka";
      if (ageNum < 17) return "Minimal17 tahun";
      if (ageNum > 100) return "Maksimal 100 tahun";
      return null;

    case "website":
      if (value && !/^https?:\/\/.+\..+/.test(value)) return "URL harus diawali http:// atau https://";
      return null;

    case "bio":
      if (value && value.length > 200) return "Bio maksimal 200 karakter";
      return null;

    default:
      return null;
  }
}
```

## 02-validasi-per-field Soal 01 — handleBlur dan touched

```js
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));

  const error = validateField(name, value, values);
  setErrors(prev => {
    const next = { ...prev };
    if (error) next[name] = error;
    else delete next[name];
    return next;
  });
};
```

## 02-validasi-per-field Soal 01 — getPasswordStrength

```js
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  if (score <= 2) return { score, label: "Lemah", color: "#ef4444" };
  if (score <= 4) return { score, label: "Cukup", color: "#f59e0b" };
  if (score <= 5) return { score, label: "Kuat", color: "#22c55e" };
  return { score, label: "Sangat Kuat", color: "#16a34a" };
}
```

## 03-async-dan-multistep Soal 01 — Focus ke field error pertama

```js
const firstErrorField = Object.keys(errors)[0];
if (firstErrorField) {
  document.querySelector(`[name="${firstErrorField}"]`)?.focus();
}
```

## 03-async-dan-multistep Soal 01 — Cek ketersediaan username

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

## 03-async-dan-multistep Soal 01 — Debounce cek username

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

## 03-async-dan-multistep Soal 02 — toggleSkill

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

## 03-async-dan-multistep Soal 02 — Navigasi antar step

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

## 03-async-dan-multistep Soal 02 — Step indicator

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

## 04-form-submission Soal 01 — Optimistic handleSubmit

```js
const handleSubmit = async (e) => {
  e.preventDefault();

  const newComment = {
    id: `C${Date.now()}`,
    author: form.author,
    content: form.content,
    timestamp: Date.now(),
    likes: 0,
    likedByUser: false,
  };

  // Optimistic: langsung tambahkan ke UI
  setComments(prev => [newComment, ...prev]);
  setForm({ author: "", content: "" });

  try {
    // Submit ke server
    await simulateApiCall(newComment);
    setSubmitStatus({ type: "success", message: "Komentar berhasil dikirim" });
  } catch (err) {
    // Rollback jika gagal
    setComments(prev => prev.filter(c => c.id !== newComment.id));
    setSubmitStatus({ type: "error", message: err.message });
    // Restore form data
    setForm({ author: newComment.author, content: newComment.content });
  }
};
```

## 04-form-submission Soal 01 — getRelativeTime

```js
function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (minutes > 0) return `${minutes} menit lalu`;
  return "Baru saja";
}
```

## 04-form-submission Soal 02 — Handler cascading dropdown

```js
const handleCountryChange = (country) => {
  setForm(prev => ({
    ...prev,
    country,
    province: "", // Reset dependent fields
    city: "",
    district: "",
 }));
};

const handleProvinceChange = (province) => {
  setForm(prev => ({
    ...prev,
    province,
    city: "",      // Reset city dan district
    district: "",
  }));
};

const handleCityChange = (city) => {
  setForm(prev => ({
    ...prev,
    city,
    district: "", // Reset district
  }));
};
```

## 04-form-submission Soal 02 — Opsi dropdown turunan

```js
const provinceOptions = form.country ? Object.keys(LOCATION_DATA[form.country]) : [];
const cityOptions = form.province ? LOCATION_DATA[form.country]?.[form.province] || [] : [];
const districtOptions = form.city ? LOCATION_DATA[form.country]?.[form.province]?.[form.city] || [] : [];
```
