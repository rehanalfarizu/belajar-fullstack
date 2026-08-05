// ============================================================
// SOAL 04 — REF PROP REACT 19 + LEGACY FORWARD REF
// ============================================================

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

// React 19: ref dapat diterima sebagai prop. Untuk komponen baru, mulai dari
// pola ini. Bagian forwardRef di bawah dipertahankan untuk memahami codebase
// React 18 dan library yang belum bermigrasi.
export function ModernTextInput({ ref, error, style, ...inputProps }) {
  return (
    <input
      {...inputProps}
      ref={ref}
      style={{
        padding: "10px 12px",
        border: `1px solid ${error ? "#ef4444" : "#e2e8f0"}`,
        borderRadius: "8px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    />
  );
}

// ============================================================
// LEGACY FORWARD REF — pola React 18 yang masih banyak dijumpai
// ============================================================

// Input dengan forwardRef
const TextInput = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}  // pass ref ke DOM element
      type={props.type || "text"}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      style={{
        padding: "10px 12px",
        border: `1px solid ${props.error ? "#ef4444" : "#e2e8f0"}`,
        borderRadius: "8px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
        ...props.style,
      }}
    />
  );
});

// Button dengan forwardRef
const FancyButton = forwardRef((props, ref) => (
  <button
    ref={ref}
    onClick={props.onClick}
    style={{
      padding: props.size === "large" ? "16px 32px" : "10px 20px",
      background: props.variant === "primary" ? "#3b82f6"
        : props.variant === "danger" ? "#ef4444"
        : "#e2e8f0",
      color: props.variant === "primary" || props.variant === "danger" ? "white" : "#333",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "600",
      transition: "transform 0.1s, opacity 0.1s",
    }}
  >
    {props.children}
  </button>
));

// ============================================================
// CUSTOM IMPERATIVE HANDLE — batasi apa yang di-expose
// ============================================================

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // Expose BEBERAPA method saja, tidak semua
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => inputRef.current.value = "",
    getValue: () => inputRef.current.value,
  }), []);

  return (
    <div>
      <input ref={inputRef} value={props.value} onChange={props.onChange} style={{
        padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", width: "100%"
      }} />
      <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
        Bisa diakses: focus(), clear(), getValue()
      </p>
    </div>
  );
});

// ============================================================
// APP — penggunaan ref
// ============================================================
function App() {
  // Refs
  const simpleInputRef = useRef(null);
  const buttonRef = useRef(null);
  const customInputRef = useRef(null);

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Auto-focus saat mount
  useEffect(() => {
    simpleInputRef.current.focus();
  }, []);

  // Button click handler
  useEffect(() => {
    // Button ref untuk animation
    const btn = buttonRef.current;
    if (btn) {
      btn.addEventListener("mouseenter", () => btn.style.transform = "scale(1.05)");
      btn.addEventListener("mouseleave", () => btn.style.transform = "scale(1)");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nama: ${name}\nEmail: ${email}`);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    simpleInputRef.current.focus();
  };

  const handleCustomClear = () => {
    if (customInputRef.current) {
      customInputRef.current.clear();
    }
  };

  const getCustomValue = () => {
    if (customInputRef.current) {
      alert(`Value: "${customInputRef.current.getValue()}"`);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Forward Ref Demo</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        forwardRef mengizinkan parent mengakses DOM node langsung.
        useImperativeHandle membatasi API yang di-expose.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Ref: auto-focus on mount */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Nama</label>
          <TextInput
            ref={simpleInputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ketik nama..."
          />
        </div>

        {/* Tab to focus */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "600" }}>Email</label>
          <TextInput
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ketik email..."
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <FancyButton ref={buttonRef} variant="primary" onClick={handleSubmit}>
            Submit
          </FancyButton>
          <FancyButton variant="secondary" onClick={clearForm}>
            Clear
          </FancyButton>
        </div>
      </form>

      <hr style={{ margin: "32px 0" }} />

      {/* useImperativeHandle demo */}
      <h3 style={{ marginBottom: "12px" }}>useImperativeHandle Demo</h3>
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
        <CustomInput
          ref={customInputRef}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <button onClick={() => customInputRef.current?.focus()} style={{ padding: "8px 12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Focus
          </button>
          <button onClick={handleCustomClear} style={{ padding: "8px 12px", background: "#f59e0b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Clear
          </button>
          <button onClick={getCustomValue} style={{ padding: "8px 12px", background: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Get Value
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
