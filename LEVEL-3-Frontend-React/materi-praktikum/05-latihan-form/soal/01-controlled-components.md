# Latihan 05 — Controlled Form

## Soal 01: Controlled Components dan Multiple Inputs

### Tujuan
Memahami controlled component pattern, satu handler untuk banyak input dengan attribute `name`, dan handling array fields.

### Deskripsi
Buat `EmployeeForm` — form untuk menambah/mengedit data karyawan.

**Form Fields:**
```js
{
  fullName: "",
  email: "",
  phone: "",
  department: "", // "engineering" | "marketing" | "sales" | "hr"
  role: "",
  salary: "",
  startDate: "",
  skills: [""],        // array of strings
  isRemote: false,
  employmentType: "full-time", // "full-time" | "part-time" | "contract"
}
```

**Fitur:**
1. Semua input adalah controlled (value dari state)
2. Satu `handleChange` menggunakan attribute `name`:
   ```js
   const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
     setForm(prev => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value
     }));
   };
   ```
3. **Dynamic skills**: mulai dengan 1 field skill, tombol "Add Skill" tambah field baru, tombol "Remove" hapus field
4. **Select dropdown** untuk department dan employment type
5. **Number input** untuk salary dengan format currency saat blur
6. **Date input** untuk start date
7. Submit: console.log form data + reset form

**Skills Array Handling:**
```js
const handleSkillChange = (index, value) => {
  setForm(prev => {
    const skills = [...prev.skills];
    skills[index] = value;
    return { ...prev, skills };
  });
};

const addSkill = () => {
  setForm(prev => ({
    ...prev,
    skills: [...prev.skills, ""]
  }));
};

const removeSkill = (index) => {
  setForm(prev => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index)
  }));
};
```

**Salary Formatting:**
```js
const formatCurrency = (value) => {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("id-ID");
};

const handleSalaryBlur = (e) => {
  const formatted = formatCurrency(e.target.value);
  setForm(prev => ({ ...prev, salary: formatted }));
};
```

### Aturan
- `name` attribute pada setiap input HARUS match dengan key di state object
- `type="checkbox"` → gunakan `checked` bukan `value`
- Skills array: minimal 1 field, tidak bisa remove yang terakhir
- Salary display sebagai formatted string Indonesia (Rp 15.000.000), tapi state tetap number

### Pertanyaan Analisis
1. Apa keuntungan menggunakan satu handler untuk semua input dibanding handler terpisah per field?
2. Kapan controlled component menjadi beban performa? Apakah ada alternatif?
3. Apa perbedaan antara `e.target.value` dan `e.target.checked` untuk checkbox?