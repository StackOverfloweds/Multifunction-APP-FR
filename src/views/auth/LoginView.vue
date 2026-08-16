<script setup>
import { reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import GuestLayout from '@/layouts/GuestLayout.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AlertBanner from '@/components/ui/AlertBanner.vue'

const { login, errorMessage, loginLoading } = useAuth()

const form = reactive({
  username: '',
  password: '',
})

function handleSubmit() {
  login({ username: form.username, password: form.password }).catch(() => {})
}
</script>

<template>
  <GuestLayout>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
      <p class="mt-2 text-sm text-slate-400">Sign in to continue to your account.</p>
    </div>

    <AlertBanner v-if="errorMessage" variant="error" class="mb-5">
      {{ errorMessage }}
    </AlertBanner>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <BaseInput
        id="username"
        v-model="form.username"
        label="Username"
        autocomplete="username"
        placeholder="Enter your username"
        required
        autofocus
      >
        <template #icon>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 21a8 8 0 0116 0" />
          </svg>
        </template>
      </BaseInput>

      <div>
        <div class="mb-2 flex items-center justify-between">
          <label for="password" class="block text-sm font-medium text-slate-300">Password</label>
          <span class="text-xs font-medium text-indigo-400 opacity-60">Forgot password?</span>
        </div>

        <BaseInput
          id="password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          placeholder="Enter your password"
          required
        >
          <template #icon>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4" />
              <rect width="14" height="10" x="5" y="11" rx="2" stroke-width="1.8" />
            </svg>
          </template>
        </BaseInput>
      </div>

      <div class="flex items-center">
        <label class="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-2 focus:ring-indigo-500/30"
          />
          <span class="ms-2 text-sm text-slate-400">Remember me</span>
        </label>
      </div>

      <BaseButton type="submit" :loading="loginLoading">Sign In</BaseButton>
    </form>

    <!-- Register -->
    <div class="mt-7 border-t border-slate-700/50 pt-6 text-center">
      <p class="text-sm text-slate-400">
        Don't have an account?
        <router-link to="/register" class="font-semibold text-indigo-400 transition hover:text-indigo-300">
          Create an account
        </router-link>
      </p>
    </div>
  </GuestLayout>
</template>
