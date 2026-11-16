import { computed, ref } from 'vue';

export function useCounter(initial = 0, minimum = 0) {
  // TODO(human): Validasi input di awal. Apa yang harus terjadi kalau
  //   initial atau minimum bukan angka? Kalau initial lebih kecil dari minimum?
  //   Pilih: lempar error yang jelas, atau koreksi diam-diam. Tulis alasanmu.

  const count = ref(initial);

  const isMinimum = computed(() => {
    // TODO(human): Kembalikan true kalau count sudah sama dengan batas bawah.
    return false;
  });

  function increment() {
    // TODO(human): Naikkan count satu langkah.
  }

  function decrement() {
    // TODO(human): Turunkan count satu langkah, tapi jangan sampai
    //   lewat di bawah minimum.
  }

  function reset() {
    // TODO(human): Kembalikan count ke nilai awal (initial), BUKAN ke 0.
  }

  return { count, isMinimum, increment, decrement, reset };
}
