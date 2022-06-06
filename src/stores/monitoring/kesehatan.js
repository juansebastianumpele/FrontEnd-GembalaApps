import { defineStore } from "pinia";
import * as s$kesehatan from "@/services/monitoring/kesehatan";

const u$kesehatan = defineStore({
  id: "kesehatan",
  state: () => ({
    kesehatan: [],
    detailKesehatan: [],
  }),
  actions: {
    async a$kesehatanList(request) {
      try {
        const { data } = await s$kesehatan.list(request);
        this.kesehatan = data;
      } catch ({ error }) {
        this.kesehatan = [];
        throw error;
      }
    },
    async a$kesehatanAdd(request) {
      try {
        await s$kesehatan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanEdit(request) {
      try {
        await s$kesehatan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanDelete(request) {
      try {
        await s$kesehatan.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    // Detail Kesehatan by ID Penyakit
    async a$penyakitDetail(request) {
      try {
        const { data } = await s$kesehatan.detailKesehatan(request);
        this.detailKesehatan = data;
      } catch ({ error }) {
        this.detailKesehatan = {};
        throw error;
      }
    },
  },
  getters: {
    g$kesehatanList: (state) => state.kesehatan,
    g$detailKesehatan: (state) => state.detailKesehatan,
  },
});

export default u$kesehatan;
