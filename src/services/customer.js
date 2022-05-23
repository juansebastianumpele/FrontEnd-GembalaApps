import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { customer } = subApiUrl;

const list = () => baseApi.get(`${customer}`);
const detail = (req) => baseApi.get(`${customer}`, req);
const add = (req) => baseApi.post(`${customer}/register`, req);
const edit = (req) => baseApi.put(`${customer}/update`, req);

const orderList = () => baseApi.post(`${customer}/order/list`);
const orderAdd = (req) => baseApi.post(`${customer}/order/add`, req);
const orderEdit = (req) => baseApi.post(`${customer}/order/edit/${req.id}`, req);
const orderDelete = (req) => baseApi.delete(`${customer}/order/delete/${req.id}/${req.customer}`, req);

const tankList = (req) => baseApi.get(`${customer}/tank/${req}`);
const tankAdd = (req) => baseApi.post(`${customer}/tank`, req);
const tankEdit = (req) => baseApi.put(`${customer}/tank`, req);

const tank = (req) => baseApi.get(`${customer}/tank?${req}`);

export {
  list, detail, add, edit,
  orderList, orderAdd, orderEdit, orderDelete,
  tankList, tankAdd, tankEdit,
  tank,
};
