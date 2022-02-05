import vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { titleControl } from '../utils'
import store from '../store'

if (!window.VueRouter) {
  vue.use(VueRouter);
}


const router = new VueRouter({
  // 路由配置

  routes,//路由匹配规则
  mode: 'history',
  base: '/'
})

router.afterEach((to) => {
  if (to.meta.title) {
    titleControl.setRouteTitle(to.meta.title)
  }
})

// 鉴权操作
router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    console.log('to.path === /admin')
     if(store.state.login.user){
       console.log(store.state.login.user)
       next()
       return;
     }else{
       next('/login');
       return;
     }
  }
  else{
    console.log('to.path !== /admin')
    next();
  }
})

export default router;