<?php

declare(strict_types=1);

$mahasiswa = [
    ['nama' => 'Alya', 'nilai' => [80, 90, 70]],
    ['nama' => 'Bima', 'nilai' => [55, 60, 58]],
    ['nama' => 'Citra', 'nilai' => [95, 92, 96]],
];

function hitungRataRata(array $nilai): float
{
    if ($nilai === []) {
        throw new InvalidArgumentException('Daftar nilai tidak boleh kosong.');
    }

    foreach ($nilai as $item) {
        if (!is_numeric($item) || $item < 0 || $item > 100) {
            throw new InvalidArgumentException('Nilai harus berada pada rentang 0–100.');
        }
    }

    return array_sum($nilai) / count($nilai);
}

function tentukanPredikat(float $rataRata): string
{
    return match (true) {
        $rataRata >= 85 => 'A',
        $rataRata >= 75 => 'B',
        $rataRata >= 65 => 'C',
        $rataRata >= 50 => 'D',
        default => 'E',
    };
}

function buatRekap(array $data): array
{
    $rekap = array_map(function (array $item): array {
        $rataRata = hitungRataRata($item['nilai']);

        return [
            'nama' => $item['nama'],
            'rata_rata' => round($rataRata, 2),
            'predikat' => tentukanPredikat($rataRata),
            'lulus' => $rataRata >= 60,
        ];
    }, $data);

    usort(
        $rekap,
        fn (array $a, array $b): int => $b['rata_rata'] <=> $a['rata_rata'],
    );

    return $rekap;
}

$mahasiswaLulus = array_filter(
    buatRekap($mahasiswa),
    fn (array $item): bool => $item['lulus'],
);

foreach ($mahasiswaLulus as $item) {
    printf(
        "%s — %.2f (%s)%s",
        $item['nama'],
        $item['rata_rata'],
        $item['predikat'],
        PHP_EOL,
    );
}
