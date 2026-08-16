<script setup>
import { useAuthStore } from '@/stores/auth'
import AppLayout from '@/layouts/AppLayout.vue'
import ModuleCard from '@/components/dashboard/ModuleCard.vue'

const authStore = useAuthStore()

/**
 * Definisi modul dashboard dipusatkan sebagai data, bukan markup
 * berulang seperti di blade. Menambah modul baru cukup menambah satu
 * entri di array ini - ModuleCard yang sama akan me-render semuanya.
 */
const modules = [
  {
    key: 'storage',
    to: '/storage',
    accent: 'indigo',
    icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z',
    badgeText: 'ACTIVE',
    title: 'Storage Manager',
    description:
      'Penyimpanan file berbasis mikroservis (Word, PDF, Gambar, ISO). Mendukung chunked upload tanpa batasan ukuran file.',
    footerText: 'Buka Storage Engine',
  },
  {
    key: 'server-metrics',
    to: '/server-metrics',
    accent: 'cyan',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    badgeText: 'LIVE SYSTEM',
    title: 'Server Public Metrics',
    description:
      'Pantau performa hardware server (CPU Load, RAM, Disk Usage, Uptime) secara real-time via grafik.',
    footerText: 'Lihat Public Dashboard',
  },
  {
    key: 'ai-engineer',
    to: '/ai-engineer',
    accent: 'teal',
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-1.307L5 14.5M19.8 15.3l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.25c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    badgeText: 'AI ONLINE',
    title: 'AI Engineer',
    description:
      'Asisten AI berbasis OpenRouter untuk menjawab pertanyaan teknis, brainstorming, dan bantuan engineering langsung dari dashboard.',
    footerText: 'Buka AI Engineer',
  },
  {
    key: 'user-management',
    to: '/users',
    accent: 'amber',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    badgeText: 'ADMIN ONLY',
    title: 'User Management',
    description:
      'Pengelolaan hierarki hak akses pengguna (Super Admin, Admin, & User) serta kontrol otentikasi.',
    footerText: 'Modul Siap Dikembangkan',
    adminOnly: true,
  },
]

const visibleModules = modules.filter((m) => !m.adminOnly || authStore.isAdmin)
</script>

<template>
  <AppLayout>
    <template #header>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></span>
            <h2 class="truncate text-lg font-bold tracking-tight text-slate-100 sm:text-xl">Main Dashboard</h2>
          </div>
          <p class="mt-1 text-xs text-slate-500 sm:hidden">Multifunction Application Center</p>
        </div>

        <div class="flex shrink-0 items-center">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-[10px] font-bold text-indigo-400 sm:text-xs">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2.54v-.1a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 008.1 15a1.7 1.7 0 00-1.56-1.03H6v-2.54h.54A1.7 1.7 0 008.1 10.4a1.7 1.7 0 00-.34-1.88L7.7 8.46l1.8-1.8.06.06a1.7 1.7 0 001.88.34A1.7 1.7 0 0012.47 5.5V5h2.54v.5a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06 1.8 1.8-.06.06a1.7 1.7 0 00-.34 1.88A1.7 1.7 0 0019.4 11.43H20v2.54h-.6A1.7 1.7 0 0019.4 15z" />
            </svg>
            ROLE: {{ (authStore.user?.role ?? 'user').toUpperCase() }}
          </span>
        </div>
      </div>
    </template>

    <div class="relative mx-auto min-h-[calc(100vh-80px)] w-full max-w-7xl space-y-6 px-4 py-5 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8">
      <!-- Background Glow -->
      <div class="pointer-events-none absolute inset-x-0 top-0 -z-0 h-48 bg-gradient-to-b from-indigo-500/[0.07] to-transparent sm:h-72"></div>

      <!-- Welcome Hero -->
      <section class="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/95 via-indigo-950/70 to-slate-950 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:rounded-3xl sm:p-8 lg:p-10">
        <div class="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl sm:h-80 sm:w-80"></div>
        <div class="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl sm:h-80 sm:w-80"></div>

        <div class="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div class="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-[10px] font-medium text-indigo-300 sm:text-xs">
            <svg class="h-3.5 w-3.5 shrink-0 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span class="truncate">Multifunction Engine Center</span>
          </div>

          <h3 class="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Selamat Datang Kembali,
            <span class="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text capitalize text-transparent">
              {{ authStore.user?.username ?? 'User' }}
            </span>
            <span class="whitespace-nowrap">👋</span>
          </h3>

          <p class="max-w-2xl text-sm leading-6 text-slate-300/80 sm:text-base">
            Akses seluruh modul fungsional aplikasi dari satu portal terpusat. Pilih layanan di bawah ini untuk memulai pengoperasian sistem.
          </p>
        </div>
      </section>

      <!-- Module Header -->
      <section>
        <div class="flex flex-col gap-2 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h4 class="text-base font-bold tracking-tight text-slate-100 sm:text-lg">Application Modules</h4>
            <p class="mt-1 text-xs text-slate-400 sm:text-sm">Pilih modul fungsional yang tersedia untuk hak akses Anda</p>
          </div>
          <span class="hidden font-mono text-[10px] uppercase tracking-wider text-slate-600 sm:block">Multifunction APP</span>
        </div>
      </section>

      <!-- Module Grid -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        <ModuleCard
          v-for="mod in visibleModules"
          :key="mod.key"
          :to="mod.to"
          :accent="mod.accent"
          :icon="mod.icon"
          :badge-text="mod.badgeText"
          :title="mod.title"
          :description="mod.description"
          :footer-text="mod.footerText"
        />
      </div>
    </div>
  </AppLayout>
</template>
