<script>
import d$auth from "@/stores/auth";
import { useRouter } from "vue-router";
import { inject } from "vue";
import {
  object as y$object,
  string as y$string,
  ref as y$ref,
  number as y$number,
} from "yup";

export default {
  metaInfo: () => ({
    title: "Pendaftaran",
  }),
  setup() {
    const router = useRouter();
    const auth = d$auth();
    const notify = inject("notify");

    async function onSubmit(values) {
      try {
        const register = await auth.a$register(values);
        if (register === "Register Berhasil!") {
          notify(register);
          router.push({ name: "Verify" });
        } else {
          throw new Error(register);
        }
      } catch (error) {
        notify(error, false);
      }
    }

    const schema = y$object({
      nama_lengkap: y$string().required().label("Nama lengkap"),
      username: y$string().required().label("Nama Pengguna"),
      email: y$string().required().email().label("Email"),
      no_hp: y$number().required().label("Nomor Telepon"),
      password: y$string().min(5).required().label("Password"),
      repeat_password: y$string()
        .oneOf([y$ref("password")], "Password Tidak Cocok")
        .required()
        .label("Konfirmasi Password"),
    });

    return {
      onSubmit,
      schema,
    };
  },
};
</script>

<template>
  <div class="header bg-gradient-argon py-9 pt-md-9"></div>
  <div class="container">
    <div class="row mx-0 justify-content-center mt--9">
      <div class="col-sm-2 col-sm-5 mt--6">
        <div class="card bg-secondary shadow border-0">
          <div class="card-header bg-transparent pb-5">
            <div class="text-center mt-2 mb-3">
              <strong>Daftar Akun</strong>
              <br />
            </div>
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <base-input
                name="nama_lengkap"
                form-classes="input-group-alternative"
                label="Nama Lengkap"
                placeholder="Nama Lengkap"
                addon-left-icon="fas fa-user"
              >
              </base-input>

              <base-input
                name="username"
                form-classes="input-group-alternative"
                placeholder="Nama Pengguna"
                label="Nama Pengguna"
                addon-left-icon="fas fa-user"
              >
              </base-input>

              <base-input
                name="email"
                form-classes="input-group-alternative"
                placeholder="Email"
                label="Email"
                addon-left-icon="fas fa-envelope"
                focused
              >
              </base-input>

              <base-input
                name="no_hp"
                form-classes="input-group-alternative"
                placeholder="Nomor Telepon"
                label="Nomor Telepon"
                addon-left-icon="fas fa-phone"
                focused
              >
              </base-input>
              <base-input
                name="alamat"
                form-classes="input-group-alternative"
                placeholder="Alamat"
                label="Alamat"
                addon-left-icon="fas fa-location-arrow"
                focused
              >
              </base-input>

              <base-input
                name="password"
                form-classes="input-group-alternative"
                placeholder="Password"
                label="Password"
                type="password"
                addon-left-icon="fas fa-lock"
                password
              >
              </base-input>

              <base-input
                name="repeat_password"
                form-classes="input-group-alternative"
                placeholder="Repeat Password"
                label="Konfirmasi Password"
                type="password"
                addon-left-icon="fas fa-lock"
                password
              >
              </base-input>
              <div class="text-center">
                <base-button type="primary" class="my-4" native-type="submit">
                  Buat Akun
                </base-button>
              </div>
            </form-comp>
            <div class="row mt-3">
              <div class="col-7 text-left">
                <small>Sudah punya akun? </small>
                <router-link to="/auth/login" class="text-primary">
                  <small>Masuk disini</small>
                </router-link>
              </div>
              <div class="col-5 text-right">
                <router-link to="/auth/reset" class="text-primary">
                  <small>Lupa Password?</small>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
