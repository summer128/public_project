import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/my',
        name: 'my',
        meta:{requireAuth:true},
        component: () => import('../views/my/my.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta:{
      requireAuth:true
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/Auth',
    name: 'Auth',
    component: () => import('../components/auth.vue'),
    meta:{requireAuth:true}
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to,from,to.fullPath,to.meta.requireAuth,$cookies.get('openid'))
  if($cookies.get('openid') == null){
    console.log('888');
    if(to.meta.requireAuth) {  //再路由设置requireAuth，判断此页面是否需要登录
      next()
      console.log('有页面权限');
    }else{
      next({path:'/Auth'})
    }
  }else{
    next()
  }
 
  // else{
  //   if(to.path == '/Auth'){
  //     console.log('auth页面');
  //     next()
  //   }else{
  //     console.log('auth页面111');
  //     next({path:'/Auth'})
  //     // next({path:'/Auth',query:{redirect:to.fullPath}})
  //   }
  // }
})

export default router
