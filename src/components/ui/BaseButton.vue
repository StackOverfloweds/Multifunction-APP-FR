<script setup>
/**
 * Padanan Vue dari resources/views/components/primary-button.blade.php
 * (dengan gradient indigo->violet yang sama seperti tombol "Sign In"
 * di auth/login.blade.php). Dipakai di form login, register, dan
 * tombol aksi lain di seluruh aplikasi.
 */
defineProps({
  type: { type: String, default: 'submit' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: 'primary' }, // primary | ghost | danger
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60"
    :class="{
      'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 focus:ring-indigo-500/20 active:translate-y-0':
        variant === 'primary',
      'border border-slate-700/80 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white focus:ring-slate-500/20':
        variant === 'ghost',
      'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 focus:ring-rose-500/20':
        variant === 'danger',
    }"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>

    <slot />

    <svg
      v-if="!loading && variant === 'primary'"
      class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </button>
</template>
