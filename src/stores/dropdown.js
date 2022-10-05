import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";
import * as s$kandang from "@/services/monitoring/daftarkandang";
import * as s$pakan from "@/services/monitoring/pakan";
import * as s$penyakit from "@/services/monitoring/penyakit";

const u$dropdown = defineStore({
  id: "dropdown",
  state: () => ({
    jenisKelamin: ["Jantan", "Betina"],
    statusSehat: ["Sehat", "Sakit", "Sembuh"],
    statusKeluar: ["Jual", "Mati", "Sembelih"],
    satuanPakan: ["Kg", "Pcs"],
    keteranganDetailPakan: ["Masuk", "Keluar"],
    varietas: [],
    fasePemeliharaan: [],
    kandang: [],
    pakan: [],
    listBetina: [],
    listPejantan: [],
    listPenyakit: [],
  }),
  actions: {
    async a$ddVarietas() {
      try {
        const { data } = await s$ternak.listVarietas();
        this.varietas = data.list;
      } catch ({ error }) {
        this.varietas = [];
        throw error;
      }
    },
    async a$ddFasePemeliharaan() {
      try {
        const { data } = await s$ternak.listFase();
        this.fasePemeliharaan = data.list;
      } catch ({ error }) {
        this.fasePemeliharaan = [];
        throw error;
      }
    },
    async a$ddKandang(request) {
      try {
        const { data } = await s$kandang.listKandang(request);
        this.kandang = data.list;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
    async a$ddPakan(request) {
      try {
        const { data } = await s$pakan.list(request);
        this.pakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$ddListBetina(request) {
      try {
        const { data } = await s$ternak.listBetina(request);
        this.listBetina = data.list;
      } catch ({ error }) {
        this.listBetina = [];
        throw error;
      }
    },
    async a$ddListPejantan(request) {
      try {
        const { data } = await s$ternak.listPejantan(request);
        this.listPejantan = data.list;
      } catch ({ error }) {
        this.listPejantan = [];
        throw error;
      }
    },
    async a$ddListPenyakit() {
      try {
        const { data } = await s$penyakit.list();
        this.listPenyakit = data.list;
      } catch ({ error }) {
        this.listPenyakit = [];
        throw error;
      }
    },
  },
  getters: {
    g$ddJenisKelamin: (state) => state.jenisKelamin,
    g$ddJenisHarga: (state) => state.jenisHarga,
    g$ddStatusSehat: (state) => state.statusSehat,
    g$ddStatusKeluar: (state) => state.statusKeluar,
    g$ddSatuanPakan: (state) => state.satuanPakan,
    g$ddKeteranganDetailPakan: (state) => state.keteranganDetailPakan,
    g$ddVarietas: (state) =>
      state.varietas.map(({ id_varietas, nama_varietas }) => ({
        id: id_varietas,
        name: nama_varietas,
      })),
    g$ddFasePemeliharaan: (state) =>
      state.fasePemeliharaan.map(({ id_fp, fase }) => ({
        id: id_fp,
        name: fase,
      })),
    g$ddKandang: (state) =>
      state.kandang.map(({ id_kandang, nama_kandang }) => ({
        id: id_kandang,
        name: nama_kandang,
      })),
    g$ddPakan: (state) =>
      state.pakan.map(({ id_pakan, nama_pakan }) => ({
        id: id_pakan,
        name: nama_pakan,
      })),
    g$ddListBetina: (state) =>
      state.listBetina.map(({ id_ternak }) => ({
        id: id_ternak,
        name: id_ternak,
      })),
    g$ddListPejantan: (state) =>
      state.listPejantan.map(({ id_ternak }) => ({
        id: id_ternak,
        name: id_ternak,
      })),
    g$ddListPenyakit: (state) =>
      state.listPenyakit.map(({ id_penyakit, nama_penyakit }) => ({
        id: id_penyakit,
        name: nama_penyakit,
      })),
  },
});

export default u$dropdown;
