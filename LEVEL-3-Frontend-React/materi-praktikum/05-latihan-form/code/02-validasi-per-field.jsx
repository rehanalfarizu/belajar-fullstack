// ============================================================
// FILE: 05-latihan-form/code/02-validation.jsx
// MATERI: Form Validation — Touched State dan Field-level Validation
// ============================================================
import { useState } from "react";

// ============================================================
// TODO: Validation Functions
// ============================================================
// function validateField(name, value, allValues = {}) {
//   switch (name) {
//     case "fullName":
//       if (!value.trim()) return "Nama lengkap wajib diisi";
//       if (value.trim().length < 2) return "Nama minimal 2 karakter";
//       if (!/^[a-zA-Z\s]+$/.test(value)) return "Nama hanya boleh huruf dan spasi";
//       return null;
//
//     case "email":
//       if (!value) return "Email wajib diisi";
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
//       return null;
//
//     case "username":
//       if (!value) return "Username wajib diisi";
//       if (value.length < 3) return "Username minimal 3 karakter";
//       if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username hanya huruf, angka, dan underscore";
//       return null;
//
//     case "password":
//       if (!value) return "Password wajib diisi";
//       if (value.length < 8) return "Password minimal 8 karakter";
//       if (!/(?=.*[A-Z])/.test(value)) return "Minimal 1 huruf besar";
//       if (!/(?=.*[a-z])/.test(value)) return "Minimal 1 huruf kecil";
//       if (!/(?=.*\d)/.test(value)) return "Minimal 1 angka";
//       return null;
//
//     case "confirmPassword":
//       if (!value) return "Konfirmasi password wajib diisi";
//       if (value !== allValues.password) return "Password tidak cocok";
//       return null;
//
//     case "age":
//       if (!value) return "Umur wajib diisi";
//       const ageNum = parseInt(value, 10);
//       if (isNaN(ageNum)) return "Umur harus angka";
//       if (ageNum < 17) return "Minimal 17 tahun";
//       if (ageNum > 100) return "Maksimal 100 tahun";
//       return null;
//
//     default:
//       return null;
//   }
// }
// ============================================================

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

// ============================================================
// TODO: Password Strength Meter
// ============================================================
// function getPasswordStrength(password) {
//   if (!password) return { score: 0, label: "", color: "" };
//   let score = 0;
//   if (password.length >= 8) score++;
//   if (password.length >= 12) score++;
//   if (/[A-Z]/.test(password)) score++;
//   if (/[a-z]/.test(password)) score++;
//   if (/\d/.test(password)) score++;
//   if (/[!@#$%^&*]/.test(password)) score++;
//
//   if (score <= 2) return { score, label: "Lemah", color: "#ef4444" };
//   if (score <= 4) return { score, label: "Cukup", color: "#f59e0b" };
//   if (score <= 5) return { score, label: "Kuat", color: "#22c55e" };
//   return { score, label: "Sangat Kuat", color: "#16a34a" };
// }
// ============================================================

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
// TODO: RegistrationForm dengan Touched State Pattern
// ============================================================
// State:
//   - form: { fullName, email, username, password, confirmPassword, age }
//   - touched: { fullName: false, email: false, ... }
//   - errors: { fullName: null, email: null, ... }
//   - submitted: boolean
//
// Touched State Pattern:
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched(prev => ({ ...prev, [name]: true }));
//     const error = validateField(name, value, form);
//     setErrors(prev => error ? { ...prev, [name]: error } : { ...prev, [name]: undefined });
//   };
//
// Error Display:
//   {touched.email && errors.email && <span className="error">{errors.email}</span>}
//
// Fitur:
//   1. Error hanya tampil JIKA field sudah di-touch
//   2. Error hilang saat user mulai mengetik di field tersebut
//   3. Password strength meter visual (bar)
//   4. Bio character counter: "X / 200 karakter"
//   5. Submit attempt: semua field ditandai touched
// ============================================================

export function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    bio: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // TODO: handleChange — update form

  // TODO: handleBlur — set touched + validate

  // TODO: handleSubmit — set semua touched + validate semua

  // TODO: getPasswordStrength — gunakan function di atas

  // TODO: isFormValid — semua field valid

  return (
    <div className="registration-form">
      <h1>Daftar Akun Baru</h1>

      {submitted && !Object.values(errors).some(e => e) && (
        <div className="success">Pendaftaran berhasil!</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* TODO: fullName field + error display */}
        {/* TODO: email field + error display */}
        {/* TODO: username field + error display */}
        {/* TODO: password field + strength meter */}
        {/* TODO: confirmPassword field + error display */}
        {/* TODO: age field + error display */}
        {/* TODO: bio field + character counter */}

        {/* TODO: Submit button dengan disabled state */}
      </form>

      {/* TODO: Error summary di atas form jika ada */}
    </div>
  );
}

// ============================================================
// TODO: LoginForm dengan Validasi
// ============================================================
// State:
//   - form: { email, password }
//   - touched: { email, password }
//   - errors: { email, password }
//
// Fitur:
//   1. Email validation (required, format)
//   2. Password validation (required, min 6 chars)
//   3. Error hanya tampil setelah blur atau submit attempt
//   4. Show/hide password toggle
//   5. "Remember me" checkbox
//
// Error message display:
//   {touched.email && errors.email && <p className="error">{errors.email}</p>}
// ============================================================

export function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // TODO: handleChange

  // TODO: handleBlur

  // TODO: validateLogin — synchronous validation

  // TODO: handleSubmit

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form>
        {/* TODO: email field */}
        {/* TODO: password field dengan show/hide toggle */}
        {/* TODO: remember me checkbox */}
        {/* TODO: Error messages */}
        {/* TODO: Submit button */}
      </form>
    </div>
  );
}

// ============================================================
// TODO: AddressForm — Cross-field Validation
// ============================================================
// State:
//   - form: { country, city, postalCode, address }
//   - touched, errors
//
// Validation rules:
//   - postalCode Indonesia: 5 digit
//   - postalCode Singapore: 6 digit
//   - postalCode Malaysia: 5 digit
//   - City required for all countries
//   - Address required for all countries
//
// Cross-field validation: postalCode format depends on country
//
// function validateAddress(form) {
//   const errors = {};
//   if (!form.country) errors.country = "Pilih negara";
//   if (!form.city) errors.city = "Kota wajib diisi";
//   if (!form.address) errors.address = "Alamat wajib diisi";
//   if (form.postalCode) {
//     const formats = { Indonesia: /^\d{5}$/, Singapore: /^\d{6}$/, Malaysia: /^\d{5}$/ };
//     const regex = formats[form.country];
//     if (regex && !regex.test(form.postalCode)) {
//       errors.postalCode = `Kode pos untuk ${form.country} harus ${form.country === "Singapore" ? "6" : "5"} digit`;
//     }
//   }
//   return errors;
// }
// ============================================================

const COUNTRIES = ["Indonesia", "Singapore", "Malaysia"];

export function AddressForm() {
  const [form, setForm] = useState({ country: "", city: "", postalCode: "", address: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // TODO: handleChange

  // TODO: handleBlur

  // TODO: validateAddress — cross-field validation

  // TODO: handleSubmit

  return (
    <div className="address-form">
      <h1>Alamat Pengiriman</h1>
      <form>
        {/* TODO: country select */}
        {/* TODO: city input */}
        {/* TODO: postalCode input */}
        {/* TODO: address textarea */}
        {/* TODO: Error messages */}
        {/* TODO: Submit */}
      </form>
    </div>
  );
}