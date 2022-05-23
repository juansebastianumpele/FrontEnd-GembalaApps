import { defineStore } from 'pinia';
import * as s$customer from '@/services/customer';

const u$customer = defineStore({
  id: 'customer',
  state: () => ({
    customer: [],
    detail: {},
  }),
  actions: {
    async a$customerList() {
      try {
        const { data } = await s$customer.list();
        this.customer = data;
      } catch ({ error }) {
        this.customer = [];
        throw error;
      }
    },
    async a$customerDetail(request) {
      try {
        const { data } = await s$customer.detail(request);
        this.detail = { ...data[0] };
      } catch ({ error }) {
        this.detail = {};
        throw error;
      }
    },
    async a$customerAdd(request) {
      try {
        await s$customer.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$customerEdit(request) {
      try {
        await s$customer.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$customerList: (state) => state.customer,
  },
});

export default u$customer;
