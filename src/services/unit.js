/* eslint-disable import/prefer-default-export */

import { baseApi } from '@/services/api';
import { subApiUrl } from '@/utils/constant';

const { unit } = subApiUrl;

const list = () => baseApi.get(`${unit}/list`);

export { list };
