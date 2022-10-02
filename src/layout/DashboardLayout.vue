<template>
  <div class="wrapper">
    <side-bar v-if="!$route.meta.monitoring">
      <template #links>
        <div class="dropdown-divider mt-0" />

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fas fa-square-poll-vertical text-danger',
            path: '/dashboard/',
          }"
        >
        </sidebar-item>

        <div class="dropdown-divider" />

        <sidebar-item
          :link="{
            name: 'Monitoring',
            icon: 'fas fa-desktop text-primary',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Data Kandang',
              path: '/monitoring/data-kandang',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Ternak',
              path: '/monitoring/data-ternak',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Perkawinan',
              path: '/monitoring/data-perkawinan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Kesehatan',
              path: '/monitoring/data-penyakit',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Pakan',
              path: '/monitoring/data-pakan',
            }"
          />
        </sidebar-item>

        <div class="dropdown-divider" />
        <sidebar-item
          :link="{
            name: 'Trading',
            icon: 'fas fa-basket-shopping text-warning',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Penjualan',
              path: '/trading/penjualan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Riwayat Penjualan',
              path: '/trading/riwayat-penjualan',
            }"
          />
          <div class="dropdown-divider" />
        </sidebar-item>

        <div class="dropdown-divider" />
        <sidebar-item
          :link="{
            name: 'Info Pengguna',
            icon: 'fas fa-users text-primary',
            path: '/info-pengguna/',
          }"
        >
        </sidebar-item>
        <div class="dropdown-divider" />
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        v-if="!$route.meta.monitoring"
        :type="$route.meta.navbarType"
      ></dashboard-navbar>

      <main @click="$sidebar.displaySidebar(false)">
        <router-view></router-view>
      </main>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  mounted() {
    this.initScrollbar();
  },
  methods: {
    initScrollbar() {
      const isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
};
</script>
<style lang="scss"></style>
