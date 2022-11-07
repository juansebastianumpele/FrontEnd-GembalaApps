<script>
import { mapActions, mapState } from "pinia";

import d$kesehatan from "@/stores/monitoring/kesehatan";
import d$ternak from "@/stores/monitoring/ternak";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$penyakit from "@/stores/monitoring/penyakit";

import { ubahTanggal } from "@/utils/locale/ubahTanggal";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Riwayat Kesehatan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Riwayat Kesehatan",
    // Input
    input: {
      id: null,
    },
    // UI
    modal: {
      editTernakSakit: false,
      hapusTernakSakit: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
          render: ({ ternak }) => ternak ? ternak.id_ternak : null,
        },
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
          render: ({ penyakit }) => penyakit ? penyakit.nama_penyakit : null,
        },
        {
          name: "tanggal_sakit",
          th: "Tanggal Sakit",
          render: ({ tanggal_sakit }) => tanggal_sakit ? ubahTanggal(tanggal_sakit) : null,
        },
        {
          name: "tanggal_sembuh",
          th: "Tanggal Sembuh",
          render: ({ tanggal_sembuh }) => tanggal_sembuh ? ubahTanggal(tanggal_sembuh) : null,
        },
      ],
      action: [
        // {
        //   text: "Detail",
        //   color: "info",
        //   event: "detail-ternak-sakit",
        // },
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
    infoTernak: false,
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$detailKesehatan"]),
    ...mapState(d$ternak, ["g$ternakList"]),
    ...mapState(d$kandang, ["g$kandangList"]),
    ...mapState(d$kesehatan, ["g$kesehatanList"]),
    ...mapState(d$penyakit, ["g$penyakitList"]),
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
    await this.a$penyakitDetail(this.$route.params.id).catch((error) =>
      this.notify(error, false)
    );
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
      "a$penyakitDetail",
    ]),
    ...mapActions(d$kandang, ["a$kandangList"]),
    ...mapActions(d$ternak, ["a$ternakList"]),
    ...mapActions(d$penyakit, ["a$penyakitList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    // async triggerDetail(row) {
    //   try {
    //     this.infoTernak = { ...row };
    //     this.modal.detailTernak = true;
    //   } catch (error) {}
    // },
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
      this.modal.editTernakSakit = true;
    },
    async editTernakSakit() {
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
        this.modal.editTernakSakit = false;
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$penyakitDetail(this.$route.params.id);
      } catch (error) {
        this.notify(error, false);
      }
    },
    async sembuhTernakSakit(row) {
      try {
        const { id_riwayat_kesehatan, ternak, penyakit, tanggal_sakit, kandang, tanggal_sembuh, gejala, penanganan, } = row;
        const data = {
          id_riwayat_kesehatan,
          tanggal_sakit,
          tanggal_sembuh: new Date().toJSON(),
          id_kandang: kandang.id_kandang,
          gejala,
          penanganan,
        };
        await this.a$kesehatanEdit(data);
        this.notify(`Edit ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$penyakitDetail(this.$route.params.id)
      } catch (error) {
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      const { id_riwayat_kesehatan } = row;
      this.input = {
        id_riwayat_kesehatan,
      };
      this.modal.hapusTernakSakit = true;
    },
    async hapusTernakSakit() {
      try {
        const { id_riwayat_kesehatan } = this.input;
        const data = {
          id_riwayat_kesehatan,
        };
        await this.a$kesehatanDelete(data);
        this.modal.hapusTernakSakit = false;
        this.notify(`Hapus ${this.pageTitle} berhasil`);
        this.clearInput();
        await this.a$penyakitDetail(this.$route.params.id)
      } catch (error) {
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
      <empty-result v-if="!g$detailKesehatan.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$detailKesehatan" :columns="dt.column" :actions="dt.action"
        @ubah="triggerEdit" @hapus="triggerDelete" @sembuh="sembuhTernakSakit" />
    </template>


    <template #modal>

      <!-- Ubah ternak sakit -->
      <modal-comp v-model:show="modal.editTernakSakit" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ubah {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.editTernakSakit">
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
                  <flat-pickr v-model.lazy="input.tanggal_sakit"
                    :config="{ mode: 'single', allowInput: true, maxDate: 'today' }" class="form-control datepicker"
                    placeholder="Pilih tanggal" />
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
                  <flat-pickr v-model.lazy="input.tanggal_sembuh"
                    :config="{ mode: 'single', allowInput: true, minDate: input.tanggal_sakit, maxDate: 'today' }"
                    class="form-control datepicker" placeholder="Pilih tanggal" />
                </base-input>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.editTernakSakit = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editTernakSakit">
            Ubah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus ternak sakit -->
      <modal-comp v-model:show="modal.hapusTernakSakit" modal-classes="modal-sm">
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
          <base-button type="secondary" @click="modal.hapusTernakSakit = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="hapusTernakSakit">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
