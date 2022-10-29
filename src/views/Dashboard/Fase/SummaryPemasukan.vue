<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$pemasukan from "@/stores/fase/pemasukan";

export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
  }),
  data: () => ({
    pageTitle: "Summary",
  }),
  computed: {
    ...mapState(useAuthStore, ["userInfo"]),
    ...mapState(d$pemasukan, ["g$kandangSlice", "g$kandangSlice1"]),
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
        <div class="col-8">
          <h1 class="font-weight-bolder text-success">Fase Pemasukan</h1>
        </div>
        <div class="col-4">
          <nav class="nav nav-pills flex-column flex-sm-row mb-4">
            <li>
              <base-button type="success1" class="btn-lg">
                <router-link to="/fase/pemasukan" class="text-white">
                  Summary
                </router-link>
              </base-button>
            </li>
            <li>
              <base-button
                v-if="userInfo.role !== 'bod'"
                type="secondary"
                class="ml-3 btn-lg"
              >
                <router-link to="pemasukan/data-pemasukan" class="text-dark">
                  Fase Pemasukan
                </router-link>
              </base-button>
            </li>
            <li>
              <base-button
                v-if="userInfo.role !== 'bod'"
                type="secondary"
                class="ml-3 btn-lg"
              >
                <router-link to="pemasukan/langkah-kerja" class="text-dark">
                  Langkah Kerja
                </router-link>
              </base-button>
            </li>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <card-comp>
            <div class="row align-items-center">
              <div class="col">
                <h1
                  class="text-success text-left ls-1 mb-4"
                  style="font-size: 16px"
                >
                  Populasi Fase Pemasukan
                </h1>
              </div>
            </div>
            <hc-bar
              :height="306"
              :data="g$byFase"
              :data-labels="true"
              :legend="true"
            />
          </card-comp>
        </div>
        <div
          class="col-8 carousel slide"
          id="carouselExampleControls"
          data-ride="carousel"
        >
          <card-comp class="carousel-inner">
            <div class="row carousel-item active">
              <div class="row">
                <div
                  class="col-2 bg-success text-center rounded m-2"
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
                  class="col-2 bg-success text-center rounded m-2"
                  v-for="item in row"
                  :key="item.id_kandang"
                >
                  <h3 class="text-white">Kandang {{ item.kode_kandang }}</h3>
                  <h1 class="text-white">{{ item.total }}</h1>
                  <p class="text-white">Ekor</p>
                </div>
              </div>
            </div>
          </card-comp>
          <button
            class="carousel-control-prev"
            type="button"
            data-target="#carouselExampleControls"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-target="#carouselExampleControls"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li>
              Periksa domba secara visual untuk mendapatkan identitas ternak
              yang terdiri dari bangsa dan jenis kelamin.
            </li>
            <li>
              Periksa kondisi ternak, apakah terdapat cacat atau sakit yang
              berpotensi mempersulit proses budidaya. Pengecekan terdiri dari
              cek poel, cek mulut, cek telinga, kuku kaki, cek kondisi fisik
              lainnya, dan BCS domba tersebut.
            </li>
            <li>
              Apabila domba dalam kondisi baik dan memenuhi kriteria, domba akan
              diterima.
            </li>
            <li>
              Pasangkan kalung RFID dan daftarkan menggunakan RFID mobile.
              Selanjutnya akan terbentuk ID ternak yang baru.
            </li>
            <li>
              Buka SOP pemasukan pada mobile apps untuk melengkapi data ternak
              yang baru saja dimasukkan sesuai indikator yang ditetapkan.
            </li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
