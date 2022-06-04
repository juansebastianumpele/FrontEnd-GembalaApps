import { defineStore } from "pinia";
import * as s$kawin from "@/services/masterData/kawin";

const u$kawin = defineStore({
  id: "kawin",
  state: () => ({
    kawin: [],
    betina: [],
  }),
  actions: {
    async a$kawinList(request) {
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
    // // Get List Ternak Betina by ID Users
    // async a$listTernakBetina(request) {
    //   try {
    //     const { data } = await s$ternak.listBetina(request);
    //     this.betina = data;
    //   } catch ({ error }) {
    //     this.betina = [];
    //     throw error;
    //   }
    // },
  },
  getters: {
    g$kawinList: (state) => state.kawin,
    // g$kawinBetina: (state) => state.betina,
  },
});

export default u$kawin;
