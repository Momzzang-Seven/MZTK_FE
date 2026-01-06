import { useAuthModalStore, useUserStore } from "@store";
import axios, { type AxiosInstance } from "axios";

const BASE_ENV = `${import.meta.env.VITE_API_BASE_URL}`;
// Robust fix: If we are in DEV and the user set the BASE to the backend port directly,
// we force it to empty string to ensure the Vite proxy is used.
let BASE = BASE_ENV;
if (import.meta.env.DEV && BASE_ENV.includes("localhost:8080")) {
  console.warn("Detected localhost:8080 in VITE_API_BASE_URL during DEV. Forcing proxy usage.");
  BASE = "";
}

console.log("Current API BASE URL:", BASE); // Debugging
const authModalState = useAuthModalStore.getState();


const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      // 401
      if (status === 401) {
        authModalState.setUnauthorized(true);
      }

      // 404
      if (status === 404) {
        window.location.href = "/404";
      }

      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use((config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

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
