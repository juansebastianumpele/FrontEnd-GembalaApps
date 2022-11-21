import { defineStore } from "pinia";
import * as s$kelahiran from "@/services/fase/kelahiran";

const u$kelahiran = defineStore({
  id: "kelahiran",
  state: () => ({
    kelahiran: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List Kelahiran
    async a$kelahiranList() {
      try {
        const { data } = await s$kelahiran.list();
        this.kelahiran = data.list;
      } catch ({ error }) {
        this.kelahiran = [];
        throw error;
      }
    },

    //List Summary Kelahiran
    async a$listKelahiran() {
      try {
        const { data } = await s$kelahiran.listKelahiran();
        this.kelahiran = data.ternak.list;
        this.populasi = data.ternak;
        this.kandang = data.kandang.list;
      } catch ({ error }) {
        this.kelahiran = [];
        throw error;
      }
    },
  },

  getters: {
    g$kelahiran: (state) => state.kelahiran,
    g$kandang: (state) => state.kandang,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Cempe Betina", "Cempe Jantan"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [
            state.populasi.total,
            state.populasi.total_cempe_betina,
            state.populasi.total_cempe_jantan,
          ],
        },
      ],
    }),
  },
});

export default u$kelahiran;
