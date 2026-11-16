@extends('layouts.app')

@section('title', 'Daftar Produk')

@section('content')
    <main>
        <h1>Daftar Produk</h1>

        @if (session('success'))
            <p role="status">{{ session('success') }}</p>
        @endif

        <section aria-labelledby="product-list-title">
            <h2 id="product-list-title">Produk Tersedia</h2>

            @forelse ($products as $product)
                <article>
                    <h3>
                        <a href="{{ route('products.show', $product) }}">
                            {{ $product->name }}
                        </a>
                    </h3>
                    <p>Rp {{ number_format($product->price, 0, ',', '.') }}</p>
                    <p>Stok: {{ $product->stock }}</p>
                    <p>{{ $product->is_active ? 'Aktif' : 'Nonaktif' }}</p>
                </article>
            @empty
                <p>Belum ada produk.</p>
            @endforelse
        </section>
    </main>
@endsection
