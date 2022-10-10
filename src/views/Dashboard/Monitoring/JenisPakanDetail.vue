<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Detail Data Pakan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Detail Data Pakan",
    // Input
    input: {
      tanggal: "",
      keterangan: "",
      jumlah: "",
      satuanPakan: "",
    },
    // UI
    modal: {
      detailTernak: false,
      addDetailPakan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "",
          th: "Tanggal",
        },
        {
          name: "",
          th: "Keterangan",
        },
        {
          name: "",
          th: "Jumlah",
        },
        {
          name: "",
          th: "Stok",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak",
        },
      ],
    },
    infoTernak: {},
  }),
  computed: {
    ...mapState(d$ternak, ["g$detailPakan", "g$ternakList"]),
    ...mapState(d$dropdown, ["g$ddKeteranganDetailPakan", "g$ddSatuanPakan"]),
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
    await this.a$pakanDetail(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$ternak, ["a$pakanDetail", "a$ternakList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        this.infoTernak = { ...row };
        this.modal.detailTernak = true;
      } catch (error) {}
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

        <!-- Tambah detail pakan -->
        <div class="col text-right">
          <base-button type="success" @click="modal.addDetailPakan = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$detailPakan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$detailPakan"
        :columns="dt.column"
        :actions="dt.action"
        @detail-ternak="triggerDetail"
      />
    </template>

    <!-- Modal Detail Ternak -->
    <template #modal>
      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">
            Detail Ternak Nomor {{ infoTernak.id_ternak }}
          </h3>
        </template>
        <template v-if="modal.detailTernak" #body>
          <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Ternak</span>
              </div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.id_ternak }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID RFID</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.rf_id  }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Varietas</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.nama_varietas }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Kelamin</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.jenis_kelamin[0] }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Dam (Ibu)</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300"> {{ infoTernak.id_induk }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Sire (Bapak)</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.id_pejantan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Kandang</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.nama_kandang }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Fase Pemeliharaan</span>
              </div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.fase }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Pakan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.nama_pakan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Berat</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.berat_berkala }} kg</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Suhu</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.suhu_berkala }}&deg;C</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status Kesehatan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.status_kesehatan[0] }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Nama Penyakit</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.penyakit }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Tanggal Masuk</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.tanggal_masuk }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Umur</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.umur }} Bulan</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Tanggal Keluar</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.tanggal_keluar  }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status Keluar</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.status_keluar  }}</span
                >
              </div>
            </div>
          </div>
        </template>
        <template #footer> </template>
      </modal-comp>

      <!-- Tambah detail pakan -->
      <modal-comp v-model:show="modal.addDetailPakan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addDetailPakan" :validation-schema="schema">
            <div class="row">
              <!-- Tanggal -->
              <div class="col-12">
                <base-input
                  name="tanggal"
                  class=""
                  placeholder="YYYY-MM-DD"
                  label="Tanggal"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal"
                  />
                </base-input>
              </div>

              <!-- Keterangan -->
              <div class="col-12">
                <base-input
                  name="keterangan"
                  placeholder="Pakan masuk atau keluar?"
                  label="Keterangan"
                >
                  <multi-select
                    v-model="input.keterangan"
                    :options="g$ddKeteranganDetailPakan"
                    placeholder="Pakan masuk atau keluar?"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- Jumlah -->
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.jumlah"
                  type="text"
                  name="stok"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Stok"
                  ></base-input>
                </field-form>
              </div>

              <!-- Satuan pakan -->
              <div class="col-6">
                <base-input
                  name="satuan_pakan"
                  placeholder="Satuan Pakan"
                  label="Satuan Pakan"
                >
                  <multi-select
                    v-model="input.satuanPakan"
                    :options="g$ddSatuanPakan"
                    placeholder="Pilih Satuan Pakan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addDetailPakan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addDetailPakan()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
