import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (refreshToken) {
          // Attempt to refresh token
          const res = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, {
            refreshToken,
          });
          
          const newAccessToken = res.data?.data?.accessToken;
          const newRefreshToken = res.data?.data?.refreshToken;
          
          if (newAccessToken) {
            useAuthStore.getState().setAuth(
              useAuthStore.getState().user!,
              newAccessToken,
              newRefreshToken || refreshToken
            );
            
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        useAuthStore.getState().clearAuth();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
