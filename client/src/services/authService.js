import API, { setAuthToken } from './api';

export const login = async (payload) => {
  const response = await API.post('/auth/login', payload);
  return response.data;
};

export const register = async (payload) => {
  const response = await API.post('/auth/register', payload);
  return response.data;
};

export const getProfile = async (token) => {
  setAuthToken(token);
  const response = await API.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (token, payload) => {
  setAuthToken(token);
  const response = await API.put('/auth/profile', payload);
  return response.data;
};

export const changePassword = async (token, payload) => {
  setAuthToken(token);
  const response = await API.put('/auth/password', payload);
  return response.data;
};

export const deleteProfile = async (token) => {
  setAuthToken(token);
  const response = await API.delete('/auth/profile');
  return response.data;
};
