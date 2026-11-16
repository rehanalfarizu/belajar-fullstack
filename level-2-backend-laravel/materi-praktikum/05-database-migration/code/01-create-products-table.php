<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            // TODO: name, slug unik, description, price, stock, is_active.
            // TODO: tambahkan index berdasarkan query yang akan dipakai.
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // TODO: hapus tabel products dengan aman.
    }
};
