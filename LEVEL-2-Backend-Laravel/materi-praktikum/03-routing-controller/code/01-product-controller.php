<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ProductController extends Controller
{
    private array $products = [
        1 => ['id' => 1, 'name' => 'Keyboard', 'price' => 350000],
        2 => ['id' => 2, 'name' => 'Mouse', 'price' => 175000],
    ];

    public function index(): JsonResponse
    {
        // TODO: kembalikan semua products dengan status 200.
        return response()->json(['data' => []]);
    }

    public function show(int $id): JsonResponse
    {
        // TODO: validasi ID dan return 404 bila tidak ditemukan.
        return response()->json(['message' => 'TODO'], 501);
    }

    public function store(Request $request): JsonResponse
    {
        // TODO: validasi name dan price.
        // TODO: buat product dan kembalikan status 201.
        return response()->json(['message' => 'TODO'], 501);
    }
}
