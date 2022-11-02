import { defineStore } from "pinia";
import { setCk, delCk, certDetail } from "@/utils/cookies";
import useAuthStore from "@/stores/auth";
import * as s$superadmin from "@/services/superadmin/superadmin";
import d from "dayjs";

const u$superadmin = defineStore({
    id: "superadmin",
    state: () => ({
        users: [],
    }),
    actions: {
        async a$getDataUsers() {
            try {
                const { data } = await s$superadmin.getDataUsers();
                this.users = data.list;
            } catch ({ error }) {
                this.users = [];
                throw error;
            }
        },
        async a$getNewToken(request) {
            try {
                const { data } = await s$superadmin.getNewToken(request);
                setCk("CERT", data.token, { datetime: d(data.expiresAt) });
                useAuthStore().a$setUserInfo();
                return "Login Berhasil!";
            } catch ({ error }) {
                throw error;
            }
        }
    },
    getters: {
        g$users: (state) => state.users,
    }
});

export default u$superadmin;