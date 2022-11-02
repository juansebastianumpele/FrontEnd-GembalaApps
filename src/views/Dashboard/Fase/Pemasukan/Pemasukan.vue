<script>
import { mapActions, mapState } from "pinia";
import d$pemasukan from "@/stores/fase/pemasukan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
  }),
  data: () => ({
    pageTitle: "Fase Pemasukan",
    //UI
    modal: {
      detailPemasukan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "createdAt",
          th: "Tanggal",
          render: ({ createdAt }) => ubahTanggal(createdAt),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "cek_poel",
          th: "Poel",
        },
        {
          name: "cek_mulut",
          th: "Mulut",
        },
        {
          name: "cek_telinga",
          th: "Telinga",
        },
        {
          name: "cek_kuku_kaki",
          th: "Kuku Kaki",
        },
        {
          name: "cek_kondisi_fisik_lain",
          th: "Kondisi Fisik",
        },
        {
          name: "cek_bcs",
          th: "BCS",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-pemasukan",
        },
      ],
    },
    infoPemasukan: {},
  }),
  computed: {
    ...mapState(d$pemasukan, ["g$pemasukan"]),
  },

  async mounted() {
    await this.a$pemasukanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pemasukan, ["a$pemasukanList"]),
    async triggerDetail(row) {
      try {
        this.infoPemasukan = { ...row };
        this.modal.detailPemasukan = true;
      } catch (error) {
      } finally {
        this.a$pemasukanList().catch((error) => this.notify(error, false));
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div>
        <nav class="nav nav-pills flex-column flex-sm-row mb-4">
          <li>
            <base-button type="secondary" class="btn-lg">
              <router-link to="../pemasukan" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </li>
          <li>
            <base-button type="success1" class="ml-3 btn-lg">
              <router-link to="data-pemasukan" class="text-white">
                Fase Pemasukan
              </router-link>
            </base-button>
          </li>
          <li>
            <base-button type="secondary" class="ml-3 btn-lg">
              <router-link to="langkah-kerja" class="text-dark">
                Langkah Kerja
              </router-link>
            </base-button>
          </li>
        </nav>
      </div>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pemasukan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$pemasukan"
        :columns="dt.column"
        :actions="dt.action"
        @detail-pemasukan="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- detail pemasukan -->
      <modal-comp v-model:show="modal.detailPemasukan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">
            Detail {{ pageTitle }} Nomor {{ infoPemasukan.id_ternak }}
          </h3>
        </template>

        <template v-if="modal.detailPemasukan" #body>
          <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Ternak</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.id_ternak }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Bangsa</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.bangsa.bangsa }}</span
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
                  {{ infoPemasukan.jenis_kelamin }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Poel</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_poel }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600"> Cek Mulut</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_mulut }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Telinga</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_telinga }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Kuku Kaki</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_kuku_kaki }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek Kondisi Fisik Lain</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_kondisi_fisik_lain }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Cek BCS</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.cek_bcs }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.status_ternak.status_ternak }}</span
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
                  {{ infoPemasukan.status_kesehatan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Kode Kandang</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ infoPemasukan.kandang.kode_kandang }}</span
                >
              </div>
            </div>
          </div>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
