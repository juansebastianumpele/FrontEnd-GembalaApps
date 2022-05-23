<template>
  <div class="wrapper">
    <side-bar>
      <template #links>
        <div class="dropdown-divider mt-0" />

        <sidebar-item
          :link="{
            name: 'Pengiriman Pesanan',
            icon: 'fas fa-shopping-cart text-success',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Pengiriman Terjadwal',
              path: '/ticket/order',
            }"
          />

          <sidebar-item
            :link="{
              name: 'Riwayat Pengiriman',
              path: '/ticket/delivery',
            }"
          />
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
              name: 'Pelanggan',
              path: '/masterData/customer',
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
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';

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
      const isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },
  },
};
</script>
<style lang="scss"></style>
