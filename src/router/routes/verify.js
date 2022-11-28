const verifyRoutes = {
  path: "/verify",
  name: "Verify",
  component: () => import("@/views/Auth/VerifyView.vue"),
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
