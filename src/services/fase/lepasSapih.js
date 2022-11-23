import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

//list Lepas Sapih
const list = () => baseApi.get(`${api}/riwayat-lepas-sapih`);

//sumary
const listLepasSapih = () => baseApi.get(`${api}/lepas-sapih/ternak-dash`);

export { list, listLepasSapih };
