<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Populasi Kandang",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Populasi Kandang",
    // Input
    input: {
      id: null,
    },
    // UI
    modal: {
      detailTernak: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "Nomor Ternak",
        },
        {
          name: "varietas",
          th: "Bangsa",
          render: ({ varietas }) => varietas.varietas,
        },
        {
          name: "fase",
          th: "Fase Pemeliharaan",
          render: ({ fase }) => fase.fase,
        },
        {
          name: "kebutuhan_pakan",
          th: "Kebutuhan Pakan",
          render: ({ kebutuhan_pakan }) => kebutuhan_pakan + " KG",
        },
        {
          name: "berat",
          th: "Berat Ternak",
          render: ({ berat }) => berat + " KG",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-penghuni-kandang",
        },
      ],
    },
    infoTernak: {},
  }),
  computed: {
    ...mapState(d$ternak, ["g$detailKandang"]),
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
    await this.a$kandangDetail(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$ternak, ["a$kandangDetail"]),
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
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$detailKandang.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$detailKandang"
        :columns="dt.column"
        :actions="dt.action"
        @detail-penghuni-kandang="triggerDetail"
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
                <span style="font-weight: 600">Nomor Ternak</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.id_ternak }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID RFID</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.rf_id ?? "-" }}</span
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
                  {{ infoTernak.varietas.varietas }}</span
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
                  {{ infoTernak.jenis_kelamin }}</span
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
                  {{ infoTernak.kandang.kode_kandang }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Fase Pemeliharaan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.fase.fase }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Pakan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.pakan.nama_pakan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Berat</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300"> {{ infoTernak.berat }} kg</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Suhu</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoTernak.suhu }}&deg;C</span
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
                  {{ infoTernak.status_kesehatan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Nama Penyakit</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300"> {{ infoTernak.penyakit }}</span>
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
                  {{ Math.round(infoTernak.umur / 30) }} Bulan</span
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
                  {{ infoTernak.tanggal_keluar ?? "-" }}</span
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
                  {{ infoTernak.status_keluar ?? "-" }}</span
                >
              </div>
            </div>
          </div>
        </template>
        <template #footer> </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
