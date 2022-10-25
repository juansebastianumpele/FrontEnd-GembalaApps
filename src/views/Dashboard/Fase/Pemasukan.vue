<script>
import { mapActions, mapState } from "pinia";
import HcColumn from "@/components/HighCharts/Column.vue";
import HcLine from "@/components/HighCharts/Line.vue";
import HcPie from "@/components/HighCharts/Pie.vue";
import HcBar from "@/components/HighCharts/Bar.vue";
import d$chart from "@/stores/chart";
import d$dropdowm from "@/stores/dropdown";
import d$kandang from "@/stores/monitoring/daftarkandang";
import d$pakan from "@/stores/monitoring/pakan";

export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
  }),
  components: {
    HcColumn,
    HcLine,
    HcPie,
    HcBar,
  },
  data: () => ({
    pageTitle: "Fase Pemasukan",
    input: {
      varietas: null,
      fase: null,
      kandang: null,
    },
    dt: {
      column: [
        {
          name: "nomor",
          th: "ID Ternak",
        },
        {
          name: "nama_varietas",
          th: "Bangsa",
        },
        {
          name: "fase",
          th: "Fase Pemeliharaan",
        },
        {
          name: "kandang.kode_kandang",
          th: "Kandang",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-ternak",
        },
      ],
    },
    // UI
    isSearch: false,
    modal: {
      detailTernak: false,
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
    ]),
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
      } catch (error) {}
    },
    clearAll() {
      this.input.varietas = null;
      this.input.fase = null;
      this.input.kandang = null;
      this.isSearch = false;
    },

    showReload: function () {
      setInterval(function () {
        window.location.reload();
      }, 60000);
    },
  },
  async mounted() {
    await this.a$tabelKandang(this.userInfo.id);
    await this.a$byPopulasi(this.userInfo.id);
    await this.a$byKesehatan(this.userInfo.id);
    await this.a$byJeniskelamin(this.userInfo.id);
    await this.a$byFase(this.userInfo.id);
    await this.a$ddVarietas();
    await this.a$ddFasePemeliharaan();
    await this.a$ddKandang(this.userInfo.id);
    await this.a$totalKandang({ id: this.userInfo.id });
    await this.a$totalPakan({ id: this.userInfo.id });
    this.showReload();
  },
};
</script>

<template style="background: transparent">
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #body>
      <div class="row">
        <div class="col-md-12">
          <card-comp>
            <div class="row">
              <div class="col">
                <h1>
                  <strong class="text-success">{{ pageTitle }}</strong>
                </h1>
              </div>
            </div>
          </card-comp>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <card-comp class="m-0">
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-black text-center ls-1 mb-4"
                  style="font-size: 16px"
                >
                  Populasi {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-bar
              :height="150"
              :data="g$byFase"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
        <div class="col-8">
          <card-comp>
            <base-button type="success1">
              <h3 class="text-white">Kandang R1</h3>
              <h2 class="text-white">21</h2>
              <h4 class="text-white">Ekor</h4>
            </base-button>
          </card-comp>
        </div>
      </div>
    </template>
  </main-layout>
</template>
