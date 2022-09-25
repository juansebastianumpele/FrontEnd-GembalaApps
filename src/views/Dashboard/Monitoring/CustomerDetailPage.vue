<script>
import { mapActions, mapState } from 'pinia';
import d$tank from '@/stores/tank';
import d$dropdown from '@/stores/dropdown';

import {
  object as y$object,
  string as y$string,
  number as y$number,
} from 'yup';

export default {
  name: 'CustomerTankView',
  metaInfo: () => ({
    title: 'Tangki Pelanggan',
  }),
  setup() {
    const schema = y$object({
      customer: y$object({
        id: y$number().required().label('Pelanggan'),
      }),
      commodityId: y$number().required().label('Komoditas'),
      name: y$string().required().label('Nama Tangki'),
      quantity: y$number().required().label('Total'),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: 'Tangki Pelanggan',
    // Input
    input: {
      id: null,
      customer: null,
      commodity: null,
      name: '',
      quantity: 0,
    },
    detail: {},
    // UI
    modal: {
      addTank: false,
      detailTank: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: 'name',
          th: 'Nama',
        },
        {
          name: 'commodity',
          th: 'Komoditas',
          render(row) {
            return row.commodity.name;
          },
        },
        {
          name: 'quantity',
          th: 'Total',
        },
        {
          name: 'unit',
          th: 'Unit Satuan',
          render(row) {
            return row.unit.name;
          },
        },
      ],
      action: [
        {
          text: 'Detail',
          color: 'info',
          event: 'detail-tank',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$tank, ['g$tankList', 'g$tankDetail']),
    ...mapState(d$dropdown, ['g$ddCommodity', 'g$ddTank']),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      } else if (val) {
        this.input.customer = {
          id: parseInt(this.$route.query.id, 10),
        };
      }
    },
  },
  async mounted() {
    await this.a$tankList(this.$route.query.id).catch((error) => this.notify(error, false));
    await this.a$ddCommodity().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$tank, [
      'a$tankList',
      'a$tankAdd',
      'a$tankEdit',
    ]),
    ...mapActions(d$dropdown, [
      'a$ddCommodity',
    ]),
    back() {
      this.$router.push({
        name: 'Customer',
      });
    },
    clearInput() {
      this.input = {
        id: null,
        customer: null,
        commodity: null,
        name: '',
        quantity: 0,
      };
      this.detail = {};
    },
    async addTank() {
      try {
        const {
          customer,
          name,
          commodity,
          quantity,
        } = this.input;
        const data = {
          customer: {
            id: customer.id,
          },
          name,
          commodityId: commodity.id,
          quantity,
        };
        await this.schema.validate(data, { context: { edit: false } });
        await this.a$tankAdd(data);
        this.modal.addTank = false;
        this.notify('Tambah Tangki Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$tankList(this.$route.query.id);
      }
    },
    async editTank() {
      try {
        const {
          id,
          customer,
          name,
          commodity,
          quantity,
        } = this.input;
        const data = {
          id,
          customer: {
            id: customer.id,
          },
          name,
          commodityId: commodity.id,
          quantity,
        };
        await this.schema.validate(data, { context: { edit: true } });
        await this.a$tankEdit(data);
        this.modal.detailTank = false;
        this.notify('Edit Tangki Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$tankList(this.$route.query.id);
      }
    },
    async triggerDetailModal(row) {
      try {
        const {
          id,
          name,
          customer,
          commodity,
          quantity,
        } = row;
        this.input = {
          id,
          name,
          customer: {
            id: customer.id,
          },
          commodity,
          quantity,
        };
        this.modal.detailTank = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    // update Location
    updateLocation({ lat, lng }) {
      this.input.location = {
        lat,
        lng,
      };
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <base-button type="secondary" @click="back">
            <i class="fas fa-arrow-left"></i>
          </base-button>
        </div>
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.addTank = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$tankList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$tankList"
        :columns="dt.column"
        :actions="dt.action"
        @detail-tank="triggerDetailModal"
      />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addTank" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTank" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.name" type="text" name="name">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama Tangki"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="commodity" placeholder="Komoditas" label="Komoditas">
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
              <div class="col-12">
                <field-form v-slot="{ field }" v-model.number="input.quantity" type="number" name="quantity">
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    label="Total"
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addTank = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addTank()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.detailTank" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">{{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.detailTank" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.name" type="text" name="name">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama Tangki"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="commodity" placeholder="Komoditas" label="Komoditas">
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
              <div class="col-12">
                <field-form v-slot="{ field }" v-model.number="input.quantity" type="number" name="quantity">
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    label="Total"
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.detailTank = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editTank()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
