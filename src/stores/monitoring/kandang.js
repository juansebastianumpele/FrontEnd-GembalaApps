import { defineStore } from "pinia";
import * as s$kandang from "@/services/monitoring/kandang";

const u$kandang = defineStore({
  id: "kandang",
  state: () => ({
    kandang: [],
    totalKandang: 0,
  }),
  actions: {
    async a$kandangList(request) {
      try {
        const { data } = await s$kandang.list(request);
        this.kandang = data;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
    async a$listKandang(request) {
      try {
        const { data } = await s$kandang.listKandang(request);
        this.kandang = data;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
    async a$kandangAdd(request) {
      try {
        await s$kandang.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kandangEdit(request) {
      try {
        await s$kandang.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kandangDelete(request) {
      try {
        await s$kandang.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$totalKandang(request) {
      try {
        const { data } = await s$kandang.totalKandang(request);
        this.totalKandang ={...data[0]}
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kandangList: (state) => state.kandang,
    g$totalKandang: (state) => state.totalKandang,
  },
});

export default u$kandang;
