<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->group(function (): void {
    // TODO: daftarkan POST, PUT/PATCH, dan DELETE.
    // TODO: pastikan controller tetap menjalankan authorization.
});

// TODO: tambahkan throttle pada endpoint sensitif.
// TODO: tulis feature test kontrak JSON dan status code.
