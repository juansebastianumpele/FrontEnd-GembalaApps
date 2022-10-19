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
        component: () => import("@/views/Dashboard/Chart.vue"),
        meta: { requiresAuth: true, hideFooter: true },
      },
      {
        path: "monitor",
        name: "Monitor",
        component: () => import("@/views/Dashboard/Monitor.vue"),
        meta: { requiresAuth: true, hideFooter: true, monitoring: true },
      },
      // {
      //   path: "filter",
      //   name: "Filter",
      //   component: () => import("@/views/Dashboard/DetailFilter.vue"),
      //   meta: { requiresAuth: true, hideFooter: true },
      // },
    ],
  },
  {
    path: "/monitoring",
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
        path: "data-kandang",
        name: "Data Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/DaftarKandang.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-kandang/:id",
        name: "Detail Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/KandangDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-pakan",
        name: "Data Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-pakan/:id",
        name: "Detail Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-pakan/bahan-pakan",
        name: "Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-pakan/detail-bahan-pakan/:id",
        name: "Detail Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-penyakit",
        name: "Data Penyakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/PenyakitPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-penyakit/data-kesehatan",
        name: "Data Kesehatan",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "detail-ternak-sakit/:id",
        name: "Detail Ternak Sakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanDetail.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-ternak",
        name: "Data Ternak",
        component: () => import("@/views/Dashboard/Monitoring/TernakPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "data-perkawinan",
        name: "Data Perkawinan",
        component: () => import("@/views/Dashboard/Monitoring/KawinPage.vue"),
        meta: { requireAuth: true },
      },
      {
        path: "riwayat-kawin/:id",
        name: "Detail Kawin",
        component: () => import("@/views/Dashboard/Monitoring/KawinDetail.vue"),
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
