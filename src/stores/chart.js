import { defineStore } from "pinia";
import * as s$total from "@/services/monitoring/ternak";
import * as s$daftarkandang from "@/services/monitoring/daftarkandang";

const u$total = defineStore({
  id: "chart",
  state: () => ({
    chartByPopulasi: [],
    chartKesehatan: [],
    chartJantan: [],
    chartBetina: [],
    ChartbyTimbangan: [],
    chartFase: [],
    kandang: [],
  }),
  actions: {
    async a$byKesehatan() {
      try {
        const { data } = await s$total.totalSehat();
        this.chartKesehatan = data;
      } catch ({ error }) {
        this.chartKesehatan = [];
        throw error;
      }
    },

    async a$byJantan() {
      try {
        const { data } = await s$total.listPejantan();
        this.chartJantan = data.total;
      } catch ({ error }) {
        this.chartJantan = [];
        throw error;
      }
    },

    async a$byBetina() {
      try {
        const { data } = await s$total.listBetina();
        this.chartBetina = data.total;
      } catch ({ error }) {
        this.chartBetina = [];
        throw error;
      }
    },

    async a$byFase() {
      try {
        const { data } = await s$total.listFase();
        this.chartFase = data.list;
      } catch ({ error }) {
        this.chartFase = [];
        throw error;
      }
    },
    async a$tabelKandang() {
      try {
        const { data } = await s$daftarkandang.listKandang();
        this.kandang = data.list;
      } catch ({ error }) {
        this.kandang = [];
        throw error;
      }
    },
    async a$tabelFilter(req) {
      try {
        const { data } = await s$total.filterTernak(req);
        this.filterResult = data;
      } catch ({ error }) {
        this.filterResult = [];
        throw error;
      }
    },
    async a$byPopulasi(req) {
      try {
        const { data } = await s$total.populasi(req);
        this.chartByPopulasi = data.list.tanggal;
        console.log(this.chartByPopulasi);
      } catch ({ error }) {
        this.chartByPopulasi = [];
        throw error;
      }
    },
    async a$byTimbangan(req) {
      try {
        const { data } = await s$total.listTimbangan(req);
        this.ChartbyTimbangan = data.list;
      } catch ({ error }) {
        this.ChartbyTimbangan = [];
        throw error;
      }
    },
    async a$chartDetail(request) {
      try {
        const { data } = await s$total.detail(request);
        this.detail = { ...data[0] };
      } catch ({ error }) {
        this.detail = {};
        throw error;
      }
    },
    async a$chartAdd(request) {
      try {
        await s$total.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$chartEdit(request) {
      try {
        await s$total.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$byPopulasi: (state) => ({
      categories: state.chartByPopulasi.map(({ bulan }) => bulan),
      series: [
        {
          name: "Total",
          data: state.chartByPopulasi.map(({ total }) => total),
        },
      ],
      length: state.chartByPopulasi.length,
    }),
    g$byJeniskelamin: (state) => ({
      categories: ["Jantan", "Betina"],
      series: [
        {
          name: "Jenis Kelamin",
          data: [state.chartJantan, state.chartBetina],
        },
      ],
    }),
    g$byKesehatan: (state) => ({
      series: [
        {
          name: "Total",
          data: [
            {
              y: state.chartKesehatan.sehat,
              name: "Sehat",
            },
            { y: state.chartKesehatan.sakit, name: "Sakit" },
          ],
        },
      ],
      length: state.chartKesehatan.length,
    }),
    g$byFase: (state) => ({
      categories: state.chartFase.map(({ fase }) => fase),
      series: [
        {
          name: "Fase",
          data: state.chartFase.map(({ populasi }) => populasi),
        },
      ],
      length: state.chartFase.length,
    }),
    g$byTimbangan: (state) => ({
      categories: state.ChartbyTimbangan.map(
        ({ tanggal_timbang }) => tanggal_timbang.split("T")[0]
      ),
      series: [
        {
          name: "Bobot",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: state.ChartbyTimbangan.map(({ berat }) => berat),
        },
        {
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          name: "Suhu",
          data: state.ChartbyTimbangan.map(({ suhu }) => suhu),
        },
      ],
      length: state.ChartbyTimbangan.length,
    }),
    g$DonutbyFase: (state) => ({
      categories: state.chartFase.map(({ fase }) => fase),
      title: {
        text: "Fase",
        align: "center",
      },
      series: [
        {
          name: "Total",
          size: "80%",
          innerSize: "60%",
          data: state.chartFase.map(({ fase, berat_rata }) => ({
            name: fase,
            y: berat_rata,
          })),
        },
      ],
      length: state.chartFase.length,
    }),
    g$tabelKandang: (state) => state.kandang,
    g$tabelFilter: (state) => state.filterResult,
  },
});

export default u$total;
