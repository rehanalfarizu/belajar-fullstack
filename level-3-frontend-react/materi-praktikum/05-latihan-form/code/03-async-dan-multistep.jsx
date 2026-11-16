// ============================================================
// FILE: 05-latihan-form/code/03-async-form.jsx
// MATERI: Async Form Submission dan Custom useForm Hook
// ============================================================
import { useState, useRef } from "react";

// ============================================================
// TODO: Simulated API Functions
// ============================================================
// simulateApiCall(data, delay) → Promise
//
// checkUsernameAvailable(username) → Promise<{ available: boolean }>
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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
// Usage:
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

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