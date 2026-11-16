// ============================================================
// FILE: 05-latihan-form/code/03-async-form.jsx
// MATERI: Async Form Submission dan Custom useForm Hook
// ============================================================
import { useState, useRef } from "react";

// ============================================================
// TODO: Simulated API Functions
// ============================================================
// simulateApiCall(data, delay) → Promise
// function simulateApiCall(data, delay = 1000) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (data.email === "taken@demo.com") {
//         reject(new Error("Email sudah terdaftar"));
//       } else {
//         resolve({ success: true, data });
//       }
//     }, delay);
//   });
// }
//
// checkUsernameAvailable(username) → Promise<{ available: boolean }>
// function checkUsernameAvailable(username) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const taken = ["admin", "root", "superuser", "test", "demo"];
//       resolve({ available: !taken.includes(username.toLowerCase()) });
//     }, 800);
//   });
// }
// ============================================================

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

function checkUsernameAvailable(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = ["admin", "root", "superuser", "test", "demo"];
      resolve({ available: !taken.includes(username.toLowerCase()) });
    }, 800);
  });
}

// ============================================================
// TODO: Async Form Submission
// ============================================================
// Fitur:
//   1. State: values, errors, touched, isSubmitting, submitResult
//2. Validation sebelum submit
//   3. Submit ke API dengan try/catch
//   4. Loading state pada tombol saat submit
//   5. Success message setelah submit berhasil
//   6. Error message jika submit gagal
//   7. Reset form setelah success
//
// Flow:
//   handleSubmit:
//     1. e.preventDefault()
//2. Validate all fields
//     3. If errors → return
//     4. setIsSubmitting(true)
//     5. try: await simulateApiCall(values)
//        - success: setSubmitResult({ type: "success", message })
//        - reset form
//     6. catch err:
//        - setSubmitResult({ type: "error", message: err.message })
//     7. finally: setIsSubmitting(false)
//
// function SignupForm() {
//   const [values, setValues] = useState({ name: "", email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState(null);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // ... validate ...
//     setIsSubmitting(true);
//     setSubmitResult(null);
//     try {
//       await simulateApiCall(values);
//       setSubmitResult({ type: "success", message: "Pendaftaran berhasil!" });
//       setValues({ name: "", email: "", password: "" });
//       setTouched({});
// } catch (err) {
//       setSubmitResult({ type: "error", message: err.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* inputs */}
//       {submitResult && <div className={`alert ${submitResult.type}`}>{submitResult.message}</div>}
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Mendaftar..." : "Daftar"}
//       </button>
//     </form>
//   );
// }
// ============================================================

export function SignupForm() {
  // TODO: State

  // TODO: handleChange, handleBlur

  // TODO: validate function

  // TODO: handleSubmit dengan async/await

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* TODO: Inputs */}
      {/* TODO: Alert result display */}
      {/* TODO: Submit button dengan disabled state */}
    </form>
  );
}

// ============================================================
// TODO: Async Validation (Username Availability)
// ============================================================
// Fitur:
//   1. State: checkingUsername, usernameAvailable, abortController
//   2. Debounced check saat username berubah
//   3. AbortController untuk cancel request sebelumnya
//   4. Loading indicator saat checking
//   5. Display: "Checking...", "✓ Available", "⚠️ Taken"
//
// function UsernameInput() {
//   const [username, setUsername] = useState("");
//   const [checking, setChecking] = useState(false);
//   const [available, setAvailable] = useState(null);
//   const abortRef = useRef(null);
//
//   const checkUsername = async (val) => {
//     if (val.length < 3) { setAvailable(null); return; }
//
//     // Cancel previous request
//     if (abortRef.current) abortRef.current.abort();
//     abortRef.current = new AbortController();
//
//     setChecking(true);
//     setAvailable(null);
//
//     try {
//       const result = await checkUsernameAvailable(val);
//       setAvailable(result.available);
//     } catch (err) {
//       if (err.name !== "AbortError") setAvailable(null);
//     } finally {
//       setChecking(false);
//     }
//   };
//
//   // Debounced: hanya check setelah 300ms tidak ada typing
//   const debouncedCheck = useRef(
//     debounce((val) => checkUsername(val), 300)
//   ).current;
//
//   const handleChange = (e) => {
//     const val = e.target.value;
//     setUsername(val);
//     debouncedCheck(val);
//   };
//
//   return (
//     <div>
//       <input name="username" value={username} onChange={handleChange} />
//       {checking && <span>⏳ Checking...</span>}
//       {available === true && <span>✓ Username tersedia</span>}
//       {available === false && <span>⚠️ Username sudah digunakan</span>}
//     </div>
//   );
// }
// ============================================================

export function UsernameInput() {
  // TODO: State untuk username, checking, available

  // TODO: useRef untuk AbortController

  // TODO: Debounced check function

  // TODO: handleChange dengan debounce

  return (
    <div>
      {/* TODO: Username input */}
      {/* TODO: Status display */}
    </div>
  );
}

// ============================================================
// TODO: useForm Custom Hook
// ============================================================
// Ekstrak semua form logic ke custom hook
//
// function useForm(initialValues, validate, onSubmit) {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//
//   const handleChange = (e) => { ... };
//   const handleBlur = (e) => { ... };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // ... validate all ...
//     setIsSubmitting(true);
//     try {
//       await onSubmit(values);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   const reset = () => {
//     setValues(initialValues);
//     setErrors({});
//     setTouched({});
//   };
//
//   return { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset };
// }
//
// Usage:
//   const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm(
//     { name: "", email: "" },
//     validate,
//     async (values) => { await simulateApiCall(values); }
//   );
// ============================================================

function useForm(initialValues, validate, onSubmit) {
  // TODO: Implementasikan useForm hook
}

// ============================================================
// DEMO: SignupForm dengan useForm Hook
// ============================================================
export function SignupFormWithHook() {
  // TODO: Gunakan useForm untuk implementasi SignupForm
  // const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, reset } = useForm(
  //   { name: "", email: "", password: "" },
  //   validate,
  //   async (values) => { await simulateApiCall(values); }
  // );
}