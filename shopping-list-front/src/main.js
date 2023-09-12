import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia()
app.use(router);
app.use(pinia);

app.use(ElementPlus);

app.mount('#app');