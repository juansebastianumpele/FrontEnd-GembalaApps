<script>
import { mapActions, mapState } from "pinia";
import d$kandang from "@/stores/masterData/kandang";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Data Kandang",
  }),
  setup() {
    const schema = y$object({
      nama_kandang: y$string().required().label("Nama"),
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
      nama_kandang: "",
    },
    // UI
    modal: {
      addKandang: false,
      ubahKandang: false,
      confirm: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "nama_kandang",
          th: "Nama Kandang",
        },
        {
          name: "blok_kandang",
          th: "Blok Kandang",
        },
        {
          name: "populasi_kandang",
          th: "Populasi Kandang",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-kandang",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-kandang",
        },
        {
          text: "Hapus",
          color: "danger",
          event: "hapus-kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kandang, ["g$kandangList", "g$kandangDetail"]),
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
    await this.a$kandangList().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kandang, ["a$kandangAdd", "a$kandangList", "a$kandangDelete", "a$kandangEdit"]),
    clearInput() {
      this.input = {
        id: null,
        nama_kandang: "",
        deskripsi: "",
        komposisi: "",
      };
    },
    async addKandang() {
      try {
        const { nama_kandang, deskripsi, komposisi } = this.input;
        const data = {
          nama_kandang,
          deskripsi,
          komposisi,
        };
        await this.schema.validate(data);
        await this.a$kandangAdd(data);
        this.modal.addKandang = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
    },
    async editKandang() {
      try {
        const { id, nama_kandang, deskripsi, komposisi } = this.input;
        const data = {
          id,
          nama_kandang,
          deskripsi,
          komposisi,
        };
        await this.schema.validate(data);
        await this.a$kandangEdit(data);
        this.modal.ubahKandang = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
    },
    async delKandang() {
      try {
        const { id } = this.input;
        await this.a$kandangDelete(id);
        this.modal.confirm = false;
        this.notify(`Hapus ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList();
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_kandang, nama_kandang, deskripsi, komposisi } = row;
        this.input = {
          id: id_kandang,
          nama_kandang,
          deskripsi,
          komposisi,
        };
        this.modal.ubahKandang = true;
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
    async triggerDelete(row) {
      try {
        const { id_kandang, nama_kandang } = row;
        this.input = {
          id: id_kandang,
          nama_kandang,
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
          <base-button type="success" @click="modal.addKandang = true"> Tambah {{ pageTitle }} </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kandangList.length" :text="`${pageTitle}`" />
      <data-table v-else :index="true" :data="g$kandangList" :columns="dt.column" :actions="dt.action" @ubah-kandang="triggerEditModal" @hapus-kandang="triggerDelete" />
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.addKandang" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKandang" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_kandang" type="text" name="nama_kandang">
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
          <base-button type="secondary" @click="modal.addKandang = false"> Tutup </base-button>
          <base-button type="primary" @click="addKandang()"> Tambah {{ pageTitle }} </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.ubahKandang" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKandang" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_kandang" type="text" name="nama_kandang">
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
          <base-button type="secondary" @click="modal.ubahKandang = false"> Tutup </base-button>
          <base-button type="primary" @click="editKandang()"> Simpan Perubahan </base-button>
        </template>
      </modal-comp>
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}: <strong>{{ input.nama_kandang }}</strong>
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
