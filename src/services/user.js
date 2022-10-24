import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, auth } = subApiUrl;

const detail = () => baseApi.get(`${api}/${auth}/profile`);
const changePw = (req) => baseApi.put(`${api}/${auth}/update-password`, req);
const changeProfile = (req) =>
  baseApi.put(`${api}/${auth}/update-account`, req);

export { detail, changePw, changeProfile };
