import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, pakan } = subApiUrl;

const list = (req) => baseApi.get(`${api}/${pakan}/list/${req}`);
const add = (req) => baseApi.post(`${api}/${pakan}`, req);
const edit = (req) => baseApi.put(`${api}/${pakan}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${pakan}/${req}`);
const totalPakan = (req) => baseApi.get(`${api}/${pakan}/total/${req.id}`, req)

export { list, add, edit, del, totalPakan };
