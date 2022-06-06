import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, kesehatan, ternak } = subApiUrl;

const list = (req) => baseApi.get(`${api}/${ternak}/totalternaksakit/${req}`);
const add = (req) => baseApi.post(`${api}/${kesehatan}`, req);
const edit = (req) => baseApi.put(`${api}/${kesehatan}/${req.id}`, req);
const del = (req) => baseApi.delete(`${api}/${kesehatan}/${req}`);
const detailKesehatan = (req) => baseApi.get(`${api}/${kesehatan}/listkesehatanpenyakit/${req}`);
// const detailTernakSakit = (req) => baseApi.get(`${api}/${kesehatan}/listusers/${req}`);

export { list, add, edit, del, detailKesehatan };
