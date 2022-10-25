import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const listTotal = () => baseApi.get(`${api}/lk-pemasukan/ternak-baru`);
const listJantan = () =>
  baseApi.get(`${api}/lk-pemasukan/ternak-baru?jenis_kelamin=Jantan`);
const listBetina = () =>
  baseApi.get(`${api}/lk-pemasukan/ternak-baru?jenis_kelamin=Betina`);

export { listTotal, listJantan, listBetina };
