import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { commodity } = subApiUrl;

const list = () => baseApi.get(`${commodity}/list`);
const add = (req) => baseApi.post(`${commodity}`, req);
const edit = (req) => baseApi.put(`${commodity}`, req);
const del = (req) => baseApi.delete(`${commodity}/${req}`);

const customerList = (id) => baseApi.get(`${commodity}/customer/${id}`);
const customerAdd = (req) => baseApi.post(`${commodity}/customer`, req);
const customerEdit = (req) => baseApi.put(`${commodity}/customer`, req);
const customerDelete = (id) => baseApi.del(`${commodity}/customer/${id}`);

export {
  list, add, edit, del,
  customerList, customerAdd, customerEdit, customerDelete,
};
