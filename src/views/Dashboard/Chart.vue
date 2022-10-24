<script>
import { mapActions, mapState } from "pinia";
import HcColumn from "@/components/HighCharts/Column.vue";
import HcLine from "@/components/HighCharts/Line.vue";
import HcPie from "@/components/HighCharts/Pie.vue";
import HcBar from "@/components/HighCharts/Bar.vue";

import d$chart from "@/stores/chart";
import d$dropdowm from "@/stores/dropdown";
import d$kandang from "../../stores/monitoring/daftarkandang";
import d$pakan from "../../stores/monitoring/pakan";
import d$ternak from "../../stores/monitoring/ternak";

import Cuaca from "../../components/HighCharts/Cuaca.vue";

export default {
  metaInfo: () => ({
    title: "Beranda",
  }),
  components: {
    HcColumn,
    HcLine,
    HcPie,
    HcBar,
    Cuaca,
  },
  data: () => ({
    pageTitle: "Beranda",
  }),
  computed: {
    ...mapState(d$chart, [
      "g$byFase",
      "g$byGenderChart",
      "g$byKesehatan",
      "g$byJeniskelamin",
      "g$byPopulasi",
      "g$DonutbyFase",
      "g$tabelKandang",
      "g$tabelFilter",
    ]),
    ...mapState(d$dropdowm, [
      "g$ddVarietas",
      "g$ddFasePemeliharaan",
      "g$ddKandang",
    ]),
    ...mapState(d$kandang, ["g$totalKandang"]),
    ...mapState(d$pakan, ["g$totalPakan"]),
    ...mapState(d$ternak, ["g$totalTernak"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  methods: {
    ...mapActions(d$chart, [
      "a$byKesehatan",
      "a$byPopulasi",
      "a$byFase",
      "a$tabelKandang",
      "a$tabelFilter",
      "a$byJantan",
      "a$byBetina",
    ]),
    ...mapActions(d$kandang, ["a$totalKandang"]),
    ...mapActions(d$pakan, ["a$totalPakan"]),
    ...mapActions(d$dropdowm, [
      "a$ddVarietas",
      "a$ddFasePemeliharaan",
      "a$ddKandang",
    ]),
    ...mapActions(d$ternak, ["a$totalTernak"]),
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
  },
  async mounted() {
    await this.a$totalPakan().catch((error) => this.notify(error, false));
    await this.a$totalKandang().catch((error) => this.notify(error, false));
    await this.a$totalTernak().catch((error) => this.notify(error, false));
    await this.a$byJantan().catch((error) => this.notify(error, false));
    await this.a$byBetina().catch((error) => this.notify(error, false));
    await this.a$tabelKandang().catch((error) => this.notify(error, false));
    await this.a$byFase().catch((error) => this.notify(error, false));
    await this.a$ddVarietas().catch((error) => this.notify(error, false));
    await this.a$ddFasePemeliharaan().catch((error) =>
      this.notify(error, false)
    );
    await this.a$byKesehatan().catch((error) => this.notify(error, false));
    await this.a$ddKandang().catch((error) => this.notify(error, false));
    await this.a$byPopulasi(this.userInfo.id);
  },
};
</script>

<template style="background: transparent">
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #body>
      <div class="row">
        <!-- kolom pertama -->
        <div class="col-sm-4">
          <card-comp>
            <h1
              class="text-black text-uppercase text-center ls-1 mt-0 mb-2"
              style="font-size: 12px"
            >
              Grafik Populasi Domba Sembada (2022 - 2023)
            </h1>
            <hc-column
              :height="230"
              :data="g$byPopulasi"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-black text-uppercase text-center ls-1 mb-1"
                  style="font-size: 12px"
                >
                  Detail Populasi Domba Sembada
                </h1>
              </div>
            </div>
            <hc-pie
              :height="455"
              :data="g$DonutbyFase"
              :data-labels="true"
              :legend="true"
              style="font-size: 14px"
            />
          </card-comp>
          <!-- <card-comp>
            <h1
              class="text-black text-uppercase text-center ls-1 mt-4 mb-1"
              style="font-size: 12px"
            >
              Populasi Jenis Kelamin
            </h1>
            <hc-column
              :height="240"
              :data="g$byJeniskelamin"
              :data-labels="true"
              :legend="true"
            />
          </card-comp> -->
          <!-- <card-comp>
            <base-table
              :height="230"
              thead-classes="thead-light"
              :index-number="false"
              :data="g$tabelKandang"
            >
              <template #columns>
                <th class="px-1">Kode Kandang</th>
                <th class="px-1">Populasi</th>
                <th class="px-1">Rata-rata</th>
              </template>
              <template #default="{ item }">
                <td class="px-2 pl-5">{{ item.kode_kandang }}</td>
                <td class="px-4">{{ item.populasi }}</td>
                <td class="px-3">{{ item.berat_rata.toFixed(2) }}</td>
              </template>
            </base-table>
          </card-comp> -->
        </div>

        <!-- kolom kedua -->
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="d-flex flex-row">
                <div class="col">
                  <img
                    alt="Image placeholder"
                    src="/images/domba.jpg"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <h2 class="text-center" style="font-size: 24px">
                    {{ g$totalTernak }}
                  </h2>
                  <h2 class="text-center" style="font-size: 12px">Ekor</h2>
                </div>
                <div class="col">
                  <img
                    alt="Image placeholder"
                    src="/images/kandang.png"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <h2 class="text-center" style="font-size: 24px">
                    {{ g$totalKandang }}
                  </h2>
                  <h2 class="text-center" style="font-size: 12px">Kandang</h2>
                </div>
                <!-- <div class="col">
                  <img
                    alt="Image placeholder"
                    src="/images/pakan.png"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <h2 class="text-center" style="font-size: 24px">
                    {{ g$totalPakan }}
                  </h2>
                  <h2 class="text-center" style="font-size: 12px">Pakan</h2>
                </div> -->
              </div>
            </div>
          </card-comp>
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-black text-uppercase text-center ls-1 mb-1"
                  style="font-size: 12px"
                >
                  Populasi Berdasarkan Fase Pemeliharaan
                </h1>
              </div>
            </div>
            <hc-bar
              :height="450"
              :data="g$byFase"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>

        <!-- kolom ketiga -->
        <div class="col-sm-4">
          <!-- cuaca -->
          <card-comp>
            <h1
              class="text-black text-uppercase text-center ls-1 mt-0 mb-2"
              style="font-size: 12px"
            >
              Cuaca hari ini di Selomartani
            </h1>
            <cuaca />
          </card-comp>
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-black text-uppercase text-center ls-1 mb-1"
                  style="font-size: 12px"
                >
                  Populasi Berdasarkan Status Kesehatan
                </h1>
              </div>
            </div>
            <hc-pie
              :height="253"
              :data="g$byKesehatan"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
      </div>
    </template>
  </main-layout>
</template>
