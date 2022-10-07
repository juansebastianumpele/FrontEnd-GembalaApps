import AuthLayout from '@/layout/AuthLayout.vue';

import { certDetail } from '@/utils/cookies';

const authRoutes = {
  path: '/',
  name: 'Auth',
  component: AuthLayout,
  beforeEnter: (to, from, next) => {
    const { role } = certDetail();
    if (!to.matched.some(({ path }) => path.includes('auth')) && !role) next({ name: 'Login' });
    else if (to.path === '/' && role !== '') next({ name: 'Home' });
    else next();
  },
  children: [
    {
      path: '/auth/login',
      name: 'Login',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: () => import('@/views/Auth/RegisterView.vue'),
    },
    {
      path: ':pathMatch(.*)',
      alias: ':pathMatch(.*)',
      name: '404',
      component: () => import('@/views/Dashboard/NotFoundView.vue'),
    },
  ],
};

export default authRoutes;
