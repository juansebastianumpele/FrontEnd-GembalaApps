<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";

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
          name: "nomor",
          th: "Nomor Ternak",
        },
        {
          name: "nama_varietas",
          th: "Varietas",
        },
        {
          name: "fase",
          th: "Status Ternak",
        },
        {
          name: "berat_berkala",
          th: "Berat Ternak (kg)",
        },
        {
          name: "nama_kandang",
          th: "Kandang",
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
    await this.a$pakanDetail(this.$route.params.id).catch((error) => this.notify(error, false));
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
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$detailPakan.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$detailPakan" :columns="dt.column" :actions="dt.action" @detail-ternak="triggerDetail" />
    </template>

    <!-- Modal Detail Ternak -->
    <template #modal>
      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Detail Ternak Nomor {{ infoTernak.nomor }}</h3>
        </template>
        <template v-if="modal.detailTernak" #body>
          <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Nomor Ternak</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.nomor }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">ID RFID</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.rf_id ?? "-" }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Varietas</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.nama_varietas }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Jenis Kelamin</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.jenis_kelamin[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">ID Induk</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.id_induk }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">ID Pemancek</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.id_pejantan }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Kandang</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.nama_kandang }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Fase Pemeliharaan</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.fase }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Jenis Pakan</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.nama_pakan }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Berat</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.berat_berkala }} kg</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Suhu</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.suhu_berkala }}&deg;C</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Status Kesehatan</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.status_sehat[0] }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Nama Penyakit</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.nama_penyakit }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Tanggal Masuk</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.tanggal_masuk }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Umur</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.umur }} Bulan</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Tanggal Keluar</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.tanggal_keluar ?? "-" }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5"><span style="font-weight: 600">Status Keluar</span></div>
              <div class="col">
                : <span style="font-weight: 300"> {{ infoTernak.status_keluar ?? "-" }}</span>
              </div>
            </div>
          </div>
        </template>
        <template #footer> </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
