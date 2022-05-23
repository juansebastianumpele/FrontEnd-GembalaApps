import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { user } = subApiUrl;

const detail = () => baseApi.get(`${user}/profile`);
const changePw = (req) => baseApi.post(`${user}/change-password`, req);

export { detail, changePw };
