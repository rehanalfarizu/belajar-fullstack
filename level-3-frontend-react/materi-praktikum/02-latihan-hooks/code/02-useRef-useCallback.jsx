// ============================================================
// FILE: 02-latihan-hooks/code/02-useRef-useCallback.jsx
// MATERI: useRef dan useCallback (soal/02-useRef-useCallback.md)
// ============================================================
// Kerangka untuk soal 2A, 2B, 2C. Isi sendiri semua TODO(human).
// Pegangan: yang tampil di layar = useState. Yang cuma dipakai di balik
// layar (interval ID, waktu mulai, elemen DOM) = useRef.
import { useState, useRef, useEffect, useCallback, memo } from "react";

// ============================================================
// Soal 2A: SearchBar dengan auto-focus
// ============================================================
// Petunjuk:
//   - Ref apa yang menunjuk ke elemen <input>? Di prop mana ia dipasang?
//   - Kapan elemen DOM sudah ada, sehingga aman dipanggil .focus()?
//   - Tombol Clear harus melakukan dua hal. Apa saja, dan urutannya penting?
//
// Selesai kalau:
//   - Input langsung terfokus saat halaman dimuat.
//   - Klik "Clear" mengosongkan input DAN fokus kembali ke input.

export function SearchBar() {
  // TODO(human): state untuk isi input
  // TODO(human): ref untuk elemen input
  // TODO(human): fokus otomatis saat mount
  // TODO(human): handleClear

  return (
    <div className="search-bar">
      {/* TODO(human): input placeholder "Ketik untuk mencari..." */}
      {/* TODO(human): tombol Clear */}
    </div>
  );
}

// ============================================================
// Soal 2B: Stopwatch dengan useRef
// ============================================================
// Pegangan: yang tampil di layar = useState. Yang cuma dipakai di balik
// layar (interval ID, waktu mulai) = useRef.
//
// State  : isRunning, elapsedTime (milidetik)
// Ref    : intervalRef, startTimeRef
// Aksi   : Start, Stop, Reset
// Format : MM:SS:ms
// Jangan lupa membersihkan interval saat unmount.

export function StopwatchRef() {
  // TODO(human): state isRunning dan elapsedTime
  // TODO(human): ref untuk interval ID dan waktu mulai
  // TODO(human): handleStart, handleStop, handleReset
  // TODO(human): cleanup interval saat unmount

  return (
    <div className="stopwatch-ref">
      {/* TODO(human): tampilan MM:SS:ms */}
      {/* TODO(human): tombol Start / Stop / Reset */}
    </div>
  );
}
//
// Selesai kalau:
//   - Start menjalankan angka tiap ~100ms, Stop menghentikannya, Reset ke 0.
//   - Menekan Start berkali-kali tidak membuat interval ganda.
//   - Tidak ada interval yang tertinggal setelah komponen di-unmount.
//   - Kamu sudah mencoba menaruh elapsedTime di useRef dan mencatat hasilnya.

// ============================================================
// Soal 2C: Parent/Child dengan useCallback + React.memo
// ============================================================
// Petunjuk:
//   - Kenapa Child tetap re-render walau props-nya "kelihatan sama"?
//     (Bagaimana JavaScript membandingkan dua fungsi?)
//   - Apa yang harus ada di array dependency handleClick? Buktikan dengan
//     console.log di dalam Child.
//
// Selesai kalau:
//   - Mengetik di input `text` TIDAK membuat Child re-render.
//   - Mengklik tombol `count` membuat Child re-render.

// TODO(human): Child dibungkus React.memo, tampilkan console.log saat render
// TODO(human): Parent dengan state count dan text, handleClick via useCallback

export function Parent() {
  return (
    <div className="parent">
      {/* TODO(human): input text, tombol count, <Child onClick={handleClick} /> */}
    </div>
  );
}
