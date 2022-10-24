import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, auth } = subApiUrl;

const detail = () => baseApi.get(`${api}/${auth}/profile`);
const changePw = (req) => baseApi.post(`${api}/${auth}/update-password`, req);

export { detail, changePw };
