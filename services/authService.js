import { useAuthStore } from "../store/authStore";
import api from './apiClient';

 const { loginStorage } = useAuthStore.getState();

export const login = async (username, password) => {
  try {
    const { data } = await api.post('auth/login', { username, password });
    if (data.token) {
      loginStorage(data.token, username, password);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (registerDto) => {
  try {
    const { data } = await api.post('auth/signup', registerDto);
    return data;
  } catch (error) {
    throw error;
  }
};
