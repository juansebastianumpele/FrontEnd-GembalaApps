import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { device } = subApiUrl;

const list = () => baseApi.get(`${device}/list`);
const add = (req) => baseApi.post(`${device}/register`, req);
const detail = (req) => baseApi.post(`${device}`, req);

export { list, add, detail };
