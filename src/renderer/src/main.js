import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.less'
import './assets/css/common.less'
import components from '@renderer/components/index.js'
import '@renderer/utils/permission'

import vuePlugin from '@highlightjs/vue-plugin'

import hljs from 'highlight.js/lib/core'
import powershell from 'highlight.js/lib/languages/powershell'
import 'highlight.js/styles/tokyo-night-light.css'

hljs.registerLanguage('powershell', powershell)

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(Antd).use(vuePlugin).use(components).mount('#app')
