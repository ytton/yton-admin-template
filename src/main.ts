import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/theme/index'
import { piniaPluginReset } from './utils/pinia-plugin-reset'
import echarts from '@/plugins/echarts'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
pinia.use(piniaPluginReset)
Message._context = app._context
app.use(Message)
app.use(ArcoVueIcon)
app.use(router)
app.use(pinia)
app.use(echarts)

app.mount('#app')
