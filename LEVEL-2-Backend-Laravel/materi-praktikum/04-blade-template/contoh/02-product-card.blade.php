{{-- Solusi referensi Soal 04-02 — resources/views/components/product-card.blade.php --}}
@props([
    'product',
    'tampilkanStok' => true,
])

<article {{ $attributes->merge(['class' => 'product-card']) }}>
    <h3>{{ $product->name }}</h3>

    <p>Rp {{ number_format($product->price, 0, ',', '.') }}</p>

    @if ($tampilkanStok)
        @if ($product->stock <= 0)
            <span class="badge badge-habis">Habis</span>
        @elseif ($product->stock < 5)
            <span class="badge badge-menipis">Menipis ({{ $product->stock }})</span>
        @else
            <span class="badge badge-tersedia">Tersedia</span>
        @endif
    @endif

    {{-- Slot default: isi di antara <x-product-card> ... </x-product-card> --}}
    @if ($slot->isNotEmpty())
        <div class="product-card__aksi">
            {{ $slot }}
        </div>
    @endif
</article>
