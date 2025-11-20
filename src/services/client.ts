import axios, { type AxiosInstance } from "axios";

const BASE = `${import.meta.env.VITE_API_BASE_URL}`;

const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      // 404
      if (status === 404) {
        window.location.href = "/404";
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = attachInterceptors(
  axios.create({
    baseURL: BASE,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
);

export const authApi = attachInterceptors(
  axios.create({
    baseURL: `${BASE}/auth`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
);

export const walletApi = attachInterceptors(
  axios.create({
    baseURL: `${BASE}/api/auth/wallet`,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
);
