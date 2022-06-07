import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kawin, ternak } = subApiUrl;

// Get List Domba Betina
const list = (req) => baseApi.get(`${api}/${ternak}/listbetina/${req}`);

// Get list Kawin (CRUD)
const listKawin = (req) => baseApi.get(`${api}/${kawin}/list/${req}`);
const add = (req) => baseApi.post(`${api}/${kawin}`, req);
const edit = (req) => baseApi.put(`${api}/${kawin}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kawin}/${req}`);

export { list, add, edit, del, listKawin };
