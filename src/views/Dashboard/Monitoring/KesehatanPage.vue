<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$dropdown from "@/stores/dropdown";
import d$ternak from "@/stores/monitoring/ternak";
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
      ternak: null,
      penyakit: null,
      tanggal_sakit: "",
      kandang: null,
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
          name: "total",
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
    ...mapState(d$kesehatan, ["g$kesehatanList", "g$kesehatanDetail", "g$penyakitDetail"]),
    ...mapState(d$dropdown, ["g$ddListPenyakit", "g$ddKandang"]),
    ...mapState(d$ternak, ["g$ternakList"]),
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
    await this.a$kesehatanList().catch((error) => this.notify(error, false));
    await this.a$ddListPenyakit().catch((error) => this.notify(error, false));
    await this.a$ternakList().catch((error) => this.notify(error, false));
    await this.a$ddKandang().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$kesehatanDelete",
      "a$kesehatanEdit",
    ]),
    ...mapActions(d$dropdown, ["a$ddListPenyakit", "a$ddKandang"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    ...mapActions(d$ternak, ["a$ternakList"]),
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
        const { ternak, penyakit, tanggal_sakit, kandang } = this.input;
        const data = {
          id_ternak: ternak.id_ternak,
          id_penyakit: penyakit.id,
          tanggal_sakit,
          id_kandang: kandang.id_kandang,
        };
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
      <data-table v-else :index="true" :data="g$kesehatanList" :columns="dt.column" :actions="dt.action"
        @ubah-penyakit="triggerEditModal" @hapus-penyakit="triggerDelete" @detail-kesehatan="triggerDetail" />
    </template>
    <template #modal>
      <!-- Tambah ternak sakit -->
      <modal-comp v-model:show="modal.addTernakSakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTernakSakit" :validation-schema="schema">
            <div class="row">
              <!-- ID ternak -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Ternak" label="ID Ternak">
                  <multi-select v-model="input.ternak" :options="g$ternakList" label="id_ternak" track-by="id_ternak"
                    placeholder="Pilih ternak" :show-labels="false" />
                </base-input>
              </div>

              <!-- Penyakit -->
              <div class="col-12">
                <base-input name="penyakit" placeholder="Nama Penyakit" label="Nama Penyakit" required>
                  <multi-select v-model="input.penyakit" :options="g$ddListPenyakit" label="name" track-by="id"
                    placeholder="Pilih Penyakit" :show-labels="false" />
                </base-input>
              </div>

              <!-- Tanggal sakit -->
              <div class="col-12">
                <base-input name="tanggal_sakit" placeholder="Pilih tanggal" label="Tanggal Sakit" required>
                  <flat-pickr v-model.lazy="input.tanggal_sakit" :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker" placeholder="Pilih tanggal" />
                </base-input>
              </div>

              <!-- Kandang -->
              <div class="col-12">
                <base-input name="kandang" label="Kandang">
                  <multi-select v-model="input.kandang" :options="g$ddKandang" track-by="id" label="name"
                    placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addTernakSakit">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
