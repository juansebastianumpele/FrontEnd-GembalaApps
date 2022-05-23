import { baseApi } from '@/services/api';

const login = (req) => baseApi.post('auth/login', req);
const logout = () => baseApi.post('auth/logout');

export { login, logout };
