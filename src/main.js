import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './style.css'
import App from './App.vue'
import router from './router'
import { apolloClient } from './api/apollo'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(pinia)
app.use(router)

app.mount('#app')
