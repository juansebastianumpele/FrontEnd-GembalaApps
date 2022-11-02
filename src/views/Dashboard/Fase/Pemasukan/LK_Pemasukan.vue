<script>
export default {
  metaInfo: () => ({
    title: "Fase Pemasukan",
  }),
  data: () => ({
    pageTitle: "Langkah Kerja",
  }),
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="col-sm">
        <div class="row">
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="../pemasukan" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="data-pemasukan" class="text-dark">
                Fase Pemasukan
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="success1" class="btn-lg">
              <router-link to="langkah-kerja" class="text-white">
                Langkah Kerja
              </router-link>
            </base-button>
          </span>
        </div>
      </div>
      <div>
        <h3>Langkah Kerja Fase Pemasukan :</h3>
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
