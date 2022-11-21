import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/riwayat-kelahiran`);

//sumary
const listKelahiran = () =>
  baseApi.get(`${api}/kelahiran/data-ternak-kelahiran`);

export { list, listKelahiran };
