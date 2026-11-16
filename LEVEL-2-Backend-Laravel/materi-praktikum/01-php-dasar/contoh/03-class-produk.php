<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI — Soal 03 Class Produk dan Katalog.
 * Jalankan: php 03-class-produk.php
 */

enum StatusProduk: string
{
    case Aktif = 'aktif';
    case Draft = 'draft';
    case Arsip = 'arsip';

    public function label(): string
    {
        return match ($this) {
            self::Aktif => 'Dijual',
            self::Draft => 'Belum terbit',
            self::Arsip => 'Tidak dijual lagi',
        };
    }
}

final class Produk
{
    public function __construct(
        public readonly string $slug,
        public readonly string $nama,
        public readonly int $harga,
        public readonly int $stok,
        public readonly StatusProduk $status = StatusProduk::Aktif,
    ) {
        if (preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug) !== 1) {
            throw new InvalidArgumentException("Slug '{$slug}' tidak valid.");
        }

        if (trim($nama) === '') {
            throw new InvalidArgumentException('Nama produk wajib diisi.');
        }

        if ($harga < 0 || $stok < 0) {
            throw new InvalidArgumentException('Harga dan stok tidak boleh negatif.');
        }
    }

    /**
     * Factory: ubah array mentah (misal dari JSON) jadi object Produk.
     */
    public static function dariArray(array $data): self
    {
        return new self(
            slug: (string) ($data['slug'] ?? ''),
            nama: (string) ($data['nama'] ?? ''),
            harga: (int) ($data['harga'] ?? -1),
            stok: (int) ($data['stok'] ?? 0),
            // tryFrom mengembalikan null kalau status tidak dikenal → pakai default.
            status: StatusProduk::tryFrom((string) ($data['status'] ?? '')) ?? StatusProduk::Draft,
        );
    }

    public function bisaDibeli(): bool
    {
        return $this->status === StatusProduk::Aktif && $this->stok > 0;
    }

    public function hargaSetelah(AturanDiskon $aturan): int
    {
        return $this->harga - $aturan->potongan($this);
    }
}

interface AturanDiskon
{
    /** Besar potongan dalam rupiah. Tidak boleh melebihi harga produk. */
    public function potongan(Produk $produk): int;
}

final class DiskonPersen implements AturanDiskon
{
    public function __construct(private readonly int $persen)
    {
        if ($persen < 0 || $persen > 100) {
            throw new InvalidArgumentException('Persen diskon harus 0–100.');
        }
    }

    public function potongan(Produk $produk): int
    {
        return intdiv($produk->harga * $this->persen, 100);
    }
}

final class DiskonNominal implements AturanDiskon
{
    public function __construct(private readonly int $nominal)
    {
        if ($nominal < 0) {
            throw new InvalidArgumentException('Nominal diskon tidak boleh negatif.');
        }
    }

    public function potongan(Produk $produk): int
    {
        // Harga akhir tidak boleh minus.
        return min($this->nominal, $produk->harga);
    }
}

final class Katalog
{
    /** @var array<string, Produk> kunci = slug */
    private array $produk = [];

    public function tambah(Produk $produk): void
    {
        if (isset($this->produk[$produk->slug])) {
            throw new DomainException("Slug '{$produk->slug}' sudah dipakai.");
        }

        $this->produk[$produk->slug] = $produk;
    }

    public function cari(string $slug): ?Produk
    {
        return $this->produk[$slug] ?? null;
    }

    /** @return list<Produk> */
    public function aktif(): array
    {
        return array_values(array_filter(
            $this->produk,
            fn (Produk $p): bool => $p->status === StatusProduk::Aktif,
        ));
    }

    /** @return list<Produk> salinan baru; isi katalog tidak ikut berubah. */
    public function urutHarga(bool $naik = true): array
    {
        $daftar = array_values($this->produk);

        usort(
            $daftar,
            fn (Produk $a, Produk $b): int => $naik
                ? $a->harga <=> $b->harga
                : $b->harga <=> $a->harga,
        );

        return $daftar;
    }

    public function jumlah(): int
    {
        return count($this->produk);
    }
}

// ---------- Demo ----------
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
