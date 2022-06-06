<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";

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
          name: "nomor",
          th: "Nomor Ternak",
        },
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak-sakit",
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
    // async triggerDetail(row) {
    //   try {
    //     const { id_kandang } = row;
    //     router.push({
    //       name: "Detail Kandang",
    //       params: {
    //         id: id_kandang,
    //       },
    //     });
    //   } catch (error) {
    //     this.clearInput();
    //     this.notify(error, false);
    //   }
    // },
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
