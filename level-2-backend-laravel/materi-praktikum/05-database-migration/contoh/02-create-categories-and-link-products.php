<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 80);
            $table->string('slug', 100)->unique();
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table): void {
            // Pilihan: nullOnDelete.
            // Alasan: kalau kategori dihapus, produknya tetap ada (masih bisa
            // dijual), cukup jadi "tanpa kategori". cascade terlalu berbahaya
            // (hapus 1 kategori = ratusan produk ikut hilang). restrict juga
            // masuk akal kalau bisnis mau memaksa admin memindahkan produk dulu.
            $table->foreignId('category_id')
                ->nullable()
                ->after('id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table): void {
            // Menghapus foreign key constraint dulu, lalu kolomnya.
            $table->dropConstrainedForeignId('category_id');
        });

        Schema::dropIfExists('categories');
    }
};

/*
database/seeders/CategorySeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $kategori = [
            ['name' => 'Elektronik', 'slug' => 'elektronik'],
            ['name' => 'Alat Tulis', 'slug' => 'alat-tulis'],
            ['name' => 'Makanan', 'slug' => 'makanan'],
        ];

        foreach ($kategori as $item) {
            // updateOrInsert: aman dijalankan berkali-kali (idempotent),
            // karena dicari berdasarkan slug dulu.
            DB::table('categories')->updateOrInsert(
                ['slug' => $item['slug']],
                ['name' => $item['name'], 'updated_at' => now(), 'created_at' => now()],
            );
        }
    }
}

Jalankan: php artisan db:seed --class=CategorySeeder
*/
