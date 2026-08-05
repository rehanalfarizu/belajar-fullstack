// ============================================================
// SOAL 05 — COMPOUND COMPONENTS
// ============================================================

import React, { createContext, useContext, useState } from "react";

// ============================================================
// CONTEXT — shared state antara compound components
// ============================================================
const TabsContext = createContext();

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Compound components harus di dalam <Tabs>");
  }
  return context;
}

// ============================================================
// COMPOUND COMPONENTS
// ============================================================

// Tabs — parent container
function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div style={{ fontFamily: "sans-serif" }}>{children}</div>
    </TabsContext.Provider>
  );
}

// TabList — wrapper untuk tab buttons
function TabList({ children }) {
  return (
    <div style={{
      display: "flex",
      borderBottom: "2px solid #e2e8f0",
      gap: "4px",
    }}>
      {children}
    </div>
  );
}

// Tab — individual tab button
function Tab({ children, tabId }) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === tabId;

  return (
    <button
      onClick={() => setActiveTab(tabId)}
      style={{
        padding: "12px 20px",
        border: "none",
        background: "transparent",
        color: isActive ? "#3b82f6" : "#64748b",
        borderBottom: `2px solid ${isActive ? "#3b82f6" : "transparent"}`,
        cursor: "pointer",
        fontWeight: isActive ? "600" : "400",
        fontSize: "14px",
        transition: "all 0.2s",
        marginBottom: "-2px",
      }}
    >
      {children}
    </button>
  );
}

// TabPanel — content panel
function TabPanel({ children, tabId }) {
  const { activeTab } = useTabs();

  if (activeTab !== tabId) return null;

  return (
    <div style={{
      padding: "24px 0",
      animation: "fadeIn 0.2s ease-out",
    }}>
      {children}
    </div>
  );
}

// Icon component (decorative)
function Icon({ name }) {
  const icons = {
    home: "🏠", about: "👤", contact: "📧",
    settings: "⚙️", profile: "👨‍💻", messages: "💬"
  };
  return <span style={{ marginRight: "6px" }}>{icons[name] || ""}</span>;
}

// ============================================================
// CONTENT COMPONENTS (demo content untuk setiap tab)
// ============================================================
function HomeContent() {
  return (
    <div>
      <h3>Selamat Datang!</h3>
      <p>Ini adalah halaman utama aplikasi.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px" }}>
        {[{ label: "Total Users", value: "1,234" }, { label: "Posts", value: "5,678" }, { label: "Revenue", value: "$12.5k" }].map(item => (
          <div key={item.label} style={{ background: "#f1f5f9", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6" }}>{item.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div>
      <h3>Tentang Kami</h3>
      <p>Kami membangun aplikasi fullstack berkualitas tinggi.</p>
      <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
        {["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"].map(tag => (
          <span key={tag} style={{ background: "#dbeafe", color: "#1e40af", padding: "6px 12px", borderRadius: "16px", fontSize: "12px" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div>
      <h3>Hubungi Kami</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📧</span>
          <span>contact@company.com</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📱</span>
          <span>+62 812 3456 7890</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ background: "#f1f5f9", padding: "10px 12px", borderRadius: "8px" }}>📍</span>
          <span>Jakarta, Indonesia</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Compound Components Pattern</h1>
      <p style={{ color: "#64748b", marginBottom: "32px" }}>
        TabList, Tab, TabPanel share state via Context — masing-masing hanya aware dengan fitur itself.
      </p>

      <Tabs defaultTab="home">
        {/* Tab Buttons */}
        <TabList>
          <Tab tabId="home"><Icon name="home" />Home</Tab>
          <Tab tabId="about"><Icon name="about" />About</Tab>
          <Tab tabId="contact"><Icon name="contact" />Contact</Tab>
        </TabList>

        {/* Tab Content */}
        <TabPanel tabId="home"><HomeContent /></TabPanel>
        <TabPanel tabId="about"><AboutContent /></TabPanel>
        <TabPanel tabId="contact"><ContactContent /></TabPanel>
      </Tabs>

      <div style={{ marginTop: "32px", background: "#f8fafc", padding: "16px", borderRadius: "8px", fontSize: "14px" }}>
        <strong>Kenapa Compound Components?</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: "20px" }}>
          <li>Flexible — parent kontrol struktur, children kontrol behavior</li>
          <li>Reusable — bisa pakai pattern ini untuk Accordion, Select, dll</li>
          <li>Clean API — consumer tidak perlu tahu internal state</li>
          <li>Type-safe — TypeScript happy</li>
        </ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;