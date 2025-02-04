import { createApp } from 'vue'
import './fonts.css'
import './style.css'
import App from './App.vue'
import { router } from './routes'
import { KjvBibleDownloader } from './bible/downloaders/KjvBibleDownloader'

new KjvBibleDownloader().downloadBibleAndStoreInIndexDb()

createApp(App).use(router).mount('#app')
