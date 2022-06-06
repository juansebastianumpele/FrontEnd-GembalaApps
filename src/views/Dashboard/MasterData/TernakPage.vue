<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, array as y$array, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Ternak",
  }),
  setup() {
    const schema = y$object({
      rf_id: y$string().nullable().label("RF ID"),
      jenis_kelamin: y$string().nullable().label("Jenis Kelamin").label("Jenis Kelamin"),
      varietas: y$object({
        id: y$string().nullable().label("Varietas"),
      }).label("Varietas"),
      berat_berkala: y$string().required().label("Berat Berkala"),
      suhu_berkala: y$string().required().label("Suhu Berkala"),
      tanggal_lahir: y$string().required().label("Tanggal Lahir"),
      tanggal_masuk: y$string().required().label("Tanggal Masuk"),
      id_induk: y$string().required().label("ID Induk"),
      id_pejantan: y$string().required().label("ID Pejantan"),
      status_sehat: y$string().required().label("Status Sehat"),
      kandang: y$object({
        id: y$string().required().label("ID Kandang"),
      }).label("ID Kandang"),
      pakan: y$object({
        id: y$string().required().label("ID Pakan"),
      }).label("ID Pakan"),
      fase: y$object({
        id: y$string().required().label("ID Fase"),
      }).label("Status Ternak"),
      // tanggal_keluar: y$string().nullable().label("Tanggal Keluar"),
      // status_keluar: y$string().nullable().label("Status Keluar"),
      foto: y$array().nullable().label("Foto"),
      // id_ternak: y$string().required().label("ID Ternak"),
      // id_users: y$string().required().label("ID Users"),
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
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nomor",
          th: "Nomor Ternak",
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
          th: "Status Ternak",
          render: ({ fase }) => fase.fase,
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
    ...mapState(d$dropdown, ["g$ddJenisKelamin", "g$ddVarietas", "g$ddStatusSehat", "g$ddFasePemeliharaan", "g$ddStatusKeluar", "g$ddKandang", "g$ddPakan"]),
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
    await this.a$ternakList(this.userInfo.id).catch((error) => this.notify(error, false));
    await this.a$ddVarietas().catch((error) => this.notify(error, false));
    await this.a$ddFasePemeliharaan().catch((error) => this.notify(error, false));
    await this.a$ddKandang(this.userInfo.id).catch((error) => this.notify(error, false));
    await this.a$ddPakan(this.userInfo.id).catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, ["a$ternakAdd", "a$ternakList", "a$ternakDelete", "a$ternakEdit"]),
    ...mapActions(d$dropdown, ["a$ddVarietas", "a$ddFasePemeliharaan", "a$ddKandang", "a$ddPakan"]),
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
        const { rf_id, jenis_kelamin, varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, kandang, pakan, fase, tanggal_keluar, status_keluar, foto, id_ternak, id_users } = this.input;
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
        // data.append("id_ternak", this.input.id_ternak);
        data.append("id_users", this.userInfo.id);
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
        const { id, rf_id, jenis_kelamin, varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, kandang, pakan, fase, tanggal_keluar, status_keluar, foto, id_ternak } = this.input;
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
        if (tanggal_keluar) data.formData.append("tanggal_keluar", tanggal_keluar);
        if (status_keluar) data.formData.append("status_keluar", status_keluar);
        if (foto) data.formData.append("foto", foto);
        data.formData.append("id_ternak", id);
        data.formData.append("id_users", this.userInfo.id);
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
        const { id_ternak, rf_id, jenis_kelamin, varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, nama_kandang, nama_pakan, fase, tanggal_keluar, status_keluar, foto, id_users } =
          row;
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
          <base-button type="success" @click="modal.addTernak = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$ternakList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$ternakList" :columns="dt.column" :actions="dt.action" @ubah-ternak="triggerEditModal" @hapus-ternak="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addTernak" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak"></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="jenis_kelamin" placeholder="Jenis Kelamin" label="Jenis Kelamin">
                  <multi-select v-model="input.jenis_kelamin" :options="g$ddJenisKelamin" placeholder="Pilih Jenis Kelamin" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="varietas" placeholder="Varietas" label="Varietas">
                  <multi-select v-model="input.varietas" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.suhu_berkala" type="text" name="suhu_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Suhu Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="tanggal_lahir" placeholder="YYYY-MM-DD" label="Tanggal Lahir" required>
                  <flat-pickr v-model.lazy="input.tanggal_lahir" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="tanggal_masuk" placeholder="YYYY-MM-DD" label="Tanggal Masuk" required>
                  <flat-pickr v-model.lazy="input.tanggal_masuk" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="status_sehat" placeholder="Status Kesehatan" label="Status Kesehatan" required>
                  <multi-select v-model="input.status_sehat" :options="g$ddStatusSehat" placeholder="Pilih Status Kesehatan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="kandang" placeholder="Kandang" label="Kandang" required>
                  <multi-select v-model="input.kandang" :options="g$ddKandang" label="name" track-by="id" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="pakan" placeholder="Pakan" label="Pakan" required>
                  <multi-select v-model="input.pakan" :options="g$ddPakan" label="name" track-by="id" placeholder="Pilih Pakan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="fase" placeholder="Status Ternak" label="Status Ternak" required>
                  <multi-select v-model="input.fase" :options="g$ddFasePemeliharaan" label="name" track-by="id" placeholder="Pilih Status Ternak" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6" v-if="input.fase.name === 'Cempe'">
                <base-input name="fase" placeholder="Tanggal Kawin Induk" label="Tanggal Kawin Induk" required>
                  <multi-select v-model="input.fase" :options="g$ddFasePemeliharaan" label="name" track-by="id" placeholder="Pilih Status Ternak" :show-labels="false" />
                </base-input>
              </div>
              <!-- <div class="col-6">
                <base-input name="tanggal_keluar" placeholder="YYYY-MM-DD" label="Tanggal Keluar">
                  <flat-pickr v-model.lazy="input.tanggal_keluar" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div> -->
              <!-- <div class="col-6">
                <base-input name="status_keluar" placeholder="Status Keluar" label="Status Keluar">
                  <multi-select v-model="input.status_keluar" :options="g$ddStatusKeluar" placeholder="Pilih Status Keluar" :show-labels="false" />
                </base-input>
              </div> -->
              <div class="col-6" v-if="!this.input.foto">
                <div class="form-group has-label">
                  <label class="form-control-label">Foto</label>
                  <input class="form-control file" id="foto" type="file" ref="foto" accept="image/*" @change="handleFileUpload()" />
                </div>
              </div>
              <div class="col-6" v-if="this.input.fotoUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()"> Reset Image </base-button>
                </div>
                <div class="text-center">
                  <img width="250" v-if="input.fotoUrl" :src="input.fotoUrl" />
                </div>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addTernak = false"> Tutup </base-button>
          <base-button type="primary" @click="addTernak()"> Tambah {{ pageTitle }} </base-button>
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
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak"></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="jenis_kelamin" placeholder="Jenis Kelamin" label="Jenis Kelamin">
                  <multi-select v-model="input.jenis_kelamin" :options="g$ddJenisKelamin" placeholder="Pilih Jenis Kelamin" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="varietas" placeholder="Varietas" label="Varietas">
                  <multi-select v-model="input.varietas" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.suhu_berkala" type="text" name="suhu_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Suhu Berkala" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="tanggal_lahir" placeholder="YYYY-MM-DD" label="Tanggal Lahir" required>
                  <flat-pickr v-model.lazy="input.tanggal_lahir" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="tanggal_masuk" placeholder="YYYY-MM-DD" label="Tanggal Masuk" required>
                  <flat-pickr v-model.lazy="input.tanggal_masuk" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan" required></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input name="status_sehat" placeholder="Status Kesehatan" label="Status Kesehatan" required>
                  <multi-select v-model="input.status_sehat" :options="g$ddStatusSehat" placeholder="Status Kesehatan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="kandang" placeholder="Kandang" label="Kandang" required>
                  <multi-select v-model="input.kandang" :options="g$ddKandang" label="name" track-by="id" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="pakan" placeholder="Pakan" label="Pakan" required>
                  <multi-select v-model="input.pakan" :options="g$ddPakan" label="name" track-by="id" placeholder="Pilih Pakan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="fase" placeholder="Status Ternak" label="Status Ternak" required>
                  <multi-select v-model="input.fase" :options="g$ddFasePemeliharaan" label="name" track-by="id" placeholder="Pilih Status Ternak" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="tanggal_keluar" placeholder="YYYY-MM-DD" label="Tanggal Keluar">
                  <flat-pickr v-model.lazy="input.tanggal_keluar" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-6">
                <base-input name="status_keluar" placeholder="Status Keluar" label="Status Keluar">
                  <multi-select v-model="input.status_keluar" :options="g$ddStatusKeluar" placeholder="Pilih Status Keluar" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-6" v-if="!this.input.foto">
                <div class="form-group has-label">
                  <label class="form-control-label">Foto</label>
                  <input class="form-control file" id="foto" type="file" ref="foto" accept="image/*" @change="handleFileUpload()" />
                </div>
              </div>
              <div class="col-6" v-if="this.input.fotoUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()"> Reset Image </base-button>
                </div>
                <div class="text-center">
                  <img width="250" v-if="input.fotoUrl" :src="input.fotoUrl" />
                </div>
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
