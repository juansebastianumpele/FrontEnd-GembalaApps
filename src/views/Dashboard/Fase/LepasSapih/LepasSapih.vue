<script>
import { mapActions, mapState } from "pinia";
import d$lepasSapih from "@/stores/fase/lepasSapih";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Lepas Sapih",
  }),
  data: () => ({
    pageTitle: "Fase Lepas Sapih",
    input: {
      id_ternak: null,
      tanggal_lahir: null,
      jenis_kelamin: null,
      tanggal_masuk: null,
      id_dam: null,
      id_sire: null,
      kandang: null,
      bangsa: null,
    },
    //UI
    modal: {
      createKelahiran: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Cempe",
        },
        {
          th: "Tanggal Lepas Sapih",
          render: ({ tanggal_lepas_sapih }) => ubahTanggal(tanggal_lepas_sapih),
        },
        {
          name: "kode_kandang",
          th: "Kode Kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$lepasSapih, ["g$lepasSapih"]),
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
    await this.a$lepasSapihList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$lepasSapih, ["a$lepasSapihList"]),
    clearInput() {
      this.input = {
        id_ternak: null,
        tanggal_lahir: null,
        jenis_kelamin: null,
        tanggal_masuk: null,
        id_dam: null,
        id_sire: null,
        kandang: null,
        bangsa: null,
      };
    },
    async createKelahiran() {
      try {
        const {
          id_ternak,
          tanggal_lahir,
          jenis_kelamin,
          tanggal_masuk,
          id_dam,
          id_sire,
          kandang,
          bangsa,
        } = this.input;
        const data = {
          id_ternak: id_ternak.id_ternak,
          tanggal_masuk,
          tanggal_lahir,
          id_sire: id_sire.id_ternak,
          id_dam: id_dam.id_ternak,
          jenis_kelamin,
          id_bangsa: bangsa.id,
          id_kandang: kandang.id,
        };
        await this.a$kelahiranCreate(data);
        this.notify("Data berhasil ditambahkan", true);
        this.modal.createKelahiran = false;
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$lepasSapihList();
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <router-link to="../lepas-sapih">
              <base-button type="secondary" class="btn-lg text-dark">
                Summary
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="data-lepas-sapih">
              <base-button type="success1" class="btn-lg text-white">
                {{ pageTitle }}
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja">
              <base-button type="secondary" class="btn-lg text-dark">
                Langkah Kerja
              </base-button>
            </router-link>
          </span>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.createKelahiran = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body
      >x
      <empty-result v-if="!g$lepasSapih.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$lepasSapih"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
