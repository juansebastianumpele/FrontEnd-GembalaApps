<script>
import { mapActions, mapState } from "pinia";
import d$chart from "@/stores/chart";
import d$dropdowm from "@/stores/dropdown";
import d$costumer from "../../../stores/customer";
import d$kandang from "../../../stores/monitoring/daftarkandang";
import d$pakan from "../../../stores/monitoring/pakan";

import {
  object as y$object,
  array as y$array,
  string as y$string,
  ref as y$ref,
} from "yup";

export default {
  metaInfo: () => ({
    title: "Penjualan",
  }),
  setup() {
    const schema = y$object({
      id_ternak: y$string().required().label("ID Ternak"),
      harga_per: y$string().required().label("Harga Per"),
      harga: y$string().required().label("Harga"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Penjualan",
    input: {
      varietas: null,
      fase: null,
      kandang: null,
      id_ternak: "",
      harga_per: "",
      harga: "",
    },
    dt: {
      column: [
        {
          name: "nomor",
          th: "Nomor Ternak",
        },
        {
          name: "nama_varietas",
          th: "Varietas",
        },
        {
          name: "fase",
          th: "Fase Pemeliharaan",
        },
        {
          name: "nama_kandang",
          th: "Kandang",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak",
        },
        {
          text: "Jual",
          color: "primary",
          event: "jual-ternak",
        },
      ],
    },
    // UI
    isSearch: false,
    modal: {
      detailTernak: false,
      jualTernak: false,
    },
    selectedTernak: {},
  }),
  computed: {
    ...mapState(d$chart, [
      "g$byGenderChart",
      "g$byKesehatan",
      "g$byJeniskelamin",
      "g$byPopulasi",
      "g$byFase",
      "g$DonutbyFase",
      "g$tabelKandang",
      "g$tabelFilter",
    ]),
    ...mapState(d$dropdowm, [
      "g$ddVarietas",
      "g$ddFasePemeliharaan",
      "g$ddKandang",
      "g$ddJenisHarga",
    ]),
    ...mapState(d$costumer, ["g$costumerDetail"]),
    ...mapState(d$kandang, ["g$totalKandang"]),
    ...mapState(d$pakan, ["g$totalPakan"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
    // },
    // watch: {
    //   modals(val) {
    //     if (!val) {
    //       this.clearInput();
    //     }
    //   },
  },
  methods: {
    ...mapActions(d$chart, [
      "a$byKesehatan",
      "a$byJeniskelamin",
      "a$byPopulasi",
      "a$byFase",
      "a$tabelKandang",
      "a$tabelFilter",
    ]),
    ...mapActions(d$costumer, ["a$costumerDetail"]),
    ...mapActions(d$kandang, ["a$totalKandang"]),
    ...mapActions(d$dropdowm, [
      "a$ddVarietas",
      "a$ddFasePemeliharaan",
      "a$ddKandang",
    ]),
    ...mapActions(d$pakan, ["a$totalPakan"]),
    async filterTernak() {
      const { varietas, fase, kandang } = this.input;
      const data = {
        idUser: this.userInfo.id,
        idVarietas: varietas?.id ?? "",
        idFase: fase?.id ?? "",
        idKandang: kandang?.id ?? "",
      };
      await this.a$tabelFilter(new URLSearchParams(data).toString());
      this.isSearch = true;
    },

    async triggerdetailTernak(row) {
      try {
        this.selectedTernak = { ...row };
        this.modal.detailTernak = true;
        console.log(this.selectedTernak);
      } catch (error) {}
    },
    async triggerJualTernak(row) {
      try {
        this.selectedTernak = { ...row };
        this.input.id_ternak = this.selectedTernak.id_ternak;
        this.modal.jualTernak = true;
      } catch (error) {}
    },
    async addJualTernak() {
      try {
        const jual = {
          id_ternak: this.input.id_ternak,
          harga_per: this.input.harga_per,
          harga: this.input.harga
        }

        console.log(jual);
        console.log(d$dropdowm.g$ddJenisHarga)
        await this.schema.validate(jual);
        // await this.a$jualTernak(jual);
        this.modal.jualTernak = false;
        this.notify(`Tambah ${this.pageTitle} Sukses!`);
      } catch (error) {
        console.log(error);
        this.notify(error, false);
      }
    },
    clearAll() {
      this.input.varietas = null;
      this.input.fase = null;
      this.input.kandang = null;
      this.isSearch = false;
    },
  },
  async mounted() {
    await this.filterTernak();
    await this.a$tabelKandang(this.userInfo.id);
    await this.a$byPopulasi(this.userInfo.id);
    await this.a$byKesehatan(this.userInfo.id);
    await this.a$byJeniskelamin(this.userInfo.id);
    await this.a$byFase(this.userInfo.id);
    await this.a$ddVarietas();
    await this.a$ddFasePemeliharaan();
    await this.a$ddKandang(this.userInfo.id);
    await this.a$costumerDetail({ id: this.userInfo.id });
    await this.a$totalKandang({ id: this.userInfo.id });
    await this.a$totalPakan({ id: this.userInfo.id });
  },
};
</script>

<template style="background: transparent">
  <main-layout :title="pageTitle" style="background: transparent">
    <template #body>
      <div class="row">
        <div class="col-md-12">
          <card-comp>
            <div class="row">
              <div class="col">
                <base-input class="m-0" name="varietas" placeholder="Varietas">
                  <multi-select
                    v-model="input.varietas"
                    :options="g$ddVarietas"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Varietas"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col">
                <base-input class="m-0" name="fase" placeholder="Fase">
                  <multi-select
                    v-model="input.fase"
                    :options="g$ddFasePemeliharaan"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Fase Pemeliharaan"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col">
                <base-input class="m-0" name="kandang" placeholder="Kandang">
                  <multi-select
                    v-model="input.kandang"
                    :options="g$ddKandang"
                    label="name"
                    track-by="id"
                    placeholder="Pilih Kandang"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-auto">
                <base-button
                  class="m-0"
                  size="md"
                  type="primary"
                  @click="filterTernak"
                  >Cari</base-button
                >
                <base-button
                  class="ml-2"
                  size="md"
                  type="danger"
                  @click="clearAll"
                  >Clear</base-button
                >
              </div>
            </div>
          </card-comp>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <card-comp bodyClasses="p-0">
            <data-table
              :index="false"
              :limitable="false"
              :searchable="false"
              :data="g$tabelFilter"
              :columns="dt.column"
              :actions="dt.action"
              @detail-ternak="triggerdetailTernak"
              @jual-ternak="triggerJualTernak"
            />
          </card-comp>
        </div>
      </div>
    </template>

    <template #modal>
      <modal-comp v-model:show="modal.jualTernak" modal-classes="modal-lg">
        <template #header>
          <h3 class="modal-title">Tambah {{ pageTitle }} Baru</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.jualTernak" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form
                  v-slot="{ field }"
                  v-model="input.id_ternak"
                  type="text"
                  name="id_ternak"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Text"
                    label="ID Ternak"
                    disabled
                  ></base-input>
                </field-form>
              </div>
              <div class="col-6">
                <base-input
                  name="harga_per"
                  placeholder="Jenis Harga"
                  label="Harga Per"
                >
                  <multi-select
                    v-model="input.harga_per"
                    :options="g$ddJenisHarga"
                    placeholder="Pilih Jenis Harga"
                    :show-labels="false"
                  />
                </base-input>
              </div>
              <div class="col-6">
                <field-form
                  v-slot="{ field }"
                  v-model="input.harga"
                  type="number"
                  name="harga"
                >
                  <base-input
                    v-bind="field"
                    placeholder="Harga berdasarkan jenis harga"
                    label="Harga"
                    required
                  ></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.jualTernak = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="addJualTernak()">
            Tambah {{ pageTitle }}
          </base-button>
        </template>
      </modal-comp>

      <modal-comp v-model:show="modal.detailTernak" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">
            Detail Ternak Nomor {{ selectedTernak.nomor }}
          </h3>
        </template>
        <template v-if="isSearch" #body>
          <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden">
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Nomor Ternak</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.nomor }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID RFID</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.rf_id ?? "-" }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Varietas</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.nama_varietas }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Kelamin</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.jenis_kelamin['0'] }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Dam (Ibu)</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.id_induk }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">ID Sire (Bapak)</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.id_pejantan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Kandang</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.nama_kandang }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Fase Pemeliharaan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300"> {{ selectedTernak.fase }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Jenis Pakan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.nama_pakan }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Berat</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.berat_berkala }} Kg</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Suhu</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.suhu_berkala }} °C</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status Kesehatan</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.status_sehat['0'] }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Nama Penyakit</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.nama_penyakit }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Tanggal Masuk</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.tanggal_masuk }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Umur</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.umur }} Bulan</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Tanggal Keluar</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.tanggal_keluar ?? "-" }}</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <span style="font-weight: 600">Status Keluar</span>
              </div>
              <div class="col">
                :
                <span style="font-weight: 300">
                  {{ selectedTernak.status_keluar ?? "-" }}</span
                >
              </div>
            </div>
          </div>
        </template>
        <template #footer> </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
