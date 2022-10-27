<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import basicOptions from "./config";

export default {
  name: "HcAreaspline",
  props: {
    categories: {
      type: Array,
      default: () => [{}],
    },
    series: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Boolean,
      default: false,
    },
    colorBySeries: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 400,
    },
    zones: {
      type: Array,
      default: undefined,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: "areaspline",
          height: this.height,
        },
        ...basicOptions,
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.1,
          },
        },
        xAxis: {
          categories: this.categories,
          crosshair: true,
        },
        series: this.series,
      };
    },
  },
};
</script>
