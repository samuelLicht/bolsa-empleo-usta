import axios from 'axios';

const API = 'http://localhost:3000/api/students';

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const loginStudent = (email, password) =>
  axios.post(`${API}/login`, { email, password });

export const registerStudent = (data) =>
  axios.post(`${API}/register`, data);

export const getProfile = (token) =>
  axios.get(`${API}/profile`, getAuthHeader(token));

export const updateProfile = (token, data) =>
  axios.put(`${API}/profile`, data, getAuthHeader(token));

export const getJobs = (token, filters = {}) =>
  axios.get(`${API}/jobs`, { ...getAuthHeader(token), params: filters });

export const applyToJob = (token, jobOfferId, coverLetter) =>
  axios.post(`${API}/apply`, { jobOfferId, coverLetter }, getAuthHeader(token));

export const getHistory = (token) =>
  axios.get(`${API}/history`, getAuthHeader(token));