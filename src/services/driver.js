import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { driver } = subApiUrl;

const list = () => baseApi.get(`${driver}`);
const edit = (req) => baseApi.put(`${driver}/update`, req);
const add = (req) => baseApi.post(`${driver}/register`, req);
const detail = (req) => baseApi.post(`${driver}`, req);

export {
  list, edit, add, detail,
};
