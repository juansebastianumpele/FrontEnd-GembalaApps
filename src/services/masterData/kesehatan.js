import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kesehatan } = subApiUrl;

const list = () => baseApi.get(`${api}/${kesehatan}`);
const add = (req) => baseApi.post(`${api}/${kesehatan}`, req);
const edit = (req) => baseApi.put(`${api}/${kesehatan}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kesehatan}/${req}`);

export { list, add, edit, del };
