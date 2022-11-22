import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

//sumary
const listLepasSapih = () => baseApi.get(`${api}/lepas-sapih/ternak-dash`);

export { listLepasSapih };
