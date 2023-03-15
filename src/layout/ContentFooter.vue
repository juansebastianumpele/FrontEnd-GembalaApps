<template>
  <div class="footer-wave">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F49C1E" fill-opacity="1" d="M0,224L34.3,202.7C68.6,181,137,139,206,128C274.3,117,343,139,411,128C480,117,549,75,617,58.7C685.7,43,754,53,823,74.7C891.4,96,960,128,1029,144C1097.1,160,1166,160,1234,181.3C1302.9,203,1371,245,1406,266.7L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    <footer class="px-4 mx-auto mb-4" :class="[isLoggedIn && $route.name !== '404' ? 'container-fluid' : 'container',]">
      <div class="row align-items-center justify-content-center position-relative">
        <div class="col">
          <div class="copyright text-center text-muted">
            {{ year }} &mdash; <strong>{{ siteMeta.title }}</strong>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: 2023,
    };
  },
};
</script>
<style></style>
