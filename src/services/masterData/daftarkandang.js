import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kandang } = subApiUrl;

const list = (req) => baseApi.get(`${api}/${kandang}/listkandang/${req}`);
const add = (req) => baseApi.post(`${api}/${kandang}`, req);
const edit = (req) => baseApi.put(`${api}/${kandang}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kandang}/${req}`);

export { list, add, edit, del };
