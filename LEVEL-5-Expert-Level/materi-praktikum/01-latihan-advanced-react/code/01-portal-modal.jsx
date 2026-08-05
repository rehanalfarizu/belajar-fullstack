// ============================================================
// SOAL 01 — PORTAL & MODAL (Advanced React)
// ============================================================

import React, { useState } from "react";
import ReactDOM from "react-dom";

// ============================================================
// Modal dengan Portal
// ============================================================
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // Portal: render ke document.body, keluar dari parent DOM
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* stopPropagation agar click di dalam modal tidak close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "440px",
          width: "90%",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
          animation: "slideUp 0.2s ease-out",
        }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "16px"
        }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "none",
              fontSize: "24px", cursor: "pointer",
              color: "#94a3b8"
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// Toast Notification dengan Portal
// ============================================================
function Toast({ message, type = "info", onClose }) {
  const colors = {
    success: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
    error: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
    info: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
    warning: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
  };

  return ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      bottom: "24px", right: "24px",
      background: colors[type].bg,
      borderLeft: `4px solid ${colors[type].border}`,
      color: colors[type].text,
      padding: "16px 20px",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      maxWidth: "320px",
      zIndex: 10000,
      animation: "slideInRight 0.3s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none",
            fontSize: "18px", cursor: "pointer",
            color: colors[type].text, opacity: 0.6
          }}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

// ============================================================
// Main App
// ============================================================
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirm = () => {
    setModalOpen(false);
    showToast("Aksi berhasil dilakukan!", "success");
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Portal Demo</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        Modal & Toast dirender ke document.body (di luar parent DOM)
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: "12px 24px", background: "#3b82f6",
            color: "white", border: "none", borderRadius: "8px",
            cursor: "pointer", fontSize: "1rem"
          }}
        >
          Buka Modal Konfirmasi
        </button>
        <button
          onClick={() => showToast("Ini toast info!", "info")}
          style={{ padding: "12px 24px", background: "#e2e8f0", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Toast Info
        </button>
        <button
          onClick={() => showToast("Terjadi error!", "error")}
          style={{ padding: "12px 24px", background: "#fee2e2", border: "none", borderRadius: "8px", cursor: "pointer", color: "#ef4444" }}
        >
          Toast Error
        </button>
      </div>

      {/* Portal Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Konfirmasi Aksi"
      >
        <p>Apakah kamu yakin ingin melanjutkan aksi ini?</p>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
          Aksi ini tidak bisa di-undo setelah dijalankan.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={() => setModalOpen(false)}
            style={{
              padding: "10px 20px", background: "#e2e8f0",
              border: "none", borderRadius: "8px", cursor: "pointer"
            }}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: "10px 20px", background: "#3b82f6",
              color: "white", border: "none", borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Ya, Lanjutkan
          </button>
        </div>
      </Modal>

      {/* Portal Toast */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default App;