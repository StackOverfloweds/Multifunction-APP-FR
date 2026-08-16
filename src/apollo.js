import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useAuthStore } from '@/stores/auth'

const httpLink = createHttpLink({ uri: 'https://api.yourapp.test/graphql' })

const authLink = setContext((_, { headers }) => {
  const auth = useAuthStore()
  return {
    headers: {
      ...headers,
      authorization: auth.token ? `Bearer ${auth.token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})