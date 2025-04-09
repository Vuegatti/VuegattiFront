import './assets/main.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify'

import MainView from '@/views/MainView.vue'
import LogInVue from './views/LogInView.vue'
import SignInVue from './views/SignInView.vue'
const app = createApp(LogInVue)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
