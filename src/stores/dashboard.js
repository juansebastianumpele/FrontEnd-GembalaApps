import { defineStore } from "pinia";
import * as s$dashboard from "@/services/monitoring/dashboard";

const u$dashboard = defineStore({
  id: "dashboard",
  state: () => ({
    totalByStatus: [],
    totalByFase: [],
    totalByKandang: [],
    totalByStatusKeluar: [],
    totalAdgCempe: [],
    totalKandang: [],
    totalTernak: [],
  }),

  actions: {
    async a$totalByStatus() {
      try {
        const { data } = await s$dashboard.totalTernakByStatus();
        this.totalByStatus = data;
      } catch ({ error }) {
        this.totalByStatus = [];
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
        this.totalAdgCempe = data;
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
    g$totalByStatus: (state) => ({
      series: [
        {
          name: "Total",
          innerSize: "50%",
          data: [
            {
              y: state.totalByStatus.total_ternak_pejantan,
              name: "Total Pejantan",
              color: "#006329",
            },
            {
              y: state.totalByStatus.total_ternak_jantan,
              name: "Total Jantan",
              color: "#7EB918",
            },
            {
              y: state.totalByStatus.total_ternak_indukan,
              name: "Total Indukan",
              color: "#008BD0",
            },
            {
              y: state.totalByStatus.total_ternak_betina,
              name: "Total Betina",
              color: "#776EAD",
            },
            {
              y: state.totalByStatus.total_ternak_cempe_betina,
              name: "Total Cempe Betina",
              color: "#E40044",
            },
            {
              y: state.totalByStatus.total_ternak_cempe_jantan,
              name: "Total Cempe Jantan",
              color: "#F07C00",
            },
          ],
        },
      ],
      length: state.totalByStatus.length,
    }),
    g$totalAdgCempe: (state) => ({
      series: [
        {
          name: "Bobot",
          data: [1, 2, 3, 4, 5],
        },
      ],
    }),
  },
});

export default u$dashboard;
