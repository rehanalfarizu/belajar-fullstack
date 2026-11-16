<?php

declare(strict_types=1);

/**
 * Soal 02 — Keranjang Belanja (PHP murni, tanpa Laravel).
 * Simpan di mana saja, lalu jalankan: php 02-keranjang-belanja.php
 *
 * Selama TODO belum diisi, file ini akan berhenti dengan LogicException.
 * Itu normal. Isi satu fungsi, jalankan, baca error berikutnya.
 */

// Katalog: kunci array = slug produk. Harga dalam rupiah (integer).
const KATALOG = [
    'keyboard-mekanik' => ['nama' => 'Keyboard Mekanik', 'harga' => 350_000, 'stok' => 5],
    'mouse-wireless'   => ['nama' => 'Mouse Wireless', 'harga' => 175_000, 'stok' => 10],
    'mousepad-xl'      => ['nama' => 'Mousepad XL', 'harga' => 85_000, 'stok' => 0],
];

const BATAS_DISKON = 500_000; // subtotal minimal untuk dapat diskon
const PERSEN_DISKON = 10;     // besar diskon dalam persen

/**
 * Hitung satu baris keranjang.
 * Return: ['slug', 'nama', 'harga', 'jumlah', 'subtotal'].
 */
function hitungBaris(array $katalog, string $slug, int $jumlah): array
{
    // TODO(human): tolak slug yang tidak ada di katalog (InvalidArgumentException).
    // TODO(human): tolak jumlah <= 0 (InvalidArgumentException).
    // TODO(human): tolak jumlah > stok (RangeException). Sebutkan diminta berapa, tersedia berapa.
    // TODO(human): return array baris dengan subtotal = harga x jumlah.
    throw new \LogicException('TODO: implementasikan hitungBaris()');
}

/**
 * Diskon PERSEN_DISKON% kalau subtotal >= BATAS_DISKON.
 * Hasil harus integer dan dibulatkan KE BAWAH.
 */
function hitungDiskon(int $subtotal): int
{
    // TODO(human): pakai match (true) { ... } untuk memilih aturan diskon.
    // TODO(human): cari fungsi PHP untuk pembagian integer yang membulatkan ke bawah.
    throw new \LogicException('TODO: implementasikan hitungDiskon()');
}

/**
 * $keranjang bentuknya ['slug' => jumlah, ...].
 * Return: ['baris' => [...], 'subtotal' => int, 'diskon' => int, 'total' => int].
 */
function hitungKeranjang(array $katalog, array $keranjang): array
{
    // TODO(human): tolak keranjang kosong.
    // TODO(human): ubah setiap item keranjang jadi baris (petunjuk: array_map).
    // TODO(human): jumlahkan subtotal semua baris (petunjuk: array_reduce).
    // TODO(human): hitung diskon dan total.
    throw new \LogicException('TODO: implementasikan hitungKeranjang()');
}

/**
 * 1250000 → "Rp 1.250.000"
 */
function formatRupiah(int $nominal): string
{
    // TODO(human): format angka dengan titik sebagai pemisah ribuan.
    throw new \LogicException('TODO: implementasikan formatRupiah()');
}

// ---------- Tampilkan struk ----------
// TODO(human): panggil hitungKeranjang() untuk 1 keyboard-mekanik + 2 mouse-wireless,
//              simpan ke $hasil, lalu cetak tiap baris, subtotal, diskon, dan total.

// ---------- Cek mandiri ----------
// Jangan ubah bagian ini. Kalau semua benar, muncul "Semua cek lulus."
// Sengaja tidak pakai assert(): di php.ini mode production, assert() bisa dimatikan.
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

$cek = hitungKeranjang(KATALOG, ['keyboard-mekanik' => 1, 'mouse-wireless' => 2]);
cek($cek['subtotal'] === 700_000, '$cek[\'subtotal\'] === 700_000');
cek($cek['diskon'] === 70_000, '$cek[\'diskon\'] === 70_000');
cek($cek['total'] === 630_000, '$cek[\'total\'] === 630_000');
cek(hitungDiskon(499_999) === 0, 'hitungDiskon(499_999) === 0');
cek(hitungDiskon(500_000) === 50_000, 'hitungDiskon(500_000) === 50_000');
cek(hitungDiskon(500_005) === 50_000, 'hitungDiskon(500_005) === 50_000');
cek(formatRupiah(1_250_000) === 'Rp 1.250.000', 'formatRupiah(1_250_000) === \'Rp 1.250.000\'');

harusGagal(fn () => hitungKeranjang(KATALOG, []), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['laptop' => 1]), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [\'laptop\' => 1])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['mouse-wireless' => 0]), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [\'mouse-wireless\' => 0])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['mousepad-xl' => 1]), RangeException::class, 'hitungKeranjang(KATALOG, [\'mousepad-xl\' => 1])');

echo PHP_EOL . 'Semua cek lulus.' . PHP_EOL;
