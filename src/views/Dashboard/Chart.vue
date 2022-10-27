<script>
import { mapActions, mapState } from "pinia";
import HcColumn from "@/components/HighCharts/Column.vue";
import HcLine from "@/components/HighCharts/Line.vue";
import HcPie from "@/components/HighCharts/Pie.vue";
import HcBar from "@/components/HighCharts/Bar.vue";
import HcAreaSpline from "@/components/HighCharts/AreaSpline.vue";
import d$dashboard from "@/stores/dashboard";
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
    HcAreaSpline,
    Cuaca,
  },
  data: () => ({
    pageTitle: "Beranda",
  }),
  computed: {
    ...mapState(d$dashboard, [
      "g$totalByStatus",
      "g$totalKandang",
      "g$totalTernak",
      "g$totalByFase",
      "g$totalByStatusKeluar",
      "g$totalAdgCempe",
      "g$totalByKandang",
    ]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  methods: {
    ...mapActions(d$dashboard, [
      "a$totalByStatus",
      "a$totalKandang",
      "a$totalTernak",
      "a$totalByFase",
      "a$totalByStatusKeluar",
      "a$totalByKandang",
    ]),
  },
  async mounted() {
    await this.a$totalByStatus().catch((error) => this.notify(error, false));
    await this.a$totalKandang().catch((error) => this.notify(error, false));
    await this.a$totalTernak().catch((error) => this.notify(error, false));
    await this.a$totalByFase().catch((error) => this.notify(error, false));
    await this.a$totalByStatusKeluar().catch((error) =>
      this.notify(error, false)
    );
    await this.a$totalByKandang().catch((error) => this.notify(error, false));
  },
};
</script>

<template style="background: transparent">
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #body>
      <div class="row">
        <!-- kolom pertama -->
        <div class="col-sm-4">
          <card-comp type="success">
            <h1
              class="text-white text-uppercase text-center ls-1 mt-0 mb-2"
              style="font-size: 12px"
            >
              Grafik Populasi Domba Sembada (2022 - 2023)
            </h1>
            <hc-column
              :height="200"
              :data="g$byPopulasi"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
          <card-comp type="success" class="mt--3">
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-white text-uppercase text-center ls-1 mb-2"
                  style="font-size: 12px"
                >
                  Detail Populasi Domba Sembada
                </h1>
              </div>
            </div>
            <hc-pie
              :title="g$totalTernak.total_ternak"
              :height="255"
              :data="g$totalByStatus"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>

        <!-- kolom kedua -->
        <div class="col-sm-4" style="width: 100%">
          <card-comp type="success">
            <div class="row align-items-center">
              <div class="d-flex flex-row" style="width: 100%">
                <div class="col">
                  <img
                    alt="Image placeholder"
                    src="/images/domba.jpg"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <h2 class="text-center text-white" style="font-size: 24px">
                    {{ g$totalTernak.total_ternak }}
                  </h2>
                  <h2 class="text-center text-white" style="font-size: 12px">
                    Ekor
                  </h2>
                </div>
                <div class="col">
                  <img
                    alt="Image placeholder"
                    src="/images/kandang.png"
                    class="img-fluid"
                  />
                </div>
                <div class="col">
                  <h2 class="text-center text-white" style="font-size: 24px">
                    {{ g$totalKandang.total_kandang }}
                  </h2>
                  <h2 class="text-center text-white" style="font-size: 12px">
                    Kandang
                  </h2>
                </div>
              </div>
            </div>
          </card-comp>
          <card-comp type="success" class="mt--3">
            <div class="row align-items-center">
              <div class="col">
                <h1 class="text-white text-left mb-4" style="font-size: 24px">
                  Fase Pemeliharaan
                </h1>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/pemasukan">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Pemasukan
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[0] ? g$totalByFase[0].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/adaptasi">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Adaptasi
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[1] ? g$totalByFase[1].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/perkawinan">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Perkawinan
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[3] ? g$totalByFase[3].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/pemasukan">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Kebuntingan
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[4] ? g$totalByFase[4].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/pemasukan">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Kelahiran
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[5] ? g$totalByFase[5].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
                <div class="col-0 mb-3">
                  <base-button
                    type="secondary"
                    class="btn-md"
                    style="width: 100%"
                  >
                    <router-link to="/fase/pemasukan">
                      <div class="row">
                        <div
                          class="col-6 text-success text-left"
                          style="font-family: inherit"
                        >
                          Fase Lepas Sapih
                        </div>
                        <div
                          class="col-3 text-success font-weight-bolder"
                          style="font-size: x-large"
                        >
                          {{
                            g$totalByFase[6] ? g$totalByFase[6].total_ternak : 0
                          }}
                        </div>
                        <div class="col-3 text-success">Ekor</div>
                      </div>
                    </router-link>
                  </base-button>
                </div>
              </div>
            </div>
          </card-comp>
        </div>

        <!-- kolom ketiga -->
        <div class="col-sm-4">
          <!-- cuaca -->
          <card-comp type="success">
            <h1
              class="text-white text-uppercase text-center ls-1 mt-0 mb-2"
              style="font-size: 12px"
            >
              Cuaca hari ini di Selomartani
            </h1>
            <cuaca />
          </card-comp>
          <card-comp type="success">
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-white text-uppercase text-center ls-1 mb-1"
                  style="font-size: 12px"
                >
                  Grafik ADG Cempe
                </h1>
              </div>
            </div>
            <hc-area-spline
              :height="243"
              :categories="[1, 2, 3, 4, 5]"
              :series="[32, 32, 12, 12, 13]"
              :subtitles="test"
              :title="test"
            />
          </card-comp>
          <card-comp type="success">
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-white text-uppercase text-center mt--3 ls-1 mb-1"
                  style="font-size: 12px"
                >
                  Status Keluar
                </h1>
              </div>
            </div>
            <div class="row mt-2 p-0">
              <div class="col-3 bg-white ml-4 rounded">
                <p class="text-lg text-dark text-center font-weight-bolder">
                  {{ g$totalByStatusKeluar.total_terjual }}
                </p>
                <p
                  class="text-dark text-center mt--3"
                  style="font-size: 13px; font-family: inherit"
                >
                  Terjual
                </p>
              </div>
              <div class="col-3 bg-white ml-4 rounded">
                <p class="text-lg text-dark text-center font-weight-bolder">
                  {{ g$totalByStatusKeluar.total_disembelih }}
                </p>
                <p
                  class="text-dark text-center mt--3"
                  style="font-size: 13px; font-family: inherit"
                >
                  Disembelih
                </p>
              </div>
              <div class="col-3 bg-white ml-4 rounded">
                <p class="text-lg text-dark text-center font-weight-bolder">
                  {{ g$totalByStatusKeluar.total_mati }}
                </p>
                <p
                  class="text-dark text-center mt--3"
                  style="font-size: 13px; font-family: inherit"
                >
                  Mati
                </p>
              </div>
            </div>
          </card-comp>
        </div>
      </div>
      <div class="row mt--9">
        <div class="col-8">
          <card-comp type="success" class="m-0 p-0">
            <div class="row text-white">
              <div class="col-3 mr-5">
                <div class="bg-white p-3 rounded">
                  <h3 class="text-dark text-center">Populasi Kandang</h3>
                </div>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center border-right">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[0] ? g$totalByKandang[0].jenis_kandang : ""
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[0] ? g$totalByKandang[0].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center border-right">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[1] ? g$totalByKandang[1].jenis_kandang : ""
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[1] ? g$totalByKandang[1].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center border-right">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[2] ? g$totalByKandang[2].jenis_kandang : ""
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[2] ? g$totalByKandang[2].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center border-right">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[3] ? g$totalByKandang[3].jenis_kandang : ""
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[3] ? g$totalByKandang[3].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center border-right">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[4] ? g$totalByKandang[4].jenis_kandang : ""
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[4] ? g$totalByKandang[4].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
              <div class="col-1 p-0 pr-3 mr-4 text-center">
                <h6 class="text-white m-0">
                  {{
                    g$totalByKandang[5]
                      ? g$totalByKandang[5].jenis_kandang
                      : "Kandang Error"
                  }}
                </h6>
                <h2
                  class="text-white m-0"
                  style="font-size: x-large; font-weight: bold"
                >
                  {{
                    g$totalByKandang[5] ? g$totalByKandang[5].total_ternak : 0
                  }}
                </h2>
                <h5 class="text-white m-0">Ekor</h5>
              </div>
            </div>
          </card-comp>
        </div>
      </div>
    </template>
  </main-layout>
</template>
