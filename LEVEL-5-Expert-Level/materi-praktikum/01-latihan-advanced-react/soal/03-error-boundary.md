# SOAL 03 — Error Boundary

## Tujuan
Memahami Error Boundary untuk graceful error handling di React.

---

## Deskripsi
Error boundary component yang catch errors di subtree.

---

## Syarat (Checklist)

### Class-based Error Boundary
- [ ] `componentDidCatch(error, info)`
- [ ] `static getDerivedStateFromError(error)` — update state
- [ ] Render fallback UI

### Function Error Boundary (React 16+)
- [ ] Tidak ada (harus class component)
- [ ] Bisa wrap class component

### Usage
- [ ] Wrap component yang error-prone
- [ ] Reset error state dengan button

---

## Contoh Code

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: "center" }}>
          <h2>Terjadi kesalahan</h2>
          <p style={{ color: "#666" }}>{this.state.error?.message}</p>
          <button
            onClick={this.resetError}
            style={{
              padding: "10px 20px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error("Error ini sengaja dibuat!");
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```

---

## Cara Submit
1. Buat ErrorBoundary class component
2. Buat component yang throw error
3. Wrap dengan ErrorBoundary
4. Test: click "Coba Lagi" → error reset
