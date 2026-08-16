<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@/composables/useAuth'

/**
 * Padanan Vue dari resources/views/layouts/navigation.blade.php.
 * Memakai composable useAuth() yang sama dipakai LoginView/RegisterView
 * untuk aksi logout, supaya perilakunya konsisten di seluruh app.
 */
const authStore = useAuthStore()
const { logout, logoutLoading } = useAuth()

const mobileOpen = ref(false)
const userMenuOpen = ref(false)
</script>

<template>
  <nav class="relative z-40 border-b border-slate-800/80 bg-[#1e293b] shadow-lg shadow-black/10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Logo / Brand -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="group flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105"
            >
              A
            </div>
            <span
              class="hidden text-lg font-bold tracking-tight text-white transition-colors group-hover:text-indigo-300 sm:block"
            >
              Multifunction APP
            </span>
          </router-link>

          <!-- Navigation Links -->
          <div class="hidden items-center space-x-2 sm:-my-px sm:ms-10 sm:flex">
            <router-link
              to="/dashboard"
              class="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/70 hover:text-white"
              active-class="text-white bg-slate-800/70"
            >
              <svg class="h-4 w-4 text-slate-400 transition-colors group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
              </svg>
              <span>Dashboard</span>
            </router-link>
          </div>
        </div>

        <!-- Settings Dropdown -->
        <div class="relative hidden sm:ms-6 sm:flex sm:items-center">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/40 px-3 py-2 text-sm font-medium leading-4 text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            @click="userMenuOpen = !userMenuOpen"
          >
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
              {{ authStore.initial }}
            </div>
            <div class="max-w-[120px] truncate text-slate-300">{{ authStore.user?.username }}</div>
            <svg class="h-4 w-4 fill-current text-slate-500" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <div
            v-if="userMenuOpen"
            class="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-700/80 bg-[#1e293b] p-1 shadow-2xl shadow-black/30"
            @click.outside="userMenuOpen = false"
          >
            <button
              type="button"
              :disabled="logoutLoading"
              class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-rose-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-60"
              @click="logout"
            >
              <div class="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/20 bg-rose-500/10">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span class="font-medium">{{ logoutLoading ? 'Keluar...' : 'Log Out' }}</span>
            </button>
          </div>
        </div>

        <!-- Hamburger -->
        <div class="-me-2 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            @click="mobileOpen = !mobileOpen"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div v-if="mobileOpen" class="border-t border-slate-800/80 bg-[#1e293b] sm:hidden">
      <div class="space-y-1 px-3 pb-3 pt-2">
        <router-link
          to="/dashboard"
          class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800/70 hover:text-white"
          @click="mobileOpen = false"
        >
          Dashboard
        </router-link>
      </div>

      <div class="border-t border-slate-700/70 pt-4 pb-3">
        <div class="px-4">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
              {{ authStore.initial }}
            </div>
            <div class="min-w-0">
              <div class="truncate text-base font-medium text-slate-200">{{ authStore.user?.username }}</div>
              <div class="truncate text-sm font-medium text-slate-500">{{ authStore.user?.email }}</div>
            </div>
          </div>
        </div>

        <div class="mt-3 space-y-1 px-3">
          <button
            type="button"
            :disabled="logoutLoading"
            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-base font-medium text-rose-400 hover:bg-slate-800/70 disabled:opacity-60"
            @click="logout"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{{ logoutLoading ? 'Keluar...' : 'Log Out' }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
