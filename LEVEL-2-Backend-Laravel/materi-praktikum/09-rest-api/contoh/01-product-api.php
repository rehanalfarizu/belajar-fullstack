<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function (): void {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::patch('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
});

/*
Di controller:

$this->authorize('create', Product::class);
$product = Product::create($request->validated());
return (new ProductResource($product))->response()->setStatusCode(201);
*/
