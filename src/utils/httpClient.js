import axios from 'axios';
import api from '@/constants/config';

const httpClient = axios.create({
  baseURL: api.url,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const errorInterceptor = async (error) => {
  console.error(`Network error: ${error.response.status}`, error.message);
  return Promise.reject(error);
};

httpClient.interceptors.response.use(null, errorInterceptor);

export default httpClient;
