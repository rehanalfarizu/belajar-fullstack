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
        return response()->json(['data' => array_values($this->products)]);
    }

    public function show(int $id): JsonResponse
    {
        abort_if($id < 1, 404);
        abort_unless(isset($this->products[$id]), 404);

        return response()->json(['data' => $this->products[$id]]);
    }

    public function store(Request $request): JsonResponse
    {
        $input = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0'],
        ]);

        $product = [
            'id' => count($this->products) + 1,
            ...$input,
        ];

        return response()->json(['data' => $product], 201);
    }
}
