import api, { saveAuthToken } from './apiClient';

export const login = async (username, password) => {
  try {
    const { data } = await api.post('auth/login', { username, password });

    if (data.token) {
      await saveAuthToken(data.token);
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
