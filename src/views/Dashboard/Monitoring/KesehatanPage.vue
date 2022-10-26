<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Kesehatan",
  }),
  setup() {
    const schema = y$object({
      id_ternak: y$string().required().label("ID Ternak"),
      nama_penyakit: y$string().required().label("Nama Penyakit"),
      tgl_skit: y$string().required().label("Tanggal Sakit"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Ternak Sakit",
    // Input
    input: {
      id: null,
      id_ternak: "",
      nama_penyakit: "",
      tgl_sakit: "",
      listPenyakit: "",
    },
    // UI
    modal: {
      addTernakSakit: false,
      editTernakSakit: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "Jumlah",
          th: "Jumlah Ternak Sakit",
        },
      ],
      action: [
        {
          text: "Lihat Ternak Sakit",
          color: "info",
          event: "detail-kesehatan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$kesehatanList", "g$penyakitDetail"]),
    ...mapState(d$dropdown, ["g$ddListPenyakit"]),
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
    await this.a$kesehatanList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
    await this.a$ddListPenyakit().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$kesehatanDelete",
      "a$kesehatanEdit",
    ]),
    ...mapActions(d$dropdown, ["a$ddListPenyakit"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        const { id_penyakit } = row;
        router.push({
          name: "Detail Ternak Sakit",
          params: {
            id: id_penyakit,
          },
        });
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },

    async addTernakSakit() {
      try {
        const { id_ternak, nama_penyakit, tgl_sakit } = this.input;
        const data = {
          id_ternak,
          nama_penyakit,
          tgl_sakit,
        };
        await this.schema.validate(data);
        await this.a$kesehatanAdd(data);
        this.modal.addTernakSakit = false;
        this.notify(`Tambah ${this.pageTitle} berhasil`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kesehatanList();
      }
    },
    async editTernakSakit() {
      try {
        const { id, id_ternak, nama_penyakit, tgl_sakit } = this.input;
        const data = {
          id,
          id_ternak,
          nama_penyakit,
          tgl_sakit,
        };
        await this.schema.validate(data);
        await this.a$kesehatanEdit(data);
        this.modal.editTernakSakit = false;
        this.notify(`Ubah ${this.pageTitle} berhasil`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kesehatanList();
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <nav class="nav nav-pills flex-column flex-sm-row mb-4">
        <li>
          <base-button type="secondary" class="btn-lg">
            <router-link to="../data-penyakit" class="text-dark">
              Data Penyakit
            </router-link>
          </base-button>
        </li>
        <li>
          <base-button type="success1" class="btn-lg ml-3">
            <router-link to="data-kesehatan" class="text-white">
              Data Ternak Sakit
            </router-link>
          </base-button>
        </li>
      </nav>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.addTernakSakit = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kesehatanList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kesehatanList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-penyakit="triggerEditModal"
        @hapus-penyakit="triggerDelete"
        @detail-kesehatan="triggerDetail"
      />
    </template>
    <template #modal>
      <modal-comp v-model:show="modal.addTernakSakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTernakSakit" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.penyakit"
                  type="text"
                  name="nama_penyakit"
                >
                  <base-input
                    v-bind="field"
                    placeholder="ID Ternak"
                    label="ID Ternak"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input
                  name="listPenyakit"
                  placeholder="Nama Penyakit"
                  label="Nama Penyakit"
                  required
                >
                  <multi-select
                    v-model="input.listPenyakit"
                    :options="g$ddListPenyakit"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Penyakit"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-12">
                <base-input
                  name="tanggal_lahir"
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Sakit"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_lahir"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addPenyakit()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahPenyakit" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahPenyakit" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.penyakit"
                  type="text"
                  name="nama_penyakit"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Nama Penyakit"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.deskripsi"
                  type="text"
                  name="deskripsi"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Deskripsi"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.ciri_penyakit"
                  type="text"
                  name="ciri_penyakit"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Ciri-ciri"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.pengobatan"
                  type="text"
                  name="pengobatan"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Pengobatan"
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editPenyakit()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.penyakit }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delPenyakit()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
