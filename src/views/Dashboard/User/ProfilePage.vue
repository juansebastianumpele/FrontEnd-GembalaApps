<script>
import { mapActions, mapState } from 'pinia';
import d$user from '@/stores/user';

import {
  object as y$object,
  string as y$string,
  ref as y$ref,
} from 'yup';

export default {
  metaInfo: () => ({
    title: 'Profil Pengguna',
  }),
  setup() {
    const schema = y$object({
      username: y$string().required().label('Username'),
      password: y$object({
        old: y$string().required().label('Sandi lama'),
        new: y$string().label('Sandi baru').when('$pw', {
          is: true,
          then: y$string().required().min(8),
          otherwise: y$string().notRequired(),
        }),
        newConfirm: y$string().label('Konfirmasi sandi baru').when('$pw', {
          is: true,
          then: y$string().oneOf([y$ref('new')], 'Konfirmasi sandi baru tidak cocok!'),
          otherwise: y$string().notRequired(),
        }),
      }),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: 'Profil',
    // Input
    input: {
      username: '',
      password: {
        old: '',
        password: '',
        passwordConfirm: '',
      },
    },
    // UI
    modal: {
      changePw: false,
    },
  }),
  computed: {
    ...mapState(d$user, ['g$userDetail']),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      } else {
        this.input.username = this.g$userDetail.username;
      }
    },
  },
  async mounted() {
    await this.a$userDetail().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$user, [
      'a$userDetail',
      'a$userChangePw',
    ]),
    async clearInput() {
      this.input = {
        username: '',
        password: {
          old: '',
          new: '',
          newConfirm: '',
        },
      };
    },
    async editPassword() {
      try {
        const {
          username,
          password,
        } = this.input;
        const data = {
          username,
          password,
        };
        await this.schema.validate(data, { context: { pw: !!password } });
        await this.a$userChangePw(data);
        this.modal.changePw = false;
        this.notify('Edit Sandi Sukses!');
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$customerList();
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle">
    <template #header>
      <div class="row align-items-center">
        <div class="col">
          <h3>{{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" :disabled="!g$userDetail.username" @click="modal.changePw = true">
            Ganti Sandi
          </base-button>
        </div>
      </div>
    </template>
    <template #body>
      <form-comp :validation-schema="schema">
        <div class="row">
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.name" type="text" name="name">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Nama"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.username" type="text" name="username">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Username"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model.number="g$userDetail.number" type="number" name="number">
              <base-input
                v-bind="field"
                placeholder="0"
                type="number"
                label="Nomor"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.NPWP" type="text" name="npwp">
              <base-input
                v-bind="field"
                placeholder="12345678"
                label="NPWP"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-3">
            <field-form v-slot="{ field }" v-model="g$userDetail.street1" type="text" name="street1">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Dukuh"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-3">
            <field-form v-slot="{ field }" v-model="g$userDetail.street2" type="text" name="street2">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Desa"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-3">
            <field-form v-slot="{ field }" v-model="g$userDetail.street3" type="text" name="street3">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Kecamatan"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-3">
            <field-form v-slot="{ field }" v-model="g$userDetail.city" type="text" name="city">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Kota"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.postCode" type="text" name="postCode">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Kode Pos"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.country" type="text" name="country">
              <base-input
                v-bind="field"
                placeholder="Text"
                label="Negara"
                disabled
              ></base-input>
            </field-form>
          </div>
        </div>
      </form-comp>
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.changePw" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ganti Sandi</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.changePw" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.password.old" type="password.old" name="password.old">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Sandi Lama"
                    password
                  ></base-input>
                </field-form>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.password.new" type="password.new" name="password.new">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Sandi Baru"
                    password
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.password.newConfirm" type="password.newConfirm" name="password.newConfirm">
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Text"
                    label="Konfirmasi Sandi Baru"
                    password
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.changePw = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editPassword()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
