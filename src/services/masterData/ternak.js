import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, ternak } = subApiUrl;

const list = () => baseApi.get(`${api}/${ternak}`);
const add = (req) => baseApi.post(`${api}/${ternak}`, req);
const edit = (req) => baseApi.put(`${api}/${ternak}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${ternak}/${req}`);
const listVarietas = () => baseApi.get(`${api}/${ternak}/varietas`);
const listFase = () => baseApi.get(`${api}/${ternak}/fase`);
const detailTernak = (req) => baseApi.get(`${api}/${ternak}/users/${req.id}`);
const totalSehat = (req) => baseApi.get(`${api}/${ternak}/totalsehat/${req}`);
const totalJeniskelamin = (req) => baseApi.get(`${api}/${ternak}/totaljeniskelamin/${req}`);
const populasi = (req) => baseApi.get(`${api}/${ternak}/total/${req}`);
const totalFase = (req) => baseApi.get(`${api}/${ternak}/totalfase/${req}`);
const tabelKandang = (req) => baseApi.get(`${api}/${ternak}/totalberat/${req}`);

const filterTernak = (req) => baseApi.get(`${api}/${ternak}/listFilter?${req}`);

export { list, add, edit, del, listVarietas, listFase, detailTernak, totalSehat, totalJeniskelamin, populasi, totalFase, tabelKandang, filterTernak };
