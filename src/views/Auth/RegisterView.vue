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
          router.push({ name: "Login" });
        } else {
          throw new Error(register);
        }
      } catch (error) {
        notify(error, false);
      }
    }

    const schema = y$object({
      username: y$string().required().label("Username"),
      email: y$string().required().email().label("Email"),
      password: y$string().min(5).required().label("Password"),
      repeat_password: y$string()
        .oneOf([y$ref("password")], "Password doesn't match")
        .required()
        .label("Password Confirmation"),
      no_hp: y$number()
        .typeError("That doesn't look like a phone number")
        .integer("A phone number can't include a decimal point")
        .required("A phone number is required"),
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
            <div class="text-muted text-center mt-2 mb-3">
              <small>Sign up with credentials</small>
            </div>
            <form-comp :validation-schema="schema" @submit="onSubmit">
              <base-input
                name="nama_lengkap"
                form-classes="input-group-alternative"
                placeholder="Nama Lengkap"
                addon-left-icon="fas fa-user"
              >
              </base-input>

              <base-input
                name="username"
                form-classes="input-group-alternative"
                placeholder="Username"
                addon-left-icon="fas fa-user"
              >
              </base-input>

              <base-input
                name="email"
                form-classes="input-group-alternative"
                placeholder="Email"
                addon-left-icon="fas fa-envelope"
                focused
              >
              </base-input>

              <base-input
                name="no_hp"
                form-classes="input-group-alternative"
                placeholder="No HP"
                addon-left-icon="fas fa-phone"
                focused
              >
              </base-input>
              <base-input
                name="alamat"
                form-classes="input-group-alternative"
                placeholder="Alamat"
                addon-left-icon="fas fa-location-arrow"
                focused
              >
              </base-input>

              <base-input
                name="password"
                form-classes="input-group-alternative"
                placeholder="Password"
                type="password"
                addon-left-icon="fas fa-lock"
                password
              >
              </base-input>

              <base-input
                name="repeat_password"
                form-classes="input-group-alternative"
                placeholder="Repeat Password"
                type="password"
                addon-left-icon="fas fa-lock"
                password
              >
              </base-input>
              <div class="text-center">
                <base-button type="primary" class="my-4" native-type="submit">
                  Create account
                </base-button>
              </div>
            </form-comp>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <a href="#" class="text-light">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="col-6 text-left">
            <router-link to="/login" class="text-light">
              <small>Login into your account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
