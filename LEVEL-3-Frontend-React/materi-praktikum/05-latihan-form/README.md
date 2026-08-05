# Latihan 05 — Form Handling

## Tujuan Pembelajaran

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu:

1. Memahami controlled components — input yang valuenya dikontrol oleh React state
2. Menggunakan React Hook Form untuk form handling yang lebih efisien
3. Mengintegrasikan Zod untuk schema validation
4. Mengimplementasikan form submission dengan handling loading dan error states

---

## Prasyarat

- Sudah memahami React hooks (`useState`, `useEffect`)
- Sudah membuat project React dengan Vite
- Install dependencies:

```bash
npm install react-hook-form zod @hookform/resolvers
```

---

## Controlled vs Uncontrolled Components

### Controlled Component
Value input dikontrol oleh React state. Setiap perubahan trigger re-render.

```jsx
const [name, setName] = useState("");

<input value={name} onChange={(e) => setName(e.target.value)} />
```

### Uncontrolled Component
Value input dikelola oleh DOM. Diakses dengan `useRef`.

```jsx
const inputRef = useRef(null);

<input ref={inputRef} defaultValue="hello" />
```

### Kapan Pakai Apa?
- Form sederhana / kecil → controlled component
- Form kompleks dengan banyak field → React Hook Form
- Validasi server-side → kedua-duanya butuh async handling

---

## React Hook Form

```jsx
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>Email wajib diisi</span>}

      <input {...register("password", { minLength: 6 })} />
      {errors.password && <span>Minimal 6 karakter</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Zod Validation

```jsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
}
```

---

## Cara Install dan Jalankan

```bash
# Buat project baru
npm create vite@latest latihan-form -- --template react
cd latihan-form
npm install
npm install react-hook-form zod @hookform/resolvers

# Salin file soal ke src/
# Jalankan
npm run dev
```

---

## Checklist Penyelesaian

- [ ] Controlled component dengan onChange handler
- [ ] React Hook Form dengan register dan handleSubmit
- [ ] Zod schema validation dengan error messages
- [ ] Form submission dengan loading state
- [ ] Reset form setelah submit berhasil

---

## Referensi Tambahan

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Docs](https://zod.dev/)
- [React Docs: Forms](https://react.dev/learn/forms)
