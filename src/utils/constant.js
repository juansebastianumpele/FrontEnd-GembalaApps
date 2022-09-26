const host = import.meta.env.VITE_BASE_API_URL;
// const host = "http://localhost:51009";
// const host = "https://be.gembala.sembadafarm.com/";

const baseApiUrl = `${host}/`;

const subApiUrl = {
  // Base
  auth: "auth",
  api: "api",
  // Sub Sub URL
  pakan: "pakan",
  kawin: "kawin",
  kandang: "kandang",
  kesehatan: "kesehatan",
  penyakit: "penyakit",
  ternak: "ternak",
  costumer: "costumer",
  total: "total",
};

export { host, baseApiUrl, subApiUrl };
