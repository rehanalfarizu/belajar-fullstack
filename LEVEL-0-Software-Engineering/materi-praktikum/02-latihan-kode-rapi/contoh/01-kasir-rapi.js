// Contoh hasil refactor dari code/01-kasir-spaghetti.js.
// Output-nya identik dengan versi spaghetti.
// Jalankan: node 01-kasir-rapi.js      Test: node --test

const TARIF_PAJAK = 0.11;
const ONGKIR = 8000;
const BATAS_GRATIS_ONGKIR = 75000;
const DISKON_MEMBER = { batasBelanjaBesar: 100000, persenBesar: 0.1, persenKecil: 0.05 };
const PROMO_HEMAT10 = { kode: "HEMAT10", minimalBelanja: 50000, potongan: 10000 };
const MINIMAL_MINUMAN_UNTUK_BONUS = 5;

function hitungSubtotal(keranjang) {
  return keranjang.reduce((total, item) => total + item.harga * item.jumlah, 0);
}

function hitungDiskonMember(subtotal, isMember) {
  if (!isMember) return 0;
  const persen =
    subtotal > DISKON_MEMBER.batasBelanjaBesar
      ? DISKON_MEMBER.persenBesar
      : DISKON_MEMBER.persenKecil;
  return subtotal * persen;
}

function hitungPotonganPromo(belanjaSetelahDiskon, kodePromo) {
  if (kodePromo !== PROMO_HEMAT10.kode) return 0;
  if (belanjaSetelahDiskon <= PROMO_HEMAT10.minimalBelanja) return 0;
  return PROMO_HEMAT10.potongan;
}

function hitungOngkir(totalBelanja) {
  return totalBelanja < BATAS_GRATIS_ONGKIR ? ONGKIR : 0;
}

function hitungJumlahMinuman(keranjang) {
  return keranjang
    .filter((item) => item.kategori === "minuman")
    .reduce((jumlah, item) => jumlah + item.jumlah, 0);
}

function hitungStruk(keranjang, { isMember, kodePromo }) {
  const subtotal = hitungSubtotal(keranjang);
  const diskonMember = hitungDiskonMember(subtotal, isMember);
  const diskon = diskonMember + hitungPotonganPromo(subtotal - diskonMember, kodePromo);
  const totalBelanja = subtotal - diskon;
  const pajak = totalBelanja * TARIF_PAJAK;
  const ongkir = hitungOngkir(totalBelanja);
  const jumlahMinuman = hitungJumlahMinuman(keranjang);

  return {
    subtotal,
    diskon,
    pajak,
    ongkir,
    totalBayar: totalBelanja + pajak + ongkir,
    jumlahMinuman,
    dapatBonus: jumlahMinuman >= MINIMAL_MINUMAN_UNTUK_BONUS,
  };
}

function cetakStruk(struk) {
  console.log(`Subtotal: Rp${struk.subtotal}`);
  console.log(`Diskon: Rp${struk.diskon}`);
  console.log(`Pajak 11%: Rp${Math.round(struk.pajak)}`);
  console.log(`Ongkir: Rp${struk.ongkir}`);
  console.log(`Total bayar: Rp${Math.round(struk.totalBayar)}`);
  console.log(`Jumlah minuman: ${struk.jumlahMinuman}`);
  if (struk.dapatBonus) {
    console.log("Bonus: gratis 1 kopi susu");
  }
}

module.exports = {
  hitungSubtotal,
  hitungDiskonMember,
  hitungPotonganPromo,
  hitungOngkir,
  hitungJumlahMinuman,
  hitungStruk,
};

// Bagian di bawah hanya jalan kalau file ini dijalankan langsung,
// tidak saat di-require oleh file test.
if (require.main === module) {
  const keranjangBesar = [
    { nama: "Kopi Susu", harga: 18000, jumlah: 2, kategori: "minuman" },
    { nama: "Roti Bakar", harga: 22000, jumlah: 1, kategori: "makanan" },
    { nama: "Teh Tarik", harga: 15000, jumlah: 3, kategori: "minuman" },
    { nama: "Nasi Goreng", harga: 30000, jumlah: 2, kategori: "makanan" },
  ];
  const keranjangKecil = [
    { nama: "Teh Tarik", harga: 15000, jumlah: 1, kategori: "minuman" },
    { nama: "Roti Bakar", harga: 22000, jumlah: 1, kategori: "makanan" },
  ];

  cetakStruk(hitungStruk(keranjangBesar, { isMember: true, kodePromo: "HEMAT10" }));
  console.log("---");
  cetakStruk(hitungStruk(keranjangKecil, { isMember: false, kodePromo: "" }));
}
