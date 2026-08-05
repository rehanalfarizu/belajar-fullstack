// ============================================================
// SOAL 03 — ERROR BOUNDARY
// ============================================================

import React, { Component } from "react";

// ============================================================
// ERROR BOUNDARY (Class Component — wajib)
// ============================================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Ganti state saat error terjadi
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.group("🔴 Error Caught by ErrorBoundary");
    console.error("Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
    this.setState({ errorInfo });
  }

  // Reset error state
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "40px", maxWidth: "500px", margin: "40px auto",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <h2 style={{ color: "#1e293b", marginBottom: "8px" }}>
            Terjadi Kesalahan
          </h2>
          <p style={{ color: "#ef4444", background: "#fee2e2", padding: "12px", borderRadius: "8px", fontSize: "14px" }}>
            {this.state.error?.message || "Unknown error"}
          </p>

          {this.state.errorInfo && (
            <details style={{
              marginTop: "16px", padding: "12px",
              background: "#f8fafc", borderRadius: "8px",
              textAlign: "left", fontSize: "12px", cursor: "pointer"
            }}>
              <summary style={{ cursor: "pointer", fontWeight: "600", marginBottom: "8px" }}>
                Lihat detail error
              </summary>
              <pre style={{ overflow: "auto", fontSize: "11px", color: "#64748b" }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}

          <button
            onClick={this.resetError}
            style={{
              marginTop: "20px", padding: "12px 24px",
              background: "#3b82f6", color: "white",
              border: "none", borderRadius: "8px",
              cursor: "pointer", fontSize: "1rem",
            }}
          >
            🔄 Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================
// COMPONENTS YANG BISA ERROR
// ============================================================

// Error sederhana
function BuggyCounter() {
  const [count, setCount] = React.useState(0);

  if (count === 5) {
    throw new Error("Count tidak boleh 5! Ini sengaja di-throw.");
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Buggy Counter</h3>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{count}</p>
      <p style={{ fontSize: "12px", color: "#ef4444" }}>⚠️ Akan error saat count = 5</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "8px" }}>Reset</button>
    </div>
  );
}

// Error async (fetch gagal)
function FailingFetch() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Simulasi error — fetch URL yang tidak ada
    fetch("https://jsonplaceholder.typicode.com/invalid-endpoint-404")
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: Endpoint tidak ditemukan`);
        return r.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    throw new Error(`Fetch Error: ${error}`);
  }

  return <p>Data: {JSON.stringify(data)}</p>;
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Error Boundary Demo</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        ErrorBoundary menangkap error dan menampilkan UI fallback.
        Error tidak akan crash seluruh app.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Demo 1: Buggy Counter */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>
            Demo 1: Buggy Counter
          </div>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </div>

        {/* Demo 2: Simple Error */}
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ background: "#f8fafc", padding: "12px", borderBottom: "1px solid #e2e8f0", fontWeight: "600" }}>
            Demo 2: Throw Manual
          </div>
          <ErrorBoundary>
            <ThrowButton />
          </ErrorBoundary>
        </div>
      </div>

      {/* Full page Error Boundary */}
      <div style={{ marginTop: "20px", border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "20px" }}>
        <div style={{ fontWeight: "600", marginBottom: "12px" }}>🌐 Page-level Error Boundary</div>
        <ErrorBoundary>
          <SimulatedPageError />
        </ErrorBoundary>
      </div>
    </div>
  );
}

// Helper: Button yang throw saat diklik
function ThrowButton() {
  const [throwError, setThrowError] = React.useState(false);

  if (throwError) {
    throw new Error("Error dari button click!");
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Klik tombol untuk trigger error</p>
      <button
        onClick={() => setThrowError(true)}
        style={{
          padding: "10px 20px", background: "#ef4444",
          color: "white", border: "none", borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Trigger Error
      </button>
    </div>
  );
}

// Helper: Simulated page error
function SimulatedPageError() {
  const [crash, setCrash] = React.useState(false);
  if (crash) throw new Error("Page crash!");

  return (
    <div style={{ textAlign: "center" }}>
      <p>Ini component dengan tombol crash</p>
      <button onClick={() => setCrash(true)} style={{ padding: "10px", background: "#dc2626", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        💥 Crash entire page
      </button>
    </div>
  );
}

export default App;