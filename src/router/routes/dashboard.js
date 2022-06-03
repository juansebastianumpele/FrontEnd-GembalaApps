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
      {
        path: "chart",
        name: "Chart",
        component: () => import("@/views/Dashboard/Chart.vue"),
        meta: { requiresAuth: true },
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
        path: "daftarkandang",
        name: "Daftar Kandang",
        component: () => import("@/views/Dashboard/MasterData/DaftarKandang.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "kandang",
        name: "Kandang",
        component: () => import("@/views/Dashboard/MasterData/KandangPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-kandang/:id",
        name: "DetailKandang",
        component: () => import("@/views/Dashboard/MasterData/KandangDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-ternak-sakit/:id",
        name: "Detail Ternak Sakit",
        component: () => import("@/views/Dashboard/MasterData/KesehatanDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-pakan/:id",
        name: "Detail Pakan",
        component: () => import("@/views/Dashboard/MasterData/PakanDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "pakan",
        name: "Pakan",
        component: () => import("@/views/Dashboard/MasterData/PakanPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "daftarpakan",
        name: "Daftar Pakan",
        component: () => import("@/views/Dashboard/MasterData/"),
        meta: { requireAuth: true },
      },
      {
        path: "ternak",
        name: "Ternak",
        component: () => import("@/views/Dashboard/MasterData/TernakPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "kawin",
        name: "Kawin",
        component: () => import("@/views/Dashboard/MasterData/KawinPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "penyakit",
        name: "Penyakit",
        component: () => import("@/views/Dashboard/MasterData/PenyakitPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "kesehatan",
        name: "Kesehatan",
        component: () => import("@/views/Dashboard/MasterData/KesehatanPage.vue"),
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
