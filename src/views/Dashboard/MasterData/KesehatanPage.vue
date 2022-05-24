<script>
import { mapActions, mapState } from "pinia";
import d$kesehatan from "@/stores/masterData/kesehatan";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Kesehatan",
  }),
  setup() {
    const schema = y$object({
      nama_penyakit: y$string().required().label("Nama Penyakit"),
      deskripsi: y$string().nullable().label("Deskripsi"),
      ciri_penyakit: y$string().nullable().label("Ciri-ciri"),
      pengobatan: y$string().nullable().label("Pengobatan"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Kesehatan",
    // Input
    input: {
      id: null,
      nama_penyakit: "",
      deskripsi: "",
      ciri_penyakit: "",
      pengobatan: "",
    },
    // UI
    modal: {
      addKesehatan: false,
      ubahKesehatan: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nama_penyakit",
          th: "Nama Penyakit",
        },
        {
          name: "deskripsi",
          th: "Deskripsi",
        },
        {
          name: "ciri_penyakit",
          th: "Ciri-ciri",
        },
        {
          name: "pengobatan",
          th: "Pengobatan",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-kesehatan",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-kesehatan",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-kesehatan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kesehatan, ["g$kesehatanList", "g$kesehatanDetail"]),
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
    await this.a$kesehatanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kesehatan, ["a$kesehatanAdd", "a$kesehatanList", "a$kesehatanDelete", "a$kesehatanEdit"]),
    clearInput() {
      this.input = {
        id: null,
        nama_penyakit: "",
        deskripsi: "",
        ciri_penyakit: "",
        pengobatan: "",
      };
    },
    async addKesehatan() {
      try {
        const { nama_penyakit, deskripsi, ciri_penyakit, pengobatan } = this.input;
        const data = {
          nama_penyakit,
          deskripsi,
          ciri_penyakit,
          pengobatan,
        };
        await this.schema.validate(data);
        await this.a$kesehatanAdd(data);
        this.modal.addKesehatan = false;
        this.notify(`Tambah ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kesehatanList();
      }
    },
    async editKesehatan() {
      try {
        const { id, id_ternak, nama_penyakit, deskripsi, ciri_penyakit, pengobatan } = this.input;
        const data = {
          id,
          id_ternak,
          nama_penyakit,
          deskripsi,
          ciri_penyakit,
          pengobatan,
        };
        await this.schema.validate(data);
        await this.a$kesehatanEdit(data);
        this.modal.ubahKesehatan = false;
        this.notify(`Edit ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kesehatanList();
      }
    },
    async delKesehatan() {
      try {
        const { id } = this.input;
        await this.a$kesehatanDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses !`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kesehatanList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_kesehatan, id_ternak, nama_penyakit, deskripsi, ciri_penyakit, pengobatan } = row;
        this.input = {
          id: id_kesehatan,
          id_ternak,
          nama_penyakit,
          deskripsi,
          ciri_penyakit,
          pengobatan,
        };
        this.modal.ubahKesehatan = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_kesehatan, nama_penyakit } = row;
        this.input = {
          id: id_kesehatan,
          nama_penyakit,
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
          <base-button type="success" @click="modal.addKesehatan = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kesehatanList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kesehatanList" :columns="dt.column" :actions="dt.action" @ubah-kesehatan="triggerEditModal" @hapus-kesehatan="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addKesehatan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKesehatan" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_penyakit" type="text" name="nama_penyakit">
                  <base-input v-bind="field" placeholder="Text" label="Nama Penyakit" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.deskripsi" type="text" name="deskripsi">
                  <base-input v-bind="field" placeholder="Text" label="Deskripsi"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.ciri_penyakit" type="text" name="ciri_penyakit">
                  <base-input v-bind="field" placeholder="Text" label="Ciri-ciri"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.pengobatan" type="text" name="pengobatan">
                  <base-input v-bind="field" placeholder="Text" label="Pengobatan"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addKesehatan = false"> Tutup </base-button>
          <base-button type="primary" @click="addKesehatan()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahKesehatan" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKesehatan" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_penyakit" type="text" name="nama_penyakit">
                  <base-input v-bind="field" placeholder="Text" label="Nama Penyakit" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.deskripsi" type="text" name="deskripsi">
                  <base-input v-bind="field" placeholder="Text" label="Deskripsi"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.ciri_penyakit" type="text" name="ciri_penyakit">
                  <base-input v-bind="field" placeholder="Text" label="Ciri-ciri"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.pengobatan" type="text" name="pengobatan">
                  <base-input v-bind="field" placeholder="Text" label="Pengobatan"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahKesehatan = false"> Tutup </base-button>
          <base-button type="primary" @click="editKesehatan()"> Simpan Perubahan </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}: <strong>{{ input.nama_penyakit }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false"> Tutup </base-button>
          <base-button type="danger" @click="delKesehatan()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
