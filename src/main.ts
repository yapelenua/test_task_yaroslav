import { createApp } from 'vue'
import './assets/style.css'
import ElementPlus from 'element-plus'
import router from '@/router'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { store } from '@/store/create-store'

const app = createApp(App)

app
  .use(ElementPlus)
  .use(router)
  .use(store)
app.mount('#app')
