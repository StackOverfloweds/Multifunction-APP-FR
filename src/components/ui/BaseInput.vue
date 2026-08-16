<script setup>
import { ref, computed } from 'vue'

/**
 * Padanan Vue dari resources/views/components/text-input.blade.php,
 * digabung dengan pola icon + toggle password yang ada di
 * resources/views/auth/login.blade.php supaya dipakai ulang di
 * LoginView, RegisterView, dan form lain nantinya (mis. ProfileView)
 * tanpa menulis ulang markup input setiap saat.
 */
const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  required: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && showPassword.value ? 'text' : props.type))
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="mb-2 block text-sm font-medium text-slate-300">
      {{ label }}
    </label>

    <div class="relative">
      <div
        v-if="$slots.icon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500"
      >
        <slot name="icon" />
      </div>

      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        :autofocus="autofocus"
        class="block w-full rounded-xl border border-slate-700/80 bg-slate-900/70 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        :class="[$slots.icon ? 'pl-11' : 'pl-4', isPassword ? 'pr-12' : 'pr-4']"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <button
        v-if="isPassword"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 transition hover:text-slate-300"
        :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
        @click="showPassword = !showPassword"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
          <circle cx="12" cy="12" r="3" stroke-width="1.8" />
        </svg>
      </button>
    </div>

    <p v-if="error" class="mt-2 text-sm text-rose-400">{{ error }}</p>
  </div>
</template>
