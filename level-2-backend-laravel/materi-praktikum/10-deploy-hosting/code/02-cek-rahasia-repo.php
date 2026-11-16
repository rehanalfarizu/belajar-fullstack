<?php

declare(strict_types=1);

/**
 * Script PHP biasa (BUKAN file Laravel). Tidak perlu disalin ke mana-mana.
 *
 * Jalankan langsung dari folder ini:
 *   php 02-cek-rahasia-repo.php ~/latihan-laravel/toko-latihan
 *
 * Tujuan: gagal (exit 1) kalau ada tanda-tanda rahasia ikut ke repo.
 * Aturan emas: script ini TIDAK BOLEH mencetak nilai rahasia apa pun.
 *
 * Exit code: 0 = aman, 1 = ada masalah, 2 = salah pemakaian.
 */

// Nilai-nilai yang dianggap "bukan rahasia asli" (boleh ada di .env.example).
const PLACEHOLDER = ['', 'null', 'changeme', 'ganti-saya', 'isi-di-server', 'your-password', 'secret'];

/**
 * Ambil daftar file yang dilacak Git di folder $dir.
 *
 * @return list<string>
 */
function ambilFileTerlacak(string $dir): array
{
    // TODO(human): jalankan `git ls-files` di folder $dir.
    //   Petunjuk: git punya opsi -C <folder>. Path dari user WAJIB di-escape
    //   sebelum masuk perintah shell (cari fungsi PHP untuk itu).
    // TODO(human): kalau perintah gagal (exit code bukan 0), lempar
    //   RuntimeException dengan pesan yang jelas.
    // TODO(human): kembalikan list nama file (buang baris kosong).
    throw new \LogicException('TODO: implementasikan ambilFileTerlacak()');
}

/**
 * Cari file .env atau .env.* yang ikut ter-commit, KECUALI .env.example.
 *
 * @param list<string> $files
 * @return list<string>
 */
function cariEnvTerlacak(array $files): array
{
    // TODO(human): ingat file bisa ada di subfolder, misal "config/.env".
    //   Bandingkan nama file-nya saja, bukan path lengkap.
    throw new \LogicException('TODO: implementasikan cariEnvTerlacak()');
}

/**
 * Apakah isi .gitignore mengabaikan file .env?
 */
function gitignoreMengabaikanEnv(string $isiGitignore): bool
{
    // TODO(human): cek per baris. Pola yang dianggap benar minimal:
    //   ".env", "/.env", ".env*", "/.env*". Abaikan spasi di ujung baris.
    throw new \LogicException('TODO: implementasikan gitignoreMengabaikanEnv()');
}

/**
 * Parse isi file dotenv sederhana menjadi KEY => nilai.
 *
 * @return array<string, string>
 */
function parseEnv(string $isi): array
{
    // TODO(human): lewati baris kosong dan baris komentar (#).
    // TODO(human): pecah di tanda "=" PERTAMA saja (nilai bisa mengandung "=").
    // TODO(human): buang tanda kutip di sekitar nilai.
    throw new \LogicException('TODO: implementasikan parseEnv()');
}

function terlihatPlaceholder(string $nilai): bool
{
    // TODO(human): true kalau nilai ada di PLACEHOLDER (tidak peka huruf besar),
    //   atau berbentuk referensi seperti ${APP_NAME}, atau <isi-di-server>.
    throw new \LogicException('TODO: implementasikan terlihatPlaceholder()');
}

/**
 * Samarkan nilai: jangan pernah tampilkan isinya.
 */
function samarkan(string $nilai): string
{
    // TODO(human): kembalikan teks yang hanya menyebut panjang nilai,
    //   misal "[disamarkan, 44 karakter]".
    throw new \LogicException('TODO: implementasikan samarkan()');
}

/**
 * Periksa isi .env.example. Kembalikan daftar pesan error TANPA nilai asli.
 *
 * @param array<string, string> $env
 * @return list<string>
 */
function periksaEnvExample(array $env): array
{
    // TODO(human): lewati nilai kosong / placeholder.
    // TODO(human): tandai sebagai masalah kalau:
    //   - kuncinya APP_KEY (harus kosong di .env.example)
    //   - nilai diawali "base64:" dan panjangnya > 20
    //   - nilai mengandung "sk_live_"
    //   - nama kunci berakhiran PASSWORD, SECRET, TOKEN, atau _KEY
    // TODO(human): pesan error memakai samarkan(), bukan nilai asli.
    throw new \LogicException('TODO: implementasikan periksaEnvExample()');
}

// ------------------------------------------------------------------
// Program utama (sudah jadi — fokus ke fungsi-fungsi di atas)
// ------------------------------------------------------------------

$dir = $argv[1] ?? null;

if ($dir === null || ! is_dir($dir)) {
    fwrite(STDERR, "Pemakaian: php 02-cek-rahasia-repo.php /path/ke/project" . PHP_EOL);
    exit(2);
}

$dir = rtrim($dir, DIRECTORY_SEPARATOR);
$masalah = [];

// TODO(human): 1) panggil ambilFileTerlacak() + cariEnvTerlacak().
//   Tangkap RuntimeException dan masukkan pesannya ke $masalah.
// TODO(human): 2) cek $dir/.gitignore dengan gitignoreMengabaikanEnv().
// TODO(human): 3) cek $dir/.env.example ada, lalu parseEnv() + periksaEnvExample().
// Hapus baris throw di bawah setelah langkah 1-3 kamu tulis.
throw new \LogicException('TODO: lengkapi program utama (langkah 1-3)');

if ($masalah !== []) {
    fwrite(STDERR, 'GAGAL — ditemukan ' . count($masalah) . ' masalah:' . PHP_EOL);
    foreach ($masalah as $pesan) {
        fwrite(STDERR, " - {$pesan}" . PHP_EOL);
    }
    exit(1);
}

echo 'LULUS — tidak ada rahasia yang terlihat ikut ke repo.' . PHP_EOL;
exit(0);
