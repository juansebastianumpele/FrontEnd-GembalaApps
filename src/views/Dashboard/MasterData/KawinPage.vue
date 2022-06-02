<script>
import { mapActions, mapState } from "pinia";
import d$kawin from "@/stores/masterData/kawin";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Kawin",
  }),
  setup() {
    const schema = y$object({
      // id_kawin: y$string().required().label("ID Kawin"),
      id_ternak: y$string().required().label("ID Induk"),
      tanggal_kawin: y$string().nullable().label("Tanggal Kawin"),
      id_pemancek: y$string().nullable().label("ID Pemancek"),
      // nama_fase: y$string().nullable().label("Status Ternak"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Kawin",
    // Input
    input: {
      id: null,
      id_kawin: "",
      id_ternak: "",
      tanggal_kawin: "",
      id_pemancek: "",
      nama_fase: "",
    },
    // UI
    modal: {
      addKawin: false,
      ubahKawin: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "id_ternak",
          th: "ID Induk",
        },
        {
          name: "nama_fase",
          th: "Status Ternak",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "ubah-kawin",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-kawin",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-kawin",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kawin, ["g$kawinList", "g$kawinDetail"]),
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
    await this.a$kawinList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kawin, ["a$kawinAdd", "a$kawinList", "a$kawinDelete", "a$kawinEdit"]),
    clearInput() {
      this.input = {
        id: null,
        id_kawin: "",
        id_ternak: "",
        tanggal_kawin: "",
        nama_fase: "",
        id_pemancek: "",
      };
    },
    async addKawin() {
      try {
        const { id_kawin, id_ternak, tanggal_kawin, nama_fase, id_pemancek } = this.input;
        const data = {
          id_kawin,
          id_ternak,
          tanggal_kawin,
          nama_fase,
          id_pemancek,
        };
        await this.schema.validate(data);
        await this.a$kawinAdd(data);
        this.modal.addKawin = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList();
      }
    },
    async editKawin() {
      try {
        const { id, id_kawin, id_ternak, tanggal_kawin, nama_fase, id_pemancek } = this.input;
        const data = {
          id,
          id_kawin,
          id_ternak,
          tanggal_kawin,
          nama_fase,
          id_pemancek,
        };
        await this.schema.validate(data);
        await this.a$kawinEdit(data);
        this.modal.ubahKawin = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList();
      }
    },
    async delKawin() {
      try {
        const { id } = this.input;
        await this.a$kawinDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kawinList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_kawin, id_ternak, tanggal_kawin, nama_fase, id_pemancek } = row;
        this.input = {
          id: id_kawin,
          id_ternak,
          tanggal_kawin,
          nama_fase,
          id_pemancek,
        };
        this.modal.ubahKawin = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_kawin, id_ternak } = row;
        this.input = {
          id: id_kawin,
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
          <base-button type="success" @click="modal.addKawin = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kawinList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kawinList" :columns="dt.column" :actions="dt.action" @ubah-kawin="triggerEditModal" @hapus-kawin="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addKawin" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_kawin" type="text" name="id_kawin">
                  <base-input v-bind="field" placeholder="Text" label="ID Kawin"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="tanggal_kawin" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Kawin" required>
                  <flat-pickr v-model.lazy="input.tanggal_kawin" :config="{ mode: 'single', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_fase" type="text" name="nama_fase">
                  <base-input v-bind="field" placeholder="Text" label="Status Ternak"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pemancek" type="text" name="id_pemancek">
                  <base-input v-bind="field" placeholder="Text" label="ID Pemancek" required></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addKawin = false"> Tutup </base-button>
          <base-button type="primary" @click="addKawin()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahKawin" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_kawin" type="text" name="id_kawin">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Induk" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <base-input name="tanggal_kawin" class="my-4" placeholder="YYYY-MM-DD" label="Tanggal Kawin">
                  <flat-pickr v-model.lazy="filter.dateRange" :config="{ mode: 'range', allowInput: true }" class="form-control datepicker" placeholder="YYYY-MM-DD" />
                </base-input>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_fase" type="text" name="nama_fase">
                  <base-input v-bind="field" placeholder="Text" label="Status Ternak"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_pemancek" type="text" name="id_pemancek">
                  <base-input v-bind="field" placeholder="Text" label="ID Pemancek"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahKawin = false"> Tutup </base-button>
          <base-button type="primary" @click="editKawin()"> Simpan Perubahan </base-button>
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
          <base-button type="danger" @click="delKawin()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
