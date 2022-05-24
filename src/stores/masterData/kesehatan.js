import { defineStore } from "pinia";
import * as s$penyakit from "@/services/masterData/penyakit";

const u$penyakit = defineStore({
  id: "penyakit",
  state: () => ({
    penyakit: [],
  }),
  actions: {
    async a$kesehatanList() {
      try {
        const { data } = await s$penyakit.list();
        this.penyakit = data;
      } catch ({ error }) {
        this.penyakit = [];
        throw error;
      }
    },
    async a$kesehatanAdd(request) {
      try {
        await s$penyakit.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanEdit(request) {
      try {
        await s$penyakit.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanDelete(request) {
      try {
        await s$penyakit.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kesehatanList: (state) => state.penyakit,
  },
});

export default u$penyakit;
