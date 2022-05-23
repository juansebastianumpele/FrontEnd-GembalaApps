<script>
import { mapActions, mapState } from 'pinia';
import d$ticket from '@/stores/ticket';
import d$dropdown from '@/stores/dropdown';

import {
  object as y$object,
  string as y$string,
  number as y$number,
  date as y$date,
} from 'yup';

export default {
  metaInfo: () => ({
    title: 'Pengiriman Terjadwal',
  }),
  setup() {
    const schema = y$object({
      date: y$date().required().label('Tanggal'),
      driver: y$object({
        id: y$string().required().label('Id Pengemudi'),
        username: y$string().required().label('Nama Pengemudi'),
      })
        .required()
        .label('Pengemudi'),
      commodity: y$object({
        id: y$string().required().label('Id Komoditas'),
      })
        .required()
        .label('Komoditas'),
      tank: y$object({
        id: y$string().required().label('Id Tangki'),
      })
        .required()
        .label('Tanki'),
      quantity: y$number().required().label('Total'),
    });

    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: 'Pengiriman',
    // Input
    input: {
      id: null,
      date: '',
      customer: null,
      driver: null,
      tank: null,
      commodity: null,
      quantity: 0,
      flowmeter: {
        id: null,
      },
    },
    detail: {},
    // Filter
    filter: {
      dateRange: '',
      device: null,
      status: null,
    },
    // UI
    modal: {
      addOrder: false,
      detailOrder: false,
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
          text: 'Edit',
          color: 'warning',
          event: 'detail-delivery',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$ticket, ['g$orderList', 'g$deliveryDetail']),
    ...mapState(d$dropdown, [
      'g$ddDriver',
      'g$ddCustomer',
      'g$ddCommodity',
      'g$ddTank',
      'g$ddStatusFalse',
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
        await this.a$orderList({ status: false }).catch((error) => this.notify(error, false));
      }
    },
    // eslint-disable-next-line func-names
    'input.customer': async function (newValue, oldValue) {
      if (oldValue && newValue?.id !== oldValue?.id) {
        this.input.tank = null;
        this.input.commodity = null;
      } else if (newValue === null) {
        this.input.tank = null;
        this.input.commodity = null;
      }
      const { id } = newValue || { id: '' };
      await this.a$ddCommodity(id).catch((error) => this.notify(error, false));
    },
    'input.commodity': {
      async handler(newValue, oldValue) {
        if (oldValue && newValue?.id !== oldValue?.id) {
          this.input.tank = null;
        } else if (newValue === null) {
          this.input.tank = null;
        }
        const data = {
          customerId: this.input.customer?.id,
          commodityId: newValue?.id ?? null,
        };
        const req = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&') || '';
        await this.a$ddTank(data.commodityId ? req : '').catch((error) => this.notify(error, false));
      },
      deep: true,
    },
    // eslint-disable-next-line func-names
    'input.tank': async function (val) {
      if (val) {
        if (this.modal.addOrder) {
          this.input.quantity = val?.quantity ?? 0;
        } else {
          this.input.quantity = val?.quantity ?? 0;
        }
      } else {
        this.input.quantity = 0;
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
          status: false,
          ...date,
          ...statusTicket,
          ...device,
        };
        await this.a$orderList(data).catch((error) => this.notify(error, false));
      },
    },
  },
  async mounted() {
    await this.a$orderList({ status: false }).catch((error) => this.notify(error, false));
    await this.a$ddDriver().catch((error) => this.notify(error, false));
    await this.a$ddCustomer().catch((error) => this.notify(error, false));
    await this.a$ddTruck().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ticket, [
      'a$orderList',
      'a$deliveryDetail',
      'a$orderAdd',
      'a$orderEdit',
    ]),
    ...mapActions(d$dropdown, [
      'a$ddCustomer',
      'a$ddDriver',
      'a$ddTank',
      'a$ddTruck',
      'a$ddCommodity',
    ]),
    clearInput() {
      this.input = {
        id: null,
        date: '',
        customer: null,
        driver: null,
        tank: null,
        commodity: null,
        quantity: 0,
        flowmeter: {
          id: null,
        },
      };
      this.detail = {};
      this.a$ddCommodity();
      this.a$ddTank();
    },
    clearFilter() {
      this.filter = {
        dateRange: '',
        status: null,
        device: null,
      };
      this.a$orderList({ status: false });
    },
    async addOrder() {
      try {
        const {
          date,
          driver,
          tank,
          commodity,
          quantity,
          flowmeter,
        } = this.input;
        const data = {
          date,
          driver,
          tank,
          commodity,
          quantity,
          flowmeter,
        };
        await this.schema.validate(data, { context: { edit: false } });
        await this.a$orderAdd(data);
        this.modal.addOrder = false;
        this.notify('Tambah Order Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$orderList({ status: false });
      }
    },
    async editOrder() {
      try {
        const {
          id,
          name,
          date,
          driver,
          tank,
          commodity,
          quantity,
          flowmeter,
        } = this.input;
        const data = {
          id,
          name,
          date,
          driver,
          tank,
          commodity,
          quantity,
          flowmeter: {
            id: flowmeter.id,
          },
        };
        await this.schema.validate(data, { context: { edit: true } });
        await this.a$orderEdit(data);
        this.modal.detailOrder = false;
        this.notify('Edit Order Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$orderList({ status: false });
      }
    },
    async triggerDetailModal({ ticket }) {
      try {
        await this.a$deliveryDetail({ ticket });
        const {
          ticket: { id, name },
          plan,
          driver,
          tank,
          device,
          customer,
          commodity,
          status,
        } = this.g$deliveryDetail;
        this.input = {
          id,
          name,
          date: plan.timestamp,
          driver: {
            id: driver.id,
            username: driver.name,
          },
          tank,
          customer: {
            id: customer.id,
            name: customer.name,
          },
          commodity: {
            id: commodity.id,
            name: commodity.name,
            needs: plan.quantity,
          },
          quantity: plan.quantity,
          flowmeter: device,
          status,
        };
        this.modal.detailOrder = true;
      } catch (error) {
        this.clearInput();
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
          <base-button type="success" @click="modal.addOrder = true">
            Tambah {{ pageTitle }}
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
          <base-input name="truck" class="my-4" placeholder="Truk" label="Truk">
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
              :options="g$ddStatusFalse"
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
      <empty-result v-if="!g$orderList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$orderList"
        :columns="dt.column"
        :actions="dt.action"
        @detail-delivery="triggerDetailModal"
      />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addOrder" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addOrder" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.date" name="date">
                  <base-input
                    v-bind="field"
                    placeholder="YYYY-MM-DD"
                    label="Tanggal"
                  >
                    <flat-pickr
                      v-model="input.date"
                      :config="{ mode: 'single', allowInput: true, minDate: 'today'  }"
                      class="form-control datepicker"
                      placeholder="YYYY-MM-DD"
                    />
                  </base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input
                  name="driver"
                  placeholder="Pengemudi"
                  label="Pengemudi"
                >
                  <multi-select
                    v-model="input.driver"
                    :options="g$ddDriver"
                    label="username"
                    track-by="id"
                    placeholder="Pilih Pengemudi"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="customer"
                  placeholder="Pelanggan"
                  label="Pelanggan"
                >
                  <multi-select
                    v-model="input.customer"
                    :options="g$ddCustomer"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Pelanggan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="commodity"
                  placeholder="Komoditas"
                  label="Komoditas"
                >
                  <multi-select
                    v-model="input.commodity"
                    :options="g$ddCommodity"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Komoditas"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="tank" placeholder="Tanki" label="Tanki">
                  <multi-select
                    v-model="input.tank"
                    :options="g$ddTank"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Tanki"
                    :multiple="false"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model.number="input.quantity"
                  type="number"
                  name="quantity"
                >
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    type="number"
                    label="Total"
                    disabled
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addOrder = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addOrder()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.detailOrder" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp  v-if="modal.detailOrder" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.date" name="date">
                  <base-input
                    v-bind="field"
                    placeholder="YYYY-MM-DD"
                    label="Date"
                  >
                    <flat-pickr
                      v-model="input.date"
                      :config="{ mode: 'single', allowInput: true }"
                      class="form-control datepicker"
                      placeholder="YYYY-MM-DD"
                    />
                  </base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input
                  name="driver"
                  placeholder="Pengemudi"
                  label="Pengemudi"
                >
                  <multi-select
                    v-model="input.driver"
                    :options="g$ddDriver"
                    label="username"
                    track-by="id"
                    placeholder="Pilih Pengemudi"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="customer"
                  placeholder="Pelanggan"
                  label="Pelanggan"
                >
                  <multi-select
                    v-model="input.customer"
                    :options="g$ddCustomer"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Pelanggan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="commodity"
                  placeholder="Komoditas"
                  label="Komoditas"
                >
                  <multi-select
                    v-model="input.commodity"
                    :options="g$ddCommodity"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Komoditas"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="tank" placeholder="Tanki" label="Tanki">
                  <multi-select
                    v-model="input.tank"
                    :options="g$ddTank"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Tanki"
                    :multiple="false"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.quantity"
                  type="number"
                  name="quantity"
                >
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    label="Total Pengiriman"
                    disabled
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template v-if="input.status !== 'Sedang Dikirim'" #footer>
          <base-button type="secondary" @click="modal.detailOrder = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editOrder()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
