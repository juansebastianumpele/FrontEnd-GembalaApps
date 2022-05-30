import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, ternak } = subApiUrl;

const list = () => baseApi.get(`${api}/${ternak}`);
const add = (req) => baseApi.post(`${api}/${ternak}`, req);
const edit = (req) => baseApi.put(`${api}/${ternak}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${ternak}/${req}`);

// Dropdown
const listVarietas = () => baseApi.get(`${api}/${ternak}/varietas`);
const listFase = () => baseApi.get(`${api}/${ternak}/fase`);
const listJenisKelamin = () => baseApi.get(`${api}/${ternak}/jeniskelamin`);
const listStatusSehat = () => baseApi.get(`${api}/${ternak}/statussehat`);
const listStatusKeluar = () => baseApi.get(`${api}/${ternak}/statuskeluar`);

// Detail
const detailKandang = (req) => baseApi.get(`${api}/${ternak}/listbykandang/${req}`);
export { list, add, edit, del, listVarietas, listFase, listJenisKelamin, listStatusSehat, listStatusKeluar, detailKandang };
