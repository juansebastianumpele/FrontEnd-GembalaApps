import { defineStore } from "pinia";
import * as s$dashboard from "@/services/monitoring/dashboard";

const u$dashboard = defineStore({
  id: "dashboard",
  state: () => ({
    totalByJenis: [],
    totalByFase: [],
    totalByKandang: [],
    totalByStatusKeluar: [],
    totalAdgCempe: [],
    categoriesAdgCempe: [],
    totalKandang: [],
    totalTernak: [],
  }),

  actions: {
    async a$totalByJenis() {
      try {
        const { data } = await s$dashboard.totalTernakByJenis();
        this.totalByJenis = data;
      } catch ({ error }) {
        this.totalByJenis = [];
        throw error;
      }
    },

    async a$totalByFase() {
      try {
        const { data } = await s$dashboard.totalTernakByFase();
        this.totalByFase = data;
      } catch ({ error }) {
        this.totalByFase = [];
        throw error;
      }
    },

    async a$totalByKandang() {
      try {
        const { data } = await s$dashboard.totalTernakByKandang();
        this.totalByKandang = data;
      } catch ({ error }) {
        this.totalByKandang = [];
        throw error;
      }
    },

    async a$totalByStatusKeluar() {
      try {
        const { data } = await s$dashboard.totalTernakByStatusKeluar();
        this.totalByStatusKeluar = data;
      } catch ({ error }) {
        this.totalByStatusKeluar = [];
        throw error;
      }
    },

    async a$totalAdgCempe() {
      try {
        const { data } = await s$dashboard.totalAdgCempe();
        this.totalAdgCempe = Object.values(data);
        let bulan = Object.keys(data);
        this.categoriesAdgCempe = bulan.map((item) => {
          let split = item.split("-")[1];
          if (split == "1") return "Jan " + item.split("-")[0];
          if (split == "2") return "Feb " + item.split("-")[0];
          if (split == "3") return "Mar " + item.split("-")[0];
          if (split == "4") return "Apr " + item.split("-")[0];
          if (split == "5") return "Mei " + item.split("-")[0];
          if (split == "6") return "Jun " + item.split("-")[0];
          if (split == "7") return "Jul " + item.split("-")[0];
          if (split == "8") return "Agu " + item.split("-")[0];
          if (split == "9") return "Sep " + item.split("-")[0];
          if (split == "10") return "Okt " + item.split("-")[0];
          if (split == "11") return "Nov " + item.split("-")[0];
          if (split == "12") return "Des " + item.split("-")[0];
        });
      } catch ({ error }) {
        this.totalAdgCempe = [];
        throw error;
      }
    },

    async a$totalKandang() {
      try {
        const { data } = await s$dashboard.totalKandang();
        this.totalKandang = data;
      } catch ({ error }) {
        this.totalKandang = [];
        throw error;
      }
    },

    async a$totalTernak() {
      try {
        const { data } = await s$dashboard.totalTernak();
        this.totalTernak = data;
      } catch ({ error }) {
        this.totalTernak = [];
        throw error;
      }
    },
  },

  getters: {
    g$totalByFase: (state) => state.totalByFase,
    g$totalByKandang: (state) => state.totalByKandang,
    g$totalByStatusKeluar: (state) => state.totalByStatusKeluar,
    g$totalKandang: (state) => state.totalKandang,
    g$totalTernak: (state) => state.totalTernak,
    g$totalByJenis: (state) => ({
      series: [
        {
          name: "Total",
          innerSize: "50%",
          data: [
            {
              y: state.totalByJenis.total_ternak_pejantan,
              name: "Pejantan",
              color: "#006329",
            },
            {
              y: state.totalByJenis.total_ternak_jantan,
              name: "Jantan",
              color: "#7EB918",
            },
            {
              y: state.totalByJenis.total_ternak_indukan,
              name: "Indukan",
              color: "#008BD0",
            },
            {
              y: state.totalByJenis.total_ternak_betina,
              name: "Betina",
              color: "#776EAD",
            },
            {
              y: state.totalByJenis.total_ternak_cempe_betina,
              name: "Cempe Betina",
              color: "#E40044",
            },
            {
              y: state.totalByJenis.total_ternak_cempe_jantan,
              name: "Cempe Jantan",
              color: "#F07C00",
            },
          ],
        },
      ],
      length: state.totalByJenis.length,
    }),
    g$totalAdgCempe: (state) => ({
      categories: [...state.categoriesAdgCempe],
      series: [
        {
          name: "Bobot",
          data: state.totalAdgCempe.map(({ average }) => average),
          color: "#006329",
        },
      ],
    }),
    g$totalPopulasi: (state) => ({
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      series: [
        {
          name: "Masuk",
          data: [
            ["Jan", 12],
            ["Feb", 14],
            ["Mar", 22],
            ["Apr", 15],
            ["Mei", 32],
          ],
          color: "#006329",
        },
        {
          name: "Mati",
          data: [
            ["Jan", 20],
            ["Feb", 33],
            ["Mar", 28],
            ["Apr", 40],
            ["Mei", 31],
          ],
        },
        {
          name: "Keluar",
          data: [
            ["Jan", 16],
            ["Feb", 26],
            ["Mar", 28],
            ["Apr", 43],
            ["Mei", 22],
          ],
        },
      ],
    }),
  },
});

export default u$dashboard;
