import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getCompanies = async () => {
  const response = await api.get('/companies');
  return response.data;
};

export const getLocations = async (companyId: string) => {
  const response = await api.get(`/companies/${companyId}/locations`);
  return response.data;
};

export const getAssets = async (companyId: string) => {
  const response = await api.get(`/companies/${companyId}/assets`);
  return response.data;
};
