import { defineStore } from "pinia";
import * as s$pakan from "@/services/masterData/pakan";

const u$pakan = defineStore({
  id: "pakan",
  state: () => ({
    pakan: [],
    totalPakan: 0,
  }),
  actions: {
    async a$pakanList() {
      try {
        const { data } = await s$pakan.list();
        this.pakan = data;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$pakanAdd(request) {
      try {
        await s$pakan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanEdit(request) {
      try {
        await s$pakan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$pakanDelete(request) {
      try {
        await s$pakan.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$totalPakan(request) {
      try {
        const { data } = await s$pakan.totalPakan(request);
        this.totalPakan ={...data[0]}
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$pakanList: (state) => state.pakan,
    g$totalPakan: (state) => state.totalPakan,
  },
});

export default u$pakan;
