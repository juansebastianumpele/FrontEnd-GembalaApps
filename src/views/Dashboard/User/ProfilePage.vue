<script>
import { mapActions, mapState } from "pinia";
import d$user from "@/stores/user";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Profil Pengguna",
  }),
  setup() {
    const schema = y$object({
      password: y$string().min(5).required().label("Sandi lama"),
      new_password: y$string().min(5).required().label("Sandi Baru"),
      repeat_password: y$string()
        .oneOf([y$ref("new_password")], "Sandi Baru Tidak Cocok")
        .required()
        .label("Konfirmasi Sandi Baru"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Profil",
    // Input
    input: {
      password: "",
      new_password: "",
      repeat_password: "",
      nama_pengguna: "",
      email: "",
      nomor_telepon: "",
      alamat: "",
      nama_peterpan: "",
    },
    // UI
    modal: {
      changePw: false,
      editProfile: false,
    },
  }),
  computed: {
    ...mapState(d$user, ["g$userDetail"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      } else {
        this.input.nama_pengguna = this.g$userDetail.nama_pengguna;
      }
    },
  },
  async mounted() {
    await this.a$userDetail().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$user, ["a$userChangePw"]),
    async clearInput() {
      this.input = {
        password: "",
        new_password: "",
        repeat_password: "",
      };
    },
    async editPassword() {
      try {
        const { password, new_password } = this.input;
        const data = {
          password,
          new_password,
        };
        // await this.schema.validate(data);
        console.log(data);
        await this.a$userChangePw(data);
        this.modal.changePw = false;
        this.notify("Edit Sandi Sukses!");
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
      <div class="text-center">
        <img
          :src="siteMeta.profile"
          alt="profile"
          class="rounded-circle"
          style="width: 200px; height: 200px"
        />
      </div>
      <div class="row align-items-center">
        <div class="col">
          <h3>{{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.editProfile = true">
            Edit Profile
          </base-button>
          <base-button type="warning" @click="modal.changePw = true">
            Ganti Sandi
          </base-button>
        </div>
      </div>
    </template>
    <template #body>
      <form-comp :validation-schema="schema">
        <div class="row">
          <div class="col-6">
            <field-form
              v-slot="{ field }"
              v-model="g$userDetail.nama_pengguna"
              type="text"
              name="nama_pengguna"
            >
              <base-input
                v-bind="field"
                placeholder="Nama Pengguna"
                label="Nama Penguna"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form
              v-slot="{ field }"
              v-model.number="g$userDetail.email"
              type="email"
              name="email"
            >
              <base-input
                v-bind="field"
                placeholder="Email"
                type="email"
                label="Email"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form
              v-slot="{ field }"
              v-model="g$userDetail.nomor_telepon"
              type="number"
              name="nomor_telepon"
            >
              <base-input
                v-bind="field"
                placeholder="Nomor Telepon"
                label="Nomor Telepon"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form
              v-slot="{ field }"
              v-model="g$userDetail.alamat"
              type="text"
              name="alamat"
            >
              <base-input
                v-bind="field"
                placeholder="Alamat"
                label="Alamat"
                disabled
              ></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form
              v-slot="{ field }"
              v-model="g$userDetail.nama_peternakan"
              type="text"
              name="nama_peternakan"
            >
              <base-input
                v-bind="field"
                placeholder="Nama Peternakan"
                label="Nama Peternakan"
                disabled
              ></base-input>
            </field-form>
          </div>
        </div>
      </form-comp>
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.editProfile" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Edit Profile</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.editProfile" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_lengkap"
                  type="text"
                  name="nama_lengkap"
                >
                  <base-input
                    v-bind="field"
                    type="text"
                    placeholder="Nama Lengkap"
                    label="Nama Lengkap"
                    addon-left-icon="fas fa-user"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.username"
                  type="text"
                  name="username"
                >
                  <base-input
                    v-bind="field"
                    type="text"
                    placeholder="Username"
                    label="Username"
                    addon-left-icon="fas fa-user"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.email"
                  type="email"
                  name="email"
                >
                  <base-input
                    v-bind="field"
                    type="email"
                    placeholder="Email"
                    label="Email"
                    addon-left-icon="fas fa-envelope"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.no_hp"
                  type="text"
                  name="no_hp"
                >
                  <base-input
                    v-bind="field"
                    type="text"
                    placeholder="No. HP"
                    label="No. HP"
                    addon-left-icon="fas fa-phone"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.alamat"
                  type="text"
                  name="alamat"
                >
                  <base-input
                    v-bind="field"
                    type="text"
                    placeholder="Alamat"
                    label="Alamat"
                    addon-left-icon="fas fa-location-arrow"
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
      <modal-comp v-model:show="modal.changePw" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ganti Sandi</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.changePw" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.password"
                  type="password"
                  name="password"
                >
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Sandi Lama"
                    label="Sandi Lama"
                    password
                  ></base-input>
                </field-form>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.new_password"
                  type="new_password"
                  name="new_password"
                >
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Sandi Baru"
                    label="Sandi Baru"
                    password
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.repeat_password"
                  type="repeat_password"
                  name="repeat_password"
                >
                  <base-input
                    v-bind="field"
                    type="password"
                    placeholder="Konfirmasi Sandi Baru"
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
