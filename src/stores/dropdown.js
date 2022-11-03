import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";
import * as s$kandang from "@/services/monitoring/daftarkandang";
import * as s$pakan from "@/services/monitoring/pakan";
import * as s$penyakit from "@/services/monitoring/penyakit";

const u$dropdown = defineStore({
  id: "dropdown",
  state: () => ({
    jenisKelamin: ["Jantan", "Betina"],
    statusSehat: ["Sehat", "Sakit"],
    statusKeluar: ["Jual", "Mati", "Sembelih"],
    satuanPakan: ["Kg", "Pcs"],
    keteranganDetailPakan: ["Masuk", "Keluar"],
    keteranganTambahPakan: ["Tong", "Ball"],
    jenisKandang: [],
    bangsa: [],
    fasePemeliharaan: [],
    kandang: [],
    pakan: [],
    listBetina: [null],
    listPejantan: [],
    listPenyakit: [],
    listJenisPakan: [],
  }),
  actions: {
    // bangsa
    async a$ddBangsa() {
      try {
        const { data } = await s$ternak.listBangsa();
        this.bangsa = data.list;
      } catch ({ error }) {
        this.bangsa = [];
        throw error;
      }
    },

    // Fase Pemeliharaan
    async a$ddFasePemeliharaan() {
      try {
        const { data } = await s$ternak.listFase();
        this.fasePemeliharaan = data.list;
      } catch ({ error }) {
        this.fasePemeliharaan = [];
        throw error;
      }
    },

    // Kandang
    async a$ddKandang() {
      try {
        const { data } = await s$kandang.listKandang();
        this.kandang = data.list;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },

    // Pakan
    async a$ddPakan(request) {
      try {
        const { data } = await s$pakan.list(request);
        this.pakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },

    // List Betina
    async a$ddListBetina() {
      try {
        const { data } = await s$ternak.listBetina();
        this.listBetina = data.list;
      } catch ({ error }) {
        this.listBetina = [];
        throw error;
      }
    },

    // List Pejantan
    async a$ddListPejantan(request) {
      try {
        const { data } = await s$ternak.listPejantan(request);
        this.listPejantan = data.list;
      } catch ({ error }) {
        this.listPejantan = [];
        throw error;
      }
    },

    // List Penyakit
    async a$ddListPenyakit() {
      try {
        const { data } = await s$penyakit.list();
        this.listPenyakit = data.list;
      } catch ({ error }) {
        this.listPenyakit = [];
        throw error;
      }
    },

    // List Jenis Pakan
    async a$ddListJenisPakan(request) {
      try {
        const { data } = await s$pakan.listJenis(request);
        this.listJenisPakan = data.list;
      } catch ({ error }) {
        this.listJenisPakan = [];
        throw error;
      }
    },

    // Jenis Kandang
    async a$ddJenisKandang() {
      try {
        const { data } = await s$kandang.jenisKandang();
        this.jenisKandang = data.list;
      } catch ({ error }) {
        this.jenisKandang = [];
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
    g$ddKeteranganTambahPakan: (state) => state.keteranganTambahPakan,
    g$ddJenisKandang: (state) =>
      state.jenisKandang.map(({ id_jenis_kandang, jenis_kandang }) => ({
        id: id_jenis_kandang,
        name: jenis_kandang,
      })),
    g$ddBangsa: (state) =>
      state.bangsa.map(({ id_bangsa, bangsa }) => ({
        id: id_bangsa,
        name: bangsa,
      })),
    g$ddFasePemeliharaan: (state) =>
      state.fasePemeliharaan.map(({ id_fp, fase }) => ({
        id: id_fp,
        name: fase,
      })),
    g$ddKandang: (state) =>
      state.kandang.map(({ id_kandang, kode_kandang }) => ({
        id: id_kandang,
        name: kode_kandang,
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
    g$ddListJenisPakan: (state) =>
      state.listJenisPakan.map(({ id_jenis_pakan, jenis_pakan }) => ({
        id: id_jenis_pakan,
        name: jenis_pakan,
      })),
  },
});

export default u$dropdown;
