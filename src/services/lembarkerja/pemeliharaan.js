import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/pemeliharaan/`);
const listAll = () => baseApi.get(`${api}/pemeliharaan/all`);

export { list, listAll };
