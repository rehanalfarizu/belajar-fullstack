{{--
    ==================================================================
    SENGAJA RENTAN — JANGAN DIPAKAI DI PRODUCTION
    ==================================================================
    Starter Soal 04-03 — Detail Produk yang Aman dari XSS
    Salin ke: toko-latihan/resources/views/products/show.blade.php

    File ini punya MINIMAL 5 lubang keamanan. Tugasmu:
    1. Jalankan dulu apa adanya dan buktikan lubangnya (lihat TUGAS.md).
    2. Tandai setiap lubang dengan komentar "RENTAN #n: alasannya".
    3. Perbaiki satu per satu, lalu buktikan payload tidak jalan lagi.

    Data $product dikirim dari controller dan field-nya bisa diisi
    oleh PENJUAL lain (bukan admin). Anggap semua isinya tidak dipercaya.
--}}
@extends('layouts.app')

@section('title', 'Detail Produk')

@section('content')
    <main>
        {{-- TODO(human): kenapa nama produk di judul ini berbahaya? --}}
        <h1>{!! $product->name !!}</h1>

        {{-- TODO(human): kata kunci pencarian dari URL ?q=... ditampilkan apa adanya. --}}
        @if (request('q'))
            <p>Kamu datang dari pencarian: {!! request('q') !!}</p>
        @endif

        {{-- TODO(human): deskripsi butuh baris baru tetap tampil,
             tapi tag HTML dari penjual TIDAK boleh dieksekusi. --}}
        <section>
            <h2>Deskripsi</h2>
            <p>{!! $product->description !!}</p>
        </section>

        {{-- TODO(human): website penjual diisi bebas. Apa yang terjadi
             kalau isinya javascript:alert(1)? {{ }} saja TIDAK cukup di sini. --}}
        <p>
            <a href="{!! $product->website !!}">Kunjungi toko penjual</a>
        </p>

        {{-- TODO(human): form ubah stok ini tidak punya perlindungan CSRF
             dan memakai method yang salah untuk operasi update. --}}
        <form method="POST" action="/products/{{ $product->id }}">
            <label for="stock">Stok baru</label>
            <input id="stock" name="stock" type="number" min="0" value="{{ $product->stock }}">
            <button type="submit">Simpan stok</button>
        </form>
    </main>
@endsection

@push('scripts')
    {{-- TODO(human): konteks JavaScript. Nama produk berisi ' atau </script>
         bisa merusak script ini. Cari cara Laravel mengirim data ke JS. --}}
    <script>
        const namaProduk = '{!! $product->name !!}';
        console.log('Melihat produk:', namaProduk);
    </script>
@endpush
