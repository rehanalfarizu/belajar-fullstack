// ============================================================
// FILE: 02-latihan-hooks/code/03-useContext-useReducer.jsx
// MATERI: useReducer + Context — Shopping Cart (soal/03-useContext-useReducer.md)
// ============================================================
import { createContext, useContext, useReducer } from "react";

// ============================================================
// Soal 3A — Reducer
// ============================================================
// State awal: { items: [], discount: 0, shippingCost: 0 }
// Action    : ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, APPLY_DISCOUNT, RESET_CART
//
// TODO(human): tulis `initialState`.
// Petunjuk: ADD_ITEM untuk id yang sudah ada = tambah quantity, bukan baris baru.
// Petunjuk: UPDATE_QUANTITY dengan hasil <= 0 berarti item dihapus.
// Petunjuk: reducer harus murni. Jangan mengubah `state` langsung.
// Petunjuk: tulis dulu sebagai fungsi biasa dan tes dengan console.log
//           sebelum disambungkan ke React.
//
// Selesai kalau: reducer(state, action) untuk kelima action memberi state baru
// yang benar, dan action tidak dikenal tidak diam-diam diabaikan.

// TODO(human): export function cartReducer(state, action) { ... }

// ============================================================
// Soal 3B — Context dan Provider
// ============================================================
// Value yang disediakan: { state, dispatch }
// Hook konsumsi: useCart()
//
// Petunjuk: nilai turunan (subtotal, diskon, total) dihitung dari state,
//           jangan disimpan sebagai state terpisah.
// Petunjuk: apa yang terjadi kalau useCart() dipanggil di luar Provider?
//
// Selesai kalau: komponen mana pun di dalam CartProvider bisa membaca
// state dan mengirim dispatch, dan pemakaian di luar Provider memberi pesan jelas.

const CartContext = createContext(null);

// TODO(human): export function CartProvider({ children }) { ... }
// TODO(human): export function useCart() { ... }
// TODO(human): selectTotal(state) dan selectItemCount(state)

// ============================================================
// Soal 3C — UI
// ============================================================
// Komponen: CartItem, CartSummary, AddItemForm, DiscountInput, CartApp
//
// Selesai kalau: semua perubahan state lewat dispatch (tidak ada setState
// langsung di komponen) dan total di layar cocok dengan hitungan manualmu.

export function CartApp() {
  // TODO(human): gabungkan semua komponen di atas di dalam CartProvider
  return null;
}

// Latihan lanjutan:
// 1. Tulis unit test reducer untuk setiap action dan action tidak dikenal.
// 2. Tambahkan batas maksimum quantity.
// 3. Ukur render dengan React DevTools Profiler.
