// ============================================================
// SOAL 05 — MODULE SYSTEM
// ============================================================

// ============================================================
// FILE: math.js (exports)
// ============================================================
//
// // atau: module.exports.add = add; ...

// ============================================================
// FILE: stringHelper.js (exports)
// ============================================================
//

// ============================================================
// FILE: index.js (main)
// ============================================================
// const math = require("./math");
// const str = require("./stringHelper");
//
// console.log(math.add(5, 3));       // 8
// console.log(math.divide(10, 2));  // 5
// console.log(str.capitalize("andi")); // "Andi"

// ============================================================
// DEMO: ES Modules (jika package.json punya "type": "module")
// ============================================================
// math.mjs:
// export const add = (a, b) => a + b;
// export default { add };
//
// index.mjs:
// import { add } from "./math.mjs";
// import math from "./math.mjs";

// ============================================================
// DEMO: Circular Dependency
// ============================================================
// a.js:
// const { valueB } = require("./b");
// const valueA = 10;
//
// b.js:
// const { valueA } = require("./a"); // valueA akan undefined!
// const valueB = 20;
//
// SOLUSI: lazy loading
// b.js:
// let valueA;

// ============================================================
// TEST
// ============================================================
console.log("=== Module System Demo ===");

// Simulasi module exports
const math = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

const str = {
  capitalize: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
};

console.log("math.add(5,3):", math.add(5, 3));
console.log("str.capitalize('andi'):", str.capitalize("andi"));

console.log("\nUntuk implementasi penuh, buat file terpisah dan require.");