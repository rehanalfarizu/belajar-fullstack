<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
    ]);
});

/*
Feature test:

test('health check tersedia', function () {
    $this->getJson('/health')
        ->assertOk()
        ->assertJson([
            'status' => 'ok',
            'app' => config('app.name'),
        ]);
});
*/
