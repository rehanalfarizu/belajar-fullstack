# Tutorial 06 — Project Portfolio Sederhana

## Tujuan
Menggabungkan HTML, CSS, dan JavaScript untuk membuat website portfolio pribadi yang interaktif.

---

## Hasil Akhir

Website portfolio single-page dengan:
- Hero section dengan nama & tagline
- Section tentang saya
- Section skill
- Section proyek
- Navigasi smooth scroll
- Animasi sederhana
- Responsif (mobile-friendly)

---

## Struktur File

```
belajar-web/
└── level-1/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Langkah1: HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Nama Kamu</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Navigasi -->
  <nav>
    <div class="nav-logo">Portfolio</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="hero">
    <h1 id="hero-title">Halo, Saya [Nama]</h1>
    <p id="hero-subtitle">Mahasiswa Computer Science | Web Developer</p>
    <a href="#contact" class="btn">Hubungi Saya</a>
  </section>

  <!-- About Section -->
  <section id="about" class="section">
    <h2>Tentang Saya</h2>
    <p id="about-text">Deskripsi tentang diri kamu...</p>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="section">
    <h2>Skill</h2>
    <div class="skills-grid">
      <!-- Skill cards akan di-generate oleh JS -->
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section">
    <h2>Proyek</h2>
    <div class="projects-grid">
      <!-- Project cards -->
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="section">
    <h2>Hubungi Saya</h2>
    <form id="contact-form">
      <input type="text" id="name" placeholder="Nama" required>
      <input type="email" id="email" placeholder="Email" required>
      <textarea id="message" rows="4" placeholder="Pesan" required></textarea>
      <button type="submit">Kirim</button>
    </form>
    <p id="form-status"></p>
  </section>

  <!-- Footer -->
  <footer>
    <p>&copy; 2026 Nama Kamu. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

---

## Langkah 2: CSS (`style.css`)

```css
/* Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Variabel CSS */
:root {
  --primary: #2563eb;
  --dark: #1e293b;
  --light: #f8fafc;
  --gray: #64748b;
}

/* Body */
body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: var(--dark);
}

/* Navbar */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-logo { font-weight: bold; font-size: 1.2rem; }

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--dark);
  transition: color 0.3s;
}

.nav-links a:hover { color: var(--primary); }

/* Hero */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, var(--primary), #93c5fd);
  color: white;
}

.hero h1 { font-size: 3rem; margin-bottom: 1rem; }
.hero p { font-size: 1.2rem; margin-bottom: 2rem; }

.btn {
  padding: 0.8rem 2rem;
  background: white;
  color: var(--primary);
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: transform 0.3s;
}

.btn:hover { transform: scale(1.05); }

/* Sections */
.section {
  padding: 5rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 3px solid var(--primary);
  display: inline-block;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.skill-card {
  padding: 1.5rem;
  background: var(--light);
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
}

button[type="submit"] {
  padding: 0.8rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

button[type="submit"]:hover { background: #1d4ed8; }

/* Footer */
footer {
  text-align: center;
  padding: 2rem;
  background: var(--dark);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero h1 { font-size: 2rem; }
}
```

---

## Langkah 3: JavaScript (`script.js`)

```javascript
// Data Skill
const skills = [
  { name: "HTML", color: "#e34c26" },
  { name: "CSS", color: "#264de4" },
  { name: "JavaScript", color: "#f0db4f" },
  { name: "Git", color: "#f05032" },
  { name: "Node.js", color: "#68a063" },
  { name: "React", color: "#61dafb" }
];

// Data Projects
const projects = [
  {
    title: "Website Portfolio",
    desc: "Website portfolio pribadi dengan HTML, CSS, JS",
    tech: "HTML, CSS, JS"
  },
  {
    title: "Todo App",
    desc: "Aplikasi to-do list dengan localStorage",
    tech: "JavaScript"
  },
  {
    title: "API Sederhana",
    desc: "REST API dengan Node.js dan Express",
    tech: "Node.js, Express"
  }
];

// Render Skills
const skillsGrid = document.querySelector(".skills-grid");

skills.forEach(skill => {
  const card = document.createElement("div");
  card.className = "skill-card";
  card.textContent = skill.name;
  card.style.backgroundColor = skill.color;
  card.style.color = "white";
  skillsGrid.appendChild(card);
});

// Render Projects
const projectsGrid = document.querySelector(".projects-grid");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "skill-card"; // reuse style
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.desc}</p>
    <small>${project.tech}</small>
  `;
  projectsGrid.appendChild(card);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Contact Form
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simulasi kirim
  status.textContent = `Terima kasih ${name}! Pesan kamu sudah dikirim.`;
  status.style.color = "green";

  form.reset();

  setTimeout(() => { status.textContent = ""; }, 3000);
});

// Fade-in animation saat scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".section").forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s, transform 0.6s";
  observer.observe(section);
});
```

---

## Mini-Challenge

Tambahkan fitur berikut ke portfolio kamu:

- [ ] Ubah data (nama, skill, proyek) dengan data kamu sendiri
- [ ] Tambahkan GitHub link di section contact
- [ ] Animasi hover berbeda untuk skill cards
- [ ] Tambahkan animasi fade-in saat scroll
- [ ] Deploy ke GitHub Pages (gratis!)

---

## Cara Deploy ke GitHub Pages

1. Buat repo baru di GitHub
2. Push semua file ke repo
3. Buka Settings → Pages
4. Source: `main` branch, `/ (root)`
5. Tunggu 2-3 menit → website live di `https://username.github.io/repo-name`

---

**Lanjut ke:** LEVEL-2 — Backend Node Express
