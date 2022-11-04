<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/monitoring/ternak";
import d$dropdown from "@/stores/dropdown";
import d$kesehatan from "@/stores/monitoring/kesehatan";
import HcLine from "@/components/HighCharts/Line.vue";
import d$chart from "@/stores/chart";

import {
  object as y$object,
  array as y$array,
  string as y$string,
  ref as y$ref,
} from "yup";

export default {
  metaInfo: () => ({
    title: "Data Ternak",
  }),
  components: {
    HcLine,
  },
  setup() {
    const schema = y$object({
      rf_id: y$string().nullable().label("RF ID"),
      // jenis_kelamin: y$string().required().label("Jenis Kelamin"),
      // bangsa: y$object({
      //   id: y$string().nullable().label("Bangsa"),
      // }).label("bangsa"),
      // berat: y$string().required().label("Berat"),
      // suhu: y$string().required().label("Suhu"),
      // tanggal_lahir: y$string().required().label("Tanggal Lahir"),
      // tanggal_masuk: y$string().required().label("Tanggal Masuk"),
      // // id_dam: y$string().nullable().label("ID Dam (Ibu)"),
      // // id_sire: y$string().nullable().label("ID Sire (Bapak)"),
      // status_kesehatan: y$string().required().label("Status Kesehatan"),
      // penyakit: y$object({
      //   id: y$string().nullable().label("Penyakit"),
      // }).label("Penyakit"),
      // pakan: y$object({
      //   id: y$string().required().label("ID Pakan"),
      // }).label("ID Pakan"),
      // fase: y$object({
      //   id: y$string().required().label("ID Fase"),
      // }).label("Fase Pemeliharaan"),
      // image: y$array().nullable().label("image"),
      // tanggal_keluar: y$string().nullable().label("Tanggal Keluar"),
      // status_keluar: y$string().nullable().label("Status Keluar"),
      // id_ternak: y$string().required().label("ID Ternak"),
      // id_users: y$string().required().label("ID Users"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Ternak",
    // Input
    input: {
      id_ternak: null,
      rf_id: "",
      image: null,
      jenis_kelamin: "",
      id_bangsa: "",
      berat: "",
      suhu: "",
      tanggal_lahir: "",
      tanggal_masuk: "",
      id_dam: null,
      id_sire: null,
      status_kesehatan: "",
      id_penyakit: null,
      id_pakan: "",
      id_fp: "",
      id_kandang: "",
      tanggal_keluar: null,
      status_keluar: null,
      // tanggal_kawin: "",
      // imageUrl: null,
    },
    // UI
    modal: {
      addTernak: false,
      ubahTernak: false,
      confirm: false,
      detailTernak: false,
    },

    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "bangsa",
          th: "Bangsa",
          render: ({ bangsa }) => (bangsa ? bangsa.bangsa : ""),
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          name: "fase",
          th: "Status",
          render: ({ fase }) => (fase ? fase.fase : ""),
        },
        {
          name: "umur",
          th: "Umur (bln)",
          render: ({ umur }) => Math.round(umur / 30),
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-ternak",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-ternak",
        },
      ],
    },
    infoTernak: {},
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList", "g$perlakuan"]),
    ...mapState(d$kesehatan, ["g$detailKesehatan"]),
    ...mapState(d$chart, ["g$byTimbangan"]),
    ...mapState(d$dropdown, [
      "g$ddJenisKelamin",
      "g$ddBangsa",
      "g$ddStatusSehat",
      "g$ddFasePemeliharaan",
      "g$ddStatusKeluar",
      "g$ddKandang",
      "g$ddPakan",
      "g$ddListPenyakit",
      "g$ddListBetina",
      "g$ddListPejantan",
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
    await this.a$ternakList().catch((error) => this.notify(error, false));
    await this.a$ddBangsa().catch((error) => this.notify(error, false));
    await this.a$ddFasePemeliharaan().catch((error) =>
      this.notify(error, false)
    );
    await this.a$ddKandang().catch((error) => this.notify(error, false));
    // await this.a$ddPakan().catch((error) => this.notify(error, false));
    await this.a$ddListPenyakit().catch((error) => this.notify(error, false));
    await this.a$ddListBetina().catch((error) => this.notify(error, false));
    await this.a$ddListPejantan().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, [
      "a$ternakAdd",
      "a$ternakList",
      "a$ternakDelete",
      "a$ternakEdit",
      "a$perlakuan",
    ]),
    ...mapActions(d$dropdown, [
      "a$ddBangsa",
      "a$ddFasePemeliharaan",
      "a$ddKandang",
      "a$ddPakan",
      "a$ddListPenyakit",
      "a$ddListBetina",
      "a$ddListPejantan",
    ]),
    ...mapActions(d$chart, ["a$byTimbangan"]),
    resetImage() {
      this.input.imageUrl = "";
      this.input.image = "";
    },
    clearInput() {
      this.input = {
        id_ternak: null,
        rf_id: "",
        image: null,
        jenis_kelamin: "",
        bangsa: "",
        berat: "",
        suhu: "",
        tanggal_lahir: "",
        tanggal_masuk: "",
        id_dam: "",
        id_sire: "",
        status_kesehatan: "",
        penyakit: null,
        pakan: "",
        fase: "",
        kandang: "",
        tanggal_keluar: null,
        status_keluar: null,
        // id_ternak: "",
        // id_users: "",
      };
    },
    async addTernak() {
      try {
        const {
          rf_id,
          image,
          jenis_kelamin,
          bangsa,
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          status_kesehatan,
          penyakit,
          pakan,
          fase,
          kandang,
        } = this.input;
        const data = {
          rf_id,
          image,
          jenis_kelamin,
          id_bangsa: bangsa.id,
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          status_kesehatan,
          id_penyakit: penyakit.id,
          id_pakan: pakan.id,
          id_fp: fase.id,
          id_kandang: kandang.id,
        };
        await this.schema.validate(data);
        await this.a$ternakAdd(data);
        this.modal.addTernak = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        console.log(error);
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async editTernak() {
      try {
        const {
          id_ternak,
          rf_id,
          image,
          jenis_kelamin,
          bangsa,
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          penyakit,
          fase,
          kandang,
          tanggal_keluar,
          status_keluar,
        } = this.input;
        const data = {
          id_ternak,
          rf_id,
          image,
          jenis_kelamin,
          id_bangsa: bangsa.id,
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          id_penyakit: penyakit.id,
          id_fp: fase.id,
          id_kandang: kandang.id,
          tanggal_keluar,
          status_keluar,
        };
        await this.schema.validate(data);
        console.log(data);
        await this.a$ternakEdit(data);
        this.modal.ubahTernak = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async delTernak() {
      try {
        const { id_ternak, status_keluar } = this.input;
        const data = {
          id_ternak,
          status_keluar,
          tanggal_keluar: new Date(),
        };
        await this.a$ternakDelete(data);
        console.log(data);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList(this.userInfo.id);
      }
    },
    async triggerEditModal(row) {
      try {
        const {
          id_ternak,
          rf_id,
          image,
          jenis_kelamin,
          bangsa,
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          penyakit,
          fase,
          kandang,
          tanggal_keluar,
          status_keluar,
        } = row;
        this.input = {
          id_ternak,
          rf_id,
          jenis_kelamin,
          bangsa: {
            id: bangsa ? bangsa.id_bangsa : "",
            name: bangsa ? bangsa.bangsa : "",
          },
          berat,
          suhu,
          tanggal_lahir,
          tanggal_masuk,
          id_dam,
          id_sire,
          kandang: {
            id: kandang ? kandang.id_kandang : "",
            name: kandang ? kandang.kode_kandang : "",
          },
          penyakit: {
            id: penyakit ? penyakit.id_penyakit : "",
            name: penyakit ? penyakit.nama_penyakit : "",
          },
          fase: {
            id: fase ? fase.id_fp : "",
            name: fase ? fase.fase : "",
          },
          tanggal_keluar,
          status_keluar,
          image,
          // id_users,
        };
        this.modal.ubahTernak = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_ternak, status_keluar } = row;
        this.input = {
          id_ternak,
          status_keluar,
        };
        this.modal.confirm = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDetail(row) {
      try {
        this.infoTernak = { ...row };
        this.modal.detailTernak = true;
        await this.a$perlakuan(this.infoTernak.id_ternak);
        await this.a$byTimbangan(this.infoTernak.id_ternak);
      } catch (error) {
      } finally {
        this.a$ternakList();
      }
    },
    handleFileUpload() {
      const file = this.$refs.image.files[0];
      this.input.image = file;
      this.input.imageUrl = URL.createObjectURL(this.input.image);
    },
    ubahTanggal(tanggal) {
      const date = new Date(tanggal);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("id-ID", options);
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
        <div class="col text-right">
          <base-button type="success" @click="modal.addTernak = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$ternakList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$ternakList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-ternak="triggerEditModal"
        @hapus-ternak="triggerDelete"
        @detail-ternak="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- add modal -->
      <modal-comp v-model:show="modal.addTernak" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.rf_id"
                  type="text"
                  name="rf_id"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID RFID"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.berat"
                  type="text"
                  name="berat"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Berat"
                    label="Berat"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.suhu"
                  type="text"
                  name="suhu_berkala"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Suhu"
                    label="Suhu"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="bangsa" placeholder="Bangsa" label="Bangsa">
                  <multi-select
                    v-model="input.bangsa"
                    :options="g$ddBangsa"
                    label="name"
                    track-by="id"
                    placeholder="Pilih bangsa"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <!-- Status kesehatan -->
              <div class="col-6">
                <base-input
                  name="status_kesehatan"
                  placeholder="Status Kesehatan"
                  label="Status Kesehatan"
                  required
                >
                  <multi-select
                    v-model="input.status_kesehatan"
                    :options="g$ddStatusSehat"
                    placeholder="Pilih Status Kesehatan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <!-- Jika status kesehatan = sakit, tampilkan field penyakit -->
              <div v-if="input.status_kesehatan == 'Sakit'" class="col-6">
                <base-input
                  name="penyakit"
                  placeholder="Penyakit"
                  label="Penyakit"
                >
                  <multi-select
                    v-model="input.penyakit"
                    :options="g$ddListPenyakit"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Penyakit"
                    :show-labels="false"
                  />
                </base-input>
              </div>

              <div class="col-6">
                <base-input
                  name="jenis_kelamin"
                  placeholder="Jenis Kelamin"
                  label="Jenis Kelamin"
                >
                  <multi-select
                    v-model="input.jenis_kelamin"
                    :options="g$ddJenisKelamin"
                    placeholder="Pilih Jenis Kelamin"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_lahir"
                  placeholder="Pilih tanggal"
                  label="Tanggal Lahir"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_lahir"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih tanggal"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="id_sire"
                  placeholder="Id Pejantan"
                  label="ID Pejantan"
                  nullable
                >
                  <multi-select
                    v-model="input.id_sire"
                    :options="g$ddListPejantan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih ID Pejantan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="id_dam"
                  placeholder="Id Induk"
                  label="ID Induk"
                  nullable
                >
                  <multi-select
                    v-model="input.id_dam"
                    :options="g$ddListBetina"
                    label="name"
                    track-by="id"
                    placeholder="Pilih ID Induk"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_masuk"
                  placeholder="Pilih tanggal"
                  label="Tanggal Masuk"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_masuk"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih tanggal"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="kandang"
                  placeholder="Kandang"
                  label="Kandang"
                  required
                >
                  <multi-select
                    v-model="input.kandang"
                    :options="g$ddKandang"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Kandang"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="pakan"
                  placeholder="Pakan"
                  label="Pakan"
                  required
                >
                  <multi-select
                    v-model="input.pakan"
                    :options="g$ddPakan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Pakan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="fase"
                  placeholder="Fase Pemeliharaan"
                  label="Fase Pemeliharaan"
                  required
                >
                  <multi-select
                    v-model="input.fase"
                    :options="g$ddFasePemeliharaan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Fase Pemeliharaan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <!-- <div class="col-6" v-if="input.fase.name === 'Cempe'">
                <base-input
                  name="tanggal_kawin"
                  placeholder="Tanggal Kawin Induk"
                  label="Tanggal Kawin Induk"
                  required
                >
                  <multi-select
                    v-model="input.fase"
                    :options="g$ddFasePemeliharaan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Fase Pemeliharaan"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <div class="col-6" v-if="!this.input.image">
                <div class="form-group has-label">
                  <label class="form-control-label">image</label>
                  <input
                    class="form-control file"
                    id="image"
                    type="file"
                    ref="image"
                    accept="image/*"
                    @change="handleFileUpload()"
                  />
                </div>
              </div>
              <div class="col-6" v-if="this.input.imageUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()">
                    Reset Image
                  </base-button>
                </div>
                <div class="text-center">
                  <img
                    width="250"
                    v-if="input.imageUrl"
                    :src="input.imageUrl"
                  />
                </div>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addTernak = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addTernak()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Edit Modal -->
      <modal-comp v-model:show="modal.ubahTernak" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.rf_id"
                  type="text"
                  name="rf_id"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="RFID Ternak"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.berat"
                  type="text"
                  name="berat"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Bobot Berkala"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.suhu"
                  type="text"
                  name="suhu"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Suhu Berkala"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="bangsa" placeholder="Bangsa" label="Bangsa">
                  <multi-select
                    v-model="input.bangsa"
                    :options="g$ddBangsa"
                    label="name"
                    track-by="id"
                    placeholder="Pilih bangsa"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <!-- <div class="col-6">
                <base-input
                  name="status_kesehatan"
                  placeholder="Status Kesehatan"
                  label="Status Kesehatan"
                  required
                >
                  <multi-select
                    v-model="input.status_kesehatan"
                    :options="g$ddStatusSehat"
                    placeholder="Status Kesehatan"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <!-- Jika status kesehatan = sakit, tampilkan field penyakit -->
              <!-- <div v-if="input.status_kesehatan == 'Sakit'" class="col-6">
                <base-input
                  name="penyakit"
                  placeholder="Penyakit"
                  label="Penyakit"
                  required
                >
                  <multi-select
                    v-model="input.penyakit"
                    :options="g$ddListPenyakit"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Penyakit"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <div class="col-6">
                <base-input
                  name="jenis_kelamin"
                  placeholder="Jenis Kelamin"
                  label="Jenis Kelamin"
                >
                  <multi-select
                    v-model="input.jenis_kelamin"
                    :options="g$ddJenisKelamin"
                    placeholder="Pilih Jenis Kelamin"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_lahir"
                  placeholder="Pilih tanggal"
                  label="Tanggal Lahir"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_lahir"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih tanggal"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="id_sire"
                  placeholder="Id Pejantan"
                  label="ID Pejantan"
                  nullable
                >
                  <multi-select
                    v-model="input.id_sire"
                    :options="g$ddListPejantan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih ID Pejantan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="id_dam"
                  placeholder="Id Induk"
                  label="ID Induk"
                  nullable
                >
                  <multi-select
                    v-model="input.id_dam"
                    :options="g$ddListBetina"
                    label="name"
                    track-by="id"
                    placeholder="Pilih ID Induk"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_masuk"
                  placeholder="Pilih tanggal"
                  label="Tanggal Masuk"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_masuk"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih tanggal"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="kandang"
                  placeholder="Kandang"
                  label="Kandang"
                  required
                >
                  <multi-select
                    v-model="input.kandang"
                    :options="g$ddKandang"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Kandang"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <!-- <div class="col-6">
                <base-input
                  name="pakan"
                  placeholder="Pakan"
                  label="Pakan"
                  required
                >
                  <multi-select
                    v-model="input.pakan"
                    :options="g$ddPakan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Pakan"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <div class="col-6">
                <base-input
                  name="fase"
                  placeholder="Fase Pemeliharaan"
                  label="Fase Pemeliharaan"
                  required
                >
                  <multi-select
                    v-model="input.fase"
                    :options="g$ddFasePemeliharaan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Status Ternak"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <!-- <div class="col-6" v-if="input.fase.name === 'Cempe'">
                <base-input
                  name="tanggal_kawin"
                  placeholder="Tanggal Kawin Induk"
                  label="Tanggal Kawin Induk"
                  required
                >
                  <multi-select
                    v-model="input.fase"
                    :options="g$ddFasePemeliharaan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Status Ternak"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <!-- <div class="col-6">
                <base-input
                  name="tanggal_keluar"
                  placeholder="Pilih tanggal"
                  label="Tanggal Keluar"
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_keluar"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih tanggal"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="status_keluar"
                  placeholder="Status Keluar"
                  label="Status Keluar"
                >
                  <multi-select
                    v-model="input.status_keluar"
                    :options="g$ddStatusKeluar"
                    placeholder="Pilih Status Keluar"
                    :show-labels="false"
                  />
                </base-input>
              </div> -->
              <div class="col-6" v-if="!this.input.image">
                <div class="form-group has-label">
                  <label class="form-control-label">image</label>
                  <input
                    class="form-control file"
                    id="image"
                    type="file"
                    ref="image"
                    accept="image/*"
                    @change="handleFileUpload()"
                  />
                </div>
              </div>
              <div class="col-6" v-if="this.input.imageUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()">
                    Reset Image
                  </base-button>
                </div>
                <div class="text-center">
                  <img
                    width="250"
                    v-if="input.imageUrl"
                    :src="input.imageUrl"
                  />
                </div>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahTernak = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editTernak()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- delete modal -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <div class="col-12">
            <base-input
              name="status_keluar"
              label="Pilih Alasan Untuk Menghapus Data Ternak ini"
            >
              <multi-select
                v-model="input.status_keluar"
                :options="g$ddStatusKeluar"
                placeholder="Pilih Alasan Hapus"
                :show-labels="false"
              />
            </base-input>
            <p class="mt--4 text-danger text-sm">
              Setelah dihapus, Anda tidak dapat memulihkan data ini!
            </p>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delTernak()">Hapus</base-button>
        </template>
      </modal-comp>

      <!-- Modal Detail Ternak -->
      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">
            Detail Ternak Nomor {{ infoTernak.id_ternak }}
          </h3>
        </template>
        <template v-if="modal.detailTernak" #body>
          <tabs>
            <tab-pane title="Detail">
              <div
                style="max-height: 450px; overflow-y: auto; overflow-x: hidden"
              >
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Ternak</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_ternak }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID RFID</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.rf_id }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Bangsa</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.bangsa ? infoTernak.bangsa.bangsa : ""
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Jenis Kelamin</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.jenis_kelamin }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Induk</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_dam ?? "-" }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Pemacek</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_sire ?? "-" }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Kode Kandang</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.kandang
                          ? infoTernak.kandang.kode_kandang
                          : ""
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Fase Pemeliharaan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.fase ? infoTernak.fase.fase : "" }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Jenis Pakan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.kandang.jenis_pakan.jenis_pakan
                          ? infoTernak.kandang.jenis_pakan.jenis_pakan
                          : ""
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Berat</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.berat }} Kg</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Suhu</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.suhu }} °C</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Status Kesehatan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.status_kesehatan }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Nama Penyakit</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.penyakit
                          ? infoTernak.penyakit.nama_penyakit
                          : "-"
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Masuk</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.tanggal_masuk }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Umur</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ Math.round(infoTernak.umur / 30) }} Bulan</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Keluar</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.tanggal_keluar ?? "-" }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Status Keluar</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.status_keluar ?? "-" }}</span
                    >
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane title="Kesehatan">
              <div
                style="max-height: 500px; overflow-y: 800px; overflow-x: hidden"
              >
                <h3 class="my-3">Riwayat Kesehatan</h3>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Status Kesehatan</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.status_kesehatan }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Nama Penyakit</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{
                        infoTernak.penyakit
                          ? infoTernak.penyakit.nama_penyakit
                          : "-"
                      }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Sakit</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ g$detailKesehatan.tgl_sakit }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Tanggal Sembuh</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ g$detailKesehatan.tgl_sakit }}</span
                    >
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane title="Perlakuan">
              <h3 class="my-3">Perlakuan yang telah diberikan</h3>
              <div v-for="item in g$perlakuan">
                <hr class="m-0" />
                <div class="row">
                  <div class="col-8">
                    <small class="text-sm m-0">
                      {{ item.treatment.treatment }}
                    </small>
                  </div>
                  <div class="col-4">
                    <small>
                      {{ ubahTanggal(item.tanggal_adaptasi) }}
                    </small>
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane title="Grafik">
              <h3 class="my-4">Grafik ADG</h3>
              <hc-line
                :height="250"
                :data="g$byTimbangan"
                :data-labels="true"
                :legend="true"
              />
            </tab-pane>
          </tabs>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
