import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { auth } = subApiUrl;

const login = (req) => baseApi.post(`${auth}/authentication`, req);
const logout = () => baseApi.post(`${auth}/logout`);

export { login, logout };
