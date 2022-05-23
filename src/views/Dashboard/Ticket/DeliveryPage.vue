<script>
import { mapActions, mapState } from 'pinia';
import d$ticket from '@/stores/ticket';
import d$dropdown from '@/stores/dropdown';

import DetailModalOrder from '@/components/DetailModalOrder.vue';

import d from 'dayjs';

export default {
  metaInfo: () => ({
    title: 'Riwayat Pengiriman',
  }),
  components: {
    DetailModalOrder,
  },
  data: () => ({
    pageTitle: 'Riwayat Pengiriman',
    // Data
    detail: {},
    evidence: {},
    // Filter
    filter: {
      dateRange: '',
      device: null,
      status: null,
    },
    // UI
    modal: {
      detailDelivery: false,
      proofDelivery: false,
    },
    toggle: {
      filter: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: 'status',
          th: 'Status',
          render(row) {
            return `<span class="${
              // eslint-disable-next-line no-nested-ternary
              row.status === 'Siap Dikirim'
                ? 'text-warning'
                // eslint-disable-next-line no-nested-ternary
                : row.status === 'Sedang Dikirim'
                  ? 'text-info'
                  : row.status === 'Selesai'
                    ? 'text-success'
                    : 'text-danger'
            }">${row.status}</span>`;
          },
        },
        {
          name: 'date',
          th: 'Tanggal Pengiriman',
          render(row) {
            return row.plan.timestamp;
          },
        },
        {
          name: 'ticket',
          th: 'Tiket',
          render(row) {
            return row.ticket.name;
          },
        },
        {
          name: 'customer',
          th: 'Pelanggan',
          render(row) {
            return `[${row.customer.number}] ${row.customer.name}`;
          },
        },
        {
          name: 'driver',
          th: 'Pengemudi',
          render(row) {
            return row.driver.name;
          },
        },
        {
          name: 'device',
          th: 'Truk',
          render(row) {
            return row.device.truckNumber;
          },
        },
        {
          name: 'commodity',
          th: 'Komoditas',
          render(row) {
            return row.commodity.name;
          },
        },
        {
          name: 'plan',
          th: 'Total',
          render(row) {
            return row.plan.quantity;
          },
        },
        {
          name: 'unit',
          th: 'Unit Satuan',
          render(row) {
            return row.commodity.unit;
          },
        },
        {
          name: 'timestamp',
          th: 'Dibuat Pada',
        },
      ],
      action: [
        {
          text: 'Detail',
          color: 'info',
          event: 'detail-delivery',
        },
        {
          text: 'Dokumentasi',
          color: 'info',
          event: 'proof-delivery',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$ticket, ['g$deliveredList', 'g$deliveryDetail']),
    ...mapState(d$dropdown, [
      'g$ddTank',
      'g$ddStatusTrue',
      'g$ddTruck',
    ]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      }
    },
    // eslint-disable-next-line func-names
    'toggle.filter': async function (val) {
      if (!val) {
        this.clearFilter();
        await this.a$deliveredList({ status: true }).catch((error) => this.notify(error, false));
      }
    },
    // Filters
    filter: {
      deep: true,
      async handler(val) {
        let startDate = null;
        let endDate = null;
        if (val.dateRange && val.dateRange.length > 10) {
          startDate = val.dateRange.substring(0, 10);
          endDate = val.dateRange.substring(14, 25);
        } else if (val.dateRange && val.dateRange.length === 10) {
          startDate = val.dateRange.substring(0, 10);
          endDate = val.dateRange.substring(0, 10);
        }
        const date = val.dateRange
          ? {
            startDate,
            endDate,
          }
          : null;
        const statusTicket = val.status
          ? {
            statusTicket: val.status.id,
          }
          : null;
        const device = val.device
          ? {
            device: {
              id: val.device.id,
            },
          }
          : null;
        const data = {
          status: true,
          ...date,
          ...statusTicket,
          ...device,
        };
        await this.a$deliveredList(data).catch((error) => this.notify(error, false));
      },
    },
  },
  async mounted() {
    await this.a$deliveredList({ status: true }).catch((error) => this.notify(error, false));
    await this.a$ddTruck().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ticket, [
      'a$deliveredList',
      'a$deliveryDetail',
    ]),
    ...mapActions(d$dropdown, [
      'a$ddTruck',
    ]),
    clearInput() {
      this.detail = {};
      this.a$deliveryDetail();
    },
    clearFilter() {
      this.filter = {
        dateRange: '',
        status: null,
        device: null,
      };
      this.a$deliveredList({ status: true });
    },
    async triggerDetailModal({ ticket }) {
      try {
        await this.a$deliveryDetail({ ticket });
        this.detail = {
          ...this.g$deliveryDetail,
          center: {
            lat: this.g$deliveryDetail.result.location.latitude,
            lng: this.g$deliveryDetail.result.location.longitude,
          },
        };
        this.modal.detailDelivery = true;
      } catch (error) {
        this.detail = {};
        this.notify(error, false);
      }
    },
    async triggerProofModal({ ticket }) {
      try {
        await this.a$deliveryDetail({ ticket });
        const { result, plan } = this.g$deliveryDetail;
        this.evidence = {
          ...result?.evidence,
          time: d(plan?.timestamp).format('YYYYMMDD-HHmmss') || '',
        } ?? { start: null, finish: null };
        this.modal.proofDelivery = true;
      } catch (error) {
        this.evidence = {};
        this.notify(error, false);
      }
    },
    async downloadItem({ url, label }) {
      try {
        const image = await fetch(url);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = label;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        this.notify(error, false);
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <base-button type="info" outline @click="clearFilter()">
            <i class="fas fa-arrows-rotate"></i>
          </base-button>
        </div>
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" @click="toggle.filter = !toggle.filter">
            {{ toggle.filter ? 'Sembunyikan Filter' : 'Tampilkan Filter' }}
          </base-button>
        </div>
      </div>
      <div v-if="toggle.filter" class="row border-top mt-4">
        <div class="col">
          <base-input
            name="date"
            class="my-4"
            placeholder="YYYY-MM-DD"
            label="Tanggal"
          >
            <flat-pickr
              v-model.lazy="filter.dateRange"
              :config="{ mode: 'range', allowInput: true }"
              class="form-control datepicker"
              placeholder="YYYY-MM-DD"
            />
          </base-input>
        </div>
        <div class="col">
          <base-input
            name="truck"
            class="my-4"
            placeholder="Truk"
            label="Truk"
          >
            <multi-select
              v-model="filter.device"
              :options="g$ddTruck"
              label="name"
              track-by="id"
              placeholder="Pilih Truk"
              :show-labels="false"
            />
          </base-input>
        </div>
        <div class="col">
          <base-input
            name="status"
            class="my-4"
            placeholder="Status"
            label="Status"
          >
            <multi-select
              v-model="filter.status"
              :options="g$ddStatusTrue"
              label="name"
              track-by="id"
              placeholder="Pilih Status"
              :show-labels="false"
            />
          </base-input>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$deliveredList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$deliveredList"
        :columns="dt.column"
        :actions="dt.action"
        @detail-delivery="triggerDetailModal"
        @proof-delivery="triggerProofModal"
      />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.detailDelivery" modal-classes="modal-xl">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="modal.detailDelivery" class="row">
            <div class="col-12 col-lg-6">
              <base-map :center="detail.center" :zoom="18" />
            </div>
            <div class="col-12 col-lg-6">
              <detail-modal-order :detail="detail" />
            </div>
          </div>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.proofDelivery" modal-classes="modal-xl">
        <template #header>
          <h3 class="modal-title">Bukti {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div v-if="modal.proofDelivery" class="row">
            <div class="col-12 col-lg-6" style="min-height:450px">
              <p class="text-center">Mulai</p>
              <template v-if="evidence.start">
                <img :src="evidence.start" class="w-100" alt="" srcset="">
                <p class="text-center"><a :href="evidence.start" @click.prevent="downloadItem({ url: evidence.start, label: `${evidence.time}-mulai`})">Unduh Gambar</a></p>
              </template>
              <template v-else>
                <p class="text-center text-danger display-1"><i class="fa-regular fa-image"></i></p>
                <p class="text-center text-danger display-4">Tidak Ada Dokumentasi.</p>
              </template>
            </div>
            <div class="col-12 col-lg-6" style="min-height:450px">
              <p class="text-center">Selesai</p>
              <template v-if="evidence.finish">
                <img :src="evidence.finish" class="w-100" alt="" srcset="">
                <p class="text-center"><a :href="evidence.finish" @click.prevent="downloadItem({ url: evidence.finish, label: `${evidence.time}-selesai`})">Unduh Gambar</a></p>
              </template>
              <template v-else>
                <p class="text-center text-danger display-1"><i class="fa-regular fa-image"></i></p>
                <p class="text-center text-danger display-4">Tidak Ada Dokumentasi.</p>
              </template>
            </div>
          </div>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
