import { defineStore } from "pinia";
import * as s$pemasukan from "@/services/fase/pemasukan";

const u$pemasukan = defineStore({
  id: "pemasukan",
  state: () => ({
    pemasukan: [],
  }),
  actions: {
    // Pemasukan
    async a$pemasukanList() {
      try {
        const { data } = await s$pemasukan.list();
        this.pemasukan = data.list;
      } catch ({ error }) {
        this.pemasukan = [];
        throw error;
      }
    },
  },

  getters: {
    g$pemasukan: (state) => state.pemasukan,
  },
});

export default u$pemasukan;
