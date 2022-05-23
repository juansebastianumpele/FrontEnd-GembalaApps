import { defineStore } from "pinia";
import * as s$pakan from "@/services/masterData/kawin";

const u$pakan = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
  }),
  actions: {
    async a$kawinList() {
      try {
        const { data } = await s$kawin.list();
        this.pakan = data;
      } catch ({ error }) {
        this.pakan = [];
        throw error;
      }
    },
    async a$kawinAdd(request) {
      try {
        await s$kawin.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kawinEdit(request) {
      try {
        await s$kawin.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kawinDelete(request) {
      try {
        await s$kawin.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kawinList: (state) => state.kawin,
  },
});

export default u$kawin;
