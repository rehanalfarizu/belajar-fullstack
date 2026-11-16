<?php

declare(strict_types=1);

$mahasiswa = [
    ['nama' => 'Alya', 'nilai' => [80, 90, 70]],
    ['nama' => 'Bima', 'nilai' => [55, 60, 58]],
    ['nama' => 'Citra', 'nilai' => [95, 92, 96]],
];

function hitungRataRata(array $nilai): float
{
    // TODO: tolak array kosong dan nilai di luar 0–100.
    // TODO: return jumlah nilai dibagi jumlah elemen.
    throw new LogicException('TODO: implementasikan hitungRataRata()');
}

function tentukanPredikat(float $rataRata): string
{
    // TODO: A >= 85, B >= 75, C >= 65, D >= 50, selain itu E.
    throw new LogicException('TODO: implementasikan tentukanPredikat()');
}

function buatRekap(array $data): array
{
    // TODO: map data menjadi nama, rata_rata, predikat, dan lulus.
    // TODO: urutkan salinan hasil berdasarkan rata_rata descending.
    throw new LogicException('TODO: implementasikan buatRekap()');
}

// TODO: panggil buatRekap(), filter yang lulus, lalu tampilkan hasilnya.
