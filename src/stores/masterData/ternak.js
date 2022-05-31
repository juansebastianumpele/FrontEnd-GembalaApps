import { defineStore } from "pinia";
import * as s$ternak from "@/services/masterData/ternak";

const u$ternak = defineStore({
  id: "ternak",
  state: () => ({
    ternak: [],
    detailTernak: [],
  }),
  actions: {
    async a$ternakList() {
      try {
        const { data } = await s$ternak.list();
        this.ternak = data;
      } catch ({ error }) {
        this.ternak = [];
        throw error;
      }
    },
    async a$ternakAdd(request) {
      try {
        await s$ternak.add(request);
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
        this.detailTernak = data;
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
  },
  getters: {
    g$ternakList: (state) => state.ternak,
    g$detailKandang: (state) => state.detailTernak,
    g$detailPakan: (state) => state.detailTernak,
  },
});

export default u$ternak;
