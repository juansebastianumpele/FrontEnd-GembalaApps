import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-perkawinan`);
const listIndukan = () => baseApi.get(`${api}/perkawinan/waiting-list`);
const create = (req) => baseApi.post(`${api}/perkawinan`, req);

//sumary
const listPerkawinan = () => baseApi.get(`${api}/perkawinan/ternak`);

export { list, listIndukan, create, listPerkawinan };
