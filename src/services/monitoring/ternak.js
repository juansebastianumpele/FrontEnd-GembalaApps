import { baseApi } from "@/services/api";
import { subApiUrl } from "@/utils/constant";

const { api, ternak, timbangan } = subApiUrl;

const list = () => baseApi.get(`${api}/${ternak}`);
const add = (req) => baseApi.post(`${api}/${ternak}`, req);
const edit = (req) => baseApi.put(`${api}/${ternak}/${req.id}`, req.formData);
const del = (req) => baseApi.delete(`${api}/${ternak}/`, { data: req });

// Dropdown
const listVarietas = () => baseApi.get(`${api}/varietas`);
const listFase = () => baseApi.get(`${api}/fase`);

// Jumlah Ternak
const listBetina = () => baseApi.get(`${api}/${ternak}?jenis_kelamin=Betina`);
const listPejantan = () => baseApi.get(`${api}/${ternak}?jenis_kelamin=Jantan`);

// Detail
const detailKandang = (req) =>
  baseApi.get(`${api}/${ternak}?id_kandang=${req}`);
const detailPakan = (req) =>
  baseApi.get(`${api}/${ternak}/listternakpakan/${req}`);

// Dashboard
const detailTernak = (req) => baseApi.get(`${api}/${ternak}/users/${req.id}`);
const totalSehat = () => baseApi.get(`${api}/dashboard/status_kesehatan`);
const totalJeniskelamin = (req) =>
  baseApi.get(`${api}/${ternak}/totaljeniskelamin/${req}`);
const populasi = () => baseApi.get(`${api}/dashboard/populasi`);
const tabelKandang = (req) => baseApi.get(`${api}/${ternak}/totalberat/${req}`);
const filterTernak = (req) => baseApi.get(`${api}/${ternak}/listFilter?${req}`);

//timbangan
const listTimbangan = (req) => baseApi.get(`${api}/${timbangan}/list/${req}`);

export {
  listBetina,
  listPejantan,
  list,
  add,
  edit,
  del,
  listVarietas,
  listFase,
  detailKandang,
  detailPakan,
  detailTernak,
  totalSehat,
  totalJeniskelamin,
  populasi,
  tabelKandang,
  filterTernak,
  listTimbangan,
};
