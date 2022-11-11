<script>
import { mapActions, mapState } from "pinia";

import d$pemeliharaan from "@/stores/lembarkerja/pemeliharaan";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$pakan from "@/stores/monitoring/pakan";

import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Pemeliharaan",
  }),
  data: () => ({
    pageTitle: "Lembar Kerja Pemeliharaan",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_pemeliharaan",
          th: "Tanggal",
          render: ({ tanggal_pemeliharaan }) =>
            ubahTanggal(tanggal_pemeliharaan),
        },
        {
          name: "kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "jenis_pakan",
          th: "Jenis Pakan",
        },
        {
          name: "jumlah_pakan",
          th: "Jumlah Pakan",
          render: ({ jumlah_pakan }) => `${jumlah_pakan} Kg`,
        },
        {
          name: "pembersihan_kandang",
          th: "Pembersihan Kandang",
          render: ({ pembersihan_kandang }) =>
            pembersihan_kandang
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          name: "pembersihan_ternak",
          th: "Pembersihan Ternak",
          render: ({ pembersihan_ternak }) =>
            pembersihan_ternak
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
    input: {
      kandang: null,
      tanggal_pemeliharaan: "",
      jenis_pakan: null,
      jumlah_pakan: null,
      pembersihan_kandang: true,
      pembersihan_ternak: true,
    },
    modal: {
      createLkPemeliharaan: false,
    }
  }),
  computed: {
    ...mapState(d$pemeliharaan, ["g$pemeliharaan", "g$pemeliharaanAll"]),
    ...mapState(d$kandang, ["g$kandangList"]),
    ...mapState(d$pakan, ["g$pakanList"]),
  },

  async mounted() {
    await this.a$pemeliharaanList().catch((error) => this.notify(error, false));
    await this.a$pemeliharaanListAll().catch((error) =>
      this.notify(error, false)
    );
    await this.a$kandangList().catch((error) => this.notify(error, false));
    await this.a$pakanList('').catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pemeliharaan, [
      "a$pemeliharaanList",
      "a$pemeliharaanListAll",
      "a$createLkPemeliharaan",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    ...mapActions(d$pakan, ["a$pakanList"]),
    async triggerCreate() {
      this.modal.createLkPemeliharaan = true;
    },
    async createLkPemeliharaan() {
      try {
        const {
          kandang,
          tanggal_pemeliharaan,
          jenis_pakan,
          jumlah_pakan,
          pembersihan_kandang,
          pembersihan_ternak,
        } = this.input;
        const data = {
          id_kandang: kandang.id_kandang,
          tanggal_pemeliharaan,
          jenis_pakan: jenis_pakan.jenis_pakan,
          jumlah_pakan,
          pembersihan_kandang,
          pembersihan_ternak,
        };
        await this.a$createLkPemeliharaan(data);
        this.modal.createLkPemeliharaan = false;
        this.notify(`Berhasil menambahkan data ${this.pageTitle}`, true);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.clearInput();
        this.a$pemeliharaanListAll().catch((error) => this.notify(error, false));
      }
    },
    clearInput() {
      this.input = {
        kandang: null,
        tanggal_pemeliharaan: "",
        jenis_pakan: null,
        jumlah_pakan: 0,
        pembersihan_kandang: true,
        pembersihan_ternak: true,
      };
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
            <base-button type="success1" class="btn-lg">
              <router-link to="pemeliharaan" class="text-white">
                Fase Pemeliharaan
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="pemeliharaan/langkah-kerja" class="text-dark">
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
          <base-button type="success" @click="triggerCreate">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pemeliharaanAll.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$pemeliharaanAll" :columns="dt.column" />
    </template>

    <template #modal>
      <!-- Create LK pemeliharaan -->
      <modal-comp v-model:show="modal.createLkPemeliharaan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.createLkPemeliharaan">
            <div class="row">
              <!-- Kandang -->
              <div class="col-6">
                <base-input name="kandang" label="Kandang">
                  <multi-select v-model="input.kandang" :options="g$kandangList" label="kode_kandang" track-by="id"
                    placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>

              <!-- Tanggal pemeliharaan -->
              <div class="col-6">
                <base-input name="tanggal_pemeliharaan" label="Tanggal Pemeliharaan" required>
                  <flat-pickr v-model.lazy="input.tanggal_pemeliharaan" :config="{ mode: 'single', allowInput: true , maxDate: new Date() }"
                    class="form-control datepicker" placeholder="Pilih tanggal" maxDate="today" />
                </base-input>
              </div>

              <!-- Jenis pakan -->
              <div class="col-6">
                <base-input name="jenis_pakan" label="Jenis Pakan">
                  <multi-select v-model="input.jenis_pakan" :options="g$pakanList" label="jenis_pakan"
                    track-by="id_jenis_pakan" placeholder="Pilih jenis pakan" :show-labels="false"
                    :preselectFirst="true" />
                </base-input>
              </div>

              <!-- Jumlah pakan -->
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.jumlah_pakan" name="jumlah_pakan">
                  <base-input v-bind="field" placeholder="Jumlah pakan dalam kg" label="Jumlah Pakan (Kg)" type="number"></base-input>
                </field-form>
              </div>

              <!-- Pembersihan kandang -->
              <div class="col-6">
                <base-input name="jenis_pakan" label="Pembersihan Kandang">
                  <base-checkbox v-model="input.pembersihan_kandang" label="Pembersihan kandang" />
                </base-input>
              </div>

              <!-- Pembersihan ternak -->
              <div class="col-6">
                <base-input name="jenis_pakan" label="Pembersihan Ternak">
                  <base-checkbox v-model="input.pembersihan_ternak" label="Pembersihan ternak" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createLkPemeliharaan = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createLkPemeliharaan">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>