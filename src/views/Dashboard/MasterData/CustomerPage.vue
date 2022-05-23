<script>
import { mapActions, mapState } from 'pinia';
import d$customer from '@/stores/customer';

import {
  object as y$object,
  string as y$string,
  ref as y$ref,
} from 'yup';

export default {
  name: 'CustomerView',
  metaInfo: () => ({
    title: 'Pelanggan',
  }),
  setup() {
    const schema = y$object({
      username: y$string().required().label('Username'),
      password: y$string().label('Sandi').when('$pw', {
        is: true,
        then: y$string().required().min(8),
        otherwise: y$string().notRequired(),
      }),
      passwordConfirm: y$string().label('Konfirmasi sandi').when('$pw', {
        is: true,
        then: y$string().oneOf([y$ref('password')], 'Konfirmasi sandi tidak cocok!'),
        otherwise: y$string().notRequired(),
      }),
      name: y$string().required().label('Nama'),
      npwp: y$string().nullable().label('NPWP'),
      address: y$string().required().label('Alamat'),
      number: y$string().required().label('Nomor'),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: 'Pelanggan',
    // Input
    input: {
      id: null,
      username: '',
      password: '',
      passwordConfirm: '',
      name: '',
      number: 0,
      npwp: '',
      address: '',
      phone: '',
    },
    detail: {},
    // UI
    modal: {
      addCustomer: false,
      detailCustomer: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: 'name',
          th: 'Nama',
        },
        {
          name: 'street1',
          th: 'Alamat',
        },
      ],
      action: [
        {
          text: 'Edit',
          color: 'warning',
          event: 'edit-customer',
        },
        {
          text: 'Detail',
          color: 'info',
          event: 'detail-customer',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$customer, ['g$customerList', 'g$customerDetail']),
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
  },
  async mounted() {
    await this.a$customerList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$customer, [
      'a$customerAdd',
      'a$customerList',
      'a$customerDetail',
      'a$customerEdit',
    ]),
    clearInput() {
      this.input = {
        id: null,
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        number: 0,
        npwp: '',
        address: '',
        phone: '',
      };
      this.detail = {};
      this.a$customerDetail();
    },
    async addCustomer() {
      try {
        const {
          username,
          password,
          passwordConfirm,
          name,
          number,
          npwp,
          address,
        } = this.input;
        const data = {
          username,
          password,
          passwordConfirm,
          name,
          number,
          npwp,
          address,
        };
        await this.schema.validate(data, { context: { pw: true } });
        await this.a$customerAdd(data);
        this.modal.addCustomer = false;
        this.notify('Tambah Pelanggan Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$customerList();
      }
    },
    async editCustomer() {
      try {
        const {
          username,
          password,
          passwordConfirm,
          name,
          number,
          phone,
          npwp,
          address,
        } = this.input;
        const data = {
          username,
          password,
          passwordConfirm,
          name,
          number,
          npwp,
          phone,
          address,
        };
        await this.schema.validate(data, { context: { pw: !!password } });
        await this.a$customerEdit(data);
        this.modal.detailCustomer = false;
        this.notify('Edit Pelanggan Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$customerList();
      }
    },
    async triggerEditModal(row) {
      try {
        const {
          id,
          username,
          name,
          number,
          phone,
          NPWP,
          street1,
        } = row;
        this.input = {
          id,
          username,
          name,
          number,
          phone,
          npwp: NPWP ?? '',
          address: street1 ?? '',
        };
        this.modal.detailCustomer = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDetail({ id }) {
      try {
        this.$router.push({
          name: 'Detail',
          query: {
            id,
          },
        });
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
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.addCustomer = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$customerList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$customerList"
        :columns="dt.column"
        :actions="dt.action"
        @edit-customer="triggerEditModal"
        @detail-customer="triggerDetail"
      />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addCustomer" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addCustomer" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.name" type="text" name="name">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.username" type="text" name="username">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Username"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model.number="input.number" type="number" name="number">
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    type="number"
                    label="Nomor"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.npwp" type="text" name="npwp">
                  <base-input
                    v-bind="field"
                    placeholder="12345678"
                    label="NPWP"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.address" type="text" name="address">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Alamat"
                  ></base-input>
                </field-form>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.password" type="password" name="password">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Sandi"
                    password
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.passwordConfirm" type="password" name="passwordConfirm">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Konfirmasi Sandi"
                    password
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addCustomer = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addCustomer()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.detailCustomer" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.detailCustomer" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.name" type="text" name="name">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama"
                    disabled
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.username" type="text" name="username">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Username"
                    disabled
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model.number="input.number" type="number" name="number">
                  <base-input
                    v-bind="field"
                    placeholder="0"
                    type="number"
                    label="Nomor"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.npwp" type="text" name="npwp">
                  <base-input
                    v-bind="field"
                    placeholder="12345678"
                    label="NPWP"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.address" type="text" name="address">
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Alamat"
                  ></base-input>
                </field-form>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.password" type="password" name="password">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Sandi (Kosongkan jika tidak ingin mengubah)"
                    password
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" type="password" name="passwordConfirm">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Konfirmasi Sandi"
                    password
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.detailCustomer = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editCustomer()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
