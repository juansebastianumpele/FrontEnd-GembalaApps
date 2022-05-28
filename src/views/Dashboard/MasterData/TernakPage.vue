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
      id_ternak: y$string().required().label("ID Ternak"),
      rf_id: y$string().required().label("RF ID"),
      id_users: y$string().required().label("ID Users"),
      jenis_kelamin: y$string().nullable().label("Jenis Kelamin"),
      nama_varietas: y$string().nullable().label("Varietas"),
      berat_berkala: y$string().nullable().label("Berat Berkala"),
      suhu_berkala: y$string().nullable().label("Suhu Berkala"),
      tanggal_lahir: y$string().nullable().label("Tanggal Lahir"),
      tanggal_masuk: y$string().nullable().label("Tanggal Masuk"),
      id_induk: y$string().nullable().label("ID Induk"),
      id_pejantan: y$string().nullable().label("ID Pejantan"),
      status_sehat: y$string().nullable().label("Status Sehat"),
      id_kandang: y$string().nullable().label("ID Kandang"),
      id_pakan: y$string().nullable().label("ID Pakan"),
      fase: y$string().nullable().label("Fase Pemeliharaan"),
      tanggal_keluar: y$string().nullable().label("Tanggal Keluar"),
      status_keluar: y$string().nullable().label("Status Keluar"),
      foto: y$object().nullable().label("Foto"),
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
      id_ternak: "",
      rf_id: "",
      id_users: "",
      jenis_kelamin: "",
      nama_varietas: "",
      berat_berkala: "",
      suhu_berkala: "",
      tanggal_lahir: "",
      tanggal_masuk: "",
      id_induk: "",
      id_pejantan: "",
      status_sehat: "",
      id_kandang: "",
      id_pakan: "",
      fase: "",
      tanggal_keluar: "",
      status_keluar: "",
      foto: null,
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
          name: "fase",
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
    await this.a$ddJenisKelamin().catch((error) => this.notify(error, false));
    await this.a$ddVarietas().catch((error) => this.notify(error, false));
    await this.a$ddStatusSehat().catch((error) => this.notify(error, false));
    await this.a$ddFasePemeliharaan().catch((error) => this.notify(error, false));
    await this.a$ddStatusKeluar().catch((error) => this.notify(error, false));
    await this.a$ddKandang().catch((error) => this.notify(error, false));
    await this.a$ddPakan().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$ternak, ["a$ternakAdd", "a$ternakList", "a$ternakDelete", "a$ternakEdit"]),
    ...mapActions(d$dropdown, ["a$ddJenisKelamin", "a$ddVarietas", "a$ddStatusSehat", "a$ddFasePemeliharaan", "a$ddStatusKeluar", "a$ddKandang", "a$ddPakan"]),
    clearInput() {
      this.input = {
        id: null,
        rf_id,
        id_users,
        jenis_kelamin,
        nama_varietas,
        berat_berkala,
        suhu_berkala,
        tanggal_lahir,
        tanggal_masuk,
        id_induk,
        id_pejantan,
        status_sehat,
        id_kandang,
        id_pakan,
        fase,
        tanggal_keluar,
        status_keluar,
        foto,
      };
    },
    async addTernak() {
      console.log("abc");
      try {
        const { rf_id, id_users, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, id_kandang, id_pakan, fase, tanggal_keluar, status_keluar, foto } = this.input;
        const data = new FormData();
        console.log(this.$refs.foto.files[0]);
        data.append("rf_id", rf_id);
        data.append("id_users", id_users);
        data.append("jenis_kelamin", jenis_kelamin);
        data.append("id_varietas", nama_varietas);
        data.append("berat", berat_berkala);
        data.append("suhu", suhu_berkala);
        data.append("tanggal_lahir", tanggal_lahir);
        data.append("tanggal_masuk", tanggal_masuk);
        data.append("id_induk", id_induk);
        data.append("id_pejantan", id_pejantan);
        data.append("status_sehat", 1);
        // data.append("id_kandang", id_kandang);
        data.append("id_pakan", id_pakan);
        data.append("fase_pemeliharaan", fase);
        data.append("tanggal_keluar", tanggal_keluar);
        data.append("status_keluar", "mati");
        data.append("foto", foto.files[0]);
        for (var pair of data.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
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
        const { rf_id, id_users, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, id_kandang, id_pakan, fase, tanggal_keluar, status_keluar, foto } = this.input;
        const data = {
          id,
          rf_id,
          id_users,
          jenis_kelamin,
          nama_varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          id_kandang,
          id_pakan,
          fase,
          tanggal_keluar,
          status_keluar,
          foto,
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
        const { rf_id, id_users, jenis_kelamin, nama_varietas, berat_berkala, suhu_berkala, tanggal_lahir, tanggal_masuk, id_induk, id_pejantan, status_sehat, id_kandang, id_pakan, fase, tanggal_keluar, status_keluar, foto } = row;
        this.input = {
          id: id_ternak,
          rf_id,
          id_users,
          jenis_kelamin,
          nama_varietas,
          berat_berkala,
          suhu_berkala,
          tanggal_lahir,
          tanggal_masuk,
          id_induk,
          id_pejantan,
          status_sehat,
          id_kandang,
          id_pakan,
          fase,
          tanggal_keluar,
          status_keluar,
          foto,
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
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="jenis_kelamin" placeholder="Jenis Kelamin" label="Jenis Kelamin">
                  <multi-select v-model="input.jenis_kelamin" :options="g$ddJenisKelamin" label="name" track-by="name" placeholder="Pilih Jenis Kelamin" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="nama_varietas" placeholder="Varietas" label="Varietas">
                  <multi-select v-model="input.nama_varietas" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
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
                <base-input name="tanggal_lahir" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Lahir">
                  <flat-pickr v-model.lazy="input.tanggal_lahir" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="tanggal_masuk" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Masuk">
                  <flat-pickr v-model.lazy="input.tanggal_masuk" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="status_sehat" placeholder="Status Kesehatan" label="Status Kesehatan">
                  <multi-select v-model="input.status_sehat" :options="g$ddStatusSehat" label="name" track-by="id" placeholder="Pilih Status Kesehatan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_kandang" placeholder="Kandang" label="Kandang">
                  <multi-select v-model="input.id_kandang" :options="g$ddKandang" label="name" track-by="id" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_pakan" placeholder="Pakan" label="Pakan">
                  <multi-select v-model="input.id_pakan" :options="g$ddPakan" label="name" track-by="id" placeholder="Pilih Pakan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="fase" placeholder="Fase Pemeliharaan" label="Fase Pemeliharaan">
                  <multi-select v-model="input.fase" :options="g$ddFasePemeliharaan" label="name" track-by="id" placeholder="Pilih Fase Pemeliharaan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="tanggal_keluar" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Keluar">
                  <flat-pickr v-model.lazy="input.tanggal_keluar" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="status_keluar" placeholder="Status Keluar" label="Status Keluar">
                  <multi-select v-model="input.status_keluar" :options="g$ddStatusKeluar" label="name" track-by="id" placeholder="Pilih Status Keluar" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.foto" type="file" name="foto">
                  <base-input v-bind="field" ref="foto" accept="image/*" placeholder="Text" type="file" label="Foto" required></base-input>
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
                <field-form v-slot="{ field }" v-model="input.rf_id" type="text" name="rf_id">
                  <base-input v-bind="field" placeholder="Text" label="RFID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="jenis_kelamin" placeholder="Jenis Kelamin" label="Jenis Kelamin">
                  <multi-select v-model="input.jenis_kelamin" :options="g$ddJenisKelamin" label="name" track-by="name" placeholder="Pilih Jenis Kelamin" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="nama_varietas" placeholder="Varietas" label="Varietas">
                  <multi-select v-model="input.nama_varietas" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
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
                <base-input name="tanggal_lahir" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Lahir">
                  <flat-pickr v-model.lazy="input.tanggal_lahir" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="tanggal_masuk" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Masuk">
                  <flat-pickr v-model.lazy="input.tanggal_masuk" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_induk" type="text" name="id_induk">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pejantan" type="text" name="id_pejantan">
                  <base-input v-bind="field" placeholder="Text" label="ID Pejantan" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="status_sehat" placeholder="Status Kesehatan" label="Status Kesehatan">
                  <multi-select v-model="input.status_sehat" :options="g$ddVarietas" label="name" track-by="id" placeholder="Status Kesehatan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_kandang" placeholder="Kandang" label="Kandang">
                  <multi-select v-model="input.id_kandang" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_pakan" placeholder="Pakan" label="Pakan">
                  <multi-select v-model="input.id_pakan" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Pakan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="fase" placeholder="Fase Pemeliharaan" label="Fase Pemeliharaan">
                  <multi-select v-model="input.fase" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Fase Pemeliharaan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="tanggal_keluar" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Keluar">
                  <flat-pickr v-model.lazy="input.tanggal_keluar" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="status_keluar" placeholder="Status Keluar" label="Status Keluar">
                  <multi-select v-model="input.status_keluar" :options="g$ddVarietas" label="name" track-by="id" placeholder="Pilih Status Keluar" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.foto" type="text" name="foto">
                  <base-input v-bind="field" placeholder="Text" label="Foto" required></base-input>
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
