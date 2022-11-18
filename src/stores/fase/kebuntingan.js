import { defineStore } from "pinia";
import * as s$kebuntingan from "@/services/fase/kebuntingan";

const u$kebuntingan = defineStore({
  id: "kebuntingan",
  state: () => ({
    kebuntingan: [],
    populasi: [],
    kandang: [],
  }),
  actions: {
    //List Kebuntingan
    async a$kebuntinganList() {
      try {
        const { data } = await s$kebuntingan.list();
        this.kebuntingan = data.list;
      } catch ({ error }) {
        this.kebuntingan = [];
        throw error;
      }
    },

    //List Summary Kebuntingan
    async a$listKebuntingan() {
      try {
        const { data } = await s$kebuntingan.listKebuntingan();
        this.kebuntingan = data.list;
        this.populasi = data;
        this.kandang = data.kandang;
      } catch ({ error }) {
        this.kebuntingan = [];
        throw error;
      }
    },
  },

  getters: {
    g$kebuntingan: (state) => state.kebuntingan,
    g$kandang: (state) => state.kandang,
    g$byPopulasi: (state) => ({
      categories: ["Total"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [state.populasi.total],
        },
      ],
    }),
  },
});

export default u$kebuntingan;
