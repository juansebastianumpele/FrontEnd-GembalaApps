import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, ternak } = subApiUrl;

const list = (req) => baseApi.get(`${api}/${ternak}/byUserId/${req}`);
const add = (req) => baseApi.post(`${api}/${ternak}`, req, { headers: { "Content-Type": "multipart/form-data" } });
const edit = (req) => baseApi.put(`${api}/${ternak}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${ternak}/${req}`);

// Dropdown
const listVarietas = () => baseApi.get(`${api}/${ternak}/varietas`);
const listFase = () => baseApi.get(`${api}/${ternak}/fase`);

// Jumlah Ternak
const listBetina = (req) => baseApi.get(`${api}/${ternak}/listbetina/${req}`);

// Detail
const detailKandang = (req) => baseApi.get(`${api}/${ternak}/listbykandang/${req}`);
const detailPakan = (req) => baseApi.get(`${api}/${ternak}/listternakpakan/${req}`);

export { list, add, edit, del, listVarietas, listFase, listBetina, detailKandang, detailPakan };
