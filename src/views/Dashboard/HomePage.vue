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
      <p class="display-3 text-center">Welcome to Gembala Apps</p>
    </template>
  </main-layout>
</template>
