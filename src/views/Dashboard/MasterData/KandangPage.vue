<script>
import { mapActions, mapState } from "pinia";
import d$kandang from "@/stores/masterData/kandang";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Kandang",
  }),
  setup() {
    const schema = y$object({
      // id_users: y$string().required().label("ID Users"),
      nama_kandang: y$string().required().label("Nama Kandang"),
      // blok_kandang: y$string().required().label("Blok Kandang"),
      // populasi: y$string().required().label("Populasi Kandang"),
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
      id_users: null,
      nama_kandang: "",
      blok_kandang: "",
      populasi: "",
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
          name: "populasi",
          th: "Jumlah Populasi Ternak",
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
    await this.a$kandangList(this.userInfo.id).catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$kandang, ["a$kandangAdd", "a$kandangList", "a$kandangDelete", "a$kandangEdit"]),
    clearInput() {
      this.input = {
        id: null,
        id_users: "",
        nama_kandang: "",
        blok_kandang: "",
        populasi: "",
      };
    },
    async addKandang() {
      try {
        const { id_users, nama_kandang, blok_kandang, populasi } = this.input;
        const data = {
          id_users,
          nama_kandang,
          blok_kandang,
          populasi,
        };
        await this.schema.validate(data);
        await this.a$kandangAdd(data);
        this.modal.addKandang = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList(this.userInfo.id);
      }
    },
    async editKandang() {
      try {
        const { id, nama_kandang } = this.input;
        const data = {
          id,
          nama_kandang,
        };
        await this.schema.validate(data);
        await this.a$kandangEdit(data);
        this.modal.ubahKandang = false;
        this.notify(`Edit ${this.pageTitle} Sukses!`);
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$kandangList(this.userInfo.id);
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
        this.a$kandangList(this.userInfo.id);
      }
    },
    async triggerEditModal(row) {
      try {
        const { id_users, id_kandang, nama_kandang, blok_kandang, populasi } = row;
        this.input = {
          id: id_kandang,
          id_users,
          nama_kandang,
          blok_kandang,
          populasi,
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
    async triggerDetail(row) {
      try {
        const { id_kandang } = row;
        router.push({
          name: "DetailKandang",
          params: {
            id: id_kandang,
          },
        });
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
      <data-table v-else :index="true" :data="g$kandangList" :columns="dt.column" :actions="dt.action" @ubah-kandang="triggerEditModal" @hapus-kandang="triggerDelete" @detail-kandang="triggerDetail" />
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
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_kandang" type="text" name="nama_kandang">
                  <base-input v-bind="field" placeholder="Text" label="Nama Kandang" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.blok_kandang" type="text" name="blok_kandang">
                  <base-input v-bind="field" placeholder="Text" label="Blok Kandang"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.populasi" type="text" name="populasi">
                  <base-input v-bind="field" placeholder="Text" label="Populasi Kandang"></base-input>
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
                <field-form v-slot="{ field }" v-model="input.id_users" type="text" name="id_users">
                  <base-input v-bind="field" placeholder="Text" label="ID Users"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_kandang" type="text" name="nama_kandang">
                  <base-input v-bind="field" placeholder="Text" label="Nama Kandang" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.blok_kandang" type="text" name="blok_kandang">
                  <base-input v-bind="field" placeholder="Text" label="Blok Kandang"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.populasi" type="text" name="populasi">
                  <base-input v-bind="field" placeholder="Text" label="Populasi Kandang"></base-input>
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
