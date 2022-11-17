<script>
export default {
  metaInfo: () => ({
    title: "Fase Kebuntingan",
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
              <router-link to="../kebuntingan" class="text-dark">
                Summary
              </router-link>
            </base-button>
          </span>
          <span class="text-center m-2">
            <base-button type="secondary" class="btn-lg">
              <router-link to="data-kebuntingan" class="text-dark">
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
      <div class="mt-3">
        <h3>Langkah Kerja Fase Kebuntingan :</h3>
      </div>
    </template>

    <template #body>
      <div>
        <card-comp>
          <ol>
            <li class="mb-1">
              Setelah seluruh domba dicek USG, domba yang bunting tetap
              dikandang kawin
            </li>
            <li class="mb-1">
              Jika terdapat domba mengalami abortus maka domba akan, kembali
              masuk ke data halaman "Proses Persiapan" dihalaman lembar kerja "
              perkawinan"
            </li>
          </ol>
        </card-comp>
      </div>
    </template>
  </main-layout>
</template>
