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
        if (register === "Register success!") {
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
  <div class="header py-9 pt-md-9"></div>
  <div class="container">
    <div class="row mx-0 justify-content-center mt--9">
      <div class="col-lg-6 col-md-6">
        <div class="card bg-secondary shadow border-0">
          <div class="card-header bg-transparent pb-5">
            <div class="text-center mt-2 mb-3">
              <strong>Lupa Password</strong><br /><br />
              <img
                width="100"
                src="../../../images/logo.png"
                alt="email"
              />
              <br />
              <br />
            </div>
            <small>
              Silahkan masukan email Anda yang telah terdaftar. Kode untuk
              mengatur ulang password akan kami kirim via email.
            </small>
            <br style="margin-bottom: 20px" />
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <base-input
                name="email"
                form-classes="input-group-alternative"
                placeholder="Email"
                label="Email"
                addon-left-icon="fas fa-envelope"
                focused
              >
              </base-input>

              <div class="text-center">
                <base-button
                  type="success1"
                  class="my-2 text-white"
                  native-type="submit"
                >
                  Kirim Kode Verifikasi
                </base-button>
              </div>
            </form-comp>
            <div class="row mt-3">
              <div class="col-7 text-left">
                <router-link to="/auth/login" class="text-success">
                  <small
                    ><i class="fa-solid fa-arrow-left-long"></i> Kembali halaman
                    login</small
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
