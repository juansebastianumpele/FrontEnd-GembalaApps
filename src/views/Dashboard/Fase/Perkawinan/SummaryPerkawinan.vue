<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$pemasukan from "@/stores/fase/pemasukan";
import { ubahTanggal } from "@/utils/locale/ubahTanggal";
import HcBar from "@/components/HighCharts/Bar.vue";

export default {
  metaInfo: () => ({
    title: "Fase Perkawinan",
  }),
  components: {
    HcBar,
  },
  data: () => ({
    pageTitle: "Fase Perkawinan",
    //UI
    modal: {
      detailPemasukan: false,
    },
    // DataTable
    dt: {
      column: [
        {
          name: "createdAt",
          th: "Tanggal",
          render: ({ createdAt }) => ubahTanggal(createdAt),
        },
        {
          name: "id_ternak",
          th: "ID Ternak",
        },
        {
          name: "bangsa",
          th: "Bangsa",
          render: ({ bangsa }) => bangsa.bangsa,
        },
        {
          name: "jenis_kelamin",
          th: "Jenis Kelamin",
        },
        {
          name: "kandang",
          th: "Kode Kandang",
          render: ({ kandang }) => kandang.kode_kandang,
        },
        {
          name: "status_ternak",
          th: "Status",
          render: ({ status_ternak }) => status_ternak.status_ternak,
        },
        {
          name: "cek_bcs",
          th: "BCS",
        },
      ],
    },
    infoPemasukan: {},
  }),
  computed: {
    ...mapState(useAuthStore, ["userInfo"]),
    ...mapState(d$pemasukan, [
      "g$kandangSlice",
      "g$kandangSlice1",
      "g$pemasukanThisMonth",
      "g$byPopulasi",
    ]),
  },

  async mounted() {
    try {
      await this.a$pemasukanListThisMonth();
    } catch (error) {
      this.notify(error, false);
    }
  },

  methods: {
    ...mapActions(d$pemasukan, ["a$pemasukanListThisMonth"]),
  },
};
</script>

<template>
  <main-layout :title="pageTitle" is-full style="background: transparent">
    <template #header>
      <div class="row">
        <div class="col-sm-8">
          <h1 class="font-weight-bolder text-success">{{ pageTitle }}</h1>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <span class="text-center m-2">
              <base-button type="success1" class="btn-lg">
                <router-link to="/fase/perkawinan" class="text-white">
                  Summary
                </router-link>
              </base-button>
            </span>
            <span class="text-center m-2">
              <base-button
                v-if="userInfo.role !== 'bod'"
                type="secondary"
                class="btn-lg"
              >
                <router-link to="perkawinan/data-perkawinan" class="text-dark">
                  {{ pageTitle }}
                </router-link>
              </base-button>
            </span>
            <span class="text-center m-2">
              <base-button
                v-if="userInfo.role !== 'bod'"
                type="secondary"
                class="btn-lg"
              >
                <router-link to="perkawinan/langkah-kerja" class="text-dark">
                  Langkah Kerja
                </router-link>
              </base-button>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-success text-left ls-1 mb-4"
                  style="font-size: 16px"
                >
                  Populasi {{ pageTitle }}
                </h1>
              </div>
            </div>
            <hc-bar
              :height="215"
              :data="g$byPopulasi"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
        <div
          class="col-sm-8 carousel slide"
          id="carouselExampleControls"
          data-ride="carousel"
        >
          <card-comp class="carousel-inner">
            <div class="row carousel-item active ml-3">
              <div class="row">
                <div
                  class="col-sm-2 bg-success text-center rounded m-2"
                  v-for="item in g$kandangSlice1"
                  :key="item.id_kandang"
                >
                  <h3 class="text-white">Kandang {{ item.kode_kandang }}</h3>
                  <h1 class="text-white">{{ item.total }}</h1>
                  <p class="text-white">Ekor</p>
                </div>
              </div>
            </div>
            <div
              class="row carousel-item"
              v-for="row in g$kandangSlice"
              :key="row.id"
            >
              <div class="row">
                <div
                  class="col-sm-2 bg-success text-center rounded m-2"
                  v-for="item in row"
                  :key="item.id_kandang"
                >
                  <h3 class="text-white">Kandang {{ item.kode_kandang }}</h3>
                  <h1 class="text-white">{{ item.total }}</h1>
                  <p class="text-white">Ekor</p>
                </div>
              </div>
            </div>
            <div class="row">
              <button
                class="carousel-control-prev active"
                type="button"
                data-target="#carouselExampleControls"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-target="#carouselExampleControls"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </button>
            </div>
          </card-comp>
        </div>
      </div>
      <div class="row ml-1">
        <h1 class="font-weight-bolder text-success">
          Daftar Ternak {{ pageTitle }}
        </h1>
      </div>
    </template>

    <template #body>
      <empty-result
        v-if="!g$pemasukanThisMonth.length"
        :text="`${pageTitle}`"
      />
      <data-table
        v-else
        :index="true"
        :data="g$pemasukanThisMonth"
        :columns="dt.column"
      />
    </template>
  </main-layout>
</template>
