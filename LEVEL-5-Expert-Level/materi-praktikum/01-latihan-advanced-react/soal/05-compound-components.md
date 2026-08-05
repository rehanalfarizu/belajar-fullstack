# SOAL 05 — Compound Components

## Tujuan
Memahami compound component pattern untuk flexible API.

---

## Deskripsi
Build Tabs component dengan compound component pattern.

---

## Syarat (Checklist)

### Compound Components
- [ ] `<Tabs>`, `<TabList>`, `<Tab>`, `<TabPanel>`
- [ ] Share state via Context
- [ ] Implicit coupling

### Context
- [ ] TabsContext dengan selectedTab, selectTab
- [ ] Provider di dalam Tabs
- [ ] Consumer di dalam Tab/TabPanel

---

## Contoh Code

```jsx
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ children, tabId }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === tabId;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(tabId)}
      style={{
        padding: "8px 16px",
        border: "none",
        background: isActive ? "#3b82f6" : "#e2e8f0",
        color: isActive ? "white" : "#333",
        borderRadius: "8px 8px 0 0",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function TabPanel({ children, tabId }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== tabId) return null;
  return <div role="tabpanel">{children}</div>;
}

// Usage
function App() {
  return (
    <Tabs defaultTab="home">
      <TabList>
        <Tab tabId="home">Home</Tab>
        <Tab tabId="about">About</Tab>
        <Tab tabId="contact">Contact</Tab>
      </TabList>
      <TabPanel tabId="home">Ini halaman Home</TabPanel>
      <TabPanel tabId="about">Ini halaman About</TabPanel>
      <TabPanel tabId="contact">Ini halaman Contact</TabPanel>
    </Tabs>
  );
}
```

---

## Cara Submit
1. Buat Tabs, TabList, Tab, TabPanel
2. Share state via Context
3. Test switching tabs