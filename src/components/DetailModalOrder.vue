<script setup>
import d from 'dayjs';
import dur from 'dayjs/plugin/duration';

d.extend(dur);
</script>
<template>
  <div v-if="detailDelivery.ticket && detailDelivery.plan">
    <p class="text-uppercase m-0 d-flex justify-content-between">
      <span>Tiket</span> <span>Tanggal Pengiriman</span>
    </p>
    <p class="font-weight-bold d-flex justify-content-between">
      <span>{{ detailDelivery.ticket.name || '&mdash;' }}</span>
      <span>{{ detailDelivery.plan.timestamp }}</span>
    </p>
    <hr class="my-2" />
  </div>
  <template v-if="detailDelivery.customer">
    <p class="text-uppercase m-0 d-flex justify-content-between">
      <span>Pelanggan</span> <span>Id Pelanggan</span>
    </p>
    <p class="font-weight-bold d-flex justify-content-between">
      <span>{{ detailDelivery.customer.name }}</span>
      {{ detailDelivery.customer.number }}
    </p>
    <hr class="my-2" />
  </template>
  <template v-if="detailDelivery.commodity && detailDelivery.plan">
    <p class="text-uppercase m-0 d-flex justify-content-between">
      <span>Tipe</span> <span>Total</span>
    </p>
    <p class="font-weight-bold d-flex justify-content-between">
      <span>{{ detailDelivery.commodity.name }}</span
      >{{ detailDelivery.plan.quantity }} {{ detailDelivery.commodity.unit }}
    </p>
    <hr class="my-2" />
  </template>
  <template v-if="detailDelivery.driver && detailDelivery.device">
    <p class="text-uppercase m-0 d-flex justify-content-between">
      <span>Pengemudi</span> <span>Truk</span>
    </p>
    <p class="font-weight-bold d-flex justify-content-between">
      <span>{{ detailDelivery.driver.name }}</span>
      {{ detailDelivery.device.truckNumber || '&mdash;' }}
    </p>
    <hr class="my-2" />
  </template>
  <template v-if="detailDelivery.result && detailDelivery.commodity">
    <p class="text-uppercase m-0">Total Pengiriman</p>
    <p class="font-weight-bold m-0 d-flex justify-content-between">
      Mulai
      <span
        >{{ detailDelivery.result.meter.start || '0' }}
        {{ detailDelivery.commodity.unit }}</span
      >
    </p>
    <p class="font-weight-bold m-0 d-flex justify-content-between">
      Selesai
      <span
        >{{ detailDelivery.result.meter.finish || '0' }}
        {{ detailDelivery.commodity.unit }}</span
      >
    </p>
    <p class="font-weight-bold m-0 d-flex justify-content-between text-primary">
      Total
      <span
        >{{ detailDelivery.result.quantity || '0' }}
        {{ detailDelivery.commodity.unit }}</span
      >
    </p>
    <hr class="my-2" />
  </template>
  <template v-if="detailDelivery.result">
    <p class="text-uppercase m-0">Waktu Pengiriman</p>
    <p class="font-weight-bold m-0 d-flex justify-content-between">
      Mulai <span>{{ detailDelivery.result.time.start || '&mdash;' }}</span>
    </p>
    <p class="font-weight-bold m-0 d-flex justify-content-between">
      Selesai <span>{{ detailDelivery.result.time.finish || '&mdash;' }}</span>
    </p>
    <p class="font-weight-bold m-0 d-flex justify-content-between text-primary">
      Durasi
      <span>{{
        d.duration(detailDelivery.result.duration * 1000).format('HH:mm:ss.SSS')
      }}</span>
    </p>
    <hr class="my-2" />
  </template>
  <template v-if="detailDelivery.status">
    <p class="text-uppercase m-0">Status Pengiriman</p>
    <p
      class="font-weight-bold"
      :class="[detailDelivery.status === 'Selesai' ? 'text-success' : 'text-danger']"
    >
      {{ detailDelivery.status }}
    </p>
  </template>
</template>

<script>
export default {
  name: 'DetailModalOrder',
  props: {
    detail: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    detailDelivery() {
      return this.detail;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.timeline-list,
.ordered-list {
  padding-left: 1.5rem;
  margin: 0;
}
</style>
