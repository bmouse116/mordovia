import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import router from './router/router'
import { getApiBaseUrl, getTerminalId } from './config/api-config'
import { createPinia } from 'pinia'

const API_URL = getApiBaseUrl()
const TERMINAL_ID = getTerminalId()
const pinia = createPinia()

createApp(App).use(router).use(pinia).provide('API_URL', API_URL).provide('TERMINAL_ID', TERMINAL_ID).mount('#app')
