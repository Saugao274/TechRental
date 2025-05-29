// src/base/axiosInstance.ts
import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_SERVICE_API_SERVER?.replace(/\/$/, '') +
  '/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor: mọi response trả về res.data luôn
axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default axiosInstance;
