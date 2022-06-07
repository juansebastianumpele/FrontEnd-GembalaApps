<template>
  <div class="wrapper">
    <side-bar>
      <template #links>
        <div class="dropdown-divider mt-0" />

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fas fa-square-poll-vertical text-danger',
            path: '/dashboard/chart',
          }"
        >
        </sidebar-item>

        <div class="dropdown-divider" />

        <sidebar-item
          :link="{
            name: 'Master Data',
            icon: 'fas fa-address-book text-primary',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Daftar Kandang',
              path: '/masterdata/daftar-kandang',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Daftar Pakan',
              path: '/masterdata/daftar-pakan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Daftar Penyakit',
              path: '/masterdata/daftar-penyakit',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Daftar Ternak',
              path: '/masterdata/daftar-ternak',
            }"
          />
          <!-- <sidebar-item
            :link="{
              name: 'Data Kesehatan',
              path: '/masterdata/kesehatan',
            }"
          /> -->
        </sidebar-item>

        <div class="dropdown-divider" />

        <sidebar-item
          :link="{
            name: 'Monitoring',
            icon: 'fas fa-address-book text-primary',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Kandang',
              path: '/monitoring/kandang',
            }"
          />
          <!-- <sidebar-item
            :link="{
              name: 'Pakan',
              path: '/monitoring/pakan',
            }"
          /> -->
          <sidebar-item
            :link="{
              name: 'Kawin',
              path: '/monitoring/kawin',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Ternak Sakit',
              path: '/monitoring/ternak-sakit',
            }"
          />

          <div class="dropdown-divider" />
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

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
