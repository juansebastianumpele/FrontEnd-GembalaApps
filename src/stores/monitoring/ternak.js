import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";

const ubahTanggal = (tanggal) =>
  new Intl.DateTimeFormat("id-ID", { dateStyle: "short" }).format(
    new Date(tanggal)
  );

const u$ternak = defineStore({
  id: "ternak",
  state: () => ({
    ternak: [],
    statusTernak: [],
    bangsa: [],
    totalTernak: 0,
    perlakuan: [],
    timbangan: [],
  }),
  actions: {
    async a$ternakList(request) {
      try {
        const { data } = await s$ternak.list(request);
        this.ternak = data.list;
      } catch ({ error }) {
        this.ternak = [];
        throw error;
      }
    },
    async a$totalTernak(request) {
      try {
        const { data } = await s$ternak.list(request);
        this.totalTernak = data.total;
      } catch ({ error }) {
        this.ternak = [];
        throw error;
      }
    },
    async a$ternakAdd(request) {
      try {
        const tambahTernak = await s$ternak.add(request);
        return tambahTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$ternakEdit(request) {
      try {
        const editTernak = await s$ternak.edit(request);
        return editTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    async a$ternakDelete(request) {
      try {
        const deleteTernak = await s$ternak.del(request);
        return deleteTernak.data;
      } catch ({ error }) {
        throw error;
      }
    },
    // Get status ternak
    async a$statusTernak() {
      try {
        const { data } = await s$ternak.statusTernak();
        this.statusTernak = data.list;
      } catch ({ error }) {
        this.statusTernak = [];
        throw error;
      }
    },
    // Get bangsa
    async a$bangsa() {
      try {
        const { data } = await s$ternak.listBangsa();
        this.bangsa = data.list;
      } catch ({ error }) {
        this.bangsa = [];
        throw error;
      }
    },
    //Get Perlakuan
    async a$perlakuan(req) {
      try {
        const { data } = await s$ternak.listPerlakuan(req);
        this.perlakuan = data.list;
      } catch ({ error }) {
        this.perlakuan = [];
        throw error;
      }
    },
    //Get data timbangan
    async a$byTimbangan(req) {
      try {
        const { data } = await s$ternak.listTimbangan(req);
        this.timbangan = data.list;
      } catch ({ error }) {
        this.timbangan = [];
        throw error;
      }
    },
  },
  getters: {
    g$ternakList: (state) => state.ternak,
    g$totalTernak: (state) => state.totalTernak,
    g$statusTernak: (state) => state.statusTernak,
    g$bangsa: (state) => state.bangsa,
    g$perlakuan: (state) => state.perlakuan,
    g$byTimbangan: (state) => ({
      categories: state.timbangan.map(({ tanggal_timbang }) =>
        ubahTanggal(tanggal_timbang)
      ),
      series: [
        {
          name: "Bobot",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.timbangan.map(({ berat }) => berat),
        },
        {
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          name: "Suhu",
          data: state.timbangan.map(({ suhu }) => suhu),
        },
      ],
      length: state.timbangan.length,
    }),
  },
});

export default u$ternak;
