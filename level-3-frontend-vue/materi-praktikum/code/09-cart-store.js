import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

// TODO(human): Pertimbangkan bikin satu fungsi kecil di luar store untuk
//   mengecek quantity (harus bilangan bulat, minimal 1). Dipakai di add dan
//   updateQuantity supaya aturannya tidak ditulis dua kali.

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const totalItems = computed(() => {
    // TODO(human): Jumlahkan quantity semua item (bukan jumlah baris item).
    return 0;
  });

  const subtotal = computed(() => {
    // TODO(human): Jumlahkan harga x quantity untuk semua item.
    return 0;
  });

  function add(product, quantity = 1) {
    // TODO(human): Tolak quantity yang tidak valid.
    // TODO(human): Kalau produk dengan id sama sudah ada, tambah quantity-nya.
    //   Kalau belum ada, masukkan sebagai item baru (salinan data produk + quantity).
  }

  function updateQuantity(productId, quantity) {
    // TODO(human): Tolak quantity tidak valid. Cari item berdasarkan id.
    //   Putuskan: apa yang terjadi kalau id tidak ditemukan?
  }

  function remove(productId) {
    // TODO(human): Buang item dengan id tersebut dari keranjang.
  }

  function clear() {
    // TODO(human): Kosongkan keranjang. Setup store tidak punya $reset()
    //   otomatis, jadi fungsi inilah "tombol reset"-nya.
  }

  return { items, totalItems, subtotal, add, updateQuantity, remove, clear };
});
