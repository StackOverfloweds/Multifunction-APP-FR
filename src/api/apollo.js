import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useAuthStore } from '@/stores/auth'

/**
 * Satu instance Apollo Client dipakai di seluruh aplikasi (lihat main.js).
 * Semua request GraphQL - dari composable useAuth, dashboard, storage, dll -
 * lewat sini, sehingga:
 * - Header Authorization otomatis terpasang (authLink).
 * - Token yang sudah invalid/expired otomatis memicu logout (errorLink),
 *   tanpa setiap komponen harus menangani kasus 401 sendiri-sendiri.
 */

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:8000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const auth = useAuthStore()

  return {
    headers: {
      ...headers,
      authorization: auth.token ? `Bearer ${auth.token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const isUnauthenticated =
    graphQLErrors?.some((err) => err.extensions?.category === 'authentication') ||
    networkError?.statusCode === 401

  if (isUnauthenticated) {
    const auth = useAuthStore()
    auth.clearSession()
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
})
