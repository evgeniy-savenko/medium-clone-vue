import axios from 'axios';
import {getItem} from '@/helpers/persistanceStorage';

axios.defaults.baseURL = 'https://api.realworld.io/api';

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken');
  const authToken = token ? `Token ${token}` : '';
  config.headers.Authorization = authToken;
  return config;
});

export default axios;
