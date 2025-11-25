import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const API_BASE_URL = ' https://uncaptivated-nonflexibly-denzel.ngrok-free.dev/api';
const TOKEN_KEY = 'userToken';

//176561462626-29skkfl5dkhjjqf3cbhcove1uq92e52v.apps.googleusercontent.com
export const saveAuthToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const msg = error.response.data?.mensaje || `Error ${error.response.status}`;
      return Promise.reject(new Error(msg));
    } else if (error.request) {
      return Promise.reject(new Error('No se pudo conectar con el servidor.'));
    } else {
      return Promise.reject(new Error(error.message));
    }
  }
);

export default api;
