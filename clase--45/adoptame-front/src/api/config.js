import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://adoptame.up.railway.app',
  withCredentials: true,
});

export default axiosInstance;
