import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kawin, ternak } = subApiUrl;

const list = (req) => baseApi.get(`${api}/${ternak}/listbetina/${req}`);
const add = (req) => baseApi.post(`${api}/${kawin}`, req);
const edit = (req) => baseApi.put(`${api}/${kawin}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kawin}/${req}`);

export { list, add, edit, del };
