<?php

declare(strict_types=1);

function parseBoolean(?string $value): ?bool
{
    if ($value === null) {
        return null;
    }

    return filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
}

function periksaProduction(array $environment): array
{
    $errors = [];

    if (($environment['APP_ENV'] ?? null) !== 'production') {
        $errors[] = 'APP_ENV harus production.';
    }

    if (parseBoolean($environment['APP_DEBUG'] ?? null) !== false) {
        $errors[] = 'APP_DEBUG harus false.';
    }

    if (trim((string) ($environment['APP_KEY'] ?? '')) === '') {
        $errors[] = 'APP_KEY wajib tersedia.';
    }

    return $errors;
}

// getenv() mengembalikan false kalau variabel tidak ada. Jangan pakai "?: null":
// nilai "0" (APP_DEBUG=0, artinya false) juga dianggap kosong oleh PHP.
function ambilEnv(string $nama): ?string
{
    $nilai = getenv($nama);

    return $nilai === false ? null : $nilai;
}

$errors = periksaProduction([
    'APP_ENV' => ambilEnv('APP_ENV'),
    'APP_DEBUG' => ambilEnv('APP_DEBUG'),
    'APP_KEY' => ambilEnv('APP_KEY'),
]);

if ($errors !== []) {
    fwrite(STDERR, implode(PHP_EOL, $errors) . PHP_EOL);
    exit(1);
}

echo "Pemeriksaan konfigurasi dasar lulus." . PHP_EOL;
