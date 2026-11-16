<?php

declare(strict_types=1);

// =====================================================================
//  SENGAJA RENTAN (IDOR) — HANYA UNTUK LATIHAN DI LAPTOP SENDIRI
// =====================================================================
// File ini berisi DUA class. Pisahkan saat menyalin:
//   1) PenjualProductController -> toko-latihan/app/Http/Controllers/PenjualProductController.php
//   2) ProductPolicy            -> toko-latihan/app/Policies/ProductPolicy.php
//      (kalau sudah ada dari soal 01, TAMBAHKAN method-nya, jangan buat file kedua)
//
// Prasyarat: tabel products punya kolom user_id (pemilik/penjual).
// Lihat TUGAS.md bagian C untuk migration dan route.

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class PenjualProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // MASALAH: semua produk dari semua penjual ikut tampil di "produk saya".
        // TODO(human): tampilkan hanya produk milik user yang sedang login.
        //              Lewat relasi, bukan where user_id dari input.
        return response()->json(['data' => Product::query()->latest()->get()]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        // MASALAH (IDOR): siapa pun yang login bisa mengubah produk siapa pun,
        // cukup dengan mengganti angka di URL /penjual/products/1 -> /2 -> /3 ...
        $product = Product::findOrFail($id);

        // TODO(human): pakai route model binding (Product $product) daripada int $id.
        // TODO(human): cek kepemilikan lewat POLICY, bukan if manual di sini.
        //              Pilih salah satu: Gate::authorize(...) di sini,
        //              atau ->can(...) di route.

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:120'],
            'price' => ['sometimes', 'required', 'integer', 'min:0'],
            'stock' => ['sometimes', 'required', 'integer', 'min:0'],
        ]);

        $product->update($data);

        return response()->json(['data' => $product]);
    }

    public function destroy(int $id): JsonResponse
    {
        // MASALAH (IDOR): sama seperti update.
        $product = Product::findOrFail($id);

        // TODO(human): cek kepemilikan lewat policy "delete".

        $product->delete();

        return response()->json(null, 204);
    }
}

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

final class ProductPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        // TODO(human): admin boleh semua aksi -> return true.
        //              Selain admin -> return null (lanjut ke method aksi).
        //              Kenapa null, bukan false? Tulis jawabanmu di catatan-08.md.
        throw new \LogicException('TODO: implementasikan before()');
    }

    public function update(User $user, Product $product): bool|Response
    {
        // TODO(human): hanya pemilik produk yang boleh mengubah.
        // TODO(human): putuskan: user lain dapat 403 atau 404?
        //              (lihat Response::deny() dan Response::denyAsNotFound())
        throw new \LogicException('TODO: implementasikan update()');
    }

    public function delete(User $user, Product $product): bool|Response
    {
        // TODO(human): aturan yang sama dengan update.
        throw new \LogicException('TODO: implementasikan delete()');
    }
}

// TODO(human): tambahkan relasi di model:
//   User    -> products()  (hasMany)
//   Product -> user()      (belongsTo)
//
// TODO(human): Gate untuk aksi yang tidak terkait satu model, di AppServiceProvider::boot():
//   'lihat-laporan-penjualan' -> hanya admin.
//
// TODO(human): tests/Feature/PenjualProductAccessTest.php — matriks:
//   guest, pemilik, bukan pemilik, admin  x  update, delete
