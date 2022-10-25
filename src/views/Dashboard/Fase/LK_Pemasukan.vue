<script>
export default {
  metaInfo: () => ({
    title: "Data Penyakit",
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
              <router-link to="../pemasukan" class="text-dark">
                Fase Pemasukan
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
    </template>

    <template #body>
      <div>
        <h1>TEST</h1>
      </div>
    </template>
  </main-layout>
</template>
