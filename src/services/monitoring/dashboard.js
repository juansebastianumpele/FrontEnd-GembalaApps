import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api } = subApiUrl;

const totalTernakByStatus = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-status`);

const totalTernakByFase = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-fase`);

const totalTernakByKandang = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-jenis-kandang`);

const totalTernakByStatusKeluar = () =>
  baseApi.get(`${api}/web-dash/total-ternak-by-status-keluar`);

const adgCempe = () => baseApi.get(`${api}/web-dash/adg-cempe`);

const totalKandang = () => baseApi.get(`${api}/web-dash/total-kandang`);

const totalTernak = () => baseApi.get(`${api}/web-dash/total-ternak`);

export {
  totalTernakByStatus,
  totalTernakByFase,
  totalTernakByKandang,
  totalTernakByStatusKeluar,
  adgCempe,
  totalKandang,
  totalTernak,
};
