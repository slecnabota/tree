import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'
import router from './router/index'

createApp(App)
    .use(router)
    .mount('#app')
