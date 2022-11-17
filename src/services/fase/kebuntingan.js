import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-kebuntingan`);

//sumary
const listKebuntingan = () => baseApi.get(`${api}/kebuntingan/all-ternak`);

export { list, listKebuntingan };
