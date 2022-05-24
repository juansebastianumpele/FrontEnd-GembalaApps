<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Ternak",
  }),
  setup() {
    const schema = y$object({
      id_ternak: y$string().required().label("ID Ternak"),
      nama_varietas: y$string().nullable().label("Varietas"),
      jenis_kelamin: y$string().nullable().label("Jenis Kelamin"),
      fase_pemeliharaan: y$string().nullable().label("Fase Pemeliharaan"),
      umur: y$string().nullable().label("Umur"),
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
      nama_varietas: "",
      jenis_kelamin: "",
      fase_pemeliharaan: "",
      umur: "",
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
    clearInput() {
      this.input = {
        id: null,
        id_ternak: "",
        nama_varietas: "",
        jenis_kelamin: "",
        fase_pemeliharaan: "",
        umur: "",
      };
    },
    async addTernak() {
      try {
        const { id_ternak, nama_varietas, jenis_kelamin } = this.input;
        const data = {
          id_ternak,
          nama_varietas,
          jenis_kelamin,
          fase_pemeliharaan,
          umur,
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
        const { id, id_ternak, nama_varietas, jenis_kelamin } = this.input;
        const data = {
          id,
          id_ternak,
          nama_varietas,
          jenis_kelamin,
          fase_pemeliharaan,
          umur,
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
        const { id_ternak, nama_varietas, jenis_kelamin } = row;
        this.input = {
          id: id_ternak,
          id_ternak,
          nama_varietas,
          jenis_kelamin,
          fase_pemeliharaan,
          umur,
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
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_varietas" type="text" name="nama_varietas">
                  <base-input v-bind="field" placeholder="Text" label="Varietas"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.jenis_kelamin" type="text" name="jenis_kelamin">
                  <base-input v-bind="field" placeholder="Text" label="Jenis Kelamin"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase_pemeliharaan" type="text" name="fase_pemeliharaan">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.umur" type="text" name="umur">
                  <base-input v-bind="field" placeholder="Text" label="Umur"></base-input>
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
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_varietas" type="text" name="nama_varietas">
                  <base-input v-bind="field" placeholder="Text" label="Varietas"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.jenis_kelamin" type="text" name="jenis_kelamin">
                  <base-input v-bind="field" placeholder="Text" label="Jenis Kelamin"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase_pemeliharaan" type="text" name="fase_pemeliharaan">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.umur" type="text" name="umur">
                  <base-input v-bind="field" placeholder="Text" label="Umur"></base-input>
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
