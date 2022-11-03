<script>
import { mapActions, mapState } from "pinia";
import d$pemeliharaan from "@/stores/lembarkerja/pemeliharaan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Pemeliharaan",
  }),
  data: () => ({
    pageTitle: "Lembar Kerja Pemeliharaan",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_pemeliharaan",
          th: "Tanggal",
          render: ({ tanggal_pemeliharaan }) =>
            ubahTanggal(tanggal_pemeliharaan),
        },
        {
          name: "kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "jenis_pakan",
          th: "Jenis Pakan",
        },
        {
          name: "jumlah_pakan",
          th: "Jumlah Pakan",
        },
        {
          name: "pembersihan_kandang",
          th: "Pembersihan Kandang",
          render: ({ pembersihan_kandang }) =>
            pembersihan_kandang
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          name: "pembersihan_ternak",
          th: "Pembersihan Ternak",
          render: ({ pembersihan_ternak }) =>
            pembersihan_ternak
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$pemeliharaan, ["g$pemeliharaan", "g$pemeliharaanAll"]),
  },

  async mounted() {
    await this.a$pemeliharaanList().catch((error) => this.notify(error, false));
    await this.a$pemeliharaanListAll().catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$pemeliharaan, [
      "a$pemeliharaanList",
      "a$pemeliharaanListAll",
    ]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <base-button type="success1" class="btn-lg">
              <router-link to="pemeliharaan" class="text-white">
                Fase Pemeliharaan
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="pemeliharaan/langkah-kerja" class="text-dark">
                Langkah Kerja
              </router-link>
            </base-button>
          </span>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pemeliharaanAll.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$pemeliharaanAll"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
