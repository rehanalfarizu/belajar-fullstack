{{--
    Starter Soal 04-02 — Komponen <x-product-card>
    Salin ke: toko-latihan/resources/views/components/product-card.blade.php
    (atau buat dengan: php artisan make:component ProductCard --view)

    Cara pakai di halaman lain (jangan ditulis di file ini):
        <x-product-card :product="$product" />
        <x-product-card :product="$product" :tampilkan-stok="false" class="sorot" />
--}}

{{-- TODO(human): deklarasikan props komponen:
     - product (wajib)
     - tampilkanStok (opsional, default true)
     Ingat: props yang dideklarasikan TIDAK ikut masuk ke $attributes. --}}

{{-- TODO(human): elemen pembungkus <article>.
     Atribut tambahan dari pemanggil (misal class="sorot") harus DIGABUNG
     dengan class bawaan "product-card", bukan menimpanya. --}}
<article>
    {{-- TODO(human): tampilkan nama produk (ter-escape). --}}

    {{-- TODO(human): tampilkan harga format Rupiah: "Rp 350.000". --}}

    {{-- TODO(human): badge stok, HANYA kalau tampilkanStok bernilai true.
         - stok 0          → "Habis"
         - stok 1 sampai 4 → "Menipis"
         - stok 5 ke atas  → "Tersedia"
         Pakai satu rantai @if / @elseif / @else. --}}

    {{-- TODO(human): area aksi dari slot.
         Kalau pemanggil tidak mengirim isi slot, jangan render <div> kosong. --}}
</article>
