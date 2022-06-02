<script>
import { mapActions } from "pinia";
import useAuthStore from "@/stores/auth";
import { useMeta } from "vue-meta";

export default {
  provide() {
    return {
      notify: (msg, status = true) => this.notify(msg, status),
    };
  },
  setup() {
    useMeta({
      htmlAttrs: {
        lang: "en",
      },
    });
  },
  async created() {
    try {
      await this.a$setUserInfo();
      this.notify(`Welcome back, ${this.userInfo.name}!`);
      if (this.$route.path.includes("/auth/") && this.userInfo.name) this.$router.replace({ name: "Home" });
    } catch (error) {
      if (!this.$route.path.includes("/auth/")) this.$router.replace({ name: "Auth" });
      this.notify(error, false);
    }
  },
  methods: {
    ...mapActions(useAuthStore, ["a$setUserInfo"]),
  },
};
</script>

<template>
  <metainfo>
    <template #title="{ content }">{{ content }} | {{ siteMeta.title }}</template>
  </metainfo>
  <router-view />
</template>

<style>
.bg-gradient-argon {
  background: linear-gradient(87deg, #2dce89 0, #2dcecc 100%) !important;
}
</style>
