import {createRouter, createWebHashHistory} from 'vue-router';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Home from '@/views/Home';

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
    name: 'home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
