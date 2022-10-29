import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/lk-pemasukan`);
const listThisMonth = () => baseApi.get(`${api}/lk-pemasukan/this-month`);

export { list, listThisMonth };
