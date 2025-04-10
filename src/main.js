import './assets/main.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
