<script>
import { mapActions, mapState } from "pinia";
import d$pakan from "@/stores/masterData/pakan";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Pakan",
  }),
  setup() {
    const schema = y$object({
      nama_pakan: y$string().required().label("Nama"),
      deskripsi: y$string().nullable().label("Deskripsi"),
      komposisi: y$string().nullable().label("Komposisi"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Pakan",
    // Input
    input: {
      id: null,
      nama_pakan: "",
      deskripsi: "",
      komposisi: "",
    },
    // UI
    modal: {
      addPakan: false,
      ubahPakan: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nama_pakan",
          th: "Nama Pakan",
        },
        {
          name: "deskripsi",
          th: "Deskripsi",
        },
        {
          name: "komposisi",
          th: "Komposisi",
        },
      ],
      action: [
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-pakan",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-pakan",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$pakan, ["g$pakanList", "g$pakanDetail"]),
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
    await this.a$pakanList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$pakan, ["a$pakanAdd", "a$pakanList", "a$pakanDelete", "a$pakanEdit"]),
    clearInput() {
      this.input = {
        id: null,
        nama_pakan: "",
        deskripsi: "",
        komposisi: "",
      };
    },
    async addPakan() {
      try {
        const { nama_pakan, deskripsi, komposisi } = this.input;
        const data = {
          nama_pakan,
          deskripsi,
          komposisi,
        };
        await this.schema.validate(data);
        await this.a$pakanAdd(data);
        this.modal.addPakan = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$pakanList();
      }
    },
    async editPakan() {
      try {
        const { id, nama_pakan, deskripsi, komposisi } = this.input;
        const data = {
          id,
          nama_pakan,
          deskripsi,
          komposisi,
        };
        await this.schema.validate(data);
        await this.a$pakanEdit(data);
        this.modal.ubahPakan = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$pakanList();
      }
    },
    async delPakan() {
      try {
        const { id } = this.input;
        await this.a$pakanDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$pakanList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_pakan, nama_pakan, deskripsi, komposisi } = row;
        this.input = {
          id: id_pakan,
          nama_pakan,
          deskripsi,
          komposisi,
        };
        this.modal.ubahPakan = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_pakan, nama_pakan } = row;
        this.input = {
          id: id_pakan,
          nama_pakan,
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
          <base-button type="success" @click="modal.addPakan = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$pakanList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$pakanList" :columns="dt.column" :actions="dt.action" @ubah-pakan="triggerEditModal" @hapus-pakan="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addPakan" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addPakan" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_pakan" type="text" name="nama_pakan">
                  <base-input v-bind="field" placeholder="Text" label="Nama" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.deskripsi" type="text" name="deskripsi">
                  <base-input v-bind="field" placeholder="Text" label="Deskripsi"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.komposisi" type="text" name="komposisi">
                  <base-input v-bind="field" placeholder="Text" label="Komposisi"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addPakan = false"> Tutup </base-button>
          <base-button type="primary" @click="addPakan()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahPakan" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahPakan" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_pakan" type="text" name="nama_pakan">
                  <base-input v-bind="field" placeholder="Text" label="Nama" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.deskripsi" type="text" name="deskripsi">
                  <base-input v-bind="field" placeholder="Text" label="Deskripsi"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.komposisi" type="text" name="komposisi">
                  <base-input v-bind="field" placeholder="Text" label="Komposisi"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahPakan = false"> Tutup </base-button>
          <base-button type="primary" @click="editPakan()"> Simpan Perubahan </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}: <strong>{{ input.nama_pakan }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false"> Tutup </base-button>
          <base-button type="danger" @click="delPakan()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
