import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { api, total } = subApiUrl;

const totalTernakList = (req) => baseApi.get(`${api}/${total}/${req}`);
const detail = (req) => baseApi.get(`${api}/${total}/${req.id}`, req);
const edit = (req) => baseApi.put(`${api}/${total}`, req);

export {
  totalTernakList, detail, edit,
};
