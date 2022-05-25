<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Ternak",
  }),
  setup() {
    const schema = y$object({
      nomor: y$string().required().label("Nomor"),
      id_users: y$string().required().label("ID Users"),
      id_ternak: y$string().required().label("ID Ternak"),
      rf_id: y$string().required().label("RF ID"),
      jenis_kelamin: y$string().nullable().label("Jenis Kelamin"),
      nama_varietas: y$string().nullable().label("Varietas"),
      berat_berkala: y$string().nullable().label("Berat Berkala"),
      suhu_berkala: y$string().nullable().label("Suhu Berkala"),
      tanggal_lahir: y$string().nullable().label("Tanggal Lahir"),
      umur: y$string().nullable().label("Umur"),
      tanggal_masuk: y$string().nullable().label("Tanggal Masuk"),
      status_sehat: y$string().nullable().label("Status Sehat"),
      fase_pemeliharaan: y$string().nullable().label("Fase Pemeliharaan"),
      nama_pakan: y$string().nullable().label("Nama Pakan"),
      id_induk: y$string().nullable().label("ID Induk"),
      id_pejantan: y$string().nullable().label("ID Pejantan"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Ternak",
    // Input
    input: {
      id: null,
      nomor: "",
      id_users: "",
      id_ternak: "",
      rf_id: "",
      jenis_kelamin: "",
      nama_varietas: "",
      berat_berkala: "",
      suhu_berkala: "",
      tanggal_lahir: "",
      umur: "",
      tanggal_masuk: "",
      status_sehat: "",
      fase_pemeliharaan: "",
      nama_pakan: "",
      id_induk: "",
      id_pejantan: "",
    },
    // UI
    modal: {
      addTernak: false,
      ubahTernak: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "nama_varietas",
          th: "Varietas",
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          name: "fase_pemeliharaan",
          th: "Fase Pemeliharaan",
        },
        {
          name: "umur",
          th: "Umur",
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
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList", "g$ternakDetail"]),
    ...mapState(d$dropdown, ["g$ddTernak", "g$ddJenisKelamin", "g$ddVarietas"]),
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
  },
  methods: {
    ...mapActions(d$ternak, ["a$ternakAdd", "a$ternakList", "a$ternakDelete", "a$ternakEdit"]),
    ...mapActions(d$dropdown, ["a$ddTernak"]),
    clearInput() {
      this.input = {
        id: null,
        nomor: "",
        id_users: "",
        id_ternak: "",
        rf_id: "",
        jenis_kelamin: "",
        nama_varietas: "",
        berat_berkala: "",
        suhu_berkala: "",
        tanggal_lahir: "",
        umur: "",
        tanggal_masuk: "",
        status_sehat: "",
        fase_pemeliharaan: "",
        nama_pakan: "",
        id_induk: "",
        id_pejantan: "",
      };
    },
    async addTernak() {
      try {
        const { nomor, id_users, id_ternak, rf_id, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, umur, tanggal_masuk, status_sehat, fase_pemeliharaan, nama_pakan, id_induk, id_pejantan } = this.input;
        const data = {
          nomor,
          id_users,
          id_ternak,
          rf_id,
          jenis_kelamin: jenis_kelamin.nama,
          nama_varietas: nama_varietas.id,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          umur,
          tanggal_masuk,
          status_sehat,
          fase_pemeliharaan,
          nama_pakan,
          id_induk,
          id_pejantan,
        };
        await this.schema.validate(data);
        await this.a$ternakAdd(data);
        this.modal.addTernak = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async editTernak() {
      try {
        const { id, nomor, id_users, id_ternak, rf_id, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, umur, tanggal_masuk, status_sehat, fase_pemeliharaan, nama_pakan, id_induk, id_pejantan } = this.input;
        const data = {
          id,
          nomor,
          id_users,
          id_ternak,
          rf_id,
          jenis_kelamin,
          nama_varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          umur,
          tanggal_masuk,
          status_sehat,
          fase_pemeliharaan,
          nama_pakan,
          id_induk,
          id_pejantan,
        };
        await this.schema.validate(data);
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
        const { id } = this.input;
        await this.a$ternakDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { nomor, id_users, id_ternak, rf_id, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, umur, tanggal_masuk, status_sehat, fase_pemeliharaan, nama_pakan, id_induk, id_pejantan } = row;
        this.input = {
          id: id_ternak,
          nomor,
          id_users,
          id_ternak,
          rf_id,
          jenis_kelamin,
          nama_varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          umur,
          tanggal_masuk,
          status_sehat,
          fase_pemeliharaan,
          nama_pakan,
          id_induk,
          id_pejantan,
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
          <base-button type="success" @click="modal.addTernak = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$ternakList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$ternakList" :columns="dt.column" :actions="dt.action" @ubah-ternak="triggerEditModal" @hapus-ternak="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nomor" type="text" name="nomor">
                  <base-input v-bind="field" placeholder="Text" label="Nomor" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="jenis_kelamin" placeholder="Jenis Kelamin" label="Jenis Kelamin">
                  <multi-select v-model="input.jenis_kelamin" :options="g$ddJenisKelamin" label="nama" track-by="nama" placeholder="Pilih Jenis Kelamin" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="nama_varietas" placeholder="Varietas" label="Varietas">
                  <multi-select v-model="input.nama_varietas" :options="g$ddVarietas" label="nama" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
              </div>
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_varietas" type="text" name="nama_varietas">
                  <base-input v-bind="field" placeholder="Text" label="Varietas"></base-input>
                </field-form>
              </div> -->
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.suhu_berkala" type="text" name="suhu_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Suhu Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="tanggal_lahir" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Lahir">
                  <flat-pickr v-model.lazy="input.tanggal_lahir" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.umur" type="text" name="umur">
                  <base-input v-bind="field" placeholder="Text" label="Umur" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="tanggal_masuk" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Masuk">
                  <flat-pickr v-model.lazy="input.tanggal_masuk" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.status_sehat" type="text" name="status_sehat">
                  <base-input v-bind="field" placeholder="Text" label="Status Sehat" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase_pemeliharaan" type="text" name="fase_pemeliharaan">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_pakan" type="text" name="nama_pakan">
                  <base-input v-bind="field" placeholder="Text" label="Nama Pakan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addTernak = false"> Tutup </base-button>
          <base-button type="primary" @click="addTernak()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahTernak" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nomor" type="text" name="nomor">
                  <base-input v-bind="field" placeholder="Text" label="Nomor" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.jenis_kelamin" type="text" name="jenis_kelamin">
                  <base-input v-bind="field" placeholder="Text" label="Jenis Kelamin" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_varietas" type="text" name="nama_varietas">
                  <base-input v-bind="field" placeholder="Text" label="Varietas"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.suhu_berkala" type="text" name="suhu_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Suhu Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.tanggal_lahir" type="text" name="tanggal_lahir">
                  <base-input v-bind="field" placeholder="Text" label="Tanggal Lahir" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.umur" type="text" name="umur">
                  <base-input v-bind="field" placeholder="Text" label="Umur" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.tanggal_masuk" type="text" name="tanggal_masuk">
                  <base-input v-bind="field" placeholder="Text" label="Tanggal Masuk" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.status_sehat" type="text" name="status_sehat">
                  <base-input v-bind="field" placeholder="Text" label="Status Sehat" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase_pemeliharaan" type="text" name="fase_pemeliharaan">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_pakan" type="text" name="nama_pakan">
                  <base-input v-bind="field" placeholder="Text" label="Nama Pakan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahTernak = false"> Tutup </base-button>
          <base-button type="primary" @click="editTernak()"> Simpan Perubahan </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}: <strong>{{ input.id_ternak }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false"> Tutup </base-button>
          <base-button type="danger" @click="delTernak()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
