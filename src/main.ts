import { createApp } from 'vue'
import './fonts.css'
import './style.scss'
import App from './App.vue'
import { router } from './routes'
createApp(App).use(router).mount('#app')
