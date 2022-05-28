<script>
import { mapActions, mapState } from "pinia";
import d$ternak from "@/stores/masterData/ternak";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Detail Data Kandang",
  }),
  setup() {
    const schema = y$object({
      id_ternak: y$string().required().label("ID Ternak"),
      fase: y$string().required().label("Fase"),
      berat_berkala: y$string().required().label("Berat Ternak"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Kandang",
    // Input
    input: {
      id: null,
      id_ternak: "",
      fase: "",
      berat_berkala: "",
    },
    // UI
    modal: {
      addDetailKandang: false,
      ubahDetailKandang: false,
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
          name: "fase",
          th: "Fase Pemeliharaan",
        },
        {
          name: "berat_berkala",
          th: "Berat Ternak",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-penghuni-kandang",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-penghuni-kandang",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-penghuni-kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$ternak, ["g$ternakList"]),
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
        fase: "",
        berat_berkala: "",
      };
    },
    async addTernak() {
      try {
        const { id_ternak, fase, berat_berkala } = this.input;
        const data = {
          id_ternak,
          fase,
          berat_berkala,
        };
        await this.schema.validate(data);
        await this.a$ternakAdd(data);
        this.modal.addDetailKandang = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async editTernak() {
      try {
        const { id, id_ternak, fase, berat_berkala } = this.input;
        const data = {
          id,
          id_ternak,
          fase,
          berat_berkala,
        };
        await this.schema.validate(data);
        await this.a$ternakEdit(data);
        this.modal.ubahDetailKandang = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$ternakList();
      }
    },
    async delternak() {
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
        const { id_ternak, fase, berat_berkala } = row;
        this.input = {
          id: id_ternak,
          fase,
          berat_berkala,
        };
        this.modal.ubahDetailKandang = true;
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
          <base-button type="success" @click="modal.addDetailKandang = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$ternakList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$ternakList" :columns="dt.column" :actions="dt.action" @ubah-kandang="triggerEditModal" @hapus-kandang="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addDetailKandang" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addDetailKandang" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase" type="text" name="fase">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Ternak"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addDetailKandang = false"> Tutup </base-button>
          <base-button type="primary" @click="addDetailKandang()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahDetailKandang" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahDetailKandang" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Text" label="ID Ternak" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.fase" type="text" name="fase">
                  <base-input v-bind="field" placeholder="Text" label="Fase Pemeliharaan"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.berat_berkala" type="text" name="berat_berkala">
                  <base-input v-bind="field" placeholder="Text" label="Berat Ternak"></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahDetailKandang = false"> Tutup </base-button>
          <base-button type="primary" @click="editKandang()"> Simpan Perubahan </base-button>
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
          <base-button type="danger" @click="delKandang()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
