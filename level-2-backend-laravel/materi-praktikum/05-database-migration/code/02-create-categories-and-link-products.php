<?php

declare(strict_types=1);

/*
 * Salin file ini ke:
 *   toko-latihan/database/migrations/2026_01_01_000002_create_categories_and_link_products.php
 *
 * Syarat: migration products dari Soal 01 sudah jalan duluan
 * (nama file migration products harus urut LEBIH AWAL dari file ini).
 *
 * Cara uji:
 *   php artisan migrate
 *   php artisan migrate:rollback --step=1
 *   php artisan migrate
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ========== BAGIAN 1: tabel categories ==========
        Schema::create('categories', function (Blueprint $table): void {
            $table->id();
            // TODO(human): kolom name, maksimal 80 karakter, wajib diisi.
            // TODO(human): kolom slug, maksimal 100 karakter, harus unik.
            $table->timestamps();
        });

        // ========== BAGIAN 2: sambungkan products ke categories ==========
        Schema::table('products', function (Blueprint $table): void {
            // TODO(human): tambahkan kolom category_id.
            //   - boleh kosong (produk lama belum punya kategori)
            //   - taruh setelah kolom id (diabaikan SQLite, tapi rapi di MySQL)
            //   - jadi foreign key ke categories.id
            //   - tentukan perilaku saat kategori dihapus. Pilih SATU dari:
            //       restrict / cascade / set null
            //     lalu tulis alasanmu di komentar di bawah ini.
            //
            // Alasan pilihanku: ...
        });
    }

    public function down(): void
    {
        // Urutan di down() harus KEBALIKAN dari up().

        // TODO(human): di tabel products, hapus foreign key DULU,
        //   baru hapus kolom category_id. Cari method yang melakukan
        //   keduanya sekaligus di dokumentasi migration.

        // TODO(human): hapus tabel categories dengan aman.
        throw new \LogicException('TODO: implementasikan down()');
    }
};

/*
 * TODO(human): buat juga database/seeders/CategorySeeder.php
 *   lewat: php artisan make:seeder CategorySeeder
 *   Isi minimal 3 kategori (misal Elektronik, Alat Tulis, Makanan).
 *   Slug harus unik, jadi pikirkan: apa yang terjadi kalau seeder
 *   dijalankan 2x? Cari cara supaya tidak error duplikat.
 */
