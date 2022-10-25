import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

// Pakan
const add = (req) => baseApi.post(`${api}/bahan-pakan/jenis`, req);
const edit = (req) => baseApi.put(`${api}/bahan-pakan/jenis`, req);
const del = (req) => baseApi.delete(`${api}/bahan-pakan/jenis`, { data: req });
const listJenis = (req) => baseApi.get(`${api}/bahan-pakan/jenis${req}`);

// Detail pakan
const listPakan = (req) => baseApi.get(`${api}/bahan-pakan/?id_jenis_pakan=${req}`);

export { add, edit, del, listJenis, listPakan };
