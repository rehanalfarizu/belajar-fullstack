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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
============================================================
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
