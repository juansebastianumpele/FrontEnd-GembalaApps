import { defineStore } from "pinia";
import * as s$daftarkandang from "@/services/monitoring/daftarkandang";

const u$daftarkandang = defineStore({
  id: "kandang",
  state: () => ({
    listkandang: [],
    totalKandang: 0,
  }),
  actions: {
    async a$kandangDesc(request) {
      try {
        const { data } = await s$daftarkandang.list(request);
        this.listkandang = data;
      } catch ({ error }) {
        this.listkandang = [];
        throw error;
      }
    },
    async a$kandangList() {
      try {
        const { data, total } = await s$daftarkandang.listKandang();
        this.listkandang = data;
        this.totalKandang = total;
      } catch ({ error }) {
        this.listkandang = [];
        throw error;
      }
    },
    async a$kandangAdd(request) {
      try {
        await s$daftarkandang.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kandangEdit(request) {
      try {
        await s$daftarkandang.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kandangDelete(request) {
      try {
        await s$daftarkandang.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$totalKandang(request) {
      try {
        const { data } = await s$daftarkandang.totalKandang(request);
        this.totalKandang = { ...data[0] };
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kandangList: (state) => state.listkandang,
    g$totalKandang: (state) => state.totalKandang,
  },
});

export default u$daftarkandang;
