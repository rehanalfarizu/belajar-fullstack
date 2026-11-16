<?php

declare(strict_types=1);

/*
 * Salin file ini ke:
 *   toko-latihan/app/Http/Controllers/ProductController.php
 *
 * Model yang dipakai (ubah app/Models/Product.php milikmu jadi seperti ini
 * DULU, supaya kamu bisa melihat celahnya):
 *
 *   final class Product extends Model
 *   {
 *       // SENGAJA RENTAN: semua kolom boleh diisi massal.
 *       protected $guarded = [];
 *   }
 *
 * Kolom tambahan di products (buat migration baru, lihat TUGAS.md):
 *   user_id     → pemilik / penjual produk
 *   is_featured → produk unggulan di halaman depan, HANYA admin yang boleh set
 *
 * !!! SENGAJA RENTAN !!!
 * Controller di bawah menerima SEMUA field dari request.
 */

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ProductController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // SENGAJA RENTAN: $request->all() = semua yang dikirim user,
        // termasuk field yang tidak ada di form (is_featured, user_id, ...).
        $product = Product::create($request->all());

        // TODO(human): sebelum memperbaiki, buktikan celahnya.
        //   Kirim request yang berisi is_featured=1 dan user_id=999.
        //   Lihat isi baris di database. Catat hasilnya.

        // TODO(human): validasi input dulu. Hanya field yang boleh diisi user
        //   yang lolos: category_id, name, slug, description, price, stock, is_active.

        // TODO(human): user_id TIDAK boleh berasal dari request.
        //   Ambil dari user yang sedang login (server yang menentukan).

        // TODO(human): is_featured TIDAK boleh berasal dari request di endpoint ini.

        return response()->json(['data' => $product], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        // SENGAJA RENTAN: user bisa "memindahkan" produk ke user lain
        // dengan mengirim user_id, atau menjadikannya unggulan.
        $product->update($request->all());

        // TODO(human): perbaiki dengan pola yang sama seperti store().
        // TODO(human): pikirkan: kalau user A mengirim update ke produk milik
        //   user B, apa yang harus terjadi? (Jawaban lengkapnya ada di topik 08,
        //   tapi minimal tolak dengan 403 di sini.)

        return response()->json(['data' => $product]);
    }
}

/*
 * TODO(human): ubah model Product:
 *   - ganti $guarded = [] dengan $fillable yang TIDAK memuat user_id dan is_featured
 *   - tulis di komentar: kenapa kamu pilih $fillable, bukan $guarded?
 *
 * TODO(human): di app/Providers/AppServiceProvider.php method boot(),
 *   aktifkan pengaturan Eloquent yang MELEMPAR ERROR (bukan diam saja)
 *   saat ada atribut yang tidak fillable diisi. Hanya di luar production.
 *
 * TODO(human): di app/Models/User.php, tambahkan relasi products() (hasMany)
 *   kalau kamu mau membuat produk lewat relasi user.
 */
