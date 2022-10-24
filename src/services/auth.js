import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { auth, api } = subApiUrl;

const login = (req) => baseApi.post(`${api}/${auth}/login`, req);
const logout = () => baseApi.post(`${api}/${auth}/logout`);
const register = (req) => baseApi.post(`${api}/${auth}/register`, req);
const verify = (req) => baseApi.post(`${api}/${auth}/verify`, req);

export { login, logout, register, verify };
