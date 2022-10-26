import { defineStore } from "pinia";
import * as s$superadmin from "@/services/superadmin/superadmin";

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
        }
    },
    getters: {
        g$users: (state) => state.users,
    }
});

export default u$superadmin;