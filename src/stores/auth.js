import { defineStore } from 'pinia';

import { login } from '@/services/auth';
import { setCk, delCk, certDetail } from '@/utils/cookies';

import d from 'dayjs';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    userId: '',
    role: '',
  }),
  getters: {
    userInfo: (state) => ({
      userId: state.userId,
      role: state.role,
    }),
    isLoggedIn: (state) => !!state.userId,
  },
  actions: {
    async a$setUserInfo() {
      try {
        const { id, role } = certDetail();
        if (!id && !role) throw new Error('Tidak ada info Pengguna!');
        this.role = role;
        this.userId = id;
        return 'User Authenticated';
      } catch ({ message }) {
        this.role = '';
        this.userId = '';
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
