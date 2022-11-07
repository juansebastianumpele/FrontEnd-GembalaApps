import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const list = () => baseApi.get(`${api}/adaptasi/ternak`);
const hariKe1 = () => baseApi.get(`${api}/adaptasi/by-step?step=1`);
const hariKe2 = () => baseApi.get(`${api}/adaptasi/by-step?step=2`);
const hariKe3 = () => baseApi.get(`${api}/adaptasi/by-step?step=3`);
const hariKe4 = () => baseApi.get(`${api}/adaptasi/by-step?step=4`);
const hariKe5 = () => baseApi.get(`${api}/adaptasi/by-step?step=5`);

export { list, hariKe1, hariKe2, hariKe3, hariKe4, hariKe5 };
