import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, pakan } = subApiUrl;

const list = () => baseApi.get(`${api}/${pakan}`);
const add = (req) => baseApi.post(`${api}/${pakan}`, req);
const edit = (req) => baseApi.put(`${api}/${pakan}/${req.id}`, req);
const del = (req) => {
  console.log(req);
  baseApi.delete(`${api}/${pakan}`, req);
};
const totalPakan = (req) => baseApi.get(`${api}/${pakan}/total/${req.id}`, req);

export { list, add, edit, del, totalPakan };
