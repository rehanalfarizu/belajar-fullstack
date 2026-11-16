/**
 * ============================================================
 * BONUS — Integration Testing: Redux Slice (kerangka)
 * ============================================================
 * Kode yang diuji (reducer, selector, thunk) sudah tersedia di bawah.
 * KAMU menulis test-nya: ubah `test.todo` jadi test sungguhan.
 *
 * Install:
 *   npm install @reduxjs/toolkit
 *   npm install --save-dev jest
 *
 * Jalankan (sesuaikan path):
 *   npx jest 02-slice.test.js
 *
 * Kunci jawaban: ../solusi-jangan-dibuka-dulu.md (jangan dibuka dulu).
 * ============================================================
 */

import { configureStore } from '@reduxjs/toolkit';

// ============================================================
// SAMPLE SLICE: Product Cart Slice
// Acts as the implementation reference + the slice you test.
// In the real exam, this slice would be in a separate file
// (e.g., src/store/cartSlice.js).
// ============================================================

const initialState = {
  items: [],      // Array<{ id, name, price, quantity }>
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedId: null,
};

// Pure reducer function (no side effects)
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'cart/addItem': {
      const { id, name, price } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { id, name, price, quantity: 1 }],
      };
    }

    case 'cart/removeItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'cart/updateItem':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload }
            : item
        ),
      };

    case 'cart/clearAll':
      return { ...state, items: [] };

    case 'cart/setStatus':
      return { ...state, status: action.payload };

    case 'cart/setError':
      return { ...state, error: action.payload, status: 'failed' };

    case 'cart/selectItem':
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}

// ============================================================
// SELECTORS
// ============================================================

const selectCartItems      = state => state.cart.items;
const selectCartStatus     = state => state.cart.status;
const selectCartError      = state => state.cart.error;
const selectSelectedId     = state => state.cart.selectedId;
const selectSelectedItem   = state => {
  const { items, selectedId } = state.cart;
  return items.find(item => item.id === selectedId) ?? null;
};
const selectCartTotal      = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const selectItemCount      = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
const selectIsEmpty        = state => state.cart.items.length === 0;

// ============================================================
// ASYNC THUNK: fetchCartItems
// Simulates an API call. We mock globalThis.fetch to control behavior.
// ============================================================

function fetchCartItemsThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: 'cart/setStatus', payload: 'loading' });
    dispatch({ type: 'cart/setError', payload: null });

    try {
      // In real code: const res = await fetch('/api/cart');
      // We mock globalThis.fetch instead.
      const response = await globalThis.fetch('/api/cart');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      dispatch({ type: 'cart/setStatus', payload: 'succeeded' });
      // Normally you'd dispatch cart/addItem for each item
      return data;
    } catch (err) {
      dispatch({ type: 'cart/setError', payload: err.message });
      throw err;
    }
  };
}

// ============================================================
// TEST STORE SETUP
// ============================================================

function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });
}

// ============================================================
// HELPER: waitFor — utility to wait for async thunk to settle
// ============================================================

async function waitForStore(store) {
  // After dispatching a thunk, store updates asynchronously.
  // We use a small delay to let the promise chain settle.
  await new Promise(resolve => setTimeout(resolve, 0));
}

// ============================================================
// TESTS (isi sendiri)
// ============================================================
// Tips: buat store baru untuk setiap test (createTestStore) supaya test
// tidak saling bergantung.

describe('cartReducer — addItem', () => {
  // TODO(human): Uji menambah item baru dan menambah item yang sudah ada.
  // Petunjuk: apa yang SEHARUSNYA terjadi pada quantity? Tulis harapanmu
  //           dulu, baru jalankan.
  // Selesai kalau: ada test untuk item baru DAN item duplikat.
  test.todo('item baru masuk dengan quantity 1');
  test.todo('item yang sama menaikkan quantity');
  test.todo('state lama tidak dimutasi');
});

describe('cartReducer — removeItem / updateItem / clearAll', () => {
  // TODO(human): Uji tiap aksi, termasuk kasus id yang tidak ada.
  test.todo('removeItem membuang item yang tepat');
  test.todo('removeItem dengan id tidak dikenal tidak mengubah apa pun');
  test.todo('updateItem hanya mengubah item yang dituju');
  test.todo('clearAll mengosongkan items');
});

describe('cartReducer — setStatus & setError', () => {
  // TODO(human): Perhatikan efek samping setError pada status.
  test.todo('setStatus mengganti status');
  test.todo('setError menyimpan pesan dan menandai gagal');
});

describe('selectors', () => {
  // TODO(human): Siapkan state berisi beberapa item dan hitung hasil yang
  //              diharapkan dengan tanganmu (bukan dari output selector).
  test.todo('selectCartTotal menghitung harga x quantity');
  test.todo('selectItemCount menjumlah quantity');
  test.todo('selectSelectedItem mengembalikan null bila tidak ada yang dipilih');
  test.todo('selectIsEmpty benar untuk keranjang kosong');
});

describe('fetchCartItemsThunk — async dengan fetch palsu', () => {
  // TODO(human): Ganti globalThis.fetch dengan jest.fn() agar tidak ada
  //              permintaan jaringan. Uji jalur sukses dan jalur gagal
  //              (response.ok = false, dan fetch yang reject).
  // Petunjuk: pulihkan fetch asli setelah test (afterEach).
  // Selesai kalau: kedua jalur diuji dan status akhir di store sesuai.
  test.todo('sukses: status loading lalu succeeded');
  test.todo('HTTP error: status failed dan pesan error tersimpan');
  test.todo('jaringan putus: error dilempar ulang');
});

describe('Integration — alur keranjang lengkap', () => {
  // TODO(human): Satu skenario nyata: tambah, ubah jumlah, hapus, cek total
  //              di tiap langkah lewat selector.
  test.todo('tambah -> ubah -> hapus menghasilkan total yang benar');
});
