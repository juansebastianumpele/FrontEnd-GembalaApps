import { defineStore } from "pinia";
import * as s$customer from "@/services/customer";
import * as s$commodity from "@/services/commodity";
import * as s$driver from "@/services/driver";
import * as s$device from "@/services/device";
import * as s$unit from "@/services/unit";
import * as s$ternak from "@/services/masterData/ternak";

const u$dropdown = defineStore({
  id: "dropdown",
  state: () => ({
    customer: [],
    commodity: [],
    driver: [],
    truck: [],
    tank: [],
    unit: [],
    status: [
      { id: 0, name: "Siap Dikirim" },
      { id: 1, name: "Sedang Dikirim" },
      { id: 2, name: "Selesai" },
      { id: 3, name: "Tidak Terkirim" },
    ],
    varietas: [],
  }),
  actions: {
    async a$ddCustomer() {
      try {
        const { data } = await s$customer.list();
        this.customer = data;
      } catch ({ error }) {
        this.customer = [];
        throw error;
      }
    },
    async a$ddDriver() {
      try {
        const { data } = await s$driver.list();
        this.driver = data;
      } catch ({ error }) {
        this.driver = [];
        throw error;
      }
    },
    async a$ddCommodity() {
      try {
        const { data } = await s$commodity.list();
        this.commodity = data;
      } catch ({ error }) {
        this.commodity = [];
        throw error;
      }
    },
    async a$ddTank(request) {
      try {
        if (!request) {
          this.tank = [];
          return;
        }
        const { data } = await s$customer.tank(request);
        this.tank = data;
      } catch ({ error }) {
        this.tank = [];
        throw error;
      }
    },
    async a$ddTruck() {
      try {
        const { data } = await s$device.list();
        this.truck = data;
      } catch ({ error }) {
        this.truck = [];
        throw error;
      }
    },
    async a$ddUnit() {
      try {
        const { data } = await s$unit.list();
        this.unit = data;
      } catch ({ error }) {
        this.unit = [];
        throw error;
      }
    },
    async a$listVarietas() {
      try {
        const { data } = await s$ternak.listVarietas();
        this.varietas = data;
      } catch ({ error }) {
        this.varietas = [];
        throw error;
      }
    },
  },
  getters: {
    g$ddCustomer: (state) => state.customer.map(({ id, name }) => ({ id, name })),
    g$ddDriver: (state) => state.driver.map(({ id, name }) => ({ id, username: name })),
    g$ddCommodity: (state) => state.commodity.map(({ id, name }) => ({ id, name })),
    g$ddTank: (state) => state.tank.map(({ id, name, quantity }) => ({ id, name, quantity })),
    g$ddUnit: (state) => state.unit.map(({ id, name }) => ({ id, name })),
    g$ddStatusFalse: (state) => state.status.map(({ id, name }) => ({ id, name })).filter((obj) => obj.id <= 1),
    g$ddStatusTrue: (state) => state.status.map(({ id, name }) => ({ id, name })).filter((obj) => obj.id >= 2),
    g$ddTruck: (state) => state.truck.map(({ id, truckNumber }) => ({ id, name: truckNumber })),
    g$listVarietas: (state) => state.varietas.map(({ id_varietas, nama_varietas }) => ({ id: id_varietas, name: nama_varietas })),
  },
});

export default u$dropdown;
