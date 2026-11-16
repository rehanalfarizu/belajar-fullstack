# SOAL 03 — useContext dan useReducer

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Menggunakan `useReducer` untuk state management terstruktur
2. Membuat reducer dengan multiple action types
3. Menggabungkan `useReducer` dengan `useContext` untuk global state
4. Memahami dispatch pattern

---

## Briefing
`useReducer` adalah alternatif untuk `useState` saat logic state transition kompleks. Combined dengan `useContext`, kita bisa membuat global state management tanpa library tambahan.

---

## Deskripsi

### Soal 3A — Shopping Cart dengan useReducer
Reducer untuk shopping cart:

**State:**
```js
{
  items: [{ id, name, price, quantity }],
  discount:0, // persen (0-100)
  shippingCost: 0,
}
```

**Action Types:**
- `ADD_ITEM`: tambah item baru (jika sudah ada → increment quantity)
- `REMOVE_ITEM`: hapus item berdasarkan id
- `UPDATE_QUANTITY`: update quantity item (jika <= 0 → hapus)
- `APPLY_DISCOUNT`: set discount persen
- `RESET_CART`: reset ke initial state

**Derived Values (hitung langsung, bukan state):**
- Subtotal: jumlah harga × quantity per item
- Discount amount: subtotal × (discount / 100)
- Total: subtotal - discount + shippingCost

### Soal 3B — CartContext Provider
`CartContext` dengan:
- `CartProvider` membungkus aplikasi
- Value: `{ state, dispatch }`
- `useCart()` hook untuk consuming

Fitur tambahan:
- `selectTotal`: selector untuk total
- `selectItemCount`: selector untuk jumlah item berbeda

### Soal 3C — Cart UI
`CartApp` component:
- `CartItem`: render satu item dengan + / - quantity buttons + remove
- `CartSummary`: subtotal, discount, shipping, total
- `AddItemForm`: input name, price, quantity → dispatch ADD_ITEM
- `DiscountInput`: input persen → dispatch APPLY_DISCOUNT

---

## Syarat (Checklist)
- [ ] Reducer menangani semua 5 action types
- [ ] Dispatch dipanggil dari UI components
- [ ] CartContext.Provider membungkus aplikasi
- [ ] useCart() hook bisa diakses dari component mana pun
- [ ] Derived values dihitung dari state (bukan state terpisah)
- [ ] Add item dengan quantity existing → increment bukan duplikat

---

## Expected Output
- Shopping cart dengan add/remove/update quantity
- Discount diterapkan dan total dihitung dengan benar
- State terstruktur dalam reducer — tidak ada setState langsung di component

---

## Cara Submit
1. Simpan sebagai `03-useContext-useReducer.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai