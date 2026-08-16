import { ref } from 'vue'
import { useMutation, useLazyQuery } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
} from '@/api/graphql/auth.graphql'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable terpusat untuk semua aksi autentikasi.
 *
 * Ini adalah "unit fungsi yang bisa dipakai di banyak tempat" yang
 * dimaksud: LoginView, RegisterView, AppNavbar (tombol logout), dan
 * router guard (fetchMe) semua memanggil composable yang sama ini,
 * bukan menulis ulang query/mutation GraphQL masing-masing.
 *
 * Kalau nanti perlu ditambah, misalnya loginWithGoogle atau
 * verifyEmail, cukup ditambahkan sebagai method baru di sini dan
 * langsung tersedia di semua komponen yang sudah memanggil useAuth().
 */
export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  const errorMessage = ref('')

  const { mutate: loginMutation, loading: loginLoading } = useMutation(LOGIN_MUTATION)
  const { mutate: registerMutation, loading: registerLoading } = useMutation(REGISTER_MUTATION)
  const { mutate: logoutMutation, loading: logoutLoading } = useMutation(LOGOUT_MUTATION)
  const { load: loadMe, refetch: refetchMe } = useLazyQuery(ME_QUERY, null, {
    fetchPolicy: 'network-only',
  })

  function extractErrorMessage(err) {
    return err?.graphQLErrors?.[0]?.message || err?.message || 'Terjadi kesalahan, coba lagi.'
  }

  async function login({ username, password }) {
    errorMessage.value = ''
    try {
      const result = await loginMutation({ username, password })
      const payload = result?.data?.login
      if (payload) {
        authStore.setSession({ token: payload.token, user: payload.user })
        await router.push({ name: 'dashboard' })
      }
      return payload
    } catch (err) {
      errorMessage.value = extractErrorMessage(err)
      throw err
    }
  }

  async function register({ username, email, password, passwordConfirmation }) {
    errorMessage.value = ''
    try {
      const result = await registerMutation({
        username,
        email: email || null,
        password,
        passwordConfirmation,
      })
      const payload = result?.data?.register
      if (payload) {
        authStore.setSession({ token: payload.token, user: payload.user })
        await router.push({ name: 'dashboard' })
      }
      return payload
    } catch (err) {
      errorMessage.value = extractErrorMessage(err)
      throw err
    }
  }

  async function logout() {
    try {
      await logoutMutation()
    } catch {
      // Token mungkin sudah invalid di server - tetap lanjut bersihkan sesi lokal.
    } finally {
      authStore.clearSession()
      await router.push({ name: 'login' })
    }
  }

  /**
   * Ambil ulang data user (dipakai router guard untuk validasi token
   * saat reload halaman, dan bisa dipakai ulang di ProfileView nanti).
   */
  async function fetchMe() {
    try {
      const result = (await loadMe()) || (await refetchMe())
      const user = result?.data?.me ?? result?.me
      if (user) authStore.setUser(user)
      return user
    } catch (err) {
      authStore.clearSession()
      throw err
    }
  }

  return {
    errorMessage,
    loginLoading,
    registerLoading,
    logoutLoading,
    login,
    register,
    logout,
    fetchMe,
  }
}
