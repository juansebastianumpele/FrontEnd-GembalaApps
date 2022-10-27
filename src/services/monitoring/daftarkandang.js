import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kandang } = subApiUrl;

const add = (req) => baseApi.post(`${api}/${kandang}`, req);
const edit = (req) => baseApi.put(`${api}/${kandang}`, req);
const del = (req) => baseApi.delete(`${api}/${kandang}`, { data: req });

const listKandang = () => baseApi.get(`${api}/${kandang}`);
const jenisKandang = () => baseApi.get(`${api}/jenis-kandang`);

export { add, edit, del, listKandang, jenisKandang };
