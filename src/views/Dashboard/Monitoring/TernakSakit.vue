<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/monitoring/kesehatan";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Kesehatan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Ternak Sakit",
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
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "Jumlah",
          th: "Jumlah Ternak Sakit",
        },
      ],
      action: [
        {
          text: "Lihat Ternak Sakit",
          color: "warning",
          event: "detail-kesehatan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$kesehatanList", "g$penyakitDetail"]),
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
    await this.a$kesehatanList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$kesehatanDelete",
      "a$kesehatanEdit",
    ]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        const { id_penyakit } = row;
        router.push({
          name: "Detail Ternak Sakit",
          params: {
            id: id_penyakit,
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
      <nav class="nav nav-pills flex-column flex-sm-row mb-4">
        <li>
          <router-link
            class="flex-sm-fill text-sm-center nav-link"
            to="../data-penyakit"
          >
            Data Penyakit
          </router-link>
        </li>
        <li>
          <router-link
            class="flex-sm-fill text-sm-center nav-link active ml-3"
            to="data-kesehatan"
          >
            Data Ternak Sakit
          </router-link>
        </li>
      </nav>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.addPenyakit = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kesehatanList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kesehatanList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-penyakit="triggerEditModal"
        @hapus-penyakit="triggerDelete"
        @detail-kesehatan="triggerDetail"
      />
    </template>
  </main-layout>
</template>
