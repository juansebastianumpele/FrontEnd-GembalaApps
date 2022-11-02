import { baseApi } from "@/services/api";

const getDataUsers = () => baseApi.get('api/superadmin');
const getNewToken = (request) => baseApi.post('api/superadmin/generate-token', request);

export { getDataUsers, getNewToken };
