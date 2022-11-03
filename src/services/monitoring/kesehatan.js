import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kesehatan, ternak } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-kesehatan/total-sakit-by-penyakit/`);
const add = (req) => baseApi.post(`${api}/riwayat-kesehatan`, req);
const edit = (req) => baseApi.put(`${api}/${kesehatan}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kesehatan}/${req}`);
const detailKesehatan = (req) => baseApi.get(`${api}/riwayat-kesehatan?id_penyakit=${req}`);

export { list, add, edit, del, detailKesehatan };
