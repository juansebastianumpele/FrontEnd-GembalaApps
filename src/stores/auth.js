import { defineStore } from "pinia";

import { login } from "@/services/auth";
import { setCk, delCk, certDetail } from "@/utils/cookies";

import d from "dayjs";

const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    id: undefined,
    name: undefined,
    role: undefined,
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
        const { id, username, role } = certDetail();
        if (!id && !username && !role)
          throw new Error("Tidak ada info Pengguna!");
        this.id = id;
        this.name = username;
        this.role = role;
        return "User Authenticated";
      } catch ({ message }) {
        this.userId = "";
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
        return "Login success!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Login failed!";
      }
    },
    async a$logout() {
      try {
        const { id, role, username } = certDetail();
        if (id || role || username) delCk("CERT");
        this.a$setUserInfo();
        return "Logout success!";
      } catch ({ error, message }) {
        throw (error || message) ?? "Logout failed!";
      }
    },
  },
});

export default useAuthStore;
