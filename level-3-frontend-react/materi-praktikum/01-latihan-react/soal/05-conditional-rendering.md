# SOAL 05 — Conditional Rendering

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Menggunakan operator ternary untuk conditional rendering
2. Menggunakan short-circuit operator (&&, ||) untuk conditional
3. Menggabungkan multiple conditions dengan pattern yang tepat
4. Menghindari common pitfalls dalam conditional rendering

---

## Briefing
Conditional rendering di React adalah teknik menampilkan komponen/element secara kondisional berdasarkan state atau props. Ada beberapa pola yang perlu dikuasai: ternary untuk on/off, && untuk guard clause, dan || untuk fallback values.

---

## Deskripsi

### Soal 5A — AuthStatus Component
Component dengan conditional rendering berdasarkan auth state:

```jsx
// State: user object atau null
// - Jika authenticated: tampilkan "Welcome, {name}" + Logout button
// - Jika guest: tampilkan "Please login" + Login button
// - Jika loading: tampilkan "Memuat..."

// Gunakan ternary operator untuk 3 kondisi
// Style berbeda untuk authenticated vs guest
```

**Fitur:**
1. 3 states: authenticated, unauthenticated, loading
2. Welcome message dengan nama user
3. Logout/Login button dengan handler
4. Loading spinner saat isLoading === true

### Soal 5B — NotificationPanel
Component dengan conditional rendering yang lebih kompleks:

```jsx
// State: notifications array, showPanel boolean
// - Badge: tampilkan count jika > 0, hidden jika 0
// - Panel: expand/collapse dengan animation
// - Empty state: "Tidak ada notifikasi" jika array kosong
// - List state: render notifications dengan .map()

// Pattern: && operator untuk guard clause
// Pattern: ternary untuk different content
// Pattern: || operator untuk default/fallback
```

**Fitur:**
1. Toggle button untuk show/hide panel
2. Unread count badge (hanya tampil jika > 0)
3. Empty state dengan ilustrasi/pesan
4. Mark as read per notification
5. Clear all button (hanya tampil jika ada notification)

### Soal 5C — ShippingCalculator
Component dengan conditional calculation display:

```jsx
// State: weight (kg), destination ("domestic" | "international"), express boolean
// - Regular: free jika weight < 5kg, else 10000 per kg
// - Express: +50% dari regular cost
// - International: 50000 flat + 20000 per kg

// Display: hanya tampilkan shipping options yang relevan
// - domestic: Regular + Express
// - international: hanya International option
// - Free shipping badge jika qualify
```

**Fitur:**
1. Weight input dengan validation (0-100kg)
2. Destination selector (radio buttons)
3. Express checkbox (hanya untuk domestic)
4. Real-time cost calculation
5. Free shipping indicator jika qualified

### Soal 5D — RoleBasedAccess
Component dengan role-based conditional rendering:

```jsx
// State: currentRole ("admin" | "moderator" | "user" | "guest")
// - Admin: semua menu + delete buttons + settings
// - Moderator: semua menu + delete buttons (no settings)
// - User: basic menu + edit own content
// - Guest: read-only content + login prompt

// Pattern: early return untuk access denied
// Pattern: conditional rendering untuk UI elements
// Pattern: || untuk fallback content
```

**Fitur:**
1. Role switcher untuk demo
2. Navigation menu yang berbeda per role
3. Action buttons yang berbeda per role
4. Banner yang berbeda untuk guest vs logged-in
5. Warning/info banners untuk moderator

---

## Syarat (Checklist)
- [ ] AuthStatus: 3 kondisi (authenticated/guest/loading) dengan styling berbeda
- [ ] NotificationPanel: badge, expand, empty state, mark as read
- [ ] ShippingCalculator: weight validation, destination-based options, free shipping
- [ ] RoleBasedAccess: role switcher, menu berbeda, action buttons berbeda

---

## Expected Output
- AuthStatus: welcome message atau login prompt sesuai state
- NotificationPanel: badge count, expandable list, empty state
- ShippingCalculator: real-time cost calculation dengan free shipping
- RoleBasedAccess: different UI untuk 4 roles

---

## Cara Submit
1. Simpan sebagai `05-conditional-rendering.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai

---

## Catatan
- Jangan gunakan if/else di dalam JSX — gunakan ternary, &&, ||
- `condition && <Component />` → component hanya dirender jika condition true
- `user?.name || "Guest"` → tampilkan name atau "Guest" jika null/undefined
- Render null vs render nothing: `return null` vs `return false` sama-sama valid