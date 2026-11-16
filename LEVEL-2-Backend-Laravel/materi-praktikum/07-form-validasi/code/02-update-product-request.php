<?php

declare(strict_types=1);

// Salin file ini ke: toko-latihan/app/Http/Requests/UpdateProductRequest.php
// Atau buat dulu kerangkanya: php artisan make:request UpdateProductRequest
// Lalu pindahkan isi TODO di bawah ke file hasil generate.

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

final class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO(human): ambil produk dari route (nama parameter-nya "product").
        // TODO(human): tanya policy apakah user yang login boleh "update" produk itu.
        // Ingat: guest (belum login) harus ditolak, jangan sampai error null.
        return false;
    }

    protected function prepareForValidation(): void
    {
        // TODO(human): kalau slug kosong TAPI name dikirim, bikin slug dari name.
        // TODO(human): kalau price dikirim sebagai teks seperti "350.000",
        //              ubah jadi angka bulat tanpa titik/spasi sebelum divalidasi.
        // Petunjuk: pakai $this->merge([...]) untuk mengganti nilai input.
        // Hati-hati: PATCH bisa saja tidak mengirim name/price sama sekali.
        throw new \LogicException('TODO: implementasikan prepareForValidation()');
    }

    public function rules(): array
    {
        return [
            // TODO(human): semua field boleh tidak dikirim (PATCH = update sebagian),
            //              tapi kalau dikirim, aturannya tetap ketat.
            // TODO(human): slug harus unik di tabel products,
            //              KECUALI milik produk yang sedang diedit.
            // TODO(human): name, slug, description, price, stock, category_id, is_active.
        ];
    }

    /**
     * Aturan yang melibatkan lebih dari satu field.
     *
     * @return array<int, callable>
     */
    public function after(): array
    {
        return [
            function (Validator $validator): void {
                // TODO(human): produk tidak boleh is_active = true kalau stok-nya 0.
                // Pikirkan: kalau request hanya mengirim is_active=true tanpa stock,
                //           stok mana yang harus dicek? (input atau data di database?)
                throw new \LogicException('TODO: implementasikan aturan aktif vs stok');
            },
        ];
    }

    public function attributes(): array
    {
        return [
            // TODO(human): nama field versi Indonesia, misal 'price' => 'harga'.
        ];
    }

    public function messages(): array
    {
        return [
            // TODO(human): pesan khusus untuk slug yang sudah dipakai.
        ];
    }
}
