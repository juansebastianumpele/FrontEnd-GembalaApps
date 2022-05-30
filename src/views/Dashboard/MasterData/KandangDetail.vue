<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Detail Data Kandang",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Detail Data Kandang",
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
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-penghuni-kandang",
        },
      ],
    },
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
    await this.a$kandangDetail(this.$route.params.id).catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, ["a$kandangDetail"]),
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
      <empty-result v-if="!g$detailKandang.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$detailKandang" :columns="dt.column" :actions="dt.action" />
    </template>
  </main-layout>
</template>
