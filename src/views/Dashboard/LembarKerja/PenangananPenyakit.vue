<script>
import { mapActions, mapState } from "pinia";

import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$ternak from "@/stores/monitoring/ternak";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$penyakit from "@/stores/monitoring/penyakit";

import { ubahTanggal } from "@/utils/locale/ubahTanggal";

export default {
  metaInfo: () => ({
    title: "Penanganan Penyakit",
  }),
  data: () => ({
    pageTitle: "Lembar Kerja Penanganan Penyakit",
    // DataTable
    dt: {
      column: [
        {
          name: "tanggal_sakit",
          th: "Tanggal Sakit",
          render: ({ tanggal_sakit }) => tanggal_sakit ? ubahTanggal(tanggal_sakit) : "",
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
          render: ({ ternak }) => ternak.id_ternak,
        },
        {
          name: "kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => kandang ? kandang.kode_kandang : "",
        },
        {
          name: "gejala",
          th: "Gejala",
          render: ({ gejala }) => gejala ? gejala : "",
        },
        {
          name: "penanganan",
          th: "Penaganan",
          render: ({ penanganan }) => penanganan ? penanganan : "",
        },
        {
          name: "tanggal_sembuh",
          th: "Tanggal Sembuh",
          render: ({ tanggal_sembuh }) => tanggal_sembuh ? ubahTanggal(tanggal_sembuh) : "",
        },
      ],
      actions: [
        {
          text: "Sembuh",
          color: "primary",
          event: "sembuh",
          show: ({ tanggal_sembuh }) => !tanggal_sembuh,
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus",
        },
      ],
    },
    input: {
      ternak: null,
      penyakit: null,
      tanggal_sakit: "",
      kandang: null,
      id_riwayat_kesehatan: "",
      gejala: "",
      penanganan: "",
      tanggal_sembuh: "",
    },
    modal: {
      addLkPenangananPenyakit: false,
      editLkPenangananPenyakit: false,
      hapusLkPenangananPenyakit: false,
    },
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList"]),
    ...mapState(d$kandang, ["g$kandangList"]),
    ...mapState(d$kesehatan, ["g$kesehatanList"]),
    ...mapState(d$penyakit, ["g$penyakitList"]),
  },

  async mounted() {
    await this.a$kesehatanList().catch((error) => this.notify(error, false));
    await this.a$kandangList().catch((error) => this.notify(error, false));
    await this.a$ternakList().catch((error) => this.notify(error, false));
    await this.a$penyakitList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, [
      "a$kesehatanAdd",
      "a$kesehatanList",
      "a$kesehatanDelete",
      "a$kesehatanEdit",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    ...mapActions(d$ternak, ["a$ternakList"]),
    ...mapActions(d$penyakit, ["a$penyakitList"]),
    async triggerCreate() {
      this.modal.addLkPenangananPenyakit = true;
    },
    async triggerEdit(row) {
      const { id_riwayat_kesehatan, tanggal_sakit, ternak, kandang, gejala, penyakit, penanganan, tanggal_sembuh } = row;
      this.input = {
        id_riwayat_kesehatan,
        tanggal_sakit,
        ternak,
        penyakit,
        kandang,
        gejala,
        penanganan,
        tanggal_sembuh,
      };
      this.modal.editLkPenangananPenyakit = true;
    },
    async createLkPenangananPenyakit() {
      try {
        const { ternak, penyakit, tanggal_sakit, kandang } = this.input;
        const data = {
          id_ternak: ternak.id_ternak,
          id_penyakit: penyakit.id_penyakit,
          tanggal_sakit,
          id_kandang: kandang.id_kandang,
        };
        await this.a$kesehatanAdd(data);
        this.modal.addLkPenangananPenyakit = false;
        this.notify(`Tambah ${this.pageTitle} berhasil`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.clearInput();
        this.a$kesehatanList();
      }
    },
    async editLkPenangananPenyakit() {
      try {
        const { id_riwayat_kesehatan, ternak, penyakit, tanggal_sakit, kandang, tanggal_sembuh, gejala, penanganan, } = this.input;
        const data = {
          id_riwayat_kesehatan,
          tanggal_sakit,
          tanggal_sembuh,
          id_kandang: kandang.id_kandang,
          gejala,
          penanganan,
        };
        await this.a$kesehatanEdit(data);
        this.modal.editLkPenangananPenyakit = false;
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$kesehatanList();
      } catch (error) {
        this.notify(error, false);
      }
    },
    async sembuhLkPenangananPenyakit(row) {
      try {
        const { id_riwayat_kesehatan, ternak, penyakit, tanggal_sakit, kandang, tanggal_sembuh, gejala, penanganan, } = row;
        const data = {
          id_riwayat_kesehatan,
          tanggal_sakit,
          tanggal_sembuh: new Date().toJSON(),
          id_kandang: 1,
          gejala,
          penanganan,
        };
        await this.a$kesehatanEdit(data);
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$kesehatanList();
      } catch (error) {
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      const { id_riwayat_kesehatan } = row;
      this.input = {
        id_riwayat_kesehatan,
      };
      this.modal.hapusLkPenangananPenyakit = true;
    },
    async hapusLkPenangananPenyakit() {
      try {
        const { id_riwayat_kesehatan } = this.input;
        const data = {
          id_riwayat_kesehatan,
        };
        await this.a$kesehatanDelete(data);
        this.modal.hapusLkPenangananPenyakit = false;
        this.notify(`Hapus ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$kesehatanList();
      } catch (error) {
        this.notify(error, false);
      }
    },
    clearInput() {
      this.input = {
        ternak: null,
        penyakit: null,
        tanggal_sakit: "",
        kandang: null,
        id_riwayat_kesehatan: "",
        gejala: "",
        penanganan: "",
        tanggal_sembuh: "",
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
              <router-link to="penanganan-penyakit" class="text-white">
                Penanganan Penyakit
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="penanganan-penyakit/langkah-kerja" class="text-dark">
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
      <empty-result v-if="!g$kesehatanList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kesehatanList" :columns="dt.column" :actions="dt.actions"
        @ubah="triggerEdit" @sembuh="sembuhLkPenangananPenyakit" @hapus="triggerDelete"/>
    </template>

    <template #modal>
      <!-- Tambah LK penanganan penyakit -->
      <modal-comp v-model:show="modal.addLkPenangananPenyakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addLkPenangananPenyakit">
            <div class="row">
              <!-- ID ternak -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Ternak" label="ID Ternak">
                  <multi-select v-model="input.ternak" :options="g$ternakList" label="id_ternak" track-by="id_ternak"
                    placeholder="Pilih ternak" :show-labels="false" />
                </base-input>
              </div>

              <!-- Penyakit -->
              <div class="col-12">
                <base-input name="penyakit" placeholder="Nama Penyakit" label="Nama Penyakit" required>
                  <multi-select v-model="input.penyakit" :options="g$penyakitList" label="nama_penyakit"
                    track-by="id_penyakit" placeholder="Pilih Penyakit" :show-labels="false" />
                </base-input>
              </div>

              <!-- Tanggal sakit -->
              <div class="col-12">
                <base-input name="tanggal_sakit" placeholder="Pilih tanggal" label="Tanggal Sakit" required>
                  <flat-pickr v-model.lazy="input.tanggal_sakit" :config="{ mode: 'single', allowInput: true, maxDate: 'today' }"
                    class="form-control datepicker" placeholder="Pilih tanggal" />
                </base-input>
              </div>

              <!-- Kandang -->
              <div class="col-12">
                <base-input name="kandang" label="Kandang">
                  <multi-select v-model="input.kandang" :options="g$kandangList" track-by="id_kandang"
                    label="kode_kandang" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addLkPenangananPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="createLkPenangananPenyakit">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah LK penanganan penyakit -->
      <modal-comp v-model:show="modal.editLkPenangananPenyakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ubah {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.editLkPenangananPenyakit">
            <div class="row">
              <!-- ID ternak -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Ternak" label="ID Ternak">
                  <multi-select v-model="input.ternak" :options="g$ternakList" label="id_ternak" track-by="id_ternak"
                    placeholder="Pilih ternak" :show-labels="false" />
                </base-input>
              </div>

              <!-- Penyakit -->
              <div class="col-12">
                <base-input name="penyakit" placeholder="Nama Penyakit" label="Nama Penyakit" required>
                  <multi-select v-model="input.penyakit" :options="g$penyakitList" label="nama_penyakit"
                    track-by="id_penyakit" placeholder="Pilih Penyakit" :show-labels="false" />
                </base-input>
              </div>

              <!-- Tanggal sakit -->
              <div class="col-12">
                <base-input name="tanggal_sakit" placeholder="Pilih tanggal" label="Tanggal Sakit" required>
                  <flat-pickr v-model.lazy="input.tanggal_sakit" :config="{ mode: 'single', allowInput: true, maxDate: 'today' }"
                    class="form-control datepicker" placeholder="Pilih tanggal" />
                </base-input>
              </div>

              <!-- Kandang -->
              <div class="col-12">
                <base-input name="kandang" label="Kandang">
                  <multi-select v-model="input.kandang" :options="g$kandangList" track-by="id_kandang"
                    label="kode_kandang" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>

              <!-- Gejala -->
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.gejala" type="text" name="gejala">
                  <base-input v-bind="field" placeholder="Gejala" label="Gejala"></base-input>
                </field-form>
              </div>

              <!-- Penanganan -->
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.penanganan" type="text" name="penanganan">
                  <base-input v-bind="field" placeholder="Penanganan" label="Penanganan"></base-input>
                </field-form>
              </div>

              <!-- Tanggal sembuh -->
              <div class="col-12">
                <base-input name="tanggal_sembuh" placeholder="Pilih tanggal" label="Tanggal Sembuh" required>
                  <flat-pickr v-model.lazy="input.tanggal_sembuh" :config="{ mode: 'single', allowInput: true, minDate: input.tanggal_sakit, maxDate: 'today' }"
                    class="form-control datepicker" placeholder="Pilih tanggal" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.editLkPenangananPenyakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editLkPenangananPenyakit">
            Ubah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus LK penanganan penyakit -->
      <modal-comp v-model:show="modal.hapusLkPenangananPenyakit" modal-classes="modal-sm">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.id_riwayat_kesehatan }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.hapusLkPenangananPenyakit = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="hapusLkPenangananPenyakit">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
