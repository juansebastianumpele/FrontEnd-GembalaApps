import { defineStore } from "pinia";
import * as s$penyakit from "@/services/masterData/penyakit";

const u$penyakit = defineStore({
  id: "penyakit",
  state: () => ({
    penyakit: [],
  }),
  actions: {
    async a$pakanList() {
      try {
        const { data } = await s$penyakit.list();
        this.penyakit = data;
      } catch ({ error }) {
        this.penyakit = [];
        throw error;
      }
    },
    async a$pakanAdd(request) {
      try {
        await s$penyakit.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanEdit(request) {
      try {
        await s$penyakit.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanDelete(request) {
      try {
        await s$penyakit.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$pakanList: (state) => state.penyakit,
  },
});

export default u$penyakit;
