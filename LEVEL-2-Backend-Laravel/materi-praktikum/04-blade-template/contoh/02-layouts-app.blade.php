{{-- Solusi referensi Soal 04-02 — resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Toko Latihan') — {{ config('app.name') }}</title>
    @stack('styles')
</head>
<body>
    <header>
        <a href="{{ url('/') }}">{{ config('app.name') }}</a>
    </header>

    @yield('content')

    <footer>
        <p>&copy; {{ now()->year }} {{ config('app.name') }}</p>
    </footer>

    @stack('scripts')
</body>
</html>

{{--
Contoh pemakaian di resources/views/products/index.blade.php:

@extends('layouts.app')

@section('title', 'Daftar Produk')

@push('styles')
    <style>.product-card { border: 1px solid #ccc; padding: 1rem; }</style>
@endpush

@section('content')
    <main>
        <h1>Daftar Produk</h1>
        @forelse ($products as $product)
            <x-product-card :product="$product" class="sorot">
                <a href="{{ route('products.show', $product) }}">Lihat detail</a>
            </x-product-card>
        @empty
            <p>Belum ada produk.</p>
        @endforelse
    </main>
@endsection
--}}
