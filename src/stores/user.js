import { defineStore } from 'pinia';
import * as s$user from '@/services/user';

const u$user = defineStore({
  id: 'user',
  state: () => ({
    detail: {
      username: '',
      name: '',
      NPWP: '',
      street1: '',
      street2: '',
      street3: '',
      city: '',
      postCode: '',
      country: '',
    },
  }),
  actions: {
    // Detail
    async a$userDetail() {
      try {
        const { data } = await s$user.detail();
        this.detail = data;
      } catch ({ error }) {
        this.detail = {
          username: '',
          name: '',
          NPWP: '',
          street1: '',
          street2: '',
          street3: '',
          city: '',
          postCode: '',
          country: '',
        };
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
  },
  getters: {
    g$userDetail: (state) => state.detail,
  },
});

export default u$user;
