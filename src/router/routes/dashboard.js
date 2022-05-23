import DashboardLayout from '@/layout/DashboardLayout.vue';

import { certDetail } from '@/utils/cookies';

const dashboardRoutes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === '') {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Dashboard/HomePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/ticket',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === '') {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/Dashboard/Ticket/OrderPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: () => import('@/views/Dashboard/Ticket/DeliveryPage.vue'),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/masterData',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === '') {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/Dashboard/MasterData/CustomerPage.vue'),
        meta: { requireAuth: true },
      },
      {
        path: 'customer/detail',
        name: 'Detail',
        component: () => import('@/views/Dashboard/MasterData/CustomerDetailPage.vue'),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/user',
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === '') {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Dashboard/User/ProfilePage.vue'),
        meta: { requireAuth: true },
      },
    ],
  },
];

export default dashboardRoutes;
