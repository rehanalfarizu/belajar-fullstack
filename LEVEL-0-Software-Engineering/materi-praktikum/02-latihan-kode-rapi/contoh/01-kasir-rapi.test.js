// Jalankan dari folder contoh/: node --test
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  hitungDiskonMember,
  hitungPotonganPromo,
  hitungOngkir,
  hitungStruk,
} = require("./01-kasir-rapi.js");

test("bukan member tidak dapat diskon", () => {
  assert.equal(hitungDiskonMember(200000, false), 0);
});

test("member belanja di atas 100 ribu dapat 10%", () => {
  assert.equal(hitungDiskonMember(200000, true), 20000);
});

test("member belanja tepat 100 ribu masih 5% (batasnya 'lebih dari')", () => {
  assert.equal(hitungDiskonMember(100000, true), 5000);
});

test("promo HEMAT10 tidak berlaku kalau belanja setelah diskon tepat 50 ribu", () => {
  assert.equal(hitungPotonganPromo(50000, "HEMAT10"), 0);
});

test("ongkir gratis mulai 75 ribu", () => {
  assert.equal(hitungOngkir(74999), 8000);
  assert.equal(hitungOngkir(75000), 0);
});

test("keranjang kosong menghasilkan total ongkir saja", () => {
  const struk = hitungStruk([], { isMember: false, kodePromo: "" });
  assert.equal(struk.totalBayar, 8000);
  assert.equal(struk.dapatBonus, false);
});
