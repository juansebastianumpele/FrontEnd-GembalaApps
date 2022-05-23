<template>
  <footer class="px-4 mx-auto mb-4" :class="[isLoggedIn && $route.name !== '404' ? 'container-fluid' : 'container']">
    <div class="row align-items-center justify-content-center">
      <div class="col">
        <div class="copyright text-center text-muted">
          © {{ year }} &mdash; <strong>{{ siteMeta.title }}</strong>
        </div>
      </div>
      <!-- <div class="col-lg-6">
        <ul
          class="nav nav-footer justify-content-center justify-content-lg-end"
        >
          <li class="nav-item">
            <a
              href="https://www.creative-tim.com/presentation"
              class="nav-link"
              target="_blank"
              >About Us</a
            >
          </li>
          <li class="nav-item">
            <a
              href="http://blog.creative-tim.com"
              class="nav-link"
              target="_blank"
              >Blog</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://www.creative-tim.com/license"
              class="nav-link"
              target="_blank"
              >License</a
            >
          </li>
        </ul>
      </div> -->
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
