import DashboardLayout from "@/layout/DashboardLayout.vue";

import { certDetail } from "@/utils/cookies";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === "") {
        next({ name: "Login" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Dashboard/HomePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/ticket",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === "") {
        next({ name: "Login" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "order",
        name: "Order",
        component: () => import("@/views/Dashboard/Ticket/OrderPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "delivery",
        name: "Delivery",
        component: () => import("@/views/Dashboard/Ticket/DeliveryPage.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/masterData",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === "") {
        next({ name: "Login" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "pakan",
        name: "Pakan",
        component: () => import("@/views/Dashboard/MasterData/PakanPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "kawin",
        name: "Kawin",
        component: () => import("@/views/Dashboard/MasterData/KawinPage.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/user",
    component: DashboardLayout,
    beforeEnter: (to, from, next) => {
      const { role } = certDetail();
      if (to.matched.some(({ meta }) => meta.requiresAuth) && role === "") {
        next({ name: "Login" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Dashboard/User/ProfilePage.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
];

export default dashboardRoutes;
