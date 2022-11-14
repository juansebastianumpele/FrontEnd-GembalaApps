import { defineStore } from "pinia";
import * as s$ternak from "@/services/monitoring/ternak";

const u$ternak = defineStore({
  id: "ternak",
  state: () => ({
    ternak: [],
    detailTernak: [],
    statusTernak: [],
    bangsa: [],
    totalTernak: 0,
    perlakuan: [],
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
        await s$ternak.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$ternakDelete(request) {
      try {
        await s$ternak.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    // Detail Ternak by ID Kandang
    async a$kandangDetail(request) {
      try {
        const { data } = await s$ternak.detailKandang(request);
        this.detailTernak = data.list;
      } catch ({ error }) {
        this.detailTernak = {};
        throw error;
      }
    },
    // Detail Ternak by ID Pakan
    async a$pakanDetail(request) {
      try {
        const { data } = await s$ternak.detailPakan(request);
        this.detailTernak = data;
      } catch ({ error }) {
        this.detailTernak = {};
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
  },
  getters: {
    g$ternakList: (state) => state.ternak,
    g$detailKandang: (state) => state.detailTernak,
    g$detailPakan: (state) => state.detailTernak,
    g$totalTernak: (state) => state.totalTernak,
    g$statusTernak: (state) => state.statusTernak,
    g$bangsa: (state) => state.bangsa,
    g$perlakuan: (state) => state.perlakuan,
  },
});

export default u$ternak;
