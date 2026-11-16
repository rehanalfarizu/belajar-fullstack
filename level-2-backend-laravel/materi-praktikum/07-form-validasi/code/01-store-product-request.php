<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

final class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Sementara (sebelum topik 08): ubah jadi `return true;` supaya kamu bisa menguji validasi.
        // TODO: setelah policy topik 08 ada, ganti dengan pengecekan policy (bukan true).
        return false;
    }

    public function rules(): array
    {
        return [
            // TODO: name, slug unik, description, price, stock, category_id.
        ];
    }

    public function messages(): array
    {
        return [
            // TODO: tambahkan pesan Indonesia untuk error terpenting.
        ];
    }
}
