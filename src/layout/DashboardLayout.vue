<template>
  <div class="wrapper">
    <side-bar v-if="!$route.meta.monitoring">
      <template #links>
        <div class="dropdown-divider mt-0" />

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fas fa-house text-success',
            path: '/dashboard/',
          }"
        >
        </sidebar-item>

        <div class="dropdown-divider" />

        <sidebar-item
          :link="{
            name: 'Monitoring',
            icon: 'fas fa-square-poll-vertical text-success',
          }"
        >
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
          <sidebar-item
            :link="{
              name: 'Data Kandang',
              path: '/monitoring/data-kandang',
            }"
          />
        </sidebar-item>
        <div class="dropdown-divider" />

        <!-- SOP -->
        <sidebar-item
          :link="{
            name: 'Lembar Kerja',
            icon: 'fas fa-users text-success',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Pemasukan',
              path: '/sop/pemasukan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Pemeliharaan',
              path: '/sop/pemeliharaan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Adaptasi',
              path: '/sop/adaptasi',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Perkawinan',
              path: '/sop/perkawinan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Penanganan Penyakit',
              path: '/sop/penanganan-penyakit',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Kebuntingan',
              path: '/sop/kebuntingan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Kelahiran',
              path: '/sop/kelahiran',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Lepas Sapih',
              path: '/sop/lepas-sapih',
            }"
          />
        </sidebar-item>
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
