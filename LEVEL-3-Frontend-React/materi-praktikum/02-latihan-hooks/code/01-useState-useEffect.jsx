// ============================================================
// FILE: 02-latihan-hooks/code/01-useState.jsx
// MATERI: useState — Counter dengan Functional Update Pattern
// ============================================================
import { useState, useRef, useEffect } from "react";

// ============================================================
// TODO: TrafficLight Component
// ============================================================
// State:
//   - currentLight: "red" | "yellow" | "green" (default: "red")
//   - isAuto: boolean (default: true)
//   - countdown: number (countdown detik untuk light saat ini)
//
// Fitur:
//   1. Tampilkan tiga lingkaran traffic light:
//      - Light yang aktif: scale(1.1), brightness tinggi, shadow glow
//      - Light yang tidak aktif: opacity 0.3, grayscale
//   2. Timer countdown display: "Red dalam 3... 2... 1..."
//   3. Auto mode:
//      - red → 3 detik → green → 3 detik → yellow → 1 detik → red
//      - Gunakan useEffect + setInterval + useRef untuk interval ID
//      - Cleanup: clearInterval saat unmount atau saat auto dimatikan
//   4. Manual mode:
//      - Tombol "Auto" / "Manual" untuk toggle
//      - Jika manual: tampilkan tombol Red, Yellow, Green untuk switch
//   5. Functional update untuk countdown: setCountdown(prev => prev - 1)
//
// Durasi light:
//   const LIGHT_DURATIONS = { red: 3, green: 3, yellow: 1 };
//
// ============================================================

export function TrafficLight() {
  // TODO: State untuk currentLight, isAuto, countdown

  // TODO: useRef untuk menyimpan interval ID
  // const intervalRef = useRef(null);

  // TODO: useEffect untuk auto mode
  // - Jika isAuto === true: setInterval setiap 1 detik
  // - Jika countdown === 0: switch ke light berikutnya + reset countdown
  // - Cleanup: clearInterval saat unmount atau isAuto berubah
  // useEffect(() => {
  //   if (!isAuto) {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //     return;
  //   }
  //
  //   const durations = { red: 3, green: 3, yellow: 1 };
  //   intervalRef.current = setInterval(() => {
  //     setCountdown(prev => {
  //       if (prev <= 1) {
  //         // switch light
  //         return prev; // placeholder
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  //
  //   return () => clearInterval(intervalRef.current);
  // }, [isAuto, currentLight]);

  return (
    <div className="traffic-light">
      {/* TODO: Red light circle */}
      {/* TODO: Yellow light circle */}
      {/* TODO: Green light circle */}
      {/* TODO: Countdown display */}
      {/* TODO: Auto/Manual toggle button */}
      {/* TODO: Manual buttons (jika !isAuto) */}
    </div>
  );
}

// ============================================================
// TODO: ColorPicker dengan Array State
// ============================================================
// State:
//   - colors: array of { id, name, hex, isFavorite }
//   - initial: [{ id: "c1", name: "Red", hex: "#ef4444", isFavorite: false }, ...]
//
// Fitur:
//   1. List semua warna dengan color swatch
//   2. Toggle favorite dengan functional update:
  //      setColors(prev => prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
//   3. Filter: "Semua" / "Favorit" toggle
//   4. Add color: form untuk menambah warna baru
//   5. Delete color: remove dari array
//
// CATATAN:
//   - Immutable update: gunakan .map() dan .filter(), BUKAN .splice() atau .push()
//   - setColors(prev => [...prev, newColor]) untuk add
//   - setColors(prev => prev.filter(c => c.id !== id)) untuk delete
// ============================================================

export function ColorPicker() {
  const [colors, setColors] = useState([
    { id: "c1", name: "Red", hex: "#ef4444", isFavorite: false },
    { id: "c2", name: "Blue", hex: "#3b82f6", isFavorite: true },
    { id: "c3", name: "Green", hex: "#22c55e", isFavorite: false },
    { id: "c4", name: "Yellow", hex: "#eab308", isFavorite: false },
    { id: "c5", name: "Purple", hex: "#a855f7", isFavorite: false },
  ]);

  // TODO: toggleFavorite

  // TODO: deleteColor

  // TODO: addColor

  // TODO: filter state: "all" | "favorites"

  return (
    <div className="color-picker">
      {/* TODO: Filter buttons */}
      {/* TODO: Color list */}
      {/* TODO: Add color form */}
    </div>
  );
}

// ============================================================
// TODO: AnimatedCounter
// ============================================================
// State: count (number)
//
// Fitur:
//   1. Increment / Decrement buttons
//   2. Animated number: count berubah dengan CSS transition
//   3. Set count: input untuk set number langsung
//   4. Reset button
//   5. Counter berubah warna berdasarkan range:
//      - 0-10: biru
//      - 11-20: hijau
//      - 21-50: kuning
//      - > 50: merah
//
// CATATAN: Untuk animated color, gunakan inline style yang computed dari count
// ============================================================

export function AnimatedCounter() {
  // TODO: State untuk count

  // TODO: Helper function untuk color berdasarkan count
  // function getColor(count) {
  //   if (count <= 10) return "#3b82f6";
  //   if (count <= 20) return "#22c55e";
  //   if (count <= 50) return "#eab308";
  //   return "#ef4444";
  // }

  return (
    <div className="animated-counter">
      {/* TODO: Display dengan animated style */}
      {/* TODO: Increment / Decrement buttons */}
      {/* TODO: Set input */}
    </div>
  );
}