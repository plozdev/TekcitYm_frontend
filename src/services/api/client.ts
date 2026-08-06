import axios from 'axios';
import { logger } from '../../utils/logger';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  timeout: 30000,
});

// Attach token from localStorage on every request & log request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  (config as any).metadata = { startTime: new Date().getTime() };

  logger.info(
    'API',
    `-> ${config.method?.toUpperCase()} ${config.url}`,
    config.data ? config.data : undefined
  );

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

// Handle response & errors globally with logging
apiClient.interceptors.response.use(
  (response) => {
    const startTime = (response.config as any).metadata?.startTime;
    const duration = startTime ? `${new Date().getTime() - startTime}ms` : '';
    logger.info(
      'API',
      `<- ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} (${duration})`,
      response.data ? response.data : undefined
    );
    return response;
  },
  (error) => {
    const startTime = (error.config as any)?.metadata?.startTime;
    const duration = startTime ? `${new Date().getTime() - startTime}ms` : '';
    const status = error.response?.status || 'NETWORK_ERROR';
    const url = error.config?.url || 'unknown_url';
    const method = error.config?.method?.toUpperCase() || '';

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      error.message = 'Connection timed out. Please check your network or try again.';
    }

    logger.error(
      'API',
      `X ${status} ${method} ${url} (${duration}) - ${error.message}`,
      error.response?.data ? error.response.data : undefined
    );

    // Only redirect on 401 for PROTECTED routes (expired token).
    // Auth endpoints handle their own 401 errors in the component's onError callback.
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      const isAuthEndpoint = AUTH_PATHS.some((path) => requestUrl.includes(path));

      if (!isAuthEndpoint) {
        logger.warn('AUTH', 'Unauthorized (401) on protected route. Clearing token & redirecting to /login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

