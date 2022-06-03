import { defineStore } from "pinia";
import * as s$kandang from "@/services/masterData/datakandang";

const u$kandang = defineStore({
  id: "kandang",
  state: () => ({
    kandang: [],
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
  },
  getters: {
    g$kandangList: (state) => state.kandang,
  },
});

export default u$kandang;
