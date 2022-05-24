import { defineStore } from "pinia";
import * as s$kawin from "@/services/masterData/kawin";

const u$kawin = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
  }),
  actions: {
    async a$kawinList() {
      try {
        const { data } = await s$kawin.list();
        this.kawin = data;
      } catch ({ error }) {
        this.kawin = [];
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
