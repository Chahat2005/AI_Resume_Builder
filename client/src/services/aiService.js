import API, { setAuthToken } from './api';

export const generateAI = async (token, payload) => {
  setAuthToken(token);
  const response = await API.post('/ai/generate', payload);
  return response.data;
};
