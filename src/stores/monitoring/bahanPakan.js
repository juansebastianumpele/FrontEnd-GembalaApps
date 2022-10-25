import { defineStore } from "pinia";
import * as s$bahanPakan from "@/services/monitoring/bahanPakan";

const u$bahanPakan = defineStore({
  id: "bahanPakan",
  state: () => ({
    bahanPakan: [],
    detailBahanPakan: [],
  }),
  actions: {
    // Bahan pakan
    async a$bahanPakanList(request) {
      try {
        const { data } = await s$bahanPakan.listJenisBahanPakan(request);
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

    // Detail bahan pakan
    async a$bahanPakanDetail(req) {
      try {
        const { data } = await s$bahanPakan.listBahanPakan(req);
        this.detailBahanPakan = data.list;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$bahanPakanDetailAdd(request) {
      try {
        await s$bahanPakan.tambahBahanPakan(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$bahanPakanList: (state) => state.bahanPakan,
    g$detailBahanPakan: (state) => state.detailBahanPakan,
  },
});

export default u$bahanPakan;
