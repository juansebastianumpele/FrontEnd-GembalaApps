import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { ticket } = subApiUrl;

const list = (req) => baseApi.post(`${ticket}/list`, req);
const detail = (req) => baseApi.post(`${ticket}/list`, req);
const add = (req) => baseApi.post(`${ticket}/issue`, req);
const edit = (req) => baseApi.put(`${ticket}/issue/update`, req);

export {
  list, detail, add, edit,
};
