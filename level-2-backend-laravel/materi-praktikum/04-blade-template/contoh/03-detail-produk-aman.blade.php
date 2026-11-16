{{-- Solusi referensi Soal 04-03 — resources/views/products/show.blade.php (versi aman) --}}
@extends('layouts.app')

@section('title', 'Detail Produk')

@php
    // Pertahanan lapis kedua: hanya http/https yang boleh jadi link.
    // Lapis pertama ada di validasi input: 'website' => ['nullable', 'url:http,https'].
    $skemaWebsite = strtolower((string) parse_url((string) $product->website, PHP_URL_SCHEME));
    $websiteAman = in_array($skemaWebsite, ['http', 'https'], true);
@endphp

@section('content')
    <main>
        {{-- RENTAN #1 diperbaiki: {{ }} meng-escape < > " ' & --}}
        <h1>{{ $product->name }}</h1>

        {{-- RENTAN #2 diperbaiki: input URL juga data tidak dipercaya (reflected XSS) --}}
        @if (request()->filled('q'))
            <p>Kamu datang dari pencarian: {{ request('q') }}</p>
        @endif

        {{-- RENTAN #3 diperbaiki: escape DULU dengan e(), BARU nl2br.
             Urutan terbalik (e(nl2br(...))) bikin <br> ikut ter-escape.
             nl2br(...) tanpa e() = XSS lagi. --}}
        <section>
            <h2>Deskripsi</h2>
            <p>{!! nl2br(e($product->description)) !!}</p>
        </section>

        {{-- RENTAN #4 diperbaiki: escape saja tidak menghentikan "javascript:".
             Skema URL dicek dulu. rel="noopener" mencegah tab baru mengakses window.opener. --}}
        @if ($websiteAman)
            <p>
                <a href="{{ $product->website }}" rel="noopener noreferrer nofollow" target="_blank">
                    Kunjungi toko penjual
                </a>
            </p>
        @endif

        {{-- RENTAN #5 diperbaiki: @csrf + method spoofing PUT + URL dari named route --}}
        <form method="POST" action="{{ route('products.update', $product) }}">
            @csrf
            @method('PUT')

            <label for="stock">Stok baru</label>
            <input id="stock" name="stock" type="number" min="0"
                   value="{{ old('stock', $product->stock) }}">
            @error('stock')
                <p role="alert">{{ $message }}</p>
            @enderror

            <button type="submit">Simpan stok</button>
        </form>
    </main>
@endsection

@push('scripts')
    {{-- RENTAN #6 diperbaiki: Js::from meng-encode JSON yang aman untuk dalam <script> --}}
    <script>
        const namaProduk = {{ Js::from($product->name) }};
        console.log('Melihat produk:', namaProduk);
    </script>
@endpush

{{--
Feature test (tests/Feature/ProductShowXssTest.php, Pest):

test('payload script tidak dirender mentah', function () {
    $payload = "<script>alert('xss')</script>";
    $product = Product::factory()->create(['name' => $payload, 'description' => $payload]);

    $this->get(route('products.show', $product))
        ->assertOk()
        ->assertDontSee($payload, false)   // versi mentah TIDAK boleh ada
        ->assertSee($payload);             // versi ter-escape boleh (default escape = true)
});

test('website javascript: tidak jadi link', function () {
    $product = Product::factory()->create(['website' => 'javascript:alert(1)']);

    $this->get(route('products.show', $product))
        ->assertDontSee('javascript:alert(1)', false);
});

{!! !!} hanya boleh untuk HTML yang SUDAH disanitasi di server dengan
library HTML purifier (allowlist tag), misal deskripsi rich text dari admin.
Escape biasa tidak cukup untuk kasus itu, dan menghapus tag manual pakai
regex/strip_tags juga tidak cukup (strip_tags tidak membersihkan atribut).
--}}
