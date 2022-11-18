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
            <router-link to="../pemeliharaan" >
            <base-button type="secondary" class="btn-lg text-dark">
                Fase Pemeliharaan
              </base-button>
            </router-link>
          </span>
          <span class="text-center m-2">
            <router-link to="langkah-kerja" >
            <base-button type="success1" class="btn-lg text-white">
                Langkah Kerja
              </base-button>
            </router-link>
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
            <li class="mb-1">Temukan Domba Yang Terindikasi Penyakit.</li>
            <li class="mb-1">Buka Menu Fitur Kesehatan</li>
            <li class="mb-1">Klik Sub-menu Daftar Penyakit.</li>
            <li class="mb-1">
              Setelah Diketahui terdapat Penyakit, Isi Form ID Ternak Dan Pilih
              Penyakit.
            </li>
            <li class="mb-1">Submit Data.</li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
