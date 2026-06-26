import API, { setAuthToken } from './api';

export const fetchResumes = async (token, params = {}) => {
  setAuthToken(token);
  const response = await API.get('/resumes', { params });
  return response.data;
};

export const fetchResume = async (token, id) => {
  setAuthToken(token);
  const response = await API.get(`/resumes/${id}`);
  return response.data;
};

export const createResume = async (token, data) => {
  setAuthToken(token);
  const response = await API.post('/resumes', data);
  return response.data;
};

export const updateResume = async (token, id, data) => {
  setAuthToken(token);
  const response = await API.put(`/resumes/${id}`, data);
  return response.data;
};

export const deleteResume = async (token, id) => {
  setAuthToken(token);
  const response = await API.delete(`/resumes/${id}`);
  return response.data;
};

export const duplicateResume = async (token, id) => {
  setAuthToken(token);
  const response = await API.post(`/resumes/${id}/duplicate`);
  return response.data;
};

export const fetchRecentResumes = async (token) => {
  setAuthToken(token);
  const response = await API.get('/resumes/recent');
  return response.data;
};

export const fetchStats = async (token) => {
  setAuthToken(token);
  const response = await API.get('/resumes/stats');
  return response.data;
};
