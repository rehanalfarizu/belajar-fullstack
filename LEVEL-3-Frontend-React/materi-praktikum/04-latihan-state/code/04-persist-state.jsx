// ============================================================
// FILE: 04-latihan-state/code/04-persist-middleware.js
// MATERI: useReducer Persist Middleware dan Undo/Redo Pattern
// ============================================================

// ============================================================
// TODO: Persist Middleware Factory
// ============================================================
// function createPersistMiddleware(storageKey) {
//   return (reducer) => (state, action) => {
//     const nextState = reducer(state, action);
//
//     // Simpan ke localStorage setelah setiap action
//     try {
//       window.localStorage.setItem(storageKey, JSON.stringify(nextState));
//     } catch (err) {
//       console.warn("Persist failed:", err.message);
//     }
//
//     return nextState;
//   };
// }
//
// function createUndoMiddleware(reducer) {
//   let past = [];
//   let future = [];
//
//   return (state, action) => {
//     switch (action.type) {
//       case "UNDO": {
//         if (past.length === 0) return state;
//         const previous = past[past.length - 1];
//         past = past.slice(0, -1);
//         future = [state, ...future];
//         return previous;
//       }
//       case "REDO": {
//         if (future.length === 0) return state;
//         const next = future[0];
//         future = future.slice(1);
//         past = [...past, state];
//         return next;
//       }
//       default: {
//         const nextState = reducer(state, action);
//         // Jangan simpan jika state tidak berubah
//         if (nextState !== state) {
//           past = [...past, state].slice(-50); // max 50 entries
//           future = []; // Reset future on new action
//         }
//         return nextState;
//       }
//     }
//   };
// }
// ============================================================

function createPersistMiddleware(storageKey) {
  return (reducer) => (state, action) => {
    const nextState = reducer(state, action);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextState));
    } catch (err) {
      console.warn("Persist failed:", err.message);
    }
    return nextState;
  };
}

function createUndoMiddleware(reducer) {
  let past = [];
  let future = [];

  return (state, action) => {
    switch (action.type) {
      case "UNDO": {
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        past = past.slice(0, -1);
        future = [state, ...future];
        return previous;
      }
      case "REDO": {
        if (future.length === 0) return state;
        const next = future[0];
        future = future.slice(1);
        past = [...past, state];
        return next;
      }
      default: {
        const nextState = reducer(state, action);
        if (nextState !== state) {
          past = [...past, state].slice(-50);
          future = [];
        }
        return nextState;
      }
    }
  };
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
//   {
//     notes: [{ id, title, content, createdAt, tags }],
//     filter: "all",
//     sortBy: "newest",
//   }
//
// Action types:
//   ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, SET_FILTER, SET_SORT, HYDRATE
//
// function notesReducer(state, action) {
//   switch (action.type) {
//     case "ADD_NOTE":
//       return {
//         ...state,
//         notes: [
//           { id: `N${Date.now()}`, title: action.payload.title, content: action.payload.content, createdAt: Date.now(), tags: action.payload.tags || [] },
//           ...state.notes
//         ]
//       };
//
//     case "UPDATE_NOTE":
//       return {
//         ...state,
//         notes: state.notes.map(n => n.id === action.payload.id ? { ...n, ...action.payload } : n)
//       };
//
//     case "DELETE_NOTE":
//       return { ...state, notes: state.notes.filter(n => n.id !== action.payload.id) };
//
//     case "SET_FILTER":
//       return { ...state, filter: action.payload.filter };
//
//     case "SET_SORT":
//       return { ...state, sortBy: action.payload.sortBy };
//
//     case "HYDRATE":
//       return action.payload.state;
//
//     default:
//       return state;
//   }
// }
// ============================================================

function notesReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          { id: `N${Date.now()}`, title: action.payload.title, content: action.payload.content, createdAt: Date.now(), tags: action.payload.tags || [] },
          ...state.notes,
        ],
      };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === action.payload.id ? { ...n, ...action.payload } : n
        ),
      };

    case "DELETE_NOTE":
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload.id) };

    case "SET_FILTER":
      return { ...state, filter: action.payload.filter };

    case "SET_SORT":
      return { ...state, sortBy: action.payload.sortBy };

    case "HYDRATE":
      return action.payload.state;

    default:
      return state;
  }
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
// import { useReducer, useEffect, useCallback } from "react";
//
// export function useNotes() {
//   // Lazy initialization: coba load dari localStorage
//   const [state, dispatch] = useReducer(rootReducer, null, (initial) => {
//     try {
//       const stored = localStorage.getItem("notes_state");
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         // Hanya return jika valid state dengan notes array
//         if (parsed && Array.isArray(parsed.notes)) return parsed;
//       }
//     } catch {}
//     return initial;
//   });
//
//   // Hydrate dari localStorage (untuk handle case di mana middleware tidak jalan)
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("notes_state");
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         dispatch({ type: "HYDRATE", payload: { state: parsed } });
//       }
//     } catch {}
//   }, []);
//
//   // Keyboard shortcuts untuk undo/redo
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === "z") {
//         if (e.shiftKey) dispatch({ type: "REDO" });
//         else dispatch({ type: "UNDO" });
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);
//
//   const actions = {
//     addNote: useCallback((title, content, tags) => {
//       dispatch({ type: "ADD_NOTE", payload: { title, content, tags } });
//     }, []),
//
//     updateNote: useCallback((id, updates) => {
//       dispatch({ type: "UPDATE_NOTE", payload: { id, ...updates } });
//     }, []),
//
//     deleteNote: useCallback((id) => {
//       dispatch({ type: "DELETE_NOTE", payload: { id } });
//     }, []),
//
//     setFilter: useCallback((filter) => {
//       dispatch({ type: "SET_FILTER", payload: { filter } });
//     }, []),
//
//     setSort: useCallback((sortBy) => {
//       dispatch({ type: "SET_SORT", payload: { sortBy } });
//     }, []),
//
//     undo: useCallback(() => dispatch({ type: "UNDO" }), []),
//     redo: useCallback(() => dispatch({ type: "REDO" }), []),
//   };
//
//   return { state, ...actions };
// }
// ============================================================

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
// import { useState } from "react";
//
// export function NotesApp() {
//   const { state, addNote, updateNote, deleteNote, setFilter, setSort, undo, redo } = useNotes();
//   const [newTitle, setNewTitle] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [editingId, setEditingId] = useState(null);
//
//   // Filtered dan sorted notes
//   const filtered = state.notes.filter(note => {
//     if (state.filter === "all") return true;
//     return note.tags.includes(state.filter);
//   });
//
//   const sorted = [...filtered].sort((a, b) => {
//     switch (state.sortBy) {
//       case "newest": return b.createdAt - a.createdAt;
//       case "oldest": return a.createdAt - b.createdAt;
//       case "alpha": return a.title.localeCompare(b.title);
//       default: return 0;
//     }
//   });
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newTitle.trim()) return;
//     addNote(newTitle, newContent, []);
//     setNewTitle("");
//     setNewContent("");
//   };
//
//   return (
//     <div className="notes-app">
//       <div className="notes-header">
//         <h1>Notes</h1>
//         <div className="undo-redo">
//           <button onClick={undo}>↶ Undo</button>
//           <button onClick={redo}>↷ Redo</button>
//         </div>
//       </div>
//
//       {/* Filter & Sort */}
//       <div className="controls">
//         <select value={state.filter} onChange={e => setFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="important">Important</option>
//           <option value="work">Work</option>
//           <option value="personal">Personal</option>
//         </select>
//
//         <select value={state.sortBy} onChange={e => setSort(e.target.value)}>
//           <option value="newest">Newest first</option>
//           <option value="oldest">Oldest first</option>
//           <option value="alpha">Alphabetical</option>
//         </select>
//       </div>
//
//       {/* Add Note Form */}
//       <form onSubmit={handleSubmit} className="add-note-form">
//         <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Note title" />
//         <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Note content" />
//         <button type="submit">Add Note</button>
//       </form>
//
//       {/* Notes List */}
//       <div className="notes-list">
//         {sorted.map(note => (
//           <div key={note.id} className="note-card">
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>
//             <small>{new Date(note.createdAt).toLocaleString("id-ID")}</small>
//             <button onClick={() => deleteNote(note.id)}>🗑️</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// ============================================================

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