<template>
  <div class="wrapper">
    <side-bar>
      <template #links>
        <div class="dropdown-divider mt-0" />

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fas fa-shopping-cart text-success',
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
              name: 'Data Pakan',
              path: '/masterData/pakan',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Kawin',
              path: '/masterData/kawin',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Kandang',
              path: '/masterData/kandang',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Data Kesehatan',
              path: '/masterData/kesehatan',
            }"
          />
        </sidebar-item>

        <div class="dropdown-divider" />
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
