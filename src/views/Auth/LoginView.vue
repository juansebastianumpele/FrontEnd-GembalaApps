<script>
import { object as y$object, string as y$string } from "yup";

import { inject } from "vue";
import d$auth from "@/stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  metaInfo: () => ({
    title: "Login",
  }),
  setup() {
    const router = useRouter();
    const auth = d$auth();
    const notify = inject("notify");

    async function onSubmit(values) {
      try {
        const login = await auth.a$login(values);
        if (login === "Login Berhasil!") {
          notify(login);
          router.push({ name: "Home" });
        } else {
          throw new Error(login);
        }
      } catch (error) {
        notify(error, false);
      }
    }

    const schema = y$object({
      username: y$string().required().label("Username"),
      password: y$string().min(5).required().label("Password"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>

<template>
  <!-- Header -->
  <div class="header bg-gradient-argon py-8 pt-lg-9">
    <div class="container">
      <div class="header-body text-center mb-5">
        <div class="row justify-content-center">
          <!-- <div class="col-md-8 px-5">
            <img :src="siteMeta.logo" height="50" />
          </div> -->
          <div class="col-md-8 px-5">
            <h1 class="text-white">Selamat Datang di {{ siteMeta.title }}!</h1>
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
  <div class="container">
    <div class="row mx-0 justify-content-center mt--7">
      <div class="col-lg-5 col-md-7">
        <div class="card bg-secondary shadow border-0">
          <div class="card-header bg-transparent pb-5">
            <div class="text-muted text-center mt-2 mb-3">
              <small>Silahkan Masukan Username dan Password</small>
            </div>
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <base-input
                name="username"
                addon-left-icon="fas fa-user"
                placeholder="Username"
              >
              </base-input>

              <base-input
                name="password"
                addon-left-icon="fas fa-lock"
                type="password"
                placeholder="Password"
                password
              >
              </base-input>

              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4">
                  Masuk
                </base-button>
              </div>
              <div class="text-left">
                <span class="text-muted"
                  ><small>Belum Punya Akun? </small></span
                >
                <router-link to="/auth/register" class="text-primary">
                  <small>Daftar Disini</small>
                </router-link>

                <router-link to="/auth/reset" class="text-primary ml-7">
                  <small>Lupa Password?</small>
                </router-link>
              </div>
            </form-comp>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
