# Latihan 05 — Form Submission Patterns

## Soal 01: Async Form Submission dan Optimistic Updates

### Tujuan
Memahami async form submission dengan proper loading states, error handling, dan optimistic UI updates.

### Deskripsi
Buat `CommentSection` — sistem komentar dengan optimistic updates.

**Comment Data:**
```js
{
  id: "C001",
  author: "Anonymous",
  content: "Komentar pertama",
  timestamp: Date.now(),
  likes: 0,
  likedByUser: false,
}
```

**Optimistic Update Pattern:**
```js
const handleSubmit = async (e) => {
  e.preventDefault();

  const newComment = {
    id: `C${Date.now()}`,
    author: form.author,
    content: form.content,
    timestamp: Date.now(),
    likes: 0,
    likedByUser: false,
  };

  // Optimistic: langsung tambahkan ke UI
  setComments(prev => [newComment, ...prev]);
  setForm({ author: "", content: "" });

  try {
    // Submit ke server
    await simulateApiCall(newComment);
    setSubmitStatus({ type: "success", message: "Komentar berhasil dikirim" });
  } catch (err) {
    // Rollback jika gagal
    setComments(prev => prev.filter(c => c.id !== newComment.id));
    setSubmitStatus({ type: "error", message: err.message });
    // Restore form data
    setForm({ author: newComment.author, content: newComment.content });
  }
};
```

**Fitur:**
1. **Comment Form**: author name + content textarea + submit button
2. **Comment List**: list semua komentar dengan newest first
3. **Like Button**: optimistic update — langsung update count sebelum server response
4. **Delete Button**: optimistic delete — langsung hapus dari UI
5. **Loading State**: spinner pada tombol submit saat mengirim
6. **Error Recovery**: jika submit gagal, rollback + tampilkan error + restore form
7. **Timestamps**: tampilkan relative time ("2 jam lalu", "Kemarin")

**Relative Time Helper:**
```js
function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  if (minutes > 0) return `${minutes} menit lalu`;
  return "Baru saja";
}
```

**Simulated API:**
```js
function simulateApiCall(data, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail || Math.random() < 0.1) { // 10% random failure
        reject(new Error("Network error. Silakan coba lagi."));
      } else {
        resolve({ success: true, data });
      }
    }, 800);
  });
}
```

### Aturan
- Optimistic update TIDAK menunggu server response
- Rollback WAJIB dilakukan jika server mengembalikan error
- Form WAJIB di-reset setelah submit berhasil
- Form WAJIB di-restore setelah rollback (karena user mungkin sudah mengetik banyak)
- Error message harus desaparecer setelah 3 detik (auto-dismiss)

### Pertanyaan Analisis
1. Apa risiko optimistic updates? Kapan sebaiknya tidak digunakan?
2. Bagaimana cara menangani conflict jika user A dan user B mengedit data yang sama hampir bersamaan?
3. Kapan sebaiknya menggunakan optimistic update vs waiting for server response?

---

## Soal 02: Form dengan Dependent Fields dan Cascading Dropdowns

### Tujuan
Memahami form dengan field yang nilainya bergantung pada pilihan field lain (cascading dropdowns).

### Deskripsi
Buat `LocationForm` — form untuk memilih lokasi dengan cascading dropdowns.

**Data:**
```js
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
```

**Form Fields:**
```js
{
  country: "",
  province: "",
  city: "",
  district: "",
  postalCode: "",
  address: "",
}
```

**Cascading Logic:**
```js
const handleCountryChange = (country) => {
  setForm(prev => ({
    ...prev,
    country,
    province: "", // Reset dependent fields
    city: "",
    district: "",
 }));
};

const handleProvinceChange = (province) => {
  setForm(prev => ({
    ...prev,
    province,
    city: "",      // Reset city dan district
    district: "",
  }));
};

const handleCityChange = (city) => {
  setForm(prev => ({
    ...prev,
    city,
    district: "", // Reset district
  }));
};
```

**Computed Options:**
```js
const provinceOptions = form.country ? Object.keys(LOCATION_DATA[form.country]) : [];
const cityOptions = form.province ? LOCATION_DATA[form.country]?.[form.province] || [] : [];
const districtOptions = form.city ? LOCATION_DATA[form.country]?.[form.province]?.[form.city] || [] : [];
```

**Fitur:**
1. Semua dropdown di-disable jika parent field belum dipilih
2. Dependent fields di-reset saat parent field berubah
3. Validation: semua fields required
4. Submit: console.log form data
5. "Clear All" button untuk reset semua fields

### Aturan
- Province dropdown disabled jika country belum dipilih
- City dropdown disabled jika province belum dipilih
- District dropdown disabled jika city belum dipilih
- Reset semua dependent fields SAAT parent field berubah
- Postal code auto-fill berdasarkan kombinasi country/province/city (simulasi)

### Pertanyaan Analisis
1. Apa yang terjadi jika kita tidak me-reset dependent fields saat parent berubah?
2. Bagaimana cara menangani infinite nesting levels dalam cascading dropdowns?
3. Kapan cascading dropdowns menjadi bad UX? Berikan contoh.