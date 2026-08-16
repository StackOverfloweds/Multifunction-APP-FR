import { defineStore } from 'pinia'

/**
 * Store ini HANYA menyimpan state (token, user) dan mutasi state murni.
 * Logic pemanggilan GraphQL (login/register/logout ke backend) sengaja
 * TIDAK diletakkan di sini, tapi di composable `useAuth` (src/composables/useAuth.js).
 *
 * Alasannya: store Pinia tidak enak dipakai untuk memanggil Apollo mutation
 * yang butuh loading/error state per-komponen. Dengan memisahkan
 * "state" (store) dari "aksi ke server" (composable), keduanya bisa
 * dipakai ulang secara independen - store dibaca di mana saja (navbar,
 * router guard, dashboard), sedangkan composable dipanggil dari
 * form login/register/logout.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),

    // Selaras dengan helper isSuperAdmin()/isAdmin()/isUser() di app/Models/User.php backend
    isSuperAdmin: (state) => state.user?.role === 'super_admin',
    isAdmin: (state) => ['super_admin', 'admin'].includes(state.user?.role),
    initial: (state) => (state.user?.username?.charAt(0) || '?').toUpperCase(),
  },

  actions: {
    setSession({ token, user }) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearSession() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
