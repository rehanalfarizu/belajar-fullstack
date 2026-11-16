// Program kasir kafe.
// Program ini JALAN dan hasilnya BENAR, tapi berantakan.
// Tugasmu ada di soal/01-refactor-kasir.md: rapikan tanpa mengubah output.
// Jalankan: node 01-kasir-spaghetti.js

var k = [
  { n: "Kopi Susu", h: 18000, q: 2, kat: "minuman" },
  { n: "Roti Bakar", h: 22000, q: 1, kat: "makanan" },
  { n: "Teh Tarik", h: 15000, q: 3, kat: "minuman" },
  { n: "Nasi Goreng", h: 30000, q: 2, kat: "makanan" },
];
var k2 = [
  { n: "Teh Tarik", h: 15000, q: 1, kat: "minuman" },
  { n: "Roti Bakar", h: 22000, q: 1, kat: "makanan" },
];

function proses(k, m, kd) {
  var s = 0;
  for (var i = 0; i < k.length; i++) {
    s = s + k[i].h * k[i].q;
  }
  var d = 0;
  if (m == true) {
    if (s > 100000) {
      d = s * 0.1;
    } else {
      d = s * 0.05;
    }
  }
  if (kd == "HEMAT10") {
    if (s - d > 50000) {
      d = d + 10000;
    }
  }
  var tot = s - d;
  var p = tot * 0.11;
  var o = 0;
  if (tot < 75000) {
    o = 8000;
  }
  var mi = 0;
  for (var j = 0; j < k.length; j++) {
    if (k[j].kat == "minuman") {
      mi = mi + k[j].q;
    }
  }
  console.log("Subtotal: Rp" + s);
  console.log("Diskon: Rp" + d);
  console.log("Pajak 11%: Rp" + Math.round(p));
  console.log("Ongkir: Rp" + o);
  console.log("Total bayar: Rp" + Math.round(tot + p + o));
  console.log("Jumlah minuman: " + mi);
  if (mi >= 5) {
    console.log("Bonus: gratis 1 kopi susu");
  }
}

proses(k, true, "HEMAT10");
console.log("---");
proses(k2, false, "");
