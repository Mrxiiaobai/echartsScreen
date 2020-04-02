import Vue from "vue";
import "./global"
import App from "./App.vue";
import Vuex from 'vuex'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import ElementUI from "element-ui";
import "./assets/css/mui.min.css"
import "./assets/css/style.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/feather.css"
import "./assets/css/app.css"
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
// import store from "./store";
import echarts from "echarts";
import theme from './assets/js/theme';
import Blob from './assets/js/Blob.js';
import Export2Excel from './assets/js/Export2Excel.js';
// import "babel-polyfill"
echarts.registerTheme('theme', theme)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex)


Vue.config.productionTip = false

const requireComponent = require.context(
  './components/subcomponents/',
  false,
  /.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

const store = new Vuex.Store({
  state: {
    aliveComponent: [],
    onlineStatusDescribe: '',
    onlineStatusIconColor: '',
    ifshowall: false
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
