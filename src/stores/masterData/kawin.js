import { defineStore } from "pinia";
import * as s$kawin from "@/services/masterData/kawin";

const u$kawin = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
    betina: [],
  }),
  actions: {
    async a$betinaList(request) {
      try {
        const { data } = await s$kawin.list(request);
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
    // Get List Kawin by ID Ternak
    async a$kawinList(request) {
      try {
        const { data } = await s$kawin.listKawin(request);
        this.kawin = data;
      } catch ({ error }) {
        this.kawin = [];
        throw error;
      }
    },
  },
  getters: {
    g$kawinList: (state) => state.kawin,
  },
});

export default u$kawin;
