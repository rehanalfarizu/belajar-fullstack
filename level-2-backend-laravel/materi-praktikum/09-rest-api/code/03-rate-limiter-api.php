<?php

declare(strict_types=1);

/*
 * File ini berisi potongan untuk 3 tempat berbeda di toko-latihan:
 *
 *   BAGIAN 1 → app/Providers/AppServiceProvider.php   (method boot())
 *   BAGIAN 2 → app/Http/Controllers/Api/TokenController.php
 *   BAGIAN 3 → routes/api.php
 *
 * Syarat sebelum mulai:
 *   php artisan install:api
 *   Tambahkan trait Laravel\Sanctum\HasApiTokens ke app/Models/User.php
 *
 * File ini bisa dicek sintaksnya dengan: php -l 03-rate-limiter-api.php
 */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/* ======================================================================
 * BAGIAN 1 — salin isi fungsi ini ke AppServiceProvider::boot()
 * ====================================================================== */
function daftarkanRateLimiter(): void
{
    RateLimiter::for('api', function (Request $request) {
        // TODO(human): 60 request per menit.
        // TODO(human): kunci = id user kalau login, kalau tidak pakai IP.
        throw new \LogicException('TODO: limiter api');
    });

    RateLimiter::for('login-api', function (Request $request) {
        // TODO(human): 5 request per menit.
        // TODO(human): kunci = email (huruf kecil) digabung IP.
        // TODO(human): response JSON 429 dengan pesan
        //   "Terlalu banyak percobaan. Coba lagi nanti."
        //   Jangan buang header yang diberikan Laravel (ada Retry-After).
        throw new \LogicException('TODO: limiter login-api');
    });

    RateLimiter::for('tulis-produk', function (Request $request) {
        // TODO(human): 10 request per menit per user.
        throw new \LogicException('TODO: limiter tulis-produk');
    });
}

/* ======================================================================
 * BAGIAN 2 — app/Http/Controllers/Api/TokenController.php
 * ====================================================================== */
final class TokenController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // TODO(human): validasi email, password, device_name (semua wajib).
        // TODO(human): cari user berdasarkan email.
        // TODO(human): kalau user tidak ada ATAU password salah, lempar
        //   ValidationException dengan pesan yang SAMA untuk kedua kasus.
        // TODO(human): buat token dengan nama device_name dan ability
        //   HANYA 'produk:tulis'.
        // TODO(human): kembalikan {"token": "..."} dengan status 201.
        throw new \LogicException('TODO: implementasikan TokenController::store()');
    }

    public function destroy(Request $request): Response
    {
        // TODO(human): hapus token yang SEDANG DIPAKAI saja (bukan semua token user).
        // TODO(human): kembalikan 204.
        throw new \LogicException('TODO: implementasikan TokenController::destroy()');
    }
}

/* ======================================================================
 * BAGIAN 3 — routes/api.php
 * ======================================================================
 *
 * use App\Http\Controllers\Api\ProductController;
 * use App\Http\Controllers\Api\TokenController;
 * use Illuminate\Support\Facades\Route;
 *
 * // TODO(human): POST /token → TokenController@store, pakai throttle:login-api
 *
 * // TODO(human): group throttle:api untuk GET /products dan GET /products/{product}
 *
 * // TODO(human): group auth:sanctum
 * //   - DELETE /token → TokenController@destroy
 * //   - group throttle:tulis-produk untuk POST/PUT/PATCH/DELETE products
 *
 * ----------------------------------------------------------------------
 * Di ProductController (store, update, destroy):
 *
 * // TODO(human): tolak 403 kalau token tidak punya ability 'produk:tulis'.
 * // TODO(human): tetap jalankan Gate::authorize(...) sesuai policy.
 */
