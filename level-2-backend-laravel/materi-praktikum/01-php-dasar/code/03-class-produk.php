<?php

declare(strict_types=1);

/**
 * Soal 03 — Class Produk dan Katalog (PHP murni, tanpa Laravel).
 * Simpan di mana saja, lalu jalankan: php 03-class-produk.php
 *
 * Urutan kerja yang disarankan: enum → Produk → AturanDiskon → Katalog.
 * Setiap kali satu bagian selesai, jalankan file ini dan baca error berikutnya.
 */

enum StatusProduk: string
{
    // TODO(human): tambahkan 3 case: Aktif = 'aktif', Draft = 'draft', Arsip = 'arsip'.

    public function label(): string
    {
        // TODO(human): Aktif → 'Dijual', Draft → 'Belum terbit', Arsip → 'Tidak dijual lagi'.
        throw new \LogicException('TODO: implementasikan StatusProduk::label()');
    }
}

final class Produk
{
    // TODO(human): ganti constructor kosong ini dengan constructor property promotion.
    //              Properti: slug, nama, harga (int), stok (int), status (StatusProduk, default Aktif).
    //              Semua properti harus readonly.
    // TODO(human): di dalam constructor, validasi:
    //              - slug hanya huruf kecil, angka, dan tanda "-" (contoh: "mouse-wireless")
    //              - nama tidak boleh kosong / spasi saja
    //              - harga dan stok tidak boleh negatif
    //              Lempar InvalidArgumentException kalau melanggar.
    public function __construct()
    {
        throw new \LogicException('TODO: implementasikan Produk::__construct()');
    }

    /**
     * Factory: ubah array mentah (misal dari JSON) jadi object Produk.
     * Status yang tidak dikenal → StatusProduk::Draft.
     */
    public static function dariArray(array $data): self
    {
        // TODO(human): baca kunci slug, nama, harga, stok, status dari $data.
        // TODO(human): cari method bawaan enum yang mengembalikan null kalau value tidak cocok.
        throw new \LogicException('TODO: implementasikan Produk::dariArray()');
    }

    public function bisaDibeli(): bool
    {
        // TODO(human): true hanya kalau status Aktif DAN stok > 0.
        throw new \LogicException('TODO: implementasikan Produk::bisaDibeli()');
    }

    public function hargaSetelah(AturanDiskon $aturan): int
    {
        // TODO(human): harga dikurangi potongan dari $aturan.
        throw new \LogicException('TODO: implementasikan Produk::hargaSetelah()');
    }
}

interface AturanDiskon
{
    /** Besar potongan dalam rupiah. Tidak boleh melebihi harga produk. */
    public function potongan(Produk $produk): int;
}

// TODO(human): buat class DiskonPersen yang implements AturanDiskon.
//              - constructor menerima persen (int), tolak di luar 0–100.
//              - potongan = persen dari harga, dibulatkan ke bawah.

// TODO(human): buat class DiskonNominal yang implements AturanDiskon.
//              - constructor menerima nominal rupiah (int), tolak negatif.
//              - potongan tidak boleh membuat harga akhir minus.

final class Katalog
{
    /** @var array<string, Produk> kunci = slug */
    private array $produk = [];

    public function tambah(Produk $produk): void
    {
        // TODO(human): tolak slug yang sudah ada (DomainException), lalu simpan.
        throw new \LogicException('TODO: implementasikan Katalog::tambah()');
    }

    public function cari(string $slug): ?Produk
    {
        // TODO(human): return produk atau null kalau tidak ada.
        throw new \LogicException('TODO: implementasikan Katalog::cari()');
    }

    /** @return list<Produk> */
    public function aktif(): array
    {
        // TODO(human): hanya produk berstatus Aktif. Hasilnya list (index 0,1,2...).
        throw new \LogicException('TODO: implementasikan Katalog::aktif()');
    }

    /** @return list<Produk> salinan baru; isi katalog tidak ikut berubah. */
    public function urutHarga(bool $naik = true): array
    {
        // TODO(human): urutkan salinan berdasarkan harga, naik atau turun.
        throw new \LogicException('TODO: implementasikan Katalog::urutHarga()');
    }

    public function jumlah(): int
    {
        // TODO(human): banyaknya produk di katalog.
        throw new \LogicException('TODO: implementasikan Katalog::jumlah()');
    }
}

// ---------- Demo ----------
// Jangan ubah bagian ini. Kalau semua benar, muncul daftar produk lalu "Semua cek lulus."
$katalog = new Katalog();
$katalog->tambah(new Produk('keyboard-mekanik', 'Keyboard Mekanik', 350_000, 5));
$katalog->tambah(new Produk('mouse-wireless', 'Mouse Wireless', 175_000, 0));
$katalog->tambah(Produk::dariArray([
    'slug' => 'monitor-24',
    'nama' => 'Monitor 24 inci',
    'harga' => 1_650_000,
    'stok' => 3,
    'status' => 'draft',
]));

foreach ($katalog->urutHarga() as $p) {
    printf(
        "%-16s Rp %s  [%s]%s%s",
        $p->nama,
        number_format($p->harga, 0, ',', '.'),
        $p->status->label(),
        $p->bisaDibeli() ? '' : ' (tidak bisa dibeli)',
        PHP_EOL,
    );
}

// ---------- Cek mandiri ----------
function cek(bool $kondisi, string $pesan): void
{
    if (!$kondisi) {
        throw new RuntimeException("CEK GAGAL: {$pesan}");
    }
}

function harusGagal(callable $aksi, string $kelasException, string $pesan): void
{
    try {
        $aksi();
    } catch (Throwable $e) {
        cek($e instanceof $kelasException, "{$pesan} (dapat " . $e::class . ')');
        return;
    }
    throw new RuntimeException("CEK GAGAL: {$pesan} (tidak ada exception)");
}

$keyboard = $katalog->cari('keyboard-mekanik');
cek($keyboard instanceof Produk, 'cari slug yang ada');
cek($katalog->cari('tidak-ada') === null, 'cari slug yang tidak ada → null');
cek($katalog->jumlah() === 3, 'jumlah produk 3');
cek(count($katalog->aktif()) === 2, 'produk aktif ada 2');
cek($katalog->urutHarga()[0]->slug === 'mouse-wireless', 'urut naik: termurah dulu');
cek($katalog->urutHarga(false)[0]->slug === 'monitor-24', 'urut turun: termahal dulu');
cek($keyboard->bisaDibeli(), 'keyboard aktif dan ada stok');
cek(!$katalog->cari('mouse-wireless')->bisaDibeli(), 'mouse stok 0 tidak bisa dibeli');
cek($keyboard->hargaSetelah(new DiskonPersen(10)) === 315_000, 'diskon 10%');
cek($keyboard->hargaSetelah(new DiskonNominal(50_000)) === 300_000, 'diskon nominal');
cek($keyboard->hargaSetelah(new DiskonNominal(999_999)) === 0, 'diskon tidak bikin harga minus');
cek(Produk::dariArray(['slug' => 'x', 'nama' => 'X', 'harga' => 1, 'status' => 'ngawur'])->status === StatusProduk::Draft, 'status tak dikenal → draft');

harusGagal(fn () => new Produk('Slug Salah', 'X', 1, 1), InvalidArgumentException::class, 'slug tidak valid');
harusGagal(fn () => new Produk('ok', '   ', 1, 1), InvalidArgumentException::class, 'nama kosong');
harusGagal(fn () => new Produk('ok', 'X', -1, 1), InvalidArgumentException::class, 'harga negatif');
harusGagal(fn () => new DiskonPersen(150), InvalidArgumentException::class, 'persen > 100');
harusGagal(fn () => $katalog->tambah(new Produk('keyboard-mekanik', 'Duplikat', 1, 1)), DomainException::class, 'slug duplikat');
harusGagal(fn () => $keyboard->harga = 1, Error::class, 'readonly tidak bisa diubah');

echo PHP_EOL . 'Semua cek lulus.' . PHP_EOL;
