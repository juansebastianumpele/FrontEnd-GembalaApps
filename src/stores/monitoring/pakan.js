import { defineStore } from "pinia";
import * as s$pakan from "@/services/monitoring/pakan";

const u$pakan = defineStore({
  id: "pakan",
  state: () => ({
    pakan: [],
    totalPakan: [],
  }),
  actions: {
    async a$pakanList() {
      try {
        const { data } = await s$pakan.list();
        this.pakan = data.list;
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
        console.log(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$totalPakan() {
      try {
        const { data } = await s$pakan.list();
        this.totalPakan = data.total;
      } catch ({ error }) {
        this.totalPakan = [];
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
