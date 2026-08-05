<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

// Salin bagian ini ke routes/web.php atau routes/api.php.
Route::get('/health', function () {
    // TODO: kembalikan response JSON dengan status dan nama aplikasi.
    return response()->json([
        'status' => 'TODO',
        'app' => 'TODO',
    ]);
});

// TODO: buat tests/Feature/HealthCheckTest.php.
// Assert status 200 dan JSON { status: "ok", app: "belajar-laravel" }.
