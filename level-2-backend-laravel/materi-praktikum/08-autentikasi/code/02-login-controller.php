<?php

declare(strict_types=1);

// Salin file ini ke: toko-latihan/app/Http/Controllers/Auth/SesiController.php
// (buat folder Auth kalau belum ada)
//
// Route yang dibutuhkan (lihat TUGAS.md bagian B):
//   GET  /login   -> create   (middleware guest, nama: login)
//   POST /login   -> store    (middleware guest)
//   POST /logout  -> destroy  (middleware auth, nama: logout)

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

final class SesiController extends Controller
{
    /** Maksimal percobaan login gagal per menit untuk satu kombinasi email + IP. */
    private const MAKS_PERCOBAAN = 5;

    public function create(): View
    {
        // View sederhana: resources/views/auth/login.blade.php
        // Isi: form POST ke /login dengan @csrf, input email, password, checkbox "ingat".
        return view('auth.login');
    }

    public function store(Request $request): RedirectResponse
    {
        // TODO(human): validasi email (wajib, format email) dan password (wajib, string).

        // TODO(human): buat kunci rate limit dari email (huruf kecil) + IP.
        //              Kenapa email di-lowercase? Coba pikirkan "Budi@x.com" vs "budi@x.com".

        // TODO(human): kalau sudah terlalu banyak percobaan:
        //              lempar ValidationException berisi pesan "coba lagi dalam N detik".

        // TODO(human): coba login dengan Auth::attempt(...).
        //              Checkbox "ingat" -> remember me.
        //   - GAGAL : catat 1 percobaan gagal, lalu lempar ValidationException
        //             dengan pesan UMUM yang sama untuk email salah ATAU password salah.
        //   - BERHASIL: bersihkan hitungan percobaan,
        //             buat ulang session id (kenapa? cari: session fixation),
        //             redirect ke halaman yang tadinya ingin dibuka (intended) atau /dashboard.

        throw new \LogicException('TODO: implementasikan login di SesiController::store()');
    }

    public function destroy(Request $request): RedirectResponse
    {
        // TODO(human): logout user, matikan session lama, buat token CSRF baru,
        //              lalu redirect ke halaman depan.
        // Kenapa tidak cukup Auth::logout() saja? Tulis jawabanmu di catatan-08.md.

        throw new \LogicException('TODO: implementasikan logout di SesiController::destroy()');
    }
}

/*
TODO(human): RegisterController (buat file sendiri di app/Http/Controllers/Auth/)

- Validasi: name, email unik, password minimal 8 + confirmed.
- Simpan user. JANGAN pernah simpan password apa adanya.
  Cek model User bawaan: apakah sudah ada cast 'password' => 'hashed'?
  Kalau sudah, apa yang terjadi kalau kamu panggil Hash::make() LAGI sebelum create?
- JANGAN log() atau dd() isi password.
- Setelah register: login-kan user, regenerate session, redirect.
*/
