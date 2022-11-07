import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const listTotal = () =>
  baseApi.get(`${api}/riwayat-kesehatan/total-sakit-by-penyakit/`);
const list = () => baseApi.get(`${api}/riwayat-kesehatan`);
const add = (req) => baseApi.post(`${api}/riwayat-kesehatan`, req);
const edit = (req) => baseApi.put(`${api}/riwayat-kesehatan`, req);
const del = (req) => baseApi.delete(`${api}/riwayat-kesehatan/`, { data: req });
const detailKesehatan = (req) =>
  baseApi.get(`${api}/riwayat-kesehatan?id_penyakit=${req}`);
const riwayatKesehatan = (req) =>
  baseApi.get(`${api}/riwayat-kesehatan?id_ternak=${req}`);

export { list, add, edit, del, detailKesehatan, listTotal, riwayatKesehatan };
