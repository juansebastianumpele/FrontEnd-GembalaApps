const verifyRoutes = {
  path: "/verify",
  name: "Verify",
  children: [
    {
      path: "success-verify",
      name: "Success",
      component: () => import("@/views/Auth/SuccessVerify.vue"),
    },
    {
      path: "failed-verify",
      name: "Failed",
      component: () => import("@/views/Auth/FailedVerify.vue"),
    },
  ],
};

export default verifyRoutes;
