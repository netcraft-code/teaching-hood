import axios from "axios";

const api = axios.create({
  baseURL: "https://teaching-hood-backend.netcraftglobal.com",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ ONLY for update profile API
  if (
    (config.url === "/api/profile/update"
    || config.url === "/api/image/update")
    && config.data instanceof FormData
  ) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    // ✅ All other APIs
    config.headers["Content-Type"] = "application/json";
  }
  
  return config;
});

export default api;
