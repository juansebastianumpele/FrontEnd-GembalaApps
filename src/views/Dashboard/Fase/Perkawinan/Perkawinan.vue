<script>
import { mapActions, mapState } from "pinia";
import d$perkawinan from "@/stores/fase/perkawinan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Fase Perkawinan",
  }),
  data: () => ({
    pageTitle: "Fase Perkawinan",
    input: {
      id_indukan: "",
      id_pejantan: "",
    },
    //UI
    modal: {
      createPerkawinan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal ",
          render: ({ tanggal_perkawinan }) => ubahTanggal(tanggal_perkawinan),
        },
        {
          name: "id_indukan",
          th: "ID Indukan",
        },
        {
          name: "id_pejantan",
          th: "ID Pejantan",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "status",
          th: "Status Indukan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$perkawinan, [
      "g$listPerkawinan",
      "g$listIndukan",
      "g$listPejantan",
    ]),
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
    await this.a$perkawinanList().catch((error) => this.notify(error, false));
    this.a$listIndukan();
    this.a$listPejantan();
  },
  methods: {
    ...mapActions(d$perkawinan, [
      "a$perkawinanList",
      "a$listIndukan",
      "a$listPejantan",
      "a$createPerkawinan",
    ]),
    clearInput() {
      this.input = {
        id_indukan: "",
        id_pejantan: "",
      };
    },
    async createPerkawinan() {
      try {
        const { id_indukan, id_pejantan } = this.input;
        const data = {
          id_indukan: id_indukan.id_ternak,
          id_pejantan: id_pejantan.id_ternak,
        };
        await this.a$createPerkawinan(data);
        this.notify("Berhasil menambahkan perkawinan");
        this.modal.createPerkawinan = false;
      } catch (error) {
        this.notify(error, false);
      } finally {
        await this.a$perkawinanList();
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
            <base-button type="secondary" class="btn-lg">
              <router-link to="../perkawinan" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-lg">
              <router-link to="data-perkawinan" class="text-white">
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
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.createPerkawinan = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$listPerkawinan.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$listPerkawinan"
        :columns="dt.column"
      />
    </template>

    <template #modal>
      <!-- Create Adaptasi -->
      <modal-comp
        v-model:show="modal.createPerkawinan"
        modal-classes="modal-md"
      >
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.createPerkawinan">
            <div class="row">
              <!-- id_indukan -->
              <div class="col-12">
                <base-input name="id_indukan" label="ID Indukan">
                  <multi-select
                    v-model="input.id_indukan"
                    :options="g$listIndukan"
                    label="id_ternak"
                    track-by="id_ternak"
                    placeholder="Pilih ID Indukan"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- id_pejantan -->
              <div class="col-12">
                <base-input name="id_pejantan" label="ID Pejantan">
                  <multi-select
                    v-model="input.id_pejantan"
                    :options="g$listPejantan"
                    label="id_ternak"
                    track-by="id_ternak"
                    placeholder="Pilih ID Pejantan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createPerkawinan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createPerkawinan">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
