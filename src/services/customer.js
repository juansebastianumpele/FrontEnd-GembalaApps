import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { api, costumer } = subApiUrl;

const list = () => baseApi.get(`${api}/${costumer}`);
const detail = (req) => baseApi.get(`${api}/${costumer}/${req.id}`, req);
const edit = (req) => baseApi.put(`${api}/${costumer}`, req);

export {
  list, detail, edit,
};
