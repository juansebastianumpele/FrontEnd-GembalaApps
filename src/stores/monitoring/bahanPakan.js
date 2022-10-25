import { defineStore } from "pinia";
import * as s$bahanPakan from "@/services/monitoring/pakan";

const u$pakan = defineStore({
  id: "bahanPakan",
  state: () => ({
    bahanPakan: [],
    detailBahanPakan: [],
  }),
  actions: {
    // Pakan
    async a$bahanPakanList(request) {
      try {
        const { data } = await s$bahanPakan.listJenis(request);
        this.bahanPakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$bahanPakanAdd(request) {
      try {
        await s$bahanPakan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$bahanPakanEdit(request) {
      try {
        await s$bahanPakan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$bahanPakanDelete(request) {
      try {
        await s$bahanPakan.del(request);
        console.log(request);
      } catch ({ error }) {
        throw error;
      }
    },

    // Detail Pakan
    async a$bahanPakanDetail(req) {
      try {
        const { data } = await s$pakan.listPakan(req);
        this.detailPakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
  },
  getters: {
    g$pakanList: (state) => state.pakan,
    g$detailPakan: (state) => state.detailPakan,
    g$totalPakan: (state) => state.totalPakan,
  },
});

export default u$pakan;
