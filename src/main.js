import { createApp } from 'vue'

// elementui
import ElementUI from "./plugins/elementui";
import App from './APPs.vue'
import store from './store';
import router from './router';

// 图标组件注册
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



// axios跨域
import axios from 'axios';


// 全局组件注册于svg封装
import 'virtual:svg-icons-register'
import SvgIcon from "./components/svgIcon/index.vue";
import "./components/svgIcon/svg";

// 全局样式文件
import 'element-plus/dist/index.css'
import "./styles/main.less"




const app = createApp(App)
app.config.globalProperties.$axios = axios;

app.component("svg-icon", SvgIcon)
app.use(router)
.use(store)
.use(ElementUI)
.mount('#app');



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
