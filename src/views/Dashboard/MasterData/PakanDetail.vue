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
    modal: {},
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
          th: "Fase Pemeliharaan",
        },
        {
          name: "berat_berkala",
          th: "Berat Ternak",
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
  }),
  computed: {
    ...mapState(d$ternak, ["g$detailPakan"]),
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
    ...mapActions(d$ternak, ["a$pakanDetail"]),
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
      <empty-result v-if="!g$detailPakan.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$detailPakan" :columns="dt.column" :actions="dt.action" />
    </template>
  </main-layout>
</template>
