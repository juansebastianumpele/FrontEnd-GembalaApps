import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { auth } = subApiUrl;

const login = (req) => baseApi.post(`api/${auth}/login`, req);
const logout = () => baseApi.post(`api/${auth}/logout`);

export { login, logout };
