import { defineStore } from "pinia";
import * as s$user from "@/services/user";

const u$user = defineStore({
  id: "user",
  state: () => ({
    detail: [],
  }),
  actions: {
    // Detail
    async a$userDetail() {
      try {
        const { data } = await s$user.detail();
        this.detail = data;
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
  },
  getters: {
    g$userDetail: (state) => state.detail,
  },
});

export default u$user;
