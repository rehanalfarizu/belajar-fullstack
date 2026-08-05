# SOAL 10 — Context API

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Mengimplementasikan Context API untuk global state management
2. Memahami Provider-Consumer pattern
3. Menggabungkan Context dengan useReducer untuk complex state
4. Mengoptimasi Context untuk mencegah unnecessary re-renders

---

## Briefing
Context API memungkinkan komponen mengonsumsi data dari context tanpa harus melempar props di setiap level. Berbeda dengan useContext saja, Context API mencakup pembuatan context, provider, dan consumer dalam satu sistem yang terintegrasi.

---

## Deskripsi

### Soal 10A — LanguageContext (i18n)
Context untuk internationalization (i18n):

```jsx
// LanguageContext
// State: locale ("id" | "en"), translations object
// Provider: LanguageProvider({ children })
// Consumer: useLanguage() hook

// Fitur:
// 1. Switch bahasa Indonesia / English
// 2. Translations object dengan nested keys
// 3. t(key) function untuk translate
// 4. Locale persisted ke localStorage
```

**Sample translations:**
```jsx
const translations = {
  id: {
    greeting: "Halo, {name}!",
    welcome: "Selamat datang",
    cart: { empty: "Keranjang kosong", count: "{n} item" },
 },
  en: {
    greeting: "Hello, {name}!",
    welcome: "Welcome",
    cart: { empty: "Cart is empty", count: "{n} item(s)" },
  },
};
```

### Soal 10B — NotificationContext
Context untuk global notification system:

```jsx
// NotificationContext
// State: { notifications: [], unreadCount }
// Provider: NotificationProvider({ children })
// Consumer: useNotifications() hook

// Actions:
// - addNotification(text, type) → type: "success" | "error" | "info" | "warning"
// - removeNotification(id)
// - markAsRead(id)
// - clearAll()

// Fitur:
//1. Toast notification yang auto-dismiss (3 detik)
// 2. Badge count di navbar
// 3. Notification list panel
// 4. Different styling per type
```

### Soal 10C — ShoppingCartContext
Context untuk shopping cart dengan complex state:

```jsx
// CartContext
// State: { items: [], couponCode, discountPercent }
// Reducer actions: ADD, REMOVE, UPDATE_QTY, CLEAR, APPLY_COUPON

// Fitur:
// 1. Add item dengan quantity
// 2. Remove item
// 3. Update quantity (+/-)
// 4. Apply coupon code ("DISKON10" → 10%, "DISKON20" → 20%)
// 5. Computed: subtotal, discount, total
// 6. Empty cart state
```

**Coupon codes:**
- `DISKON10` → 10% discount
- `DISKON20` → 20% discount
- `HEMAT` → flat Rp 50.000 off

### Soal 10D — Combined Store App
Full-featured store app dengan semua context:

```jsx
// App structure:
// <StoreProvider>
//   <LanguageProvider>
//     <CartProvider>
//       <NotificationProvider>
//         <App />
//       </NotificationProvider>
//     </CartProvider>
//   </LanguageProvider>
// </StoreProvider>

// Features:
// 1. Language switch (ID/EN)
// 2. Product catalog dengan add to cart
// 3. Cart badge dengan notification on add
// 4. Cart page dengan coupon + checkout
// 5. All text menggunakan t() function
```

---

## Syarat (Checklist)
- [ ] LanguageContext: switch bahasa, t() function, nested keys
- [ ] NotificationContext: add/remove/markAsRead, auto-dismiss toast
- [ ] CartContext: add/remove/update qty, coupon system, computed totals
- [ ] Combined Store: semua context bekerja bersama
- [ ] Optimasi: context split per domain untuk mencegah re-render

---

## Expected Output
- Language switch mengubah semua text
- Toast notification muncul saat add to cart
- Cart dengan coupon code yang berfungsi
- Full store app berfungsi

---

## Cara Submit
1. Simpan sebagai `10-context-api.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai

---

## Catatan
- Context split: berbeda contexts untuk data yang berbeda (cart vs language vs notifications)
- Memoize context value dengan `useMemo` untuk mencegah re-render
- Provider nesting order penting — NotificationContext mungkin butuh CartContext
- Context bukan global state — masih ada batasannya untuk aplikasi sangat besar