import { defineStore } from 'pinia';

import { login } from '@/services/auth';
import { setCk, delCk, certDetail } from '@/utils/cookies';

import d from 'dayjs';

const useAuthStore = defineStore({
  id: 'auth',
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
        const { id, name, role } = certDetail();
        if (!id && !role) throw new Error('Tidak ada info Pengguna!');
        this.role = role;
        this.name = name;
        this.id = id;
        return 'User Authenticated';
      } catch ({ message }) {
        this.role = undefined;
        this.name = undefined;
        this.id = undefined;
        throw message;
      }
    },
    async a$login(payload) {
      try {
        const { data } = await login(payload);
        setCk('CERT', data.token, { datetime: d(data.expiresAt) });
        this.a$setUserInfo();
        return 'Login success!';
      } catch ({ error, message }) {
        throw (error || message) ?? 'Login failed!';
      }
    },
    async a$logout() {
      try {
        const { id, role, name } = certDetail();
        if (id || role || name) delCk('CERT');
        this.a$setUserInfo();
        return 'Logout success!';
      } catch ({ error, message }) {
        throw (error || message) ?? 'Logout failed!';
      }
    },
  },
});

export default useAuthStore;
