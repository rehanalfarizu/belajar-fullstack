// ============================================================
// FILE: 05-latihan-form/code/04-form-submission.jsx
// MATERI: Form Submission — Optimistic Updates, Cascading Dropdowns
// ============================================================
import { useState, useEffect, useRef } from "react";

// ============================================================
// TODO: CommentSection — Optimistic Updates
// ============================================================
// State:
//   - comments: array of { id, author, content, timestamp, likes, likedByUser }
//   - form: { author, content }
//   - submitStatus: { type: "success" | "error", message: string } | null
//
// Optimistic Update Pattern:
//   1. Langsung tambahkan comment ke UI sebelum server response
//   2. Jika gagal → rollback (hapus dari list) + restore form
//   3. Form di-reset setelah submit berhasil
//
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const newComment = { id: `C${Date.now()}`, author: form.author, content: form.content, timestamp: Date.now(), likes: 0, likedByUser: false };
//   setComments(prev => [newComment, ...prev]);
//   setForm({ author: "", content: "" });
//   try {
//     await simulateApiCall();
//     setSubmitStatus({ type: "success", message: "Komentar berhasil dikirim" });
//   } catch (err) {
//     setComments(prev => prev.filter(c => c.id !== newComment.id));
//     setForm({ author: newComment.author, content: newComment.content });
//     setSubmitStatus({ type: "error", message: err.message });
//   }
// };
//
// function simulateApiCall(shouldFail = false) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldFail || Math.random() < 0.1) reject(new Error("Network error"));
//       else resolve();
//     }, 800);
//   });
// }
//
// function getRelativeTime(timestamp) {
//   const diff = Date.now() - timestamp;
//   const minutes = Math.floor(diff / 60000);
//   if (minutes < 1) return "Baru saja";
//   if (minutes < 60) return `${minutes} menit lalu`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} jam lalu`;
//   return `${Math.floor(hours / 24)} hari lalu`;
// }
// ============================================================

function simulateApiCall(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail || Math.random() < 0.15) reject(new Error("Network error. Silakan coba lagi."));
      else resolve();
    }, 800);
  });
}

function getRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

export function CommentSection() {
  const [comments, setComments] = useState([
    { id: "C1", author: "Alice", content: "Tutorial yang sangat membantu!", timestamp: Date.now() - 3600000, likes: 5, likedByUser: false },
    { id: "C2", author: "Bob", content: "Terima kasih atas ilmunya.", timestamp: Date.now() - 7200000, likes: 2, likedByUser: false },
    { id: "C3", author: "Charlie", content: "Semoga bermanfaat untuk yang lain.", timestamp: Date.now() - 86400000, likes: 8, likedByUser: false },
  ]);

  const [form, setForm] = useState({ author: "", content: "" });
  const [submitStatus, setSubmitStatus] = useState(null);
  const statusTimeoutRef = useRef(null);

  // TODO: handleFormChange

  // TODO: handleSubmit — optimistic update + rollback + form reset

  // TODO: handleLike — optimistic update likes

  // TODO: handleDelete — remove comment

  // TODO: useEffect untuk auto-dismiss status message (3 detik)

  return (
    <div className="comment-section">
      <h1>Komentar</h1>

      {/* Status message */}
      {submitStatus && (
        <div className={`status ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Nama Anda"
          value={form.author}
          onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))}
        />
        <textarea
          placeholder="Tulis komentar..."
          value={form.content}
          onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
        />
        <button type="submit">Kirim</button>
      </form>

      {/* Comment list */}
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">{comment.author}</span>
              <span className="comment-time">{getRelativeTime(comment.timestamp)}</span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => handleLike(comment.id)}>
                {comment.likedByUser ? "❤️" : "🤍"} {comment.likes}
              </button>
              <button onClick={() => handleDelete(comment.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TODO: LocationForm — Cascading Dropdowns
// ============================================================
// State:
//   - form: { country, province, city, district, postalCode, address }
//
// Data structure:
// const LOCATION_DATA = {
//   Indonesia: {
//     "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur"],
//     "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Sleman"],
//     "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Madiun"],
//     "Bali": ["Denpasar", "Badung", "Kuta", "Ubud"],
//   },
//   Malaysia: {
//     "Wilayah Persekutuan": ["Kuala Lumpur", "Putrajaya", "Labuan"],
//     "Selangor": ["Shah Alam", "Petaling Jaya", "Subang Jaya"],
//     "Penang": ["George Town", "Batu Ferringhi"],
//   },
//   Singapore: {
//     "Singapore": ["Orchard", "Marina Bay", "Sentosa", "Jurong", "Ang Mo Kio"],
//   },
// };
//
// Cascading Logic:
//   const handleCountryChange = (country) => {
//     setForm(prev => ({ ...prev, country, province: "", city: "", district: "" }));
//   };
//
//   const handleProvinceChange = (province) => {
//     setForm(prev => ({ ...prev, province, city: "", district: "" }));
//   };
//
//   const handleCityChange = (city) => {
//     setForm(prev => ({ ...prev, city, district: "" }));
//   };
//
// Computed options:
//   const countryOptions = Object.keys(LOCATION_DATA);
//   const provinceOptions = form.country ? Object.keys(LOCATION_DATA[form.country]) : [];
//   const cityOptions = form.province ? LOCATION_DATA[form.country]?.[form.province] || [] : [];
//   const districtOptions = form.city ? LOCATION_DATA[form.country]?.[form.province]?.[form.city] || [] : [];
//
// Postal code auto-fill:
//   const postalCodes = { Indonesia: { "DKI Jakarta": "10", "Jawa Barat": "40", ... }, ... };
// ============================================================

const LOCATION_DATA = {
  Indonesia: {
    "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur"],
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Sleman"],
    "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Madiun"],
    "Bali": ["Denpasar", "Badung", "Kuta", "Ubud"],
  },
  Malaysia: {
    "Wilayah Persekutuan": ["Kuala Lumpur", "Putrajaya", "Labuan"],
    "Selangor": ["Shah Alam", "Petaling Jaya", "Subang Jaya"],
    "Penang": ["George Town", "Batu Ferringhi"],
  },
  Singapore: {
    "Singapore": ["Orchard", "Marina Bay", "Sentosa", "Jurong", "Ang Mo Kio"],
  },
};

// Simple postal prefix for demo
const POSTAL_PREFIX = {
  Indonesia: "1",
  Malaysia: "5",
  Singapore: "0",
};

export function LocationForm() {
  const [form, setForm] = useState({
    country: "",
    province: "",
    city: "",
    district: "",
    postalCode: "",
    address: "",
  });

  // TODO: computed options
  // const countryOptions = Object.keys(LOCATION_DATA);
  // const provinceOptions = form.country ? Object.keys(LOCATION_DATA[form.country]) : [];
  // const cityOptions = form.province ? LOCATION_DATA[form.country]?.[form.province] || [] : [];
  // const districtOptions = form.city ? LOCATION_DATA[form.country]?.[form.province]?.[form.city] || [] : [];

  // TODO: handleCountryChange — reset dependent fields

  // TODO: handleProvinceChange — reset dependent fields

  // TODO: handleCityChange — reset district

  // TODO: handleDistrictChange — auto-fill postalCode

  // TODO: handleAddressChange

  // TODO: handleSubmit

  return (
    <div className="location-form">
      <h1>Form Lokasi</h1>
      <form>
        {/* TODO: Country dropdown */}
        {/* TODO: Province dropdown (disabled jika country belum dipilih) */}
        {/* TODO: City dropdown (disabled jika province belum dipilih) */}
        {/* TODO: District dropdown (disabled jika city belum dipilih) */}
        {/* TODO: PostalCode input (auto-filled, bisa manual override) */}
        {/* TODO: Address textarea */}
        {/* TODO: Submit + Clear buttons */}
      </form>
    </div>
  );
}

// ============================================================
// TODO: ShoppingCart — Form dengan Quantity dan Total Calculation
// ============================================================
// State:
//   - items: array of { id, name, price, quantity, subtotal }
//   - shippingMethod: "standard" | "express" | "same-day"
//   - promoCode: string
//   - discount: number
//
// Shipping costs:
//   const SHIPPING_COSTS = { standard: 15000, express: 30000, "same-day": 50000 };
//
// Promo codes:
//   DISKON10 → 10% discount
//   HEMAT20 → 20% discount
//   FREEONGKIR → free shipping
//
// Computed values:
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const discountAmount = Math.round(subtotal * discountPercent / 100);
//   const shippingCost = freeShipping ? 0 : SHIPPING_COSTS[shippingMethod];
//   const total = subtotal - discountAmount + shippingCost;
//
// Fitur:
//   1. Item list dengan quantity +/- buttons
//   2. Remove item button
//   3. Shipping method selector
//   4. Promo code input dengan apply button
//   5. Cart summary: subtotal, discount, shipping, total
//   6. Submit order (console.log data)
// ============================================================

const SHIPPING_COSTS = { standard: 15000, express: 30000, "same-day": 50000 };
const PROMO_CODES = { DISKON10: 10, HEMAT20: 20, FREEONGKIR: 0 };

const INITIAL_ITEMS = [
  { id: "ITEM001", name: "Laptop ASUS ROG", price: 18500000, quantity: 1 },
  { id: "ITEM002", name: "Mechanical Keyboard", price: 1200000, quantity: 1 },
  { id: "ITEM003", name: "Wireless Mouse", price: 350000, quantity: 2 },
];

export function ShoppingCart() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");

  // TODO: computed values (subtotal, discountAmount, shippingCost, total)

  // TODO: handleQuantityChange(id, delta)

  // TODO: handleRemoveItem(id)

  // TODO: handleApplyPromo

  // TODO: handleSubmit

  return (
    <div className="shopping-cart">
      <h1>Keranjang Belanja</h1>

      {/* TODO: Items list */}
      {/* TODO: Shipping method selector */}
      {/* TODO: Promo code input + apply button */}
      {/* TODO: Cart summary */}
      {/* TODO: Submit button */}
    </div>
  );
}