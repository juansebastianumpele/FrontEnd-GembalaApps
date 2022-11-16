import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/perkawinan`);
const listIndukan = () => baseApi.get(`${api}/perkawinan/waiting-list`);
const create = (req) => baseApi.post(`${api}/perkawinan`, req);

export { list, listIndukan, create };
