import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 30000,
});

// Attach token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints that should NOT trigger a global redirect on 401
const AUTH_PATHS = [
  '/auth/login',
  '/auth/register',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/verify-otp',
  '/auth/reset-password',
  '/auth/resend-otp',
];

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      error.message = 'Connection timed out. Please check your network or try again.';
    }

    // Only redirect on 401 for PROTECTED routes (expired token).
    // Auth endpoints handle their own 401 errors in the component's onError callback.
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      const isAuthEndpoint = AUTH_PATHS.some((path) => requestUrl.includes(path));

      if (!isAuthEndpoint) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
