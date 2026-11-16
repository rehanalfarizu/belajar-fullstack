<?php

declare(strict_types=1);

/**
 * Jalankan sebagai pemeriksaan konsep, bukan pengganti observability.
 * Contoh: php 01-production-check.php
 */
function periksaProduction(array $environment): array
{
    $errors = [];

    if (($environment['APP_ENV'] ?? null) !== 'production') {
        $errors[] = 'APP_ENV harus production.';
    }

    // TODO: pastikan APP_DEBUG bukan true.
    // TODO: pastikan APP_KEY terisi.
    // TODO: jangan mencetak nilai secret ke output.

    return $errors;
}

$errors = periksaProduction([
    'APP_ENV' => getenv('APP_ENV') ?: null,
    'APP_DEBUG' => getenv('APP_DEBUG') ?: null,
    'APP_KEY' => getenv('APP_KEY') ?: null,
]);

if ($errors !== []) {
    fwrite(STDERR, implode(PHP_EOL, $errors) . PHP_EOL);
    exit(1);
}

echo "Pemeriksaan konfigurasi dasar lulus." . PHP_EOL;
