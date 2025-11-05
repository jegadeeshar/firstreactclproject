import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { useLoginUserStore } from '@core/store';
import alertUtils from '@core/utils/alertUtils';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// 📡 Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useLoginUserStore.getState().token;

    // const token = useLoginUserStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    alertUtils.error('Failed to send request.');
    return Promise.reject(error);
  }
);

// 📡 Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.warn('Unauthorized — redirecting to login.');
        alertUtils.warning('Your session has expired. Please log in again.');
        // Logout user from the global state
        useLoginUserStore.getState().logout();
      } else if (status >= 400 && status < 500) {
        // Handle 4xx client-side errors
        const message = data?.message || 'A client-side error occurred.';
        alertUtils.error(message);
      } else if (status >= 500) {
        // Handle 5xx server-side errors
        const message = 'Server error. Please try again later.';
        alertUtils.error(message);
      }
    } else {
      // Handle network errors (e.g., no internet connection)
      alertUtils.error('Network error. Please check your internet connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
