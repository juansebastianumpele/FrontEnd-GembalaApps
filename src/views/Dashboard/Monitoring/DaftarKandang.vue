<script>
import { mapActions, mapState } from "pinia";
import d$daftarkandang from "@/stores/monitoring/daftarkandang";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Kandang",
  }),
  setup() {
    const schema = y$object({
      nama_kandang: y$string().required().label("Jenis Kandang"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Kandang",
    // Input
    input: {
      id: null,
      id_users: null,
      nama_kandang: "",
      blok_kandang: "",
      total: "",
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
          name: "blok_kandang",
          th: "Kode Kandang",
        },
        {
          name: "nama_kandang",
          th: "Jenis Kandang",
        },
        {
          name: "total",
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
          text: "Delete",
          color: "danger",
          event: "hapus-kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$daftarkandang, ["g$kandangList", "g$kandangDetail"]),
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
    await this.a$kandangList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$daftarkandang, [
      "a$kandangAdd",
      "a$kandangList",
      "a$kandangDelete",
      "a$kandangEdit",
    ]),
    clearInput() {
      this.input = {
        id: null,
        id_users: "",
        nama_kandang: "",
        blok_kandang: "",
        total: "",
      };
    },
    async addKandang() {
      try {
        const { nama_kandang, blok_kandang } = this.input;
        const data = {
          id_users: this.userInfo.id,
          nama_kandang,
          blok_kandang,
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
        const { id, nama_kandang, blok_kandang } = this.input;
        const data = {
          id,
          nama_kandang,
          blok_kandang,
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
        const { id_users, id_kandang, nama_kandang, blok_kandang, total } = row;
        this.input = {
          id: id_kandang,
          id_users,
          nama_kandang,
          blok_kandang,
          total,
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
          name: "Detail Kandang",
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
          <base-button type="success" @click="modal.addKandang = true">
            Tambah {{ pageTitle }}
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kandangList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kandangList"
        :columns="dt.column"
        :actions="dt.action"
        @ubah-kandang="triggerEditModal"
        @hapus-kandang="triggerDelete"
        @detail-kandang="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- Tambah kandang -->
      <modal-comp v-model:show="modal.addKandang" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKandang" :validation-schema="schema">
            <div class="row">
              <!-- Kode kandang -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.blok_kandang"
                  type="text"
                  name="blok_kandang"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Kode Kandang"
                  ></base-input>
                </field-form>
              </div>

              <!-- Jenis Kandang -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_kandang"
                  type="text"
                  name="nama_kandang"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Jenis Kandang"
                    required
                  ></base-input>
                </field-form>
              </div>

            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addKandang = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addKandang()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah kandang -->
      <modal-comp v-model:show="modal.ubahKandang" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKandang" :validation-schema="schema">
            <div class="row">
              <!-- Kode kandang -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.blok_kandang"
                  type="text"
                  name="blok_kandang"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Kode Kandang"
                  ></base-input>
                </field-form>
              </div>

              <!-- Jenis kandang -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.nama_kandang"
                  type="text"
                  name="nama_kandang"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="Jenis Kandang"
                    required
                  ></base-input>
                </field-form>
              </div>

            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahKandang = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editKandang()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus kandang -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.nama_kandang }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delKandang()">Hapus</base-button>
        </template>
      </modal-comp>

    </template>
  </main-layout>
</template>
