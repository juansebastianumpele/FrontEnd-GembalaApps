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
      <div>
        <nav class="nav nav-pills flex-column flex-sm-row mb-4">
          <li>
            <base-button type="secondary" class="btn-lg">
              <router-link to="../adaptasi" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </li>
          <li>
            <base-button type="secondary" class="ml-3 btn-lg">
              <router-link to="data-adaptasi" class="text-dark">
                Fase Adaptasi
              </router-link>
            </base-button>
          </li>
          <li>
            <base-button type="success1" class="ml-3 btn-lg">
              <router-link to="langkah-kerja" class="text-white">
                Langkah Kerja
              </router-link>
            </base-button>
          </li>
        </nav>
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
