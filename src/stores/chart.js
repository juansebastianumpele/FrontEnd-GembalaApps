import { defineStore } from "pinia";
// import * as s$chart from "@/services/chart";

const u$chart = defineStore({
  id: "chart",
  state: () => ({
    chartByMonth: [
      {
        bulan: "Jan",
        betina: 34,
        jantan: 12,
        berat: 2,
      },
      {
        bulan: "Feb",
        betina: 12,
        jantan: 3,
        berat: 1,
      },
      {
        bulan: "Mar",
        betina: 34,
        jantan: 12,
        berat: 2,
      },
      {
        bulan: "Apr",
        betina: 0,
        jantan: 0,
        berat: 0,
      },
    ],
  }),
  actions: {
    async a$chartList() {
      try {
        const { data } = await s$chart.list();
        this.chart = data;
      } catch ({ error }) {
        this.chart = [];
        throw error;
      }
    },
    async a$chartDetail(request) {
      try {
        const { data } = await s$chart.detail(request);
        this.detail = { ...data[0] };
      } catch ({ error }) {
        this.detail = {};
        throw error;
      }
    },
    async a$chartAdd(request) {
      try {
        await s$chart.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$chartEdit(request) {
      try {
        await s$chart.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$byGenderChart: (state) => ({
      categories: state.chartByMonth.map(({ bulan }) => bulan),
      series: [
        {
          name: "Total",
          data: state.chartByMonth.map(({ betina, jantan }) => betina + jantan),
        },
        {
          type: "line",
          name: "Jantan",
          data: state.chartByMonth.map(({ jantan }) => jantan),
        },
        {
          type: "line",
          name: "Betina",
          data: state.chartByMonth.map(({ betina }) => betina),
        },
      ],
      length: state.chartByMonth.length,
    }),
    g$byWeightChart: (state) => ({
      categories: state.chartByMonth.map(({ bulan }) => bulan),
      series: [
        {
          name: "Berat",
          data: state.chartByMonth.map(({ berat }) => berat),
        },
      ],
      length: state.chartByMonth.length,
    }),
  },
});

export default u$chart;
