const host = import.meta.env.VITE_BASE_API_URL;

const baseApiUrl = `${host}/api/`;

const subApiUrl = {
  admin: 'dashboard',
  ticket: 'ticket',
  customer: 'customer',
  commodity: 'commodity',
  driver: 'driver',
  device: 'device',
  unit: 'unit',
  user: 'user',
};

export {
  host, baseApiUrl, subApiUrl,
};
