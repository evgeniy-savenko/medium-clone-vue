import {createRouter, createWebHistory} from 'vue-router';
import Register from '@/views/Register';
import Login from '@/views/Login';
import GlobalFeed from '@/views/GlobalFeed';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
