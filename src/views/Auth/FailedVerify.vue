<template>
  <!-- Header -->
  <div class="header bg-gradient-argon py-7 py-lg-8 pt-lg-9">
    <div class="container">
      <div class="header-body text-center mb-7">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-lg-6 col-md-8 px-5">
            <h1 class="text-secondary">Email Kamu Gagal Diverifikasi</h1>
            <img
              width="200"
              style="margin: 20px 0 20px 0"
              src="../../../public/images/failed.svg"
              alt="email"
            />
            <p class="text-lead text-white">
              Silahkan coba lagi atau hubungi admin.
            </p>

            <router-link
              to="/auth/login"
              class="font-weight-bold text-white mt-5"
              ><base-button type="primary"
                >Halaman Login</base-button
              ></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="separator separator-bottom separator-skew zindex-100">
      <svg
        x="0"
        y="0"
        viewBox="0 0 2560 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Failed Verify",
  metaInfo: () => ({
    title: "Verifikasi Email Gagal",
  }),
};
</script>
