<script setup>
import { reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'
import GuestLayout from '@/layouts/GuestLayout.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AlertBanner from '@/components/ui/AlertBanner.vue'

const { register, errorMessage, registerLoading } = useAuth()

const form = reactive({
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

function handleSubmit() {
  register({ ...form }).catch(() => {})
}
</script>

<template>
  <GuestLayout>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold tracking-tight text-white">Create Your Account</h1>
      <p class="mt-2 text-sm text-slate-400">Register your account to get started.</p>
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
        placeholder="Choose a username"
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

      <BaseInput
        id="email"
        v-model="form.email"
        type="email"
        label="Email (opsional)"
        autocomplete="email"
        placeholder="you@example.com"
      >
        <template #icon>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </template>
      </BaseInput>

      <BaseInput
        id="password"
        v-model="form.password"
        type="password"
        label="Password"
        autocomplete="new-password"
        placeholder="Create a password"
        required
      >
        <template #icon>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4" />
            <rect width="14" height="10" x="5" y="11" rx="2" stroke-width="1.8" />
          </svg>
        </template>
      </BaseInput>

      <BaseInput
        id="password_confirmation"
        v-model="form.passwordConfirmation"
        type="password"
        label="Confirm Password"
        autocomplete="new-password"
        placeholder="Repeat your password"
        required
      >
        <template #icon>
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4" />
            <rect width="14" height="10" x="5" y="11" rx="2" stroke-width="1.8" />
          </svg>
        </template>
      </BaseInput>

      <BaseButton type="submit" :loading="registerLoading">Create Account</BaseButton>
    </form>

    <!-- Login -->
    <div class="mt-7 border-t border-slate-700/50 pt-6 text-center">
      <p class="text-sm text-slate-400">
        Already have an account?
        <router-link to="/login" class="font-semibold text-indigo-400 transition hover:text-indigo-300">
          Sign in
        </router-link>
      </p>
    </div>
  </GuestLayout>
</template>
