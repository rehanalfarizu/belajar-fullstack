<?php

declare(strict_types=1);

/**
 * SOLUSI REFERENSI soal 10-02.
 *
 * Pemakaian:
 *   php 02-cek-rahasia-repo.php /path/ke/toko-latihan
 *
 * Exit code 0 = aman, 1 = ada masalah, 2 = salah pemakaian.
 * Script ini TIDAK PERNAH mencetak nilai rahasia.
 */

const PLACEHOLDER = ['', 'null', 'changeme', 'ganti-saya', 'isi-di-server', 'your-password', 'secret'];

/**
 * Ambil daftar file yang dilacak Git di folder $dir.
 *
 * @return list<string>
 */
function ambilFileTerlacak(string $dir): array
{
    // escapeshellarg mencegah path berisi spasi/karakter aneh merusak perintah.
    $perintah = 'git -C ' . escapeshellarg($dir) . ' ls-files 2>/dev/null';
    $baris = [];
    $kodeKeluar = 0;
    exec($perintah, $baris, $kodeKeluar);

    // Exit code bukan 0 berarti bukan repo Git (atau git tidak terpasang).
    if ($kodeKeluar !== 0) {
        throw new RuntimeException('Folder ini bukan repo Git atau git tidak terpasang.');
    }

    return array_values(array_filter($baris, fn (string $f): bool => $f !== ''));
}

/**
 * Cari file .env (atau .env.*) yang ikut ter-commit, kecuali .env.example.
 *
 * @param list<string> $files
 * @return list<string>
 */
function cariEnvTerlacak(array $files): array
{
    $hasil = [];

    foreach ($files as $file) {
        $nama = basename($file);

        if ($nama === '.env.example') {
            continue;
        }

        if ($nama === '.env' || str_starts_with($nama, '.env.')) {
            $hasil[] = $file;
        }
    }

    return $hasil;
}

/**
 * Apakah isi .gitignore mengabaikan file .env?
 */
function gitignoreMengabaikanEnv(string $isiGitignore): bool
{
    foreach (preg_split('/\R/', $isiGitignore) ?: [] as $baris) {
        $baris = trim($baris);

        if (in_array($baris, ['.env', '/.env', '.env*', '/.env*'], true)) {
            return true;
        }
    }

    return false;
}

/**
 * Parse isi file dotenv sederhana menjadi KEY => nilai.
 *
 * @return array<string, string>
 */
function parseEnv(string $isi): array
{
    $hasil = [];

    foreach (preg_split('/\R/', $isi) ?: [] as $baris) {
        $baris = trim($baris);

        if ($baris === '' || str_starts_with($baris, '#') || ! str_contains($baris, '=')) {
            continue;
        }

        [$kunci, $nilai] = explode('=', $baris, 2);

        // Buang komentar di akhir baris (hanya kalau nilai tidak diapit kutip).
        $nilai = trim($nilai);
        if (! str_starts_with($nilai, '"') && str_contains($nilai, ' #')) {
            $nilai = trim(explode(' #', $nilai, 2)[0]);
        }

        $hasil[trim($kunci)] = trim($nilai, "\"'");
    }

    return $hasil;
}

function terlihatPlaceholder(string $nilai): bool
{
    return in_array(strtolower($nilai), PLACEHOLDER, true)
        || str_starts_with($nilai, '${')       // referensi ke variabel lain
        || preg_match('/^<.*>$/', $nilai) === 1; // misal <isi-di-server>
}

/**
 * Samarkan nilai: hanya sebut panjangnya, tidak pernah isinya.
 */
function samarkan(string $nilai): string
{
    return sprintf('[disamarkan, %d karakter]', strlen($nilai));
}

/**
 * Periksa .env.example. Kembalikan daftar pesan error (tanpa nilai asli).
 *
 * @param array<string, string> $env
 * @return list<string>
 */
function periksaEnvExample(array $env): array
{
    $errors = [];

    foreach ($env as $kunci => $nilai) {
        if ($nilai === '' || terlihatPlaceholder($nilai)) {
            continue;
        }

        $alasan = match (true) {
            $kunci === 'APP_KEY' => 'APP_KEY harus kosong di .env.example',
            str_starts_with($nilai, 'base64:') && strlen($nilai) > 20 => 'mirip kunci base64 asli',
            str_contains($nilai, 'sk_live_') => 'mirip API key live',
            (bool) preg_match('/(PASSWORD|SECRET|TOKEN|_KEY)$/', $kunci) => 'variabel rahasia berisi nilai',
            default => null,
        };

        if ($alasan !== null) {
            $errors[] = sprintf('%s: %s %s', $kunci, $alasan, samarkan($nilai));
        }
    }

    return $errors;
}

// ------------------------------------------------------------------
// Program utama
// ------------------------------------------------------------------

if (PHP_SAPI !== 'cli') {
    exit(2);
}

$dir = $argv[1] ?? null;

if ($dir === null || ! is_dir($dir)) {
    fwrite(STDERR, "Pemakaian: php 02-cek-rahasia-repo.php /path/ke/project" . PHP_EOL);
    exit(2);
}

$dir = rtrim($dir, DIRECTORY_SEPARATOR);
$masalah = [];

try {
    foreach (cariEnvTerlacak(ambilFileTerlacak($dir)) as $file) {
        $masalah[] = "File {$file} ikut dilacak Git. Ganti semua rahasianya, lalu git rm --cached.";
    }
} catch (RuntimeException $e) {
    $masalah[] = $e->getMessage();
}

$gitignore = $dir . '/.gitignore';
if (! is_file($gitignore) || ! gitignoreMengabaikanEnv((string) file_get_contents($gitignore))) {
    $masalah[] = '.gitignore tidak mengabaikan .env';
}

$contohEnv = $dir . '/.env.example';
if (! is_file($contohEnv)) {
    $masalah[] = '.env.example tidak ada. Orang baru tidak tahu variabel apa yang dibutuhkan.';
} else {
    foreach (periksaEnvExample(parseEnv((string) file_get_contents($contohEnv))) as $error) {
        $masalah[] = '.env.example → ' . $error;
    }
}

if ($masalah !== []) {
    fwrite(STDERR, 'GAGAL — ditemukan ' . count($masalah) . ' masalah:' . PHP_EOL);
    foreach ($masalah as $pesan) {
        fwrite(STDERR, " - {$pesan}" . PHP_EOL);
    }
    exit(1);
}

echo 'LULUS — tidak ada rahasia yang terlihat ikut ke repo.' . PHP_EOL;
exit(0);
