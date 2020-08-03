import axios from 'axios';
import Auth from '../Auth/Auth'

axios.interceptors.request.use((config) => {
  config.headers.Authorization = Auth.getAuthHeader()
  return config;
})
