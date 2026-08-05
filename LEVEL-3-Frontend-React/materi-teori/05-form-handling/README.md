# 📘 MATERI TEORI 05 — Form Handling

## 1. Controlled vs Uncontrolled Components

```jsx
// Controlled — React kontrol value
// ✅ YANG DIREKOMENDASIKAN
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />

// Uncontrolled — DOM kontrol value
// Pakai ref
const inputRef = useRef(null);
<input ref={inputRef} />
// Ambil value: inputRef.current.value
```

---

## 2. React Hook Form (RHF) — Cara Modern

React Hook Form = library form yang performant, kecil, dan tidak re-render berlebihan.

```bash
npm install react-hook-form
```

### Basic Form

```jsx
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,          // register input
    handleSubmit,       // handle submit dengan validasi
    formState: { errors, isSubmitting },
    reset,              // reset form
    watch               // pantau nilai
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched"   // validasi saat blur / submit
  });

  const onSubmit = async (data) => {
    // data = { email: "...", password: "..." }
    await loginUser(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register = hubungkan input dengan form */}
      <input
        {...register("email", {
          required: "Email wajib diisi",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Email tidak valid"
          }
        })}
        type="email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register("password", {
          required: "Password wajib diisi",
          minLength: { value: 6, message: "Min 6 karakter" }
        })}
        type="password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
```

### Validation Patterns

```jsx
const { register, formState: { errors } } = useForm();

<input
  {...register("username", {
    required: "Username wajib diisi",
    minLength: { value: 3, message: "Min 3 karakter" },
    maxLength: { value: 20, message: "Max 20 karakter" },
    pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Hanya huruf, angka, underscore" }
  })}
/>

<input
  {...register("age", {
    required: "Umur wajib diisi",
    valueAsNumber: true,
    min: { value: 17, message: "Min 17 tahun" },
    max: { value: 100, message: "Max 100 tahun" }
  })}
/>

<input
  {...register("website", {
    pattern: {
      value: /^(https?:\/\/)?[\da-z\.-]+\.[a-z\.]{2,6}\/[^\s]*$/,
      message: "URL tidak valid"
    }
  })}
/>
```

### Error Display Patterns

```jsx
// Inline error
<input {...register("email")} />
{errors.email && <span className="error">{errors.email.message}</span>}

// Error summary di atas
function FormWithSummary() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Error di atas */}
      {Object.keys(errors).length > 0 && (
        <div className="error-summary">
          <p>Silakan perbaiki error berikut:</p>
          <ul>
            {errors.email && <li>Email: {errors.email.message}</li>}
            {errors.password && <li>Password: {errors.password.message}</li>}
          </ul>
        </div>
      )}
      {/* Fields... */}
    </form>
  );
}
```

---

## 3. Zod — Schema Validation

Zod = library validation schema (bisa dipakai dengan React Hook Form).

```bash
npm install zod @hookform/resolvers
```

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Buat schema
const schema = z.object({
  name: z
    .string()
    .min(2, "Nama min 2 karakter")
    .max(50, "Nama max 50 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password min 8 karakter")
    .regex(/[A-Z]/, "Harus ada huruf besar")
    .regex(/[0-9]/, "Harus ada angka"),
  age: z
    .number({ invalid_type_error: "Harus angka" })
    .min(17, "Min 17 tahun")
    .max(100, "Max 100 tahun"),
  url: z
    .string()
    .url("URL tidak valid")
    .optional()
    .or(z.literal("")),
  role: z.enum(["user", "admin", "editor"], {
    errorMap: () => ({ message: "Pilih role yang valid" })
  })
});

// Infer type dari schema
type FormData = z.infer<typeof schema>;

// 2. Pakai dengan React Hook Form
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur"
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email")} type="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <input {...register("age", { valueAsNumber: true })} type="number" />
      {errors.age && <p>{errors.age.message}</p>}

      <select {...register("role")}>
        <option value="">Pilih Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </select>
      {errors.role && <p>{errors.role.message}</p>}

      <button type="submit">Daftar</button>
    </form>
  );
}
```

### Zod dengan Transform

```jsx
const schema = z.object({
  // Trim whitespace otomatis
  email: z.string().trim().email(),
  // Lowercase otomatis
  username: z.string().toLowerCase().min(3),
  // Parse number dari string input
  age: z.coerce.number().min(17),
  // Custom transform
  tags: z.string()
    .transform(val => val.split(",").map(t => t.trim()))
    .pipe(z.array(z.string()).min(1, "Min 1 tag"))
});
```

---

## 4. Watch, SetValue, Trigger

```jsx
function DependentFields() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: { country: "Indonesia", city: "", zip: "" }
  });

  // Pantau nilai country
  const country = watch("country");

  // Saat country berubah, reset city & zip
  const handleCountryChange = (e) => {
    const val = e.target.value;
    setValue("country", val);
    setValue("city", "");
    setValue("zip", "");
  };

  // Validate field tertentu
  const validateZip = async () => {
    const result = await trigger("zip");
    if (!result) console.log("Zip tidak valid");
  };

  return (
    <div>
      <select {...register("country")} onChange={handleCountryChange}>
        <option value="Indonesia">Indonesia</option>
        <option value="Malaysia">Malaysia</option>
      </select>

      {/* Tampilkan field berdasarkan country */}
      {country === "Indonesia" && (
        <>
          <input {...register("city", { required: "Kota wajib diisi" })} placeholder="Kota" />
          <input {...register("zip", { required: "Kode pos wajib diisi" })} placeholder="Kode Pos" />
        </>
      )}
    </div>
  );
}
```

---

## 5. Array Fields (Dynamic Fields)

```jsx
function DynamicFields() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: { skills: [""] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = (data) => console.log(data.skills);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`skills.${index}`)} placeholder={`Skill ${index + 1}`} />
          {index > 0 && (
            <button type="button" onClick={() => remove(index)}>Hapus</button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append("")}>Tambah Skill</button>
      <button type="submit">Simpan</button>
    </form>
  );
}
```

---

## 6. File Upload

```jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  avatar: z
    .instanceof(FileList, { message: "File wajib dipilih" })
    .refine(files => files.length > 0, "File wajib dipilih")
    .refine(
      files => ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "Hanya JPG, PNG, WebP"
    )
    .refine(files => files[0]?.size <= 5 * 1024 * 1024, "Max 5MB")
});

function FileUpload() {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });

  const avatar = watch("avatar");

  const onSelect = (e) => {
    const file = e.target.files[0];
    setValue("avatar", e.target.files);

    // Preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    await fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" accept="image/*" onChange={onSelect} />
      {errors.avatar && <p>{errors.avatar.message}</p>}
      {preview && <img src={preview} alt="Preview" style={{ width: 100 }} />}
      <button type="submit">Upload</button>
    </form>
  );
}
```

---

## Ringkasan

```
Form Handling
├── Controlled     → useState + onChange (manual)
├── React Hook Form → register, handleSubmit, useForm + mode
├── Zod            → schema validation, transform, infer types
├── Validation     → required, min/max, pattern, custom
├── useFieldArray  → dynamic array fields
├── File Upload    → FormData, FileList, preview
└── Error Display  → inline, summary, per field
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/05-latihan-form/`