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
import { RouterLink } from "vue-router";

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
      jenis_kelamin: y$string()
        .nullable()
        .label("Jenis Kelamin")
        .label("Jenis Kelamin"),
      varietas: y$object({
        id: y$string().nullable().label("Varietas"),
      }).label("Varietas"),
      berat_berkala: y$string().required().label("Berat Berkala"),
      suhu_berkala: y$string().required().label("Suhu Berkala"),
      tanggal_lahir: y$string().required().label("Tanggal Lahir"),
      tanggal_masuk: y$string().required().label("Tanggal Masuk"),
      id_induk: y$string().required().label("ID Dam (Ibu)"),
      id_pejantan: y$string().required().label("ID Sire (Bapak)"),
      status_sehat: y$string().required().label("Status Sehat"),
      kandang: y$object({
        id: y$string().required().label("ID Kandang"),
      }).label("ID Kandang"),
      pakan: y$object({
        id: y$string().required().label("ID Pakan"),
      }).label("ID Pakan"),
      fase: y$object({
        id: y$string().required().label("ID Fase"),
      }).label("Fase Pemeliharaan"),
      foto: y$array().nullable().label("Foto"),
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
      id: null,
      rf_id: "",
      jenis_kelamin: "",
      varietas: "",
      berat_berkala: "",
      suhu_berkala: "",
      tanggal_lahir: "",
      tanggal_masuk: "",
      id_induk: "",
      id_pejantan: "",
      status_sehat: "",
      kandang: "",
      pakan: "",
      fase: "",
      tanggal_kawin: "",
      tanggal_keluar: "",
      status_keluar: "",
      foto: null,
      fotoUrl: null,
      id_ternak: "",
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
          name: "nomor",
          th: "ID Ternak",
        },
        {
          name: "varietas",
          th: "Varietas",
          render: ({ varietas }) => varietas.nama,
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          name: "fase",
          th: "Fase Pemeliharaan",
          render: ({ fase }) => fase.fase,
        },
        {
          name: "umur",
          th: "Usia (bln)",
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
    infoKesehatan: {
      tgl_sakit: "12-12-2020",
    },
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList", "g$ternakDetail"]),
    ...mapState(d$kesehatan, ["g$detailKesehatan"]),
    ...mapState(d$chart, ["g$byTimbangan"]),
    ...mapState(d$dropdown, [
      "g$ddJenisKelamin",
      "g$ddVarietas",
      "g$ddStatusSehat",
      "g$ddFasePemeliharaan",
      "g$ddStatusKeluar",
      "g$ddKandang",
      "g$ddPakan",
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
    await this.a$ternakList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
    await this.a$ddVarietas().catch((error) => this.notify(error, false));
    await this.a$ddFasePemeliharaan().catch((error) =>
      this.notify(error, false)
    );
    await this.a$ddKandang(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
    await this.a$ddPakan(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$ternak, [
      "a$ternakAdd",
      "a$ternakList",
      "a$ternakDelete",
      "a$ternakEdit",
    ]),
    ...mapActions(d$dropdown, [
      "a$ddVarietas",
      "a$ddFasePemeliharaan",
      "a$ddKandang",
      "a$ddPakan",
    ]),
    ...mapActions(d$chart, ["a$byTimbangan"]),
    resetImage() {
      this.input.fotoUrl = "";
      this.input.foto = "";
    },
    clearInput() {
      this.input = {
        id: null,
        rf_id: "",
        jenis_kelamin: "",
        varietas: "",
        berat_berkala: "",
        suhu_berkala: "",
        tanggal_lahir: "",
        tanggal_masuk: "",
        id_induk: "",
        id_pejantan: "",
        status_sehat: "",
        kandang: "",
        pakan: "",
        fase: "",
        tanggal_kawin: "",
        tanggal_keluar: "",
        status_keluar: "",
        foto: null,
        fotoUrl: null,
        // id_ternak: "",
        // id_users: "",
      };
    },
    async addTernak() {
      try {
        const {
          rf_id,
          jenis_kelamin,
          varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          kandang,
          pakan,
          fase,
          tanggal_kawin,
          foto,
          tanggal_keluar,
          status_keluar,
          id_ternak,
          id_users,
        } = this.input;
        const data = new FormData();
        data.append("rf_id", rf_id);
        data.append("jenis_kelamin", jenis_kelamin);
        data.append("id_varietas", varietas.id);
        data.append("berat", berat_berkala);
        data.append("suhu", suhu_berkala);
        data.append("tanggal_lahir", tanggal_lahir);
        data.append("tanggal_masuk", tanggal_masuk);
        data.append("id_induk", id_induk);
        data.append("id_pejantan", id_pejantan);
        data.append("status_sehat", status_sehat);
        data.append("id_pakan", pakan.id);
        data.append("fase_pemeliharaan", fase.id);
        data.append("id_kandang", kandang.id);
        // data.append("tanggal_keluar", tanggal_keluar);
        // data.append("status_keluar", status_keluar);
        data.append("foto", foto);
        data.append("id_users", this.userInfo.id);
        data.append("tanggal_kawin", tanggal_kawin);
        data.append("id_ternak", this.input.id_ternak);
        await this.schema.validate(this.input);
        await this.a$ternakAdd(data);
        this.modal.addTernak = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        console.log(error);
        this.notify(error, false);
      } finally {
        this.a$ternakList(this.userInfo.id);
      }
    },
    async editTernak() {
      try {
        const {
          id,
          rf_id,
          jenis_kelamin,
          varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          kandang,
          pakan,
          fase,
          tanggal_keluar,
          status_keluar,
          foto,
          id_ternak,
          tanggal_kawin,
        } = this.input;
        const data = {
          id,
          formData: new FormData(),
        };
        data.formData.append("rf_id", rf_id);
        data.formData.append("jenis_kelamin", jenis_kelamin);
        data.formData.append("id_varietas", varietas.id);
        data.formData.append("berat", berat_berkala);
        data.formData.append("suhu", suhu_berkala);
        data.formData.append("tanggal_lahir", tanggal_lahir);
        data.formData.append("tanggal_masuk", tanggal_masuk);
        data.formData.append("id_induk", id_induk);
        data.formData.append("id_pejantan", id_pejantan);
        data.formData.append("status_sehat", status_sehat);
        data.formData.append("id_pakan", pakan.id);
        data.formData.append("fase_pemeliharaan", fase.id);
        data.formData.append("id_kandang", kandang.id);
        if (tanggal_keluar)
          data.formData.append("tanggal_keluar", tanggal_keluar);
        if (status_keluar) data.formData.append("status_keluar", status_keluar);
        if (foto) data.formData.append("foto", foto);
        data.formData.append("id_ternak", id);
        data.formData.append("id_users", this.userInfo.id);
        if (tanggal_kawin) data.formData.append("tanggal_kawin", tanggal_kawin);
        await this.schema.validate(this.input);
        await this.a$ternakEdit(data);
        this.modal.ubahTernak = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList(this.userInfo.id);
      }
    },
    async delTernak() {
      try {
        const { id } = this.input;
        await this.a$ternakDelete(id);
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
          jenis_kelamin,
          varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          nama_kandang,
          nama_pakan,
          fase,
          tanggal_keluar,
          status_keluar,
          foto,
          tanggal_kawin,
          id_users,
        } = row;
        this.input = {
          id: id_ternak,
          rf_id,
          jenis_kelamin,
          varietas: {
            id: varietas.id,
            name: varietas.nama,
          },
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          kandang: {
            id: nama_kandang.id,
            name: nama_kandang.nama_kandang,
          },
          pakan: {
            id: nama_pakan.id,
            name: nama_pakan.nama_pakan,
          },
          fase: {
            id: fase.id,
            name: fase.fase,
          },
          tanggal_keluar,
          status_keluar,
          foto,
          tanggal_kawin,
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
        const { id_ternak } = row;
        this.input = {
          id: id_ternak,
          id_ternak,
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
        await this.a$byTimbangan(this.infoTernak.id_ternak);
        console.log(this.g$byTimbangan);
      } catch (error) {}
    },
    handleFileUpload() {
      const file = this.$refs.foto.files[0];
      this.input.foto = file;
      this.input.fotoUrl = URL.createObjectURL(this.input.foto);
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
                  name="id_ternak"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Ternak"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.berat_berkala"
                  type="text"
                  name="berat_berkala"
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
                  v-model="input.suhu_berkala"
                  type="text"
                  name="suhu_berkala"
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
                <base-input
                  name="varietas"
                  placeholder="Varietas"
                  label="Varietas"
                >
                  <multi-select
                    v-model="input.varietas"
                    :options="g$ddVarietas"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Varietas"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="status_sehat"
                  placeholder="Status Kesehatan"
                  label="Status Kesehatan"
                  required
                >
                  <multi-select
                    v-model="input.status_sehat"
                    :options="g$ddStatusSehat"
                    placeholder="Pilih Status Kesehatan"
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
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Lahir"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_lahir"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_pejantan"
                  type="text"
                  name="id_pejantan"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Sire (Bapak)"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_induk"
                  type="text"
                  name="id_induk"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Dam (Ibu)"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_masuk"
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Masuk"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_masuk"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
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
              <div class="col-6" v-if="input.fase.name === 'Cempe'">
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
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_keluar"
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Keluar"
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_keluar"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
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
              </div>
              <div class="col-6" v-if="!this.input.foto">
                <div class="form-group has-label">
                  <label class="form-control-label">Foto</label>
                  <input
                    class="form-control file"
                    id="foto"
                    type="file"
                    ref="foto"
                    accept="image/*"
                    @change="handleFileUpload()"
                  />
                </div>
              </div>
              <div class="col-6" v-if="this.input.fotoUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()">
                    Reset Image
                  </base-button>
                </div>
                <div class="text-center">
                  <img width="250" v-if="input.fotoUrl" :src="input.fotoUrl" />
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
                  name="id_ternak"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Ternak"
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.berat_berkala"
                  type="text"
                  name="berat_berkala"
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
                  v-model="input.suhu_berkala"
                  type="text"
                  name="suhu_berkala"
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
                <base-input
                  name="varietas"
                  placeholder="Varietas"
                  label="Varietas"
                >
                  <multi-select
                    v-model="input.varietas"
                    :options="g$ddVarietas"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Varietas"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <base-input
                  name="status_sehat"
                  placeholder="Status Kesehatan"
                  label="Status Kesehatan"
                  required
                >
                  <multi-select
                    v-model="input.status_sehat"
                    :options="g$ddStatusSehat"
                    placeholder="Status Kesehatan"
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
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Lahir"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_lahir"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_pejantan"
                  type="text"
                  name="id_pejantan"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Sire (Bapak)"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_induk"
                  type="text"
                  name="id_induk"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Dam (Ibu)"
                    required
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input
                  name="tanggal_masuk"
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Masuk"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_masuk"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
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
              <div class="col-6">
                <base-input
                  name="tanggal_keluar"
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Keluar"
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_keluar"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="YYYY-MM-DD"
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
              </div>
              <div class="col-6" v-if="!this.input.foto">
                <div class="form-group has-label">
                  <label class="form-control-label">Foto</label>
                  <input
                    class="form-control file"
                    id="foto"
                    type="file"
                    ref="foto"
                    accept="image/*"
                    @change="handleFileUpload()"
                  />
                </div>
              </div>
              <div class="col-6" v-if="this.input.fotoUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()">
                    Reset Image
                  </base-button>
                </div>
                <div class="text-center">
                  <img width="250" v-if="input.fotoUrl" :src="input.fotoUrl" />
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
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.id_ternak }}</strong>
          </p>
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
        <template
          #header
          class="modal top fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-mdb-backdrop="true"
          data-mdb-keyboard="true"
        >
          <h3
            class="modal-title"
            id="exampleModalLabel"
            aria-hidden="true"
            data-mdb-backdrop="true"
            data-mdb-keyboard="true"
          >
            Detail Ternak Nomor {{ infoTernak.nomor }}
          </h3>
        </template>

        <template v-if="modal.detailTernak" #body>
          <div class="tab-content" id="ex1-content">
            <div
              class="tab-pane fade show active"
              id="detail"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div
                style="max-height: 450px; overflow-y: auto; overflow-x: hidden"
              >
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Nomor Ternak</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.nomor }}</span
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
                      {{ infoTernak.rf_id ?? "-" }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Varietas</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.varietas.nama }}</span
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
                      {{ infoTernak.id_induk }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">ID Pemancek</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.id_pejantan }}</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-5">
                    <span style="font-weight: 600">Kandang</span>
                  </div>
                  <div class="col">
                    :
                    <span style="font-weight: 300">
                      {{ infoTernak.nama_kandang.nama_kandang }}</span
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
                      {{ infoTernak.fase.fase }}</span
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
                      {{ infoTernak.nama_pakan.nama_pakan }}</span
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
                      {{ infoTernak.berat_berkala }} kg</span
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
                      {{ infoTernak.suhu_berkala }} C</span
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
                      {{ infoTernak.status_sehat }}</span
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
                      {{ infoTernak.nama_penyakit }}</span
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
                      {{ infoTernak.umur }} Bulan</span
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
            </div>
            <div
              class="tab-pane fade"
              id="riwayat"
              role="tabpanel"
              aria-labelledby="ex1-tab-2"
            >
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
                      {{ infoTernak.status_sehat }}</span
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
                      {{ infoTernak.nama_penyakit }}</span
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
            </div>
            <div
              class="tab-pane fade"
              id="sop"
              role="tabpanel"
              aria-labelledby="ex1-tab-3"
            >
              <h3 class="my-3">SOP</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur provident numquam autem dolor quibusdam voluptates.
              </p>
            </div>
            <div
              class="tab-pane fade"
              id="grafik"
              role="tabpanel"
              aria-labelledby="ex1-tab-4"
            >
              <h3 class="my-4">Grafik ADG</h3>
              <hc-line
                :height="250"
                :data="g$byTimbangan"
                :data-labels="true"
                :legend="true"
              />
            </div>
          </div>
        </template>
        <template
          #footer
          class="modal-footer justify-content-center align-items-center"
        >
          <ul class="nav nav-pills m-auto" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="ex1-tab-1"
                data-mdb-toggle="pill"
                href="#detail"
                role="tab"
                aria-controls="detail"
                aria-selected="true"
                >Detail</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="ex1-tab-2"
                data-mdb-toggle="pill"
                href="#riwayat"
                role="tab"
                aria-controls="riwayat"
                aria-selected="false"
                >Kesehatan</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="ex1-tab-3"
                data-mdb-toggle="pill"
                href="#sop"
                role="tab"
                aria-controls="sop"
                aria-selected="false"
                >SOP</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="ex1-tab-4"
                data-mdb-toggle="pill"
                href="#grafik"
                role="tab"
                aria-controls="grafik"
                aria-selected="false"
                >Grafik ADG</a
              >
            </li>
          </ul>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
