import { defineStore } from "pinia";
import * as s$pemasukan from "@/services/fase/pemasukan";

const u$pemasukan = defineStore({
  id: "pemasukan",
  state: () => ({
    pemasukan: [],
    pemasukanThisMonth: [],
    populasiThisMonth: [],
    kandang: [],
    kandangSlice: [],
    kandangSlice1: [],
    ternakBaru: [],
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

    // Pemasukan This Month
    async a$pemasukanListThisMonth() {
      try {
        const { data } = await s$pemasukan.listThisMonth();
        this.kandang = data.total_by_kandang;
        this.pemasukanThisMonth = data.list;
        this.populasiThisMonth = data;

        function splitIntoChunk(arr, chunk) {
          let tempArray = [];
          for (let i = 0; i < arr.length; i += chunk) {
            tempArray.push(arr.slice(i, i + chunk));
          }
          return tempArray;
        }
        const chunk = 10;
        this.kandangSlice = splitIntoChunk(this.kandang, chunk);
        this.kandangSlice1 = this.kandangSlice[0];
        this.kandangSlice.splice(0, 1);
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },

    // Get ternak baru yang belum diinputkan
    async a$getTernakBaru() {
      try {
        const { data } = await s$pemasukan.getTernakBaru();
        this.ternakBaru = data.list;
      } catch ({ error }) {
        this.ternakBaru = [];
        throw error;
      }
    },

    // Create LK Pemasukan
    async a$createLkPemasukan(request) {
      try {
        await s$pemasukan.createLkPemasukan(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },

  getters: {
    g$pemasukan: (state) => state.pemasukan,
    g$pemasukanThisMonth: (state) => state.pemasukanThisMonth,
    g$kandang: (state) => state.kandang,
    g$kandangSlice: (state) => state.kandangSlice,
    g$kandangSlice1: (state) => state.kandangSlice1,
    g$ternakBaru: (state) => state.ternakBaru,
    g$byPopulasi: (state) => ({
      categories: ["Total", "Jantan", "Betina", "Unknown"],
      series: [
        {
          name: "Populasi",
          color: "#006329",
          data: [
            state.populasiThisMonth.total,
            state.populasiThisMonth.total_jantan,
            state.populasiThisMonth.total_betina,
            state.populasiThisMonth.totalJenisKelaminUnknown,
          ],
        },
      ],
    }),
  },
});

export default u$pemasukan;
