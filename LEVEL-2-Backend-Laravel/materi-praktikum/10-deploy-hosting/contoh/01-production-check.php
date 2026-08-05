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
