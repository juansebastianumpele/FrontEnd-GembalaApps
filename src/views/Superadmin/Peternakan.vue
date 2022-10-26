<script>
import { mapActions, mapState } from "pinia";
import useAuthStore from "@/stores/auth";
import d$superadmin from "@/stores/superadmin/superadmin";
import d$auth from "@/stores/auth";
import router from "@/router";

export default {
  metaInfo: () => ({
    title: "Peternakan",
  }),
  data: () => ({
    pageTitle: "Peternakan",
    // DataTable
    dt: {
      column: [
        {
          name: "nama_peternakan",
          th: "Nama Peternakan",
        },
        {
          name: "nama_pengguna",
          th: "Admin",
        },
      ],
      action: [
        {
          text: "Lihat",
          color: "info",
          event: "lihat-kandang",
        },
      ],
    },
  }),
  computed: {
    ...mapState(d$superadmin, ["g$users"]),
  },
  async mounted() {
    await this.a$getDataUsers().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(useAuthStore, ["a$logout"]),
    ...mapActions(d$superadmin, ["a$getDataUsers"]),
    ...mapActions(d$auth, ["a$login"]),
    async logout() {
      await this.a$logout();
      this.notify("Logout Berhasil!");
      this.$router.push({ name: "Login" });
    },
    async triggerLihat(row) {
      try {
        const login = await this.a$login();
        if (login === "Login Berhasil!") {
          notify(login);
          router.push({ name: "Home" });
        }
      } catch (error) {
        this.clearInput();
        this.notify(error, false);
      }
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="danger" @click="logout">
          <i class="fas fa-arrow-right-from-bracket"></i>
          <span>Keluar</span>
          </base-button>
        </div>
      </div>
    </template>

    <template #body>
      <empty-result v-if="!g$users.length" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$users"
        :columns="dt.column"
        :actions="dt.action"
        @lihat-peternakan="triggerLihat"
      />
    </template>
  </main-layout>
</template>