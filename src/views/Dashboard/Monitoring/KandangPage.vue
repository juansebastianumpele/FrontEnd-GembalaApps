<script>
import { mapActions, mapState } from "pinia";
import d$kandang from "@/stores/monitoring/kandang";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Kandang",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Kandang",
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
          name: "nama_kandang",
          th: "Nama Kandang",
        },
        {
          name: "blok_kandang",
          th: "Blok Kandang",
        },
        {
          name: "populasi",
          th: "Jumlah Populasi Ternak",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kandang, ["g$kandangList", "g$kandangDetail"]),
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
    await this.a$listKandang(this.userInfo.id).catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kandang, ["a$listKandang", "a$kandangAdd", "a$kandangDelete", "a$kandangEdit"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        const { id_kandang } = row;
        router.push({
          name: "Detail Kandang",
          params: {
            id: id_kandang,
          },
        });
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
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
      <empty-result v-if="!g$kandangList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kandangList" :columns="dt.column" :actions="dt.action" @ubah-kandang="triggerEditModal" @hapus-kandang="triggerDelete" @detail-kandang="triggerDetail" />
    </template>
  </main-layout>
</template>
