const verifyRoutes = {
  path: "/verify",
  name: "Verify",
  redirect: { name: "Cek Email" },
  children: [
    {
      path: "cek-email",
      name: "Cek Email",
      component: () => import("@/views/Auth/VerifyView.vue"),
    },
    {
      path: "sukses-verifikasi",
      name: "Success",
      component: () => import("@/views/Auth/SuccessVerify.vue"),
    },
    {
      path: "gagal-verifikasi",
      name: "Failed",
      component: () => import("@/views/Auth/FailedVerify.vue"),
    },
  ],
};

export default verifyRoutes;
