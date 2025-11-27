import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = "https://uncaptivated-nonflexibly-denzel.ngrok-free.dev/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar token a cada request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refrescar token expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token, username, password } = useAuthStore.getState();

        // Petición para refrescar el token
        const refreshResponse = await axios.get(
          `${BASE_URL}/auth/refresh?token=${token}`
        );

        const newToken = refreshResponse.data.token;

        // Guardar el nuevo token en Zustand
        useAuthStore.getState().loginStorage(newToken, username, password);

        // Reintentar petición original
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logoutStorge();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;