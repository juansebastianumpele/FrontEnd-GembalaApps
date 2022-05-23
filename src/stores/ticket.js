import { defineStore } from 'pinia';
import * as s$ticket from '@/services/ticket';

const u$ticket = defineStore({
  id: 'ticket',
  state: () => ({
    order: [],
    delivered: [],
    detail: {},
  }),
  actions: {
    async a$orderList(request) {
      try {
        const { data } = await s$ticket.list(request);
        this.order = data;
      } catch ({ error }) {
        this.order = [];
        throw error;
      }
    },
    async a$deliveredList(request) {
      try {
        const { data } = await s$ticket.list(request);
        this.delivered = data;
      } catch ({ error }) {
        this.delivered = [];
        throw error;
      }
    },
    // Detail
    async a$deliveryDetail(request) {
      try {
        if (!request) {
          this.detail = {};
          return;
        }
        const { data } = await s$ticket.detail(request);
        this.detail = { ...data[0] };
      } catch ({ error }) {
        this.detail = {};
        throw error;
      }
    },
    // Order
    async a$orderAdd(request) {
      try {
        await s$ticket.add(request);
      } catch ({ error }) {
        throw error;
      }
    },
    async a$orderEdit(request) {
      try {
        await s$ticket.edit(request);
      } catch ({ error }) {
        throw error;
      }
    },
  },
  getters: {
    g$orderList: (state) => state.order,
    g$deliveredList: (state) => state.delivered,
    g$deliveryDetail: (state) => state.detail,
  },
});

export default u$ticket;
