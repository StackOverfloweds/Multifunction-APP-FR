<script setup>
/**
 * Padanan Vue dari resources/views/components/auth-session-status.blade.php,
 * diperluas jadi tiga varian supaya bisa dipakai untuk pesan error
 * GraphQL (mis. "Email atau password salah.") maupun notifikasi sukses.
 */
defineProps({
  variant: { type: String, default: 'error' }, // error | success | info
})
</script>

<template>
  <div
    class="rounded-xl border px-4 py-3 text-sm"
    :class="{
      'border-rose-500/20 bg-rose-500/10 text-rose-400': variant === 'error',
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-400': variant === 'success',
      'border-indigo-500/20 bg-indigo-500/10 text-indigo-300': variant === 'info',
    }"
  >
    <slot />
  </div>
</template>
