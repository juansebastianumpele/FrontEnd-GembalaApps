import { defineStore } from "pinia";
import * as s$total from "@/services/masterData/ternak";

const u$total = defineStore({
  id: "chart",
  state: () => ({
    chartByPopulasi: [],
    chartKesehatan: [],
    chartJeniskelamin: [],
    chartFase: [],
  }),
  actions: {
    async a$byKesehatan(req) {
      console.log(req);
      try {
        const { data } = await s$total.totalSehat(req);
        this.chartKesehatan = data;
      } catch ({ error }) {
        this.chartKesehatan = [];
        throw error;
      }
    },
    async a$byJeniskelamin(req) {
      console.log(req);
      try {
        const { data } = await s$total.totalJeniskelamin (req);
        this.chartJeniskelamin = data;
      } catch ({ error }) {
        this.chartJeniskelamin = [];
        throw error;
      }
    },
    async a$byFase(req) {
      console.log(req);
      try {
        const { data } = await s$total.totalFase (req);
        this.chartFase = data;
      } catch ({ error }) {
        this.chartFase = [];
        throw error;
      }
    },
    async a$byPopulasi(req) {
      console.log(req);
      try {
        const { data } = await s$total.populasi (req);
        this.chartByPopulasi = data;
      } catch ({ error }) {
        this.chartByPopulasi = [];
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
    // g$byWeightChart: (state) => ({
    //   categories: state.chartByMonth.map(({ bulan }) => bulan),
    //   series: [
    //     {
    //       name: "Berat",
    //       data: state.chartByMonth.map(({ berat }) => berat),
    //     },
    //   ],
    //   length: state.chartByMonth.length,
    // }),
    g$byJeniskelamin: (state) => ({
      categories: state.chartJeniskelamin.map(({ jenis_kelamin }) => jenis_kelamin),
      series: [
        {
          name: "Jenis Kelamin",
          data: state.chartJeniskelamin.map(({ Jumlah_ternak }) => Jumlah_ternak),
        },
      ],
      length: state.chartJeniskelamin.length,
    }),
    g$byKesehatan: (state) => ({
      categories: state.chartKesehatan.map(({ status_sehat }) => status_sehat),
      series: [
        {
          name: "Total",
          data: state.chartKesehatan.map(({ status_sehat, Jumlah }) => ({
            name: status_sehat[0],
            y: Jumlah,
          })),
        },
      ],
      length: state.chartKesehatan.length,
    }),
    g$byFase: (state) => ({
      categories: state.chartFase.map(({fase }) => fase),
      series: [
        {
          name: "Fase",
          data: state.chartFase.map(({ Jumlah_ternak }) => Jumlah_ternak),
        },
      ],
      length: state.chartFase.length,
    }),
  },
});

export default u$total;
