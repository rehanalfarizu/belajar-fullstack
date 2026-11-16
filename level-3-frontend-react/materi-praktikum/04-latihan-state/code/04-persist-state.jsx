// ============================================================
// FILE: 04-latihan-state/code/04-persist-middleware.js
// MATERI: useReducer Persist Middleware dan Undo/Redo Pattern
// ============================================================

// ============================================================
// TODO: Persist Middleware Factory
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

// TODO(human): createPersistMiddleware(storageKey)
// Petunjuk: bentuknya fungsi yang menerima reducer dan mengembalikan reducer baru.
// Petunjuk: localStorage bisa gagal (penuh/diblokir). Apa yang terjadi kalau dibiarkan?
// Selesai kalau: setiap action menyimpan state terbaru, dan kegagalan simpan tidak membuat app crash.
function createPersistMiddleware(storageKey) {
  return (reducer) => reducer;
}

// TODO(human): createUndoMiddleware(reducer)
// Petunjuk: butuh riwayat "past" dan "future". Action UNDO/REDO menggesernya.
// Petunjuk: action biasa yang mengubah state mengosongkan "future". Batasi ukuran riwayat.
// Selesai kalau: UNDO lalu REDO mengembalikan state yang sama, dan UNDO tanpa riwayat tidak error.
function createUndoMiddleware(reducer) {
  return reducer;
}

// ============================================================
// TODO: Composable Middleware
// ============================================================
// function applyMiddleware(reducer, ...middlewares) {
//   return middlewares.reduce((acc, mw) => mw(acc), reducer);
// }
//
// // Usage:
// const rootReducer = applyMiddleware(
//   notesReducer,
//   createPersistMiddleware("notes_state"),
//   createUndoMiddleware
// );
// ============================================================

function applyMiddleware(reducer, ...middlewares) {
  return middlewares.reduce((acc, mw) => mw(acc), reducer);
}

// ============================================================
// TODO: Notes Reducer
// ============================================================
// State shape:
//
// Action types:
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

// TODO(human): notesReducer(state, action)
// Action: ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, SET_FILTER, SET_SORT, HYDRATE
// Petunjuk: reducer murni, jangan mengubah state langsung.
// Selesai kalau: tiap action menghasilkan state baru yang benar, action tak dikenal mengembalikan state apa adanya.
function notesReducer(state, action) {
  return state;
}

// ============================================================
// TODO: Create Root Reducer dengan Middleware
// ============================================================
// const rootReducer = applyMiddleware(
//   notesReducer,
//   createPersistMiddleware("notes_state"),
//   createUndoMiddleware
// );
// ============================================================

const rootReducer = applyMiddleware(
  notesReducer,
  createPersistMiddleware("notes_state"),
  createUndoMiddleware
);

// ============================================================
// TODO: useNotes Hook
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

import { useReducer, useEffect, useCallback } from "react";

export function useNotes() {
  // TODO: useReducer dengan rootReducer
  // TODO: Lazy initialization dari localStorage

  // TODO: useEffect untuk keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)

  const actions = {
    addNote: useCallback((title, content, tags) => {}, []),
    updateNote: useCallback((id, updates) => {}, []),
    deleteNote: useCallback((id) => {}, []),
    setFilter: useCallback((filter) => {}, []),
    setSort: useCallback((sortBy) => {}, []),
    undo: useCallback(() => {}, []),
    redo: useCallback(() => {}, []),
  };

  return { state: { notes: [], filter: "all", sortBy: "newest" }, ...actions };
}

// ============================================================
// TODO: NotesApp Component
// ============================================================
// ============================================================
// TODO(human): tulis sendiri. Baca deskripsi di folder soal/ dan petunjuk di atas.

import { useState } from "react";

export function NotesApp() {
  const { state, addNote, deleteNote, setFilter, setSort, undo, redo } = useNotes();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // TODO: Filtered dan sorted notes
  // TODO: handleSubmit untuk add note
  // TODO: Undo/Redo buttons
  // TODO: Filter dan Sort controls
  // TODO: Notes list

  return (
    <div className="notes-app">
      <div className="notes-header">
        <h1>Notes</h1>
        {/* TODO: Undo/Redo buttons */}
      </div>
      {/* TODO: Controls */}
      {/* TODO: Add form */}
      {/* TODO: Notes list */}
    </div>
  );
}

// ============================================================
// TODO: Export rootReducer dan middleware factories (for testing)
// ============================================================
export { createPersistMiddleware, createUndoMiddleware, applyMiddleware };