# SOAL 01 — Portal & Modal

## Tujuan
Memahami React Portal untuk render di luar DOM tree.

---

## Deskripsi
Modal component dengan Portal yang bisa di-mount ke body.

---

## Syarat (Checklist)

### Portal
- [ ] `ReactDOM.createPortal(child, container)`
- [ ] Render ke `document.body`
- [ ] Handle unmounting

### Modal Component
- [ ] Backdrop dengan click-to-close
- [ ] Content dengan title, children, close button
- [ ] Focus trap di dalam modal
- [ ] Escape key untuk close

### Use Cases
- [ ] Modal dialog
- [ ] Tooltip
- [ ] Dropdown (di dalam scrollable parent)

---

## Contoh Code

```jsx
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal isOpen={show} onClose={() => setShow(false)} title="Konfirmasi">
        <p>Apakah kamu yakin?</p>
        <button onClick={() => setShow(false)}>Ya</button>
      </Modal>
    </>
  );
}
```

---

## Cara Submit
1. Buat `Modal.jsx` dengan Portal
2. Buat `App.jsx` dengan toggle
3. Test click di luar modal → close
4. Test Escape key → close