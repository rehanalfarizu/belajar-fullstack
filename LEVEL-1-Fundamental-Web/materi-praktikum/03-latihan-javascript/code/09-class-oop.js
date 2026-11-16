// ============================================================
// SOAL 09 — CLASS & OOP
// ============================================================
// Tujuan: ES6 Class, constructor, extends, static, method

// ============================================================
// TODO 1: Class Person (base class)
// ============================================================

// ============================================================
// TODO 2: Class Student (extends Person)
// ============================================================
// TODO: panggil super(nama, email)
// TODO: panggil super.greet() + info NIM
// TODO: push ke this.nilai
// TODO: reduce + length, handle if empty
// TODO:

// ============================================================
// TODO 3: Static Methods
// ============================================================
// TODO: map dataArray ke Student instances

// ============================================================
// TODO 4: Class Course
// ============================================================
// TODO: push student ke this.mahasiswa
// TODO: filter out student dengan nim ini
// TODO: rata-rata semua mahasiswa
// TODO: filter this.mahasiswa dengan getRataNilai >= 60

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