/**
 * ============================================================
 * LATIHAN 2.4: RESTful API
 * ============================================================
 * Materi  : Express.js Dasar
 * Tujuan  : Merancang dan mengimplementasikan RESTful API lengkap
 *           dengan operasi CRUD untuk resource tasks.
 *
 * Requirements:
 * - GET  /tasks       -> ambil semua task
 * - GET  /tasks/:id    -> ambil satu task berdasarkan ID
 * - POST /tasks        -> buat task baru
 * - PUT  /tasks/:id    -> update task
 * - DELETE /tasks/:id  -> hapus task
 * - Response JSON konsisten dengan format { success, data, message }
 * - HTTP status code yang tepat
 *
 * Install: npm install express
 * Run    : node 04-api-restful.js
 * ============================================================
 */

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================================
// IN-MEMORY STORAGE
// TODO(human): Buat array tasks dengan1 data contoh
// Structure: { id: number, title: string, completed: boolean }
// const tasks = [{ id: 1, title: 'Belajar Node.js', completed: false }];
// let nextId = 2;

// ============================================================
// HELPER: Response Format
// TODO(human): Buat fungsi responseFormat(success, data, message)
// Mengembalikan { success: boolean, data: any, message: string }

// ============================================================
// ROUTE: GET /tasks
// TODO(human): Return semua tasks dengan responseFormat(true, tasks, null)

// ============================================================
// ROUTE: GET /tasks/:id
// TODO(human): Cari task by id (Number(req.params.id))
// Jika ditemukan: responseFormat(true, task, null)
// Jika tidak: res.status(404).json(responseFormat(false, null, 'Task tidak ditemukan'))

// ============================================================
// ROUTE: POST /tasks
// TODO(human): Tambah task baru dengan id = nextId++, title dari req.body.title
// Set completed = false default
// res.status(201).json(responseFormat(true, newTask, 'Task berhasil ditambahkan'))

// ============================================================
// ROUTE: PUT /tasks/:id
// TODO(human): Cari task by id
// Jika ditemukan: update title dan completed dari req.body
// res.json(responseFormat(true, updatedTask, 'Task berhasil diupdate'))
// Jika tidak: 404

// ============================================================
// ROUTE: DELETE /tasks/:id
// TODO(human): Cari index task by id
// Jika ditemukan: hapus dari array, res.status(204).send()
// Jika tidak: 404

app.listen(PORT, () => {
  console.log(`RESTful API berjalan di http://localhost:${PORT}`);
  console.log('Endpoints: GET/POST /tasks, GET/PUT/DELETE /tasks/:id');
});

// ============================================================
// EXPECTED OUTPUT:
// ============================================================
// GET  /tasks       -> 200: { success: true, data: [...], message: null }
// GET  /tasks/1     -> 200: { success: true, data: { id: 1, title: "Belajar Node.js", completed: false }, message: null }
// POST /tasks       -> 201: { success: true, data: { id: 2, title: "...", completed: false }, message: "Task berhasil ditambahkan" }
// PUT  /tasks/1     -> 200: { success: true, data: { id: 1, title: "...", completed: true }, message: "Task berhasil diupdate" }
// DELETE /tasks/1   -> 204: (no content)
// ============================================================
