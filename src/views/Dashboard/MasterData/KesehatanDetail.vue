<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/masterData/kesehatan";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Detail Data Kesehatan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Detail Data Kesehatan",
    // Input
    input: {
      id: null,
    },
    // UI
    modal: {},
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "tgl_sakit",
          th: "Tanggal Sakit",
        },
        {
          name: "tgl_sembuh",
          th: "Tanggal Sembuh",
        },
        // {
        //   name: "berat_berkala",
        //   th: "Berat Ternak",
        // },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-terna",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$detailKesehatan"]),
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
    await this.a$penyakitDetail(this.$route.params.id).catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, ["a$penyakitDetail"]),
    clearInput() {
      this.input = {
        id: null,
      };
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
      <empty-result v-if="!g$detailKesehatan.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$detailKesehatan" :columns="dt.column" :actions="dt.action" />
    </template>
  </main-layout>
</template>
