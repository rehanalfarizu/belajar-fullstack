# SOAL 07 — useContext

## Tujuan Pembelajaran
Setelah menyelesaikan soal ini, mahasiswa diharapkan mampu:
1. Membuat dan menggunakan React Context untuk global state
2. Memahami kapan Context tepat digunakan vs props drilling
3. Menggabungkan Context dengan useReducer untuk structured state management
4. Mengimplementasikan Provider pattern dengan benar

---

## Briefing
Context menyediakan cara untuk meneruskan data melalui component tree tanpa harus melempar props secara manual di setiap level. Context ideal untuk data yang "global" seperti user authentication, theme, atau bahasa yang dipilih.

---

## Deskripsi

### Soal 7A — ThemeContext
Context untuk theme switching (light/dark):

```jsx
// ThemeContext
// State: theme ("light" | "dark")
// Provider: ThemeProvider({ children })
// Consumer: useTheme() hook

// Fitur:
// 1. Toggle theme dengan button
// 2. Theme persisted ke localStorage
// 3. CSS class di<html> element berubah
// 4. Semua component re-render saat theme berubah
```

**Implementasi:**
```jsx
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

### Soal 7B — CartContext dengan useReducer
Context untuk shopping cart dengan reducer:

```jsx
// CartContext
// State: { items: [], discount: 0 }
// Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// Provider: CartProvider({ children })
// Consumer: useCart() hook

// Fitur:
// 1. Add item dengan quantity
// 2. Remove item
// 3. Update quantity
// 4. Clear cart
// 5. Computed: totalItems, subtotal, totalPrice
```

### Soal 7C — AuthContext
Context untuk authentication state:

```jsx
// AuthContext
// State: user object atau null
// Provider: AuthProvider({ children })
// Consumer: useAuth() hook

// Fitur:
// 1. Login dengan username
// 2. Logout
// 3. isAuthenticated boolean
// 4. User role check: isAdmin, isModerator
```

### Soal 7D — Multi-Context App
Aplikasi yang menggunakan semua context sekaligus:

```jsx
// AppProvider — membungkus semua providers
// <ThemeProvider>
//   <AuthProvider>
//     <CartProvider>
//       {children}
//     </CartProvider>
//   </AuthProvider>
// </ThemeProvider>

// Demo components:
// - Navbar: theme toggle + auth status + cart count
// - Dashboard: conditional based on auth
// - CartBadge: shows item count
```

---

## Syarat (Checklist)
- [ ] ThemeContext: toggle, localStorage persist, CSS class update
- [ ] CartContext: add/remove/update dengan reducer pattern
- [ ] AuthContext: login/logout, isAuthenticated, role check
- [ ] Multi-Context: semua provider nested dengan benar
- [ ] useContext selector pattern untuk mencegah unnecessary re-render

---

## Expected Output
- Theme toggle berfungsi dengan visual feedback
- Cart operations dengan real-time total calculation
- Auth state visible di navbar
- Multi-context app berfungsi tanpa prop drilling

---

## Cara Submit
1. Simpan sebagai `07-useContext.jsx`
2. Jalankan `npm start`
3. Pastikan hasilnya sesuai

---

## Catatan
- Context bukan silver bullet — jangan gunakan untuk semua state
- Context menyebabkan re-render semua consumers saat value berubah
- Untuk performance-critical apps, pertimbangkan split context atau selector pattern
- Provider nesting: dalam urutan yang logis (Theme → Auth → Cart)