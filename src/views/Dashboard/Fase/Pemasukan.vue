<script>
import { mapActions, mapState } from "pinia";
import d$pemasukan from "@/stores/fase/pemasukan";

export default {
  metaInfo: () => ({
    title: "Data Penyakit",
  }),
  data: () => ({
    pageTitle: "Fase Pemasukan",
    // DataTable
    dt: {
      column: [
        {
          name: "created_at",
          th: "Tanggal",
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "id_bangsa",
          th: "Bangsa",
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          name: "id_kandang",
          th: "Kode Kandang",
        },
      ],
      action: [
        {
          name: "detail",
          color: "btn btn-primary",
          text: "Detail",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$pemasukan, ["g$pemasukan"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  async mounted() {
    await this.a$pemasukanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pemasukan, ["a$pemasukanList"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div>
        <nav class="nav nav-pills flex-column flex-sm-row mb-4">
          <li>
            <base-button type="success1" class="btn-lg">
              <router-link to="/fase/pemasukan" class="text-white">
                Fase Pemasukan
              </router-link>
            </base-button>
          </li>
          <li>
            <base-button type="secondary" class="ml-3 btn-lg">
              <router-link to="pemasukan/langkah-kerja" class="text-dark">
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
      />
    </template>
  </main-layout>
</template>
