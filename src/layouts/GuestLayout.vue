<script setup>
/**
 * Padanan Vue dari resources/views/layouts/guest.blade.php di backend:
 * background radial-glow + grid, brand di atas, card auth di tengah,
 * footer copyright. Dipakai oleh LoginView & RegisterView lewat <slot />
 * supaya markup wrapper ini tidak perlu ditulis ulang di kedua halaman.
 */
</script>

<template>
  <div class="auth-bg auth-grid relative min-h-screen overflow-hidden">
    <!-- Background Glow -->
    <div class="auth-glow absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20"></div>
    <div class="auth-glow absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20"></div>

    <!-- Main Content -->
    <div class="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div class="w-full max-w-md">
        <!-- Brand -->
        <div class="mb-8 text-center">
          <router-link to="/login" class="group inline-flex flex-col items-center">
            <div
              class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 transition duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40"
            >
              <svg
                class="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>

            <span class="text-xl font-bold tracking-tight text-white">
              Multifunction
              <span class="text-indigo-400">APP</span>
            </span>
          </router-link>

          <p class="mt-2 text-sm text-slate-400">Your multifunction application platform</p>
        </div>

        <!-- Authentication Card -->
        <div class="auth-card overflow-hidden rounded-2xl p-6 sm:p-8">
          <slot />
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-xs text-slate-500">
            &copy; {{ new Date().getFullYear() }} Multifunction APP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
