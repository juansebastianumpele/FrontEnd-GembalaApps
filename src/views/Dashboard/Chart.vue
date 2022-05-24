<script>
export default {
  metaInfo: () => ({
    title: "Beranda",
  }),
  data: () => ({
    pageTitle: "Beranda",
  }),
};
</script>

<template>
  <main-layout :title="pageTitle">
    <template #body>
      <p class="display-3 text-center">Halaman untuk menampilkan statistik chart</p>
    </template>
  </main-layout>
</template>
