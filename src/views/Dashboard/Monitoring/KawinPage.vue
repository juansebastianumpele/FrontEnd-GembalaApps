<script>
import { mapActions, mapState } from "pinia";
import d$kawin from "@/stores/monitoring/kawin";
import d$dropdown from "@/stores/dropdown";

import { object as y$object, string as y$string, ref as y$ref } from "yup";
import router from "../../../router";

export default {
  metaInfo: () => ({
    title: "Data Perkawinan",
  }),
  setup() {
    const schema = y$object({});
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Data Domba Betina",
    // Input
    input: {
      id: null,
      tanggal_kawin: "",
      id_ternak: "",
      id_pemancek: "",
      id_kandang: "",
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
          th: "ID Indukan",
        },
        {
          name: "nama_varietas",
          th: "Varietas",
        },
        {
          name: "nama_kandang",
          th: "Kode Kandang",
        },
        {
          name: "fase",
          th: "Fase Pemeliharaan",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "list-kawin",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$kawin, ["g$kawinList", "g$jantan"]),
    ...mapState(d$dropdown, ["g$ddListBetina", "g$ddListPejantan", "g$ddKandang"]),
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
    await this.a$betinaList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
    await this.a$jantanList(this.userInfo.id).catch((error) =>
      this.notify(error, false)
    );
  },
  methods: {
    ...mapActions(d$kawin, ["a$betinaList", "a$jantanList"]),
    clearInput() {
      this.input = {
        id: null,
      };
    },
    async triggerDetail(row) {
      try {
        const { id_ternak } = row;
        router.push({
          name: "Detail Kawin",
          params: {
            id: id_ternak,
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
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$kawinList.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kawinList"
        :columns="dt.column"
        :actions="dt.action"
        @list-kawin="triggerDetail"
      />
    </template>

    <template #modal>
      <!-- Tambah kawin -->
      <modal-comp v-model:show="modal.addKawin" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.addKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input
                  name="tanggal_kawin"
                  class=""
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Kawin"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_kawin"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Kawin"
                  />
                </base-input>
              </div>

              <!-- Input biasa -->
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Masukan ID Indukan Betina" label="ID Indukan" required></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_pemancek"
                  type="text"
                  name="id_pemancek"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Masukan ID Indukan Pejantan"
                    label="ID Pemancek"
                    required
                  ></base-input>
                </field-form>
              </div> -->

              <!-- Input select -->
              <!-- Input betina -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Indukan" label="ID Indukan" required>
                  <multi-select v-model="input.id_ternak" :options="g$kawinList" label="id_ternak" track-by="id_ternak" placeholder="Pilih/Masukan ID Indukan Betina" :show-labels="false" />
                </base-input>
              </div>
              <!-- Input pemacek -->
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Pemacek" label="ID Pemacek" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListPejantan" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Pejantan" :show-labels="false" />
                </base-input>
              </div>
              <!-- Input kode kandang -->
              <div class="col-12">
                <base-input name="id_kandang" placeholder="ID Kandang" label="ID Kandang" required>
                  <multi-select v-model="input.id_kandang" :options="g$ddKandang" label="name" track-by="id" placeholder="Pilih/Masukan ID Kandang" :show-labels="false" />
                </base-input>
              </div>

            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.addKawin = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addKawin()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <!-- Ubah kawin -->
      <modal-comp v-model:show="modal.ubahKawin" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Detail {{ pageTitle }}</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.ubahKawin" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <base-input
                  name="tanggal_kawin"
                  class=""
                  placeholder="YYYY-MM-DD"
                  label="Tanggal Kawin"
                  required
                >
                  <flat-pickr
                    v-model.lazy="input.tanggal_kawin"
                    :config="{ mode: 'single', allowInput: true }"
                    class="form-control datepicker"
                    placeholder="Pilih Tanggal Kawin"
                  />
                </base-input>
              </div>
              <!-- Input biasa tanpa cek data -->
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_ternak" type="text" name="id_ternak">
                  <base-input v-bind="field" placeholder="Masukan ID Indukan Betina" label="ID Indukan" required></base-input>
                </field-form>
              </div> -->
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_pemancek"
                  type="text"
                  name="id_pemancek"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Masukan ID Indukan Pejantan"
                    label="ID Pemancek"
                    required
                  ></base-input>
                </field-form>
              </div>
              <!-- <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Indukan" label="ID Indukan" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListBetina" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Betina" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-12">
                <base-input name="id_ternak" placeholder="ID Pemacek" label="ID Pemacek" required>
                  <multi-select v-model="input.id_ternak" :options="g$ddListPejantan" label="name" track-by="id" placeholder="Pilih/Masukan ID Indukan Pejantan" :show-labels="false" />
                </base-input>
              </div> -->
              <!-- <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.id_cempe" type="text" name="id_cempe">
                  <base-input v-bind="field" placeholder="Masukan ID Cempe" label="ID Cempe" required></base-input>
                </field-form>
              </div> -->
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.ubahKawin = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editKawin()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus kawin -->
      <modal-comp v-model:show="modal.confirm" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Hapus {{ pageTitle }}</h3>
        </template>
        <template #body>
          <p>
            Yakin ingin menghapus {{ pageTitle }}:
            <strong>{{ input.id_ternak }}</strong>
          </p>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.confirm = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="delKawin()">Hapus</base-button>
        </template>
      </modal-comp>

    </template>
  </main-layout>
</template>
