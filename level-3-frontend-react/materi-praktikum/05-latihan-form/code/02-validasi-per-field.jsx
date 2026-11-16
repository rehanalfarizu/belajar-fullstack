// ============================================================
// FILE: 05-latihan-form/code/02-validasi-per-field.jsx
// MATERI: Form Validation — Touched State dan Field-level Validation
// ============================================================
import { useState } from "react";

// ============================================================
// TODO: Validation Functions
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

// TODO(human): validateField(name, value, allValues)
// Mengembalikan pesan error (string) atau null kalau valid.
// Aturan: tulis dulu di tabel (field, aturan, pesan) sebelum membuat kodenya, lalu ikuti soal.
// Petunjuk: confirmPassword perlu membandingkan dengan nilai field lain (allValues).
// Selesai kalau: tiap field punya satu input valid dan satu input tidak valid yang kamu uji.
function validateField(name, value, allValues = {}) {
  return null;
}

// ============================================================
// TODO: Password Strength Meter
// ============================================================
//
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

// TODO(human): getPasswordStrength(password) -> { score, label, color }
// Petunjuk: tentukan sendiri kriteria skor (panjang, huruf besar/kecil, angka, simbol).
// Selesai kalau: password kosong, lemah, dan kuat memberi label berbeda.
function getPasswordStrength(password) {
  return { score: 0, label: "", color: "" };
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
//
// Error Display:
//
// Fitur:
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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