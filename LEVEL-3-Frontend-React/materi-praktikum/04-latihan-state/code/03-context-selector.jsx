// ============================================================
// FILE: 04-latihan-state/code/03-context-selector.jsx
// MATERI: Context Selector Pattern — Granular Subscription
// ============================================================
import { createContext, useContext, useState, useEffect, useRef } from "react";

// ============================================================
// TODO: Combined AppContext (single context untuk semua state)
// ============================================================
const AppContext = createContext(null);

// Initial state
const initialState = {
  user: null,
  theme: "light",
  notifications: [],
  preferences: {
    language: "id",
    fontSize: 16,
  },
};

// ============================================================
// TODO: useContextSelector Hook
// ============================================================
// function useContextSelector(context, selector) {
//   const state = useContext(context);
//   const [selected, setSelected] = useState(() => selector(state));
//
//   useEffect(() => {
//     const next = selector(state);
//     if (next !== selected) {
//       setSelected(next);
//     }
//   }, [state, selector, selected]);
//
//   return selected;
// }
//
// Usage:
//   const user = useContextSelector(AppContext, state => state.user);
//   const isDark = useContextSelector(AppContext, state => state.theme === "dark");
// ============================================================

function useContextSelector(context, selector) {
  const state = useContext(context);
  const [selected, setSelected] = useState(() => selector(state));

  useEffect(() => {
    const next = selector(state);
    if (next !== selected) {
      setSelected(next);
    }
  }, [state, selector, selected]);

  return selected;
}

// ============================================================
// TODO: AppProvider dengan combined state
// ============================================================
// export function AppProvider({ children }) {
//   const [state, setState] = useState(initialState);
//
//   const actions = {
//     login: (user) => setState(prev => ({ ...prev, user })),
//     logout: () => setState(prev => ({ ...prev, user: null })),
//     toggleTheme: () => setState(prev => ({
//       ...prev,
//       theme: prev.theme === "light" ? "dark" : "light",
//     })),
//     addNotification: (notif) => setState(prev => ({
//       ...prev,
//       notifications: [{ id: `N${Date.now()}`, ...notif }, ...prev.notifications],
//     })),
//     markAsRead: (id) => setState(prev => ({
//       ...prev,
//       notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n),
//     })),
//     setLanguage: (lang) => setState(prev => ({
//       ...prev,
//       preferences: { ...prev.preferences, language: lang },
//     })),
//     setFontSize: (size) => setState(prev => ({
//       ...prev,
//       preferences: { ...prev.preferences, fontSize: size },
//     })),
//   };
//
//   return (
//     <AppContext.Provider value={{ state, ...actions }}>
//       {children}
//     </AppContext.Provider>
//   );
// }
// ============================================================

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  // TODO: actions object dengan semua updater functions

  return <AppContext.Provider value={{ state, login: () => {}, logout: () => {}, toggleTheme: () => {}, addNotification: () => {}, markAsRead: () => {}, setLanguage: () => {}, setFontSize: () => {} }}>{children}</AppContext.Provider>;
}

// ============================================================
// TODO: Consumer Components — masing-masing subscribe ke subset berbeda
// ============================================================

// UserName — hanya subscribe ke state.user.name
export function UserName() {
  // TODO: gunakan useContextSelector
  // const userName = useContextSelector(AppContext, s => s.user?.name);
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("UserName rendered:", renderCount.current);

  // TODO: return component yang menampilkan userName

  return <span>UserName</span>;
}

// UserAvatar — hanya subscribe ke state.user.avatar
export function UserAvatar() {
  // TODO: useContextSelector untuk state.user?.avatar
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("UserAvatar rendered:", renderCount.current);

  return <span>UserAvatar</span>;
}

// ThemeToggle — hanya subscribe ke state.theme
export function ThemeToggle() {
  // TODO: useContextSelector untuk state.theme === "dark" (boolean)
  // TODO: juga subscribe ke actions.toggleTheme
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("ThemeToggle rendered:", renderCount.current);

  return <button>Toggle Theme</button>;
}

// NotificationBadge — hanya subscribe ke notifications.length
export function NotificationBadge() {
  // TODO: useContextSelector untuk state.notifications.filter(n => !n.read).length
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("NotificationBadge rendered:", renderCount.current);

  return <span>🔔</span>;
}

// LanguageSelector — hanya subscribe ke state.preferences.language
export function LanguageSelector() {
  // TODO: useContextSelector untuk state.preferences.language
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("LanguageSelector rendered:", renderCount.current);

  return <span>Language</span>;
}

// FontSizeControl — hanya subscribe ke state.preferences.fontSize
export function FontSizeControl() {
  // TODO: useContextSelector untuk state.preferences.fontSize
  const renderCount = useRef(0);
  renderCount.current++;
  console.log("FontSizeControl rendered:", renderCount.current);

  return <span>Font Size</span>;
}

// ============================================================
// TODO: Demo App — demonstrate selector pattern
// ============================================================
// function SelectorDemoApp() {
//   return (
//     <AppProvider>
//       <div>
//         <h1>Context Selector Demo</h1>
//         <p>Buka console — setiap component hanya re-render saat nilai yang di-subscribe berubah</p>
//         <hr />
//
//         <div className="demo-grid">
//           <div className="demo-section">
//             <h3>User Section</h3>
//             <UserName />
//             <UserAvatar />
//           </div>
//
//           <div className="demo-section">
//             <h3>Theme Section</h3>
//             <ThemeToggle />
//           </div>
//
//           <div className="demo-section">
//             <h3>Notifications Section</h3>
//             <NotificationBadge />
//           </div>
//
//           <div className="demo-section">
//             <h3>Preferences Section</h3>
//             <LanguageSelector />
//             <FontSizeControl />
//           </div>
//         </div>
//       </div>
//     </AppProvider>
//   );
// }
// ============================================================

export function SelectorDemoApp() {
  return (
    <AppProvider>
      <div className="selector-demo">
        <h1>Context Selector Pattern Demo</h1>
        <p>Check console — component hanya re-render saat nilai yang di-subscribe berubah.</p>
        <hr />
        <div className="demo-grid">
          {/* TODO: Semua consumer components */}
        </div>
      </div>
    </AppProvider>
  );
}

// ============================================================
// TODO: Benchmark — test dengan single context vs split context
// ============================================================
//
// WITHOUT selector pattern (every state change triggers ALL consumers to re-render):
//   const { theme, notifications, user, preferences } = useContext(Context);
//   → re-render setiap kali state manapun berubah
//
// WITH selector pattern (each consumer only re-renders when its subscribed value changes):
//   const theme = useContextSelector(Context, s => s.theme);
//   → hanya re-render saat theme berubah
//
// Test scenario:
//   1. Toggle theme → UserName, UserAvatar, LanguageSelector, FontSizeControl TIDAK re-render
//   2. Add notification → UserName, UserAvatar, ThemeToggle, LanguageSelector, FontSizeControl TIDAK re-render
//   3. Login → semua consumer re-render
// ============================================================