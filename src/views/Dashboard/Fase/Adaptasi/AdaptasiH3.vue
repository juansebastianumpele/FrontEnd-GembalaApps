<script>
import { mapActions, mapState } from "pinia";
import d$adaptasi from "@/stores/fase/adaptasi";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Adaptasi",
  }),
  data: () => ({
    pageTitle: "Fase Adaptasi",
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal",
          render: ({ tanggal_adaptasi }) => ubahTanggal(tanggal_adaptasi),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          th: "Pengecekan Kondisi",
          render: ({ treatments }) =>
            Object.values(treatments)[0]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Obat Cacing",
          render: ({ treatments }) =>
            Object.values(treatments)[1]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Pakan Rumput + Konsentrat",
          render: ({ treatments }) =>
            Object.values(treatments)[2]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$adaptasi, ["g$adaptasiHariKe3"]),
  },

  async mounted() {
    await this.a$adaptasiHariKe3().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$adaptasi, ["a$adaptasiHariKe3"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="../adaptasi" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-lg">
              <router-link to="data-adaptasi" class="text-white">
                {{ pageTitle }}
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="langkah-kerja" class="text-dark">
                Langkah Kerja
              </router-link>
            </base-button>
          </span>
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col-auto">
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi" class="text-dark">
                Hari ke-1
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-2" class="text-dark">
                Hari ke-2
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-sm">
              <router-link to="data-adaptasi-3" class="text-white">
                Hari ke-3
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-4" class="text-dark">
                Hari ke-4
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-5" class="text-dark">
                Hari ke-5
              </router-link>
            </base-button>
          </span>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$adaptasiHariKe3.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$adaptasiHariKe3"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
