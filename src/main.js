import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(VueCookies)
//配置默认过期日期:7天
VueCookies.config("7d");

// router.beforeEach((to,from,next)=>{
//   console.log(to,from,to.fullPath,to.meta.requireAuth)
//   if(to.meta.requireAuth) {  //再路由设置requireAuth，判断此页面是否需要登录
//     console.log('有页面权限');
//     next()
//   }
//   // else{
//   //   if(to.path == '/Auth'){
//   //     console.log('auth页面');
//   //     next()
//   //   }else{
//   //     console.log('auth页面111');
//   //     next({path:'/Auth'})
//   //     // next({path:'/Auth',query:{redirect:to.fullPath}})
//   //   }
//   // }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
