# Latihan 05 — Form Validation

## Soal 01: Touched State dan Field-level Validation

### Tujuan
Memahami touched state pattern untuk menampilkan error hanya setelah user berinteraksi dengan field, dan validasi per field yang bisa di-trigger saat blur.

### Deskripsi
Buat `RegistrationForm` dengan comprehensive validation dan touched state.

**Form Fields:**
```js
{
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  website: "",
 bio: "",
}
```

**Validation Rules:**
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

**Touched State Pattern:**
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

**Fitur:**
1. Error hanya tampil JIKA field sudah di-touch (touched[field] === true)
2. Error hilang saat user mulai mengetik lagi di field yang sama
3. Password strength meter (0-6 score) dengan visual bar
4. Bio character counter: "X / 200 karakter"
5. Submit attempt: semua field ditandai touched dan divalidasi
6. Form-level error: "Mohon perbaiki kesalahan di bawah" jika ada error

**Password Strength Display:**
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

### Aturan
- `handleBlur` wajib memanggil `setTouched` untuk menandai field sebagai touched
- Error display: `{touched[fieldName] && errors[fieldName] && <span>{errors[fieldName]}</span>}`
- Password strength dihitung dan ditampilkan SAAT user mengetik (bukan saat blur)
- Submit handler harus set semua field sebagai touched sebelum validasi

### Pertanyaan Analisis
1. Mengapa touched state diperlukan? Apa yang terjadi jika kita tampilkan semua error di awal?
2. Bagaimana validasi cross-field (confirmPassword vs password) ditangani berbeda dari field-level validation?
3. Kapan validasi saat blur lebih baik dibanding validasi saat typing?