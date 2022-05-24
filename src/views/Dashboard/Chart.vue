<script>
import Card from "../../components/Cards/Card.vue";
export default {
  components: { Card },
  metaInfo: () => ({
    title: "Beranda",
  }),
  data: () => ({
    pageTitle: "Beranda",
  }),
};
</script>

<template>
  <main-layout :title="pageTitle" is-full>
    <template #body>
      <div class="col-12">
        <base-input name="arietas" placeholder="Varietas" label="Komoditas">
          <multi-select v-model="input.commodity" :options="g$ddCommodity" label="name" track-by="id" placeholder="Pilih Komoditas" :show-labels="false" />
        </base-input>
      </div>
    </template>
  </main-layout>
</template>
