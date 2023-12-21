import { createRouter, createWebHistory } from 'vue-router';
import demoRouters from './modules/index_back';
const routes = [...demoRouters];


// export const constantRoutes = [
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('@/views/login/index.vue'),
//     },
//     {
//       path: '/dashboard',
//       name: 'dashborad',
//       component: () => import('@/views/dashboard/index.vue'),
//     },
//   ];
  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});
// scrollBehavior函数是用来控制从一个路由过渡到另一个路由时页面应该如何滚动
export default router;
