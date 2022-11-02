import DashboardLayout from "@/layout/DashboardLayout.vue";

import { certDetail } from "@/utils/cookies";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: DashboardLayout,
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
    children: [
      {
        path: "data-kandang",
        name: "Data Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/DaftarKandang.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-kandang/:id",
        name: "Detail Kandang",
        component: () =>
          import("@/views/Dashboard/Monitoring/KandangDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan",
        name: "Data Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-pakan/:id",
        name: "Detail Pakan",
        component: () =>
          import("@/views/Dashboard/Monitoring/JenisPakanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan/bahan-pakan",
        name: "Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-pakan/detail-bahan-pakan/:id",
        name: "Detail Bahan Pakan",
        component: () => import("@/views/Dashboard/Monitoring/PakanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-penyakit",
        name: "Data Penyakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/PenyakitPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-penyakit/data-kesehatan",
        name: "Data Kesehatan",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "detail-ternak-sakit/:id",
        name: "Detail Ternak Sakit",
        component: () =>
          import("@/views/Dashboard/Monitoring/KesehatanDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-ternak",
        name: "Data Ternak",
        component: () => import("@/views/Dashboard/Monitoring/TernakPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "data-perkawinan",
        name: "Data Perkawinan",
        component: () => import("@/views/Dashboard/Monitoring/KawinPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "riwayat-kawin/:id",
        name: "Detail Kawin",
        component: () => import("@/views/Dashboard/Monitoring/KawinDetail.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/user",
    component: DashboardLayout,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Dashboard/User/ProfilePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/fase",
    component: DashboardLayout,
    children: [
      {
        path: "pemasukan",
        name: "Summary Pemasukan",
        component: () =>
          import("@/views/Dashboard/Fase/Pemasukan/SummaryPemasukan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "pemasukan/data-pemasukan",
        name: "Fase Pemasukan",
        component: () =>
          import("@/views/Dashboard/Fase/Pemasukan/Pemasukan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "pemasukan/langkah-kerja",
        name: "Langkah Kerja Pemasukan",
        component: () =>
          import("@/views/Dashboard/Fase/Pemasukan/LK_Pemasukan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "adaptasi",
        name: "Summary Adaptasi",
        component: () =>
          import("@/views/Dashboard/Fase/Adaptasi/SummaryAdaptasi.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "adaptasi/data-adaptasi",
        name: "Fase Adaptasi",
        component: () => import("@/views/Dashboard/Fase/Adaptasi/Adaptasi.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "adaptasi/langkah-kerja",
        name: "Langkah Kerja Adaptasi",
        component: () =>
          import("@/views/Dashboard/Fase/Adaptasi/LK_Adaptasi.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "perkawinan",
        name: "Summary Perkawinan",
        component: () =>
          import("@/views/Dashboard/Fase/Perkawinan/SummaryPerkawinan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "perkawinan/data-perkawinan",
        name: "Fase Perkawinan",
        component: () =>
          import("@/views/Dashboard/Fase/Perkawinan/Perkawinan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "perkawinan/langkah-kerja",
        name: "Langkah Kerja Perkawinan",
        component: () =>
          import("@/views/Dashboard/Fase/Perkawinan/LK_Perkawinan.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default dashboardRoutes;
