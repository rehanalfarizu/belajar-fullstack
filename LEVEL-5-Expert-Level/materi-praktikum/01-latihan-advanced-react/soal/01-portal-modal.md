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

> Contoh kode lengkap untuk bagian ini dipindahkan ke
> [solusi-jangan-dibuka-dulu.md](../solusi-jangan-dibuka-dulu.md).
> Tulis versimu sendiri dulu berdasarkan deskripsi di atas, baru bandingkan.

---

## Cara Submit
1. Buat `Modal.jsx` dengan Portal
2. Buat `App.jsx` dengan toggle
3. Test click di luar modal → close
4. Test Escape key → close