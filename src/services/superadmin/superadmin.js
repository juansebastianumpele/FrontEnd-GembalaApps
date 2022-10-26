import { baseApi } from "@/services/api";

const getDataUsers = () => baseApi.get(`api/users?role=admin`);

export { getDataUsers };
