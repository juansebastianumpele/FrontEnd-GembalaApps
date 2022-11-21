import { defineStore } from "pinia";
import * as s$user from "@/services/user";

const u$user = defineStore({
  id: "user",
  state: () => ({
    detail: [],
    peternakan: [],
  }),
  actions: {
    // Detail
    async a$userDetail() {
      try {
        const { data } = await s$user.detail();
        this.detail = data;
        this.peternakan = data.peternakan;
      } catch ({ error }) {
        throw error;
      }
    },
    // Edit Password
    async a$userChangePw(request) {
      try {
        await s$user.changePw(request);
      } catch ({ error }) {
        throw error;
      }
    },

    // Edit Profile
    async a$userChangeProfile(request) {
      try {
        await s$user.changeProfile(request);
      } catch ({ error }) {
        throw error;
      }
    },

    // Register BOD
    async a$userRegisterBod(request) {
      try {
        await s$user.registerBod(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$userDetail: (state) => state.detail,
    g$userPeternakan: (state) => state.peternakan,
  },
});

export default u$user;
