import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendar as faCalenda } from '@fortawesome/free-regular-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faBell, faCalenda)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
