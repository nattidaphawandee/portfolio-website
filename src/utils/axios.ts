/**
 * axios setup to use mock service
 */

// import axios from 'axios';
import axios, { type AxiosRequestConfig } from 'axios';
import { notification } from 'ant-design-vue';
import { router } from '@/router';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.message !== 'Network Error') {
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            localStorage.clear();
            router.push({ name: 'LoginPage' }).catch(() => {});
            // Vue.$websocket.Disconnect()
            notification.error({
              message: error.response.data.message,
              placement: 'bottomRight',
              duration: 2
            });
            break;
        }
        return error.response.data
      }
    } else {
      localStorage.clear();
      router.push({ name: 'LoginPage' }).catch(() => {});
      // Vue.$websocket.Disconnect()
      notification.error({
        message: 'Not connect to server',
        placement: 'bottomRight',
        duration: 2
      });
    }
  }
);
axiosServices.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AccessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// export default axiosServices;
export default async function fetchAxios<T>(config: AxiosRequestConfig): Promise<T> {
  return await axiosServices(config);
}
