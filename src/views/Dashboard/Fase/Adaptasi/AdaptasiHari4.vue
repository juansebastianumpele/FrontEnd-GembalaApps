<script>
import { mapActions, mapState } from "pinia";
import d$adaptasi from "@/stores/fase/adaptasi";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import d$dropdown from "@/stores/dropdown";

export default {
  metaInfo: () => ({
    title: "Fase Adaptasi",
  }),
  data: () => ({
    pageTitle: "Fase Adaptasi",
    input: {
      id_ternak: "",
      id_kandang: "",
      treatment1: true,
      treatment2: true,
    },
    //UI
    modal: {
      createAdaptasi: false,
    },
    // DataTable
    dt: {
      column: [
        {
          th: "Tanggal",
          render: ({ tanggal_adaptasi }) => ubahTanggal(tanggal_adaptasi),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          th: "Obat Anti Parasit",
          render: ({ treatments }) =>
            Object.values(treatments)[0]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
        {
          th: "Pakan Rumput + Konsentrat",
          render: ({ treatments }) =>
            Object.values(treatments)[1]
              ? '<i class="fas fa-solid fa-check text-success" style="font-size: 30px;"></i>'
              : '<i class="fas fa-solid fa-x text-danger" style="font-size: 20px;"></i>',
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$adaptasi, ["g$adaptasiHariKe4"]),
    ...mapState(d$dropdown, ["g$ddListAdaptasiHari4", "g$ddKandang"]),
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
    await this.a$adaptasiHariKe4().catch((error) => this.notify(error, false));
    await this.a$ddListAdaptasiHari4();
    await this.a$ddKandang();
  },
  methods: {
    ...mapActions(d$adaptasi, ["a$adaptasiHariKe4", "a$createAdaptasi"]),
    ...mapActions(d$dropdown, ["a$ddListAdaptasiHari4", "a$ddKandang"]),
    clearInput() {
      this.input = {
        id_ternak: "",
        id_kandang: "",
        treatment1: true,
        treatment2: true,
      };
    },
    async createAdaptasi() {
      try {
        const { id_ternak, id_kandang, treatment1, treatment2 } = this.input;
        const data = {
          id_ternak: id_ternak.id_ternak,
          id_kandang: id_kandang.id,
          treatments: [
            {
              id_treatment: treatment1 ? 10 : null,
            },
            {
              id_treatment: treatment2 ? 11 : null,
            },
          ],
        };
        await this.a$createAdaptasi(data);
        this.modal.createAdaptasi = false;
        this.notify("Berhasil membuat adaptasi baru", true);
        this.a$adaptasiHariKe4();
        this.a$ddListAdaptasiHari4();
      } catch (error) {
        this.notify(error, false);
        this.clearInput();
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
              <router-link to="../adaptasi" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-lg">
              <router-link to="data-adaptasi" class="text-white">
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
      <div class="row align-items-center mt-3">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col-auto">
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi" class="text-dark">
                Hari ke-1
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-2" class="text-dark">
                Hari ke-2
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-3" class="text-dark">
                Hari ke-3
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-sm">
              <router-link to="data-adaptasi-4" class="text-white">
                Hari ke-4
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-sm">
              <router-link to="data-adaptasi-5" class="text-dark">
                Hari ke-5
              </router-link>
            </base-button>
          </span>
        </div>
        <div class="col text-right">
          <base-button type="success" @click="modal.createAdaptasi = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$adaptasiHariKe4.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$adaptasiHariKe4"
        :columns="dt.column"
      />
    </template>

    <template #modal>
      <!-- Create Adaptasi -->
      <modal-comp v-model:show="modal.createAdaptasi" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.createAdaptasi">
            <div class="row">
              <!-- id_ternak -->
              <div class="col-12">
                <base-input name="kandang" label="ID Ternak">
                  <multi-select
                    v-model="input.id_ternak"
                    :options="g$ddListAdaptasiHari4"
                    label="id_ternak"
                    track-by="id_ternak"
                    placeholder="Pilih ID Ternak"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- id_kandang -->
              <div class="col-12">
                <base-input name="id_kandang" label="ID Kandang">
                  <multi-select
                    v-model="input.id_kandang"
                    :options="g$ddKandang"
                    label="name"
                    track-by="id"
                    placeholder="Pilih ID Kandang"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- Masukan Ke Kandang Umbaran -->
              <div class="col-6">
                <base-input
                  name="treatment1"
                  label="1. Masukan Ke Kandang Umbaran"
                >
                  <base-checkbox v-model="input.treatment1" name="treatment1" />
                </base-input>
              </div>

              <!-- Beri Air Gula -->
              <div class="col-6">
                <base-input name="treatment2" label="2. Beri Air Gula">
                  <base-checkbox v-model="input.treatment2" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.createAdaptasi = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createAdaptasi">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
