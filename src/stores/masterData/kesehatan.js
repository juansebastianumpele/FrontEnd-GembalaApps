import { defineStore } from "pinia";
import * as s$kesehatan from "@/services/masterData/kesehatan";

const u$kesehatan = defineStore({
  id: "kesehatan",
  state: () => ({
    kesehatan: [],
  }),
  actions: {
    async a$kesehatanList() {
      try {
        const { data } = await s$kesehatan.list();
        this.kesehatan = data;
      } catch ({ error }) {
        this.kesehatan = [];
        throw error;
      }
    },
    async a$kesehatanAdd(request) {
      try {
        await s$kesehatan.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanEdit(request) {
      try {
        await s$kesehatan.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$kesehatanDelete(request) {
      try {
        await s$kesehatan.del(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$kesehatanList: (state) => state.kesehatan,
  },
});

export default u$kesehatan;
