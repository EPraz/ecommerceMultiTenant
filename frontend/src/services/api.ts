import axios from "axios";
import { getAccessToken } from "../store/tokenUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true, // necesario para que envíe la cookie `jwt`
});

// Interceptor para añadir el accessToken a cada request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
