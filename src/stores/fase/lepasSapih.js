import { defineStore } from "pinia";
import * as s$lepasSapih from "@/services/fase/lepasSapih";
import * as s$dropdown from "@/services/dropdown";

const u$lepasSapih = defineStore({
  id: "lepasSapih",
  state: () => ({
    lepasSapih: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List Lepas Sapih
    async a$listLepasSapih() {
      try {
        const { data } = await s$lepasSapih.listLepasSapih();
        this.lepasSapih = data.ternak.list;
        this.populasi = data.ternak;
        this.kandang = data.kandang.list;
      } catch ({ error }) {
        this.lepasSapih = [];
        throw error;
      }
    },
  },

  getters: {
    g$lepasSapih: (state) => state.lepasSapih,
    g$kandang: (state) => state.kandang,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Total Jantan", "Totoal Betina"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [
            state.populasi.total,
            state.populasi.total_jantan,
            state.populasi.total_betina,
          ],
        },
      ],
    }),
  },
});

export default u$lepasSapih;
