import './mock'
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from '@/router'
import './eventBus'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI)

// 注册全局的showMessage函数
import showMessage from '@/utils/showMessage'
Vue.prototype.$showMessage = showMessage;

Vue.config.productionTip = false;
// 自定义指令
import loadingConfig from './directives/loading'
import lazy from './directives/lazy'
Vue.directive('loading',loadingConfig)
Vue.directive('lazy',lazy)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

