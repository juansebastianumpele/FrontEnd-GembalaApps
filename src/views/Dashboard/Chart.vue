<script>
import { mapActions, mapState } from "pinia";
import HcColumn from "@/components/HighCharts/Column.vue";
import HcLine from "@/components/HighCharts/Line.vue";
import HcPie from "@/components/HighCharts/Pie.vue";
import HcBar from "@/components/HighCharts/Bar.vue";
import d$chart from "@/stores/chart";
import d$dropdowm from "@/stores/dropdown";
import d$costumer from "../../stores/customer";
import d$kandang from "../../stores/masterData/kandang";
import d$pakan from "../../stores/masterData/pakan";

export default {
  metaInfo: () => ({
    title: "Beranda",
  }),
  components: {
    HcColumn,
    HcLine,
    HcPie,
    HcBar,
  },
  data: () => ({
    pageTitle: "Beranda",
    input: {
      varietas: null,
      fase: null,
      kandang: null,
    },
  }),
  computed: {
    ...mapState(d$chart, ["g$byGenderChart", "g$byKesehatan", "g$byJeniskelamin", "g$byPopulasi", "g$byFase"]),
    ...mapState(d$dropdowm, ["g$listVarietas", "g$listFase", "g$listKandang"]),
    ...mapState(d$costumer, ["g$costumerDetail"]),
    ...mapState(d$kandang, ["g$totalKandang"]),
    ...mapState(d$pakan, ["g$totalPakan"]),
  },
  methods: {
    ...mapActions(d$chart, ["a$byKesehatan", "a$byJeniskelamin", "a$byPopulasi", "a$byFase"]),
    ...mapActions(d$costumer, ["a$costumerDetail"]),
    ...mapActions(d$kandang, ["a$totalKandang"]),
    ...mapActions(d$dropdowm, ["a$listVarietas", "a$listFase", "a$listKandang"]),
    ...mapActions(d$pakan, ["a$totalPakan"]),
  },
  async mounted() {
    await this.a$byPopulasi(this.userInfo.userId);
    await this.a$byKesehatan(this.userInfo.userId);
    await this.a$byJeniskelamin(this.userInfo.userId);
    await this.a$byFase(this.userInfo.userId);
    await this.a$listVarietas();
    await this.a$listFase();
    await this.a$listKandang({ id: this.userInfo.userId });
    await this.a$costumerDetail({ id: this.userInfo.userId });
    await this.a$totalKandang({ id: this.userInfo.userId });
    await this.a$totalPakan({ id: this.userInfo.userId });
  },
};
</script>

<template style="background: transparent">
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #body style="background: transparent">
      <div class="row">
        <div class="col-md-12">
          <card-comp>
            <div class="row">
              <div class="col">
                <base-input class="m-0" name="varietas" placeholder="Varietas">
                  <multi-select v-model="input.varietas" :options="g$listVarietas" label="name" track-by="id" placeholder="Pilih Varietas" :show-labels="false" />
                </base-input>
              </div>
              <div class="col">
                <base-input class="m-0" name="fase" placeholder="Fase">
                  <multi-select v-model="input.fase" :options="g$listFase" label="name" track-by="id" placeholder="Pilih Fase Pemeliharaan" :show-labels="false" />
                </base-input>
              </div>
              <div class="col">
                <base-input class="m-0" name="kandang" placeholder="Kandang">
                  <multi-select v-model="input.kandang" :options="g$listKandang" label="name" track-by="id" placeholder="Pilih Kandang" :show-labels="false" />
                </base-input>
              </div>
              <div class="col-auto">
                <base-button class="m-0" size="md" type="primary" @click="NotFound">Cari</base-button>
              </div>
            </div>
          </card-comp>
        </div>
        <div class="col-md-5">
          <div class="col-12 px-0">
            <card-comp header-classes="background-color: #FFFFFF">
              <div class="row align-items-center">
                <div class="d-flex flex-row">
                  <div class="col">
                    <img alt="Image placeholder" src="@/assets/images/sheep_1.jpg" class="img-fluid" />
                  </div>
                  <div class="col">
                    <h3 class="text-center" style="font-size: 10px">Populasi Domba</h3>
                    <h2 class="text-center" style="font-size: 10px">{{ g$costumerDetail.jumlah_Ternak }}</h2>
                  </div>
                  <div class="col">
                    <img alt="Image placeholder" src="@/assets/images/Group 127.png" class="img-fluid" />
                  </div>
                  <div class="col">
                    <h3 class="text-center" style="font-size: 10px">Total Kandang</h3>
                    <h2 class="text-center" style="font-size: 10px">{{ g$totalKandang.Jumlah_Kandang }}</h2>
                  </div>
                  <div class="col">
                    <img alt="Image placeholder" src="@/assets/images/Group 128.png" class="img-fluid" />
                  </div>
                  <div class="col">
                    <h3 class="text-center" style="font-size: 10px">Total Pakan</h3>
                    <h2 class="text-center" style="font-size: 10px">{{ g$totalPakan.Jumlah_pakan }}</h2>
                  </div>
                </div>
              </div>
            </card-comp>
          </div>
          <div class="col-12 px-0">
            <card-comp>
              <h1 class="text-black text-uppercase text-center ls-1 mt-0 mb-2" style="font-size: 12px">Grafik Populasi Domba Sembada (2022 - 2023)</h1>
              <hc-column :height="400" :data="g$byPopulasi" :data-labels="true" :legend="true" />
            </card-comp>
          </div>
        </div>
        <div class="col-md-4 px-0">
          <div class="class">
            <card-comp>
              <div class="row align-items-center">
                <div class="col">
                  <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Rata - rata berat tahunan</h1>
                  <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">domba ternak Tahun 2022-2023</h1>
                </div>
              </div>
              <!-- <hc-line :data="g$byWeightChart" :data-labels="true" :legend="true" /> -->
            </card-comp>
            <card-comp style="height: 336px border">
              <div class="row align-items-center">
                <div class="col-12 p-0">
                  <div style="height: 100%">
                    <div class="row align-items-center mb-2">
                      <div class="col">
                        <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Kandang Dara</h1>
                      </div>
                    </div>
                    <div class="row d-flex flex justify-content-center" style="height: 100%">
                      <div class="col-5 mx-2" style="background-color: #e4e9f9">
                        <h1 class="text-black text-uppercase text-center ls-1 mb-1 mt-2" style="font-size: 12px">Total berat</h1>
                        <h2 class="text-center">600 Kg</h2>
                        <h2 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 8px">Rata-rata berat 35 Kg/Domba</h2>
                      </div>

                      <div class="col-5 mx-2" style="background-color: #e4e9f9">
                        <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Populasi</h1>
                        <h2 class="text-center">200 Ekor</h2>
                        <div class="row d-flex flex justify-content-center">
                          <div class="bg-secondary border" style="height: 10px; width: 10px"></div>
                          <h2 class="text-black text-center mx-1" style="font-size: 6pt">Jumlah domba Sakit</h2>
                        </div>
                        <div class="row d-flex flex justify-content-center">
                          <div class="bg-secondary border" style="height: 10px; width: 10px"></div>
                          <h2 class="text-black text-center mx-1" style="font-size: 6pt">Jumlah domba Sakit</h2>
                        </div>
                        <div class="row d-flex flex justify-content-center">
                          <div class="bg-secondary border" style="height: 10px; width: 10px"></div>
                          <h2 class="text-black text-center mx-1" style="font-size: 6pt">Jumlah domba Sakit</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </card-comp>
            <card-comp>
              <h1 class="text-black text-uppercase text-center ls-1 mt-4 mb-1" style="font-size: 12px">Populasi Jenis Kelamin</h1>
              <hc-column :height="150" :data="g$byJeniskelamin" :data-labels="true" :legend="true" />
            </card-comp>
          </div>
        </div>
        <div class="col-md-3 ">
          <card-comp class="px-0">
            <div class="row align-items-center">
              <div class="col">
                <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Populasi Berdasarkan Status Kesehatan</h1>
              </div>
            </div>
            <hc-pie :height="253" :data="g$byKesehatan" :data-labels="true" :legend="true" />
          </card-comp>
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Populasi Berdasarkan Fase Pemeliharaan</h1>
              </div>
            </div>
            <hc-bar :height="250" :data="g$byFase" :data-labels="true" :legend="true" />
          </card-comp>
        </div>
      </div>
    </template>
  </main-layout>
</template>
