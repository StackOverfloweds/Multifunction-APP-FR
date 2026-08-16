<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'

/**
 * Padanan Vue dari resources/views/layouts/app.blade.php.
 * Slot "header" -> sticky page header (judul + badge role, dsb).
 * Slot default    -> konten halaman.
 * Dipakai oleh DashboardView dan halaman ber-auth lainnya nanti
 * (mis. StorageView) supaya navbar & header sticky tidak ditulis ulang.
 */
</script>

<template>
  <div class="min-h-screen w-full bg-[#1e293b]">
    <AppNavbar />

    <header
      v-if="$slots.header"
      class="sticky top-0 z-30 border-b border-slate-800/80 bg-[#1e293b]/95 shadow-lg shadow-black/10 backdrop-blur-xl"
    >
      <div class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <slot name="header" />
      </div>
    </header>

    <main class="app-content w-full overflow-x-hidden">
      <slot />
    </main>
  </div>
</template>
