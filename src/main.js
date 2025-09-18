import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import mitt from 'mitt'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import i18n from './language'        //引入vue-i18n
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



// Vue.prototype.$http=Axios
// //defaults 设置全局默认路径
// Axios.defaults.baseURL="192.168.110.224:8088/"
// import * as echarts from 'echarts'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// const i18n = new VueI18n({
//     locale: 'zh-CN', // 语言标识
//     messages: {
//       'zh-CN': require('./lang/zh-CN'),
//       'en-US': require('./lang/en-US')
//     }
//   })
app.config.devtools = true;
app.config.globalProperties.emitter = mitt()

app.use(ElementPlus)
app.use(router)
app.use(vue3videoPlay)
app.use(i18n)
app.mount('#app')
