const superadminRoutes = {
  path: "/superadmin",
  name: "Superadmin",
  component: () => import("@/views/Superadmin/Peternakan.vue"),
  meta: { requireAuth: true },
};

export default superadminRoutes;
