<script>
import { mapActions, mapState } from "pinia";
import d$kawin from "@/stores/monitoring/kawin";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Domba Betina",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Domba Betina",
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
          th: "Status Ternak",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "list-kawin",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kawin, ["g$kawinList"]),
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
    await this.a$betinaList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$kawin, ["a$betinaList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        const { id_ternak } = row;
        router.push({
          name: "Detail Kawin",
          params: {
            id: id_ternak,
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
      <empty-result v-if="!g$kawinList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kawinList"
        :columns="dt.column"
        :actions="dt.action"
        @list-kawin="triggerDetail"
      />
    </template>
  </main-layout>
</template>
