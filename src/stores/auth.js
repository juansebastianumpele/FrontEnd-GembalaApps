import { defineStore } from "pinia";
import * as s$auth from "@/services/auth";
import { login } from "@/services/auth";
import { setCk, delCk, certDetail } from "@/utils/cookies";

import d from "dayjs";

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    id: undefined,
    name: undefined,
    role: undefined,
    data: [],
  }),
  getters: {
    userInfo: (state) => ({
      id: state.id,
      name: state.name,
      role: state.role,
    }),
    isLoggedIn: (state) => !!state.id,
  },
  actions: {
    async a$setUserInfo() {
      try {
        const { id_user, role, nama_pengguna } = certDetail();
        this.id = id_user;
        this.name = nama_pengguna;
        this.role = role;
        return "User Authenticated";
      } catch ({ message }) {
        this.id = "";
        this.name = "";
        this.role = "";
        throw message;
      }
    },

    async a$login(payload) {
      try {
        const { data } = await login(payload);
        setCk("CERT", data.token, { datetime: d(data.expiresAt) });
        this.a$setUserInfo();

        if (this.userInfo.role == 'superadmin') {
          return "Login Superadmin Berhasil!"
        }

        return "Login Berhasil!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Login Gagal!";
      }
    },
    async a$logout() {
      try {
        const { id, role, username } = certDetail();
        if (id || role || username) delCk("CERT");
        this.a$setUserInfo();
        return "Logout Berhasil!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Logout Gagal!";
      }
    },

    async a$register(request) {
      try {
        await s$auth.register(request);
        return "Register Berhasil!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Register Gagal!";
      }
    },
  },
});

export default useAuthStore;
