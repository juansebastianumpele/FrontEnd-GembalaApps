import AuthLayout from "@/layout/AuthLayout.vue";

import { certDetail } from "@/utils/cookies";

const authRoutes = {
  path: "/",
  name: "Auth",
  component: AuthLayout,
  beforeEnter: (to, from, next) => {
    const { role } = certDetail();
    if (!to.matched.some(({ path }) => path.includes("auth")) && !role)
      next({ name: "Login" });
    else if (to.path === "/" && role === "admin") next({ name: "Home" });
    else if (to.path === "/" && role === "superadmin") next({ name: "Superadmin" });
    else next();
  },
  children: [
    {
      path: "/auth/login",
      name: "Login",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/auth/register",
      name: "Register",
      component: () => import("@/views/Auth/RegisterView.vue"),
    },
    {
      path: "/auth/verify",
      name: "Verify",
      component: () => import("@/views/Auth/VerifyView.vue"),
    },
    {
      path: "/auth/reset",
      name: "Reset Password",
      component: () => import("@/views/Auth/ResetPassword.vue"),
    },
    {
      path: "/verify/success-verify",
      name: "Success",
      component: () => import("@/views/Auth/SuccessVerify.vue"),
    },
    {
      path: "/verify/failed-verify",
      name: "Failed",
      component: () => import("@/views/Auth/FailedVerify.vue"),
    },
    {
      path: ":pathMatch(.*)",
      alias: ":pathMatch(.*)",
      name: "404",
      component: () => import("@/views/Dashboard/NotFoundView.vue"),
    },
  ],
};

export default authRoutes;
