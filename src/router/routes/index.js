import dashboardRoutes from "./dashboard";
import authRoutes from "./auth";
import superadminRoutes from "./superadmin";

const routes = [...dashboardRoutes, authRoutes, superadminRoutes];

export default routes;
