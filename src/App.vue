<script setup>
/**
 * Root komponen hanya merender halaman sesuai rute aktif.
 * Semua wrapper (GuestLayout / AppLayout) diatur per-view supaya
 * halaman lain (mis. halaman publik tanpa layout) tetap fleksibel.
 */
</script>

<template>
  <router-view />
</template>
