<script>
export default {
  metaInfo: () => ({
    title: "Lembar Kerja Penanganan Penyakit",
  }),
  data: () => ({
    pageTitle: "Langkah Kerja Penanganan Penyakit",
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
              <router-link to="../penanganan-penyakit" class="text-dark">
                Penanganan Penyakit
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
        <h3>Langkah Kerja Penanganan Penyakit :</h3>
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
