<template>
  <highcharts :options="options"></highcharts>
</template>

<script>
import basicOptions from './config';

export default {
  name: 'HcPie',
  props: {
    data: {
      type: Object,
      default: () => ({
        series: [],
        categories: [],
      }),
    },
    color: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 400,
    },
    dataLabels: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    float: {
      type: Boolean,
      default: false,
    },
    grouping: {
      type: Boolean,
      default: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array,
      default: () => basicOptions.colors,
    },
    colorBySeries: {
      type: Boolean,
      default: false,
    },
    yAxis: {
      type: Object,
      default: () => {},
    },
    zones: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'pie',
        },
        ...basicOptions,
        title: {
          text: this.title,
          floating: this.floating,
        },
        subtitle: {
          text: this.subtitle,
        },
        colors: this.colors,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f}%',
              style: {
                color: 'black',
              },
            },
          },
        },
        series: this.data.series,
      };
    },
  },
};
</script>
