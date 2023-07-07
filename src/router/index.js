import Vue from 'vue'
import Router from 'vue-router'
import SDKEarth from '../components/SDKEarth'
import Login from '../components/login'
import Analysis from "../components/Analysis/dataAnalysis.vue";
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: SDKEarth
    },
    {
      path:'/analysis',
      name:'analysis',
      component: Analysis
    },

  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否有token，没有或者为空则跳转到登陆页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('accessToken');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;


