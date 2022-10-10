import { defineStore } from "pinia";
import * as s$costumer from "@/services/customer";
import * as s$ternak from "@/services/monitoring/ternak";

const u$costumer = defineStore({
  id: "costumer",
  state: () => ({
    costumer: [],
    detail: [],
  }),
  actions: {
    async a$costumerList() {
      try {
        const { data } = await s$costumer.list();
        this.costumer = data;
      } catch ({ error }) {
        this.costumer = [];
        throw error;
      }
    },
    async a$costumerDetail() {
      try {
        const { data } = await s$ternak.list();
        this.detail = data.total;
      } catch ({ error }) {
        this.detail = [];
        throw error;
      }
    },
    async a$costumerEdit(request) {
      try {
        await s$costumer.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$costumerList: (state) => state.costumer,
    g$costumerDetail: (state) => state.detail,
  },
});

export default u$costumer;
