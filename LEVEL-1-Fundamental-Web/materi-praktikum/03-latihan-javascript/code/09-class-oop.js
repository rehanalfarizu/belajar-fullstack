// ============================================================
// SOAL 09 — CLASS & OOP
// ============================================================
// Tujuan: ES6 Class, constructor, extends, static, method

// ============================================================
// TODO 1: Class Person (base class)
// ============================================================
// class Person {
//   constructor(nama, email) {
//     this.nama = nama;
//     this.email = email;
//   }
//
//   greet() {
//     return `Halo, saya ${this.nama}`;
//   }
//
//   getInfo() {
//     return `${this.nama} (${this.email})`;
//   }
// }


// ============================================================
// TODO 2: Class Student (extends Person)
// ============================================================
// class Student extends Person {
//   constructor(nama, email, nim, jurusan) {
//     // TODO: panggil super(nama, email)
//
//     this.nim = nim;
//     this.jurusan = jurusan;
//     this.nilai = [];
//   }
//
//   // Override greet - tambahkan info student
//   greet() {
//     // TODO: panggil super.greet() + info NIM
//   }
//
//   tambahNilai(n) {
//     // TODO: push ke this.nilai
//   }
//
//   getRataNilai() {
//     // TODO: reduce + length, handle if empty
//   }
//
//   getGrade() {
//     // TODO:
//     // >= 85 → "A"
//     // >= 75 → "B"
//     // >= 65 → "C"
//     // >= 50 → "D"
//     // < 50  → "E"
//   }
// }


// ============================================================
// TODO 3: Static Methods
// ============================================================
// class Student {
//   static createRandom() {
//     const nama = ["Andi", "Budi", "Citra", "Dewi"];
//     const rand = nama[Math.floor(Math.random() * nama.length)];
//     return new Student(rand, `${rand.toLowerCase()}@email.com`, "12345", "Informatika");
//   }
//
//   static createBatch(dataArray) {
//     // TODO: map dataArray ke Student instances
//   }
// }


// ============================================================
// TODO 4: Class Course
// ============================================================
// class Course {
//   constructor(nama, dosen) {
//     this.nama = nama;
//     this.dosen = dosis;
//     this.mahasiswa = [];
//   }
//
//   tambahMahasiswa(student) {
//     // TODO: push student ke this.mahasiswa
//   }
//
//   hapusMahasiswa(nim) {
//     // TODO: filter out student dengan nim ini
//   }
//
//   getRataKelas() {
//     // TODO: rata-rata semua mahasiswa
//   }
//
//   getMahasiswaLulus() {
//     // TODO: filter this.mahasiswa dengan getRataNilai >= 60
//   }
// }


// ============================================================
// TEST
// ============================================================
// const andi = new Student("Andi", "andi@email.com", "12345", "Informatika");
// andi.tambahNilai(85);
// andi.tambahNilai(90);
// console.log(andi.getRataNilai()); // 87.5
// console.log(andi.getGrade());    // A
// console.log(andi.greet());       // Halo, saya Andi - NIM: 12345

// const randomStudent = Student.createRandom();

// const course = new Course("Web Development", "Dr. Smith");
// course.tambahMahasiswa(andi);
// console.log(course.getRataKelas());


// ============================================================
// CONTOH OUTPUT:
// 87.5
// A
// Halo, saya Andi - NIM: 12345
// ============================================================