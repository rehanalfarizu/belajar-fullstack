<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — Soal 02 Keranjang Belanja.
 * Jalankan: php 02-keranjang-belanja.php
 */

// Katalog: kunci array = slug produk.
const KATALOG = [
    'keyboard-mekanik' => ['nama' => 'Keyboard Mekanik', 'harga' => 350_000, 'stok' => 5],
    'mouse-wireless'   => ['nama' => 'Mouse Wireless', 'harga' => 175_000, 'stok' => 10],
    'mousepad-xl'      => ['nama' => 'Mousepad XL', 'harga' => 85_000, 'stok' => 0],
];

const BATAS_DISKON = 500_000;
const PERSEN_DISKON = 10;

function hitungBaris(array $katalog, string $slug, int $jumlah): array
{
    if (!array_key_exists($slug, $katalog)) {
        throw new InvalidArgumentException("Produk '{$slug}' tidak ada di katalog.");
    }

    if ($jumlah <= 0) {
        throw new InvalidArgumentException("Jumlah untuk '{$slug}' harus lebih dari 0.");
    }

    $produk = $katalog[$slug];

    if ($jumlah > $produk['stok']) {
        throw new RangeException(
            "Stok '{$slug}' tidak cukup: diminta {$jumlah}, tersedia {$produk['stok']}."
        );
    }

    return [
        'slug' => $slug,
        'nama' => $produk['nama'],
        'harga' => $produk['harga'],
        'jumlah' => $jumlah,
        'subtotal' => $produk['harga'] * $jumlah,
    ];
}

function hitungDiskon(int $subtotal): int
{
    // intdiv membulatkan ke bawah, jadi toko tidak pernah "rugi" pecahan rupiah.
    return match (true) {
        $subtotal >= BATAS_DISKON => intdiv($subtotal * PERSEN_DISKON, 100),
        default => 0,
    };
}

function hitungKeranjang(array $katalog, array $keranjang): array
{
    if ($keranjang === []) {
        throw new InvalidArgumentException('Keranjang kosong.');
    }

    // array_keys + array_map supaya slug dan jumlah sama-sama terbawa.
    $baris = array_map(
        fn (string $slug): array => hitungBaris($katalog, $slug, $keranjang[$slug]),
        array_keys($keranjang),
    );

    $subtotal = array_reduce(
        $baris,
        fn (int $total, array $item): int => $total + $item['subtotal'],
        0,
    );

    $diskon = hitungDiskon($subtotal);

    return [
        'baris' => $baris,
        'subtotal' => $subtotal,
        'diskon' => $diskon,
        'total' => $subtotal - $diskon,
    ];
}

function formatRupiah(int $nominal): string
{
    return 'Rp ' . number_format($nominal, 0, ',', '.');
}

// ---------- Tampilkan struk ----------
$hasil = hitungKeranjang(KATALOG, [
    'keyboard-mekanik' => 1,
    'mouse-wireless' => 2,
]);

foreach ($hasil['baris'] as $item) {
    printf("%-18s x%d  %s%s", $item['nama'], $item['jumlah'], formatRupiah($item['subtotal']), PHP_EOL);
}
echo 'Subtotal : ' . formatRupiah($hasil['subtotal']) . PHP_EOL;
echo 'Diskon   : ' . formatRupiah($hasil['diskon']) . PHP_EOL;
echo 'Total    : ' . formatRupiah($hasil['total']) . PHP_EOL;

// ---------- Cek mandiri ----------
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

cek($hasil['subtotal'] === 700_000, '$hasil[\'subtotal\'] === 700_000');
cek($hasil['diskon'] === 70_000, '$hasil[\'diskon\'] === 70_000');
cek($hasil['total'] === 630_000, '$hasil[\'total\'] === 630_000');
cek(hitungDiskon(499_999) === 0, 'hitungDiskon(499_999) === 0');
cek(hitungDiskon(500_000) === 50_000, 'hitungDiskon(500_000) === 50_000');
cek(hitungDiskon(500_005) === 50_000, 'hitungDiskon(500_005) === 50_000');
cek(formatRupiah(1_250_000) === 'Rp 1.250.000', 'formatRupiah(1_250_000) === \'Rp 1.250.000\'');

harusGagal(fn () => hitungKeranjang(KATALOG, []), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['laptop' => 1]), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [\'laptop\' => 1])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['mouse-wireless' => 0]), InvalidArgumentException::class, 'hitungKeranjang(KATALOG, [\'mouse-wireless\' => 0])');
harusGagal(fn () => hitungKeranjang(KATALOG, ['mousepad-xl' => 1]), RangeException::class, 'hitungKeranjang(KATALOG, [\'mousepad-xl\' => 1])');

echo PHP_EOL . 'Semua cek lulus.' . PHP_EOL;
