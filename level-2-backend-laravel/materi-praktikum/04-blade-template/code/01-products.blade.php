{{-- Salin ke resources/views/products/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Daftar Produk')

@section('content')
    <main>
        <h1>Daftar Produk</h1>

        {{-- TODO: tampilkan flash message success. --}}

        <section aria-labelledby="product-list-title">
            <h2 id="product-list-title">Produk Tersedia</h2>

            {{-- TODO: gunakan @forelse untuk menampilkan products. --}}
            {{-- TODO: gunakan {{ }} agar output di-escape. --}}
            {{-- TODO: tambahkan empty state. --}}
        </section>
    </main>
@endsection
