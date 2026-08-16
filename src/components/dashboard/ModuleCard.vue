<script setup>
/**
 * Padanan dari pola card berulang di dashboard.blade.php (Storage
 * Manager, Server Metrics, AI Engineer, User Management). Di blade,
 * keempat card itu markup-nya nyaris identik tapi ditulis manual
 * berkali-kali dengan warna berbeda. Di sini cukup SATU komponen
 * yang menerima warna aksen & konten via props/slot, dipakai 4x
 * dari DashboardView tanpa duplikasi markup.
 *
 * accent yang didukung: 'indigo' | 'cyan' | 'teal' | 'amber'
 * (sesuai warna asli tiap card di blade).
 */
const props = defineProps({
  to: { type: [String, Object], default: null },
  accent: { type: String, default: 'indigo' },
  icon: { type: String, required: true }, // svg path "d" attribute
  badgeText: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  footerText: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})

const ACCENT_MAP = {
  indigo: {
    top: 'from-indigo-500 to-violet-500',
    hoverBorder: 'hover:border-indigo-500/50',
    hoverShadow: 'hover:shadow-indigo-500/10',
    iconBorder: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10',
    iconText: 'text-indigo-400',
    iconHoverBg: 'group-hover:bg-indigo-500',
    badgeBorder: 'border-emerald-500/20',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    badgeDot: 'bg-emerald-400',
    titleHover: 'group-hover:text-indigo-400',
    footerText: 'text-indigo-400',
  },
  cyan: {
    top: 'from-cyan-500 to-sky-500',
    hoverBorder: 'hover:border-cyan-500/50',
    hoverShadow: 'hover:shadow-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-400',
    iconHoverBg: 'group-hover:bg-cyan-500',
    badgeBorder: 'border-cyan-500/20',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    badgeDot: 'bg-cyan-400',
    titleHover: 'group-hover:text-cyan-400',
    footerText: 'text-cyan-400',
  },
  teal: {
    top: 'from-teal-500 to-emerald-500',
    hoverBorder: 'hover:border-teal-500/50',
    hoverShadow: 'hover:shadow-teal-500/10',
    iconBorder: 'border-teal-500/20',
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-400',
    iconHoverBg: 'group-hover:bg-teal-500',
    badgeBorder: 'border-teal-500/20',
    badgeBg: 'bg-teal-500/10',
    badgeText: 'text-teal-400',
    badgeDot: 'bg-teal-400',
    titleHover: 'group-hover:text-teal-400',
    footerText: 'text-teal-400',
  },
  amber: {
    top: 'from-amber-500 to-orange-500',
    hoverBorder: 'hover:border-amber-500/50',
    hoverShadow: 'hover:shadow-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    iconHoverBg: 'group-hover:bg-amber-500',
    badgeBorder: 'border-amber-500/20',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    badgeDot: '',
    titleHover: 'group-hover:text-amber-400',
    footerText: 'text-amber-400',
  },
}

const c = ACCENT_MAP[props.accent] ?? ACCENT_MAP.indigo
</script>

<template>
  <component
    :is="disabled ? 'div' : to ? 'router-link' : 'a'"
    :to="!disabled ? to : undefined"
    class="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-xl shadow-black/20 transition-all duration-300 sm:p-6"
    :class="disabled ? 'cursor-not-allowed opacity-70' : [c.hoverBorder, c.hoverShadow, 'hover:-translate-y-1 hover:bg-slate-900/95 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50']"
  >
    <!-- Top Accent -->
    <div
      class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100"
      :class="c.top"
    ></div>

    <div class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:text-white sm:h-12 sm:w-12"
          :class="[c.iconBorder, c.iconBg, c.iconText, c.iconHoverBg]"
        >
          <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
          </svg>
        </div>

        <span
          class="inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[9px] font-bold sm:text-[10px]"
          :class="[c.badgeBorder, c.badgeBg, c.badgeText]"
        >
          <span v-if="c.badgeDot" class="h-1.5 w-1.5 rounded-full animate-pulse" :class="c.badgeDot"></span>
          {{ badgeText }}
        </span>
      </div>

      <div>
        <h5 class="text-lg font-bold text-slate-100 transition-colors" :class="c.titleHover">
          {{ title }}
        </h5>
        <p class="mt-2 text-sm leading-6 text-slate-400">{{ description }}</p>
      </div>
    </div>

    <div
      class="mt-6 flex items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs font-semibold transition-colors group-hover:border-slate-700/80"
      :class="c.footerText"
    >
      <span class="truncate">{{ footerText }}</span>
      <svg class="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </component>
</template>
