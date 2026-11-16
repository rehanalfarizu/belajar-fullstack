# Latihan 04 — Split Context dan Performance

## Soal 01: Split Context untuk Granular Re-renders

### Tujuan
Memahami bahwa satu context besar menyebabkan semua consumer re-render saat state apapun berubah, dan bagaimana split context memperbaiki masalah ini.

### Deskripsi
Buat aplikasi `NotificationApp` dengan notification system yang membutuhkan beberapa context.

**Yang ingin dicapai:**
- `NotificationBadge` hanya re-render saat unread count berubah
- `NotificationList` hanya re-render saat notifications array berubah
- `ThemeToggle` hanya re-render saat theme berubah
- `UserProfile` hanya re-render saat user data berubah

**State Domains:**
```
UserContext:     { user, login, logout }
ThemeContext:    { theme, toggleTheme, isDark }
NotifContext:    { notifications, unreadCount, markAsRead, markAllAsRead, addNotification }
```

**Context Structure:**
```jsx
// UserContext — user data dan auth functions
const UserContext = createContext(null);
function UserProvider({ children }) { /* ... */ }
export function useUser() { /* ... */ }

// ThemeContext — theme dan toggle
const ThemeContext = createContext(null);
function ThemeProvider({ children }) { /* ... */ }
export function useTheme() { /* ... */ }

// NotificationContext — notifications dan unread count
const NotificationContext = createContext(null);
function NotificationProvider({ children }) { /* ... */ }
export function useNotifications() { /* ... */ }
```

**Notification Data:**
```js
{
  id: "N001",
  type: "info" | "success" | "warning" | "error",
  title: "Pesan notifikasi",
  message: "Detail pesan",
  read: false,
  timestamp: Date.now(),
}
```

**Features:**
1. UserContext: login/logout (demo dengan hardcoded user)
2. ThemeContext: light/dark toggle dengan localStorage persist
3. NotificationContext:
   - `notifications`: array of notification objects
   - `unreadCount`: computed dari `notifications.filter(n => !n.read).length`
   - `markAsRead(id)`: set read=true untuk satu notification
   - `markAllAsRead()`: set read=true untuk semua
   - `addNotification(notif)`: push notification baru
4. Auto-generate notification setiap 10 detik (simulasi)

**Performance Verification:**
Tambahkan render counter di setiap component untuk membuktikan bahwa split context bekerja:

```jsx
function NotificationBadge() {
  const { unreadCount } = useNotifications();
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("NotificationBadge renders:", renderCount.current);

  return <span>{unreadCount}</span>;
}
```

Sekarang:
- Toggle theme → `NotificationBadge` TIDAK re-render (unreadCount tidak berubah)
- Mark as read → `NotificationBadge` RE-RENDER (unreadCount berubah)
- Login/logout → tidak ada component lain yang re-render kecuali `UserProfile`

### Aturan
- Setiap context harus focused pada satu domain data
- Computed values (seperti `unreadCount`) harus menjadi VALUE dari context, bukan state terpisah
- Jika computed value berubah, context consumer yang menggunakannya akan re-render
- Jangan menggabungkan context yang tidak terkait — pisahkan

### Pertanyaan Analisis
1. Jika kita menggunakan SATU context untuk SEMUA state, apa yang terjadi saat `toggleTheme` dipanggil?
2. Apakah split context selalu lebih baik? Kapan satu context masih acceptable?
3. Bagaimana jika computed value (`unreadCount`) dihitung di dalam component consumer, bukan di context? Apa kelemahannya?

---

## Soal 02: Context Selector Pattern

### Tujuan
Memahami advanced pattern untuk memilih subset dari context value, sehingga component tidak re-render untuk bagian context yang tidak digunakan.

### Deskripsi
Implementasikan `useContextSelector` pattern — custom hook yang memungkinkan component subscribe ke bagian spesifik dari context.

**Selector Pattern:**
```jsx
// Context menyimpan state + dispatch
const AppContext = createContext(null);

// useContextSelector memungkinkan memilih subset
function useContextSelector(context, selector) {
  const state = useContext(context);
  return selector(state);
}

// Usage: component hanya re-render saat user berubah
function UserName() {
  const user = useContextSelector(AppContext, (state) => state.user);
  return <span>{user?.name}</span>;
}

// Usage: component hanya re-render saat theme berubah
function ThemeIcon() {
  const isDark = useContextSelector(AppContext, (state) => state.isDark);
  return <span>{isDark ? "🌙" : "☀️"}</span>;
}
```

**Implementasi useContextSelector:**
```jsx
function useContextSelector(context, selector) {
  const fullState = useContext(context);
  const [selected, setSelected] = useState(() => selector(fullState));

  useEffect(() => {
    const next = selector(fullState);
    if (next !== selected) {
      setSelected(next);
    }
  }, [fullState, selector, selected]);

  return selected;
}
```

**Demo Application:**
Buat `DashboardApp` dengan single AppContext yang berisi:
- `user`: user data
- `theme`: "light" | "dark"
- `notifications`: array
- `preferences`: { language, fontSize }

Component consumers:
- `UserName` — subscribe ke `user.name`
- `UserAvatar` — subscribe ke `user.avatar`
- `ThemeToggle` — subscribe ke `theme`
- `NotifBadge` — subscribe ke `notifications.length`
- `LanguageSelector` — subscribe ke `preferences.language`

Setiap component hanya re-render saat nilai yang di-subscribe berubah.

### Aturan
- Selector function harus stabil (useCallback) atau menggunakan useMemo di dalam component
- Shallow comparison default — untuk object, gunakan custom comparison function
- Handle null context (belum ada Provider) dengan graceful error

### Pertanyaan Analisis
1. Apa perbedaan utama antara context selector pattern dan split context?
2. Kapan selector pattern overkill? Kapan sangat bermanfaat?
3. Bagaimana shallow vs deep comparison mempengaruhi performance di context selector?