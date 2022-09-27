import { defineStore } from "pinia";
import * as s$kawin from "@/services/monitoring/kawin";

const u$kawin = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
  }),
  actions: {
    // List Domba Betina (Kawin Page)
    async a$betinaList(request) {
      try {
        const { data } = await s$kawin.listBetina(request);
        this.kawin = data;
      } catch ({ error }) {
        this.kawin = [];
        throw error;
      }
    },
    // List Domba Jantan (Kawin Page)
    async a$jantanList(request) {
      try {
        const { data } = await s$kawin.listJantan(request);
        this.kawin = data;
      } catch ({ error }) {
        this.kawin = [];
        throw error;
      }
    },
    // List Kawin by ID Ternak (Detail Kawin Page)
    async a$kawinList(request) {
      try {
        const { data } = await s$kawin.listKawin(request);
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
