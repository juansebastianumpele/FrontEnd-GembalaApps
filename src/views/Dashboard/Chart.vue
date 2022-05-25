<script>
import { mapActions, mapState } from "pinia";
import HcColumn from "@/components/HighCharts/Column.vue";
import HcLine from "@/components/HighCharts/Line.vue";
import d$chart from "@/stores/chart";
import d$varietas from "@/stores/dropdown";

export default {
  metaInfo: () => ({
    title: "Beranda",
  }),
  components: {
    HcColumn,
    HcLine,
  },
  data: () => ({
    pageTitle: "Beranda",
    input: {
      varietas: null,
    },
  }),
  computed: {
    ...mapState(d$chart, ["g$byGenderChart", "g$byWeightChart"]),
    ...mapState(d$varietas, ["g$listVarietas"]),
  },
  methods: {
    ...mapActions(d$varietas, ["a$listVarietas"]),
  },
  async mounted() {
    await this.a$listVarietas();
  },
};
</script>

<template>
  <main-layout :title="pageTitle" is-full>
    <template #body>
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="row">
                <div class="col-md-3">
                  <base-input name="varietas" class="my-4" placeholder="Varietas" label="Varietas">
                    <multi-select v-model="input.varietas" :options="g$listVarietas" label="name" track-by="id" placeholder="Pilih varietas" :show-labels="false" />
                  </base-input>
                </div>
                <div class="col-md-3">select</div>
                <div class="col-md-3">select</div>
                <div class="col-md-3">select</div>
              </div>
              <div class="jumbotron jumbotron-fluid">
                <div class="row">
                  <div class="col-md-4">
                    <div class="d-flex flex-row">
                      <div class="p-2">Flex item 1</div>
                      <div class="p-2">Flex item 2</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex flex-row">
                      <div class="p-2">Flex item 1</div>
                      <div class="p-2">Flex item 2</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex flex-row">
                      <div class="p-2">Flex item 1</div>
                      <div class="p-2">Flex item 2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <hc-column :height="400" :data="g$byGenderChart" :data-labels="true" :legend="true" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="row align-items-center">
                <div class="col">
                  <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">Rata - rata berat tahunan</h1>
                  <h1 class="text-black text-uppercase text-center ls-1 mb-1" style="font-size: 12px">domba ternak Tahun 2022-2023</h1>
                </div>
              </div>
              <hc-line :height="400" :data="g$byWeightChart" :data-labels="true" :legend="true" />
            </div>
            <div class="col-md-3">
              <div class="jumbotron jumbotron-fluid">
                <h1 class="display-4">Fluid jumbotron</h1>
                <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>
