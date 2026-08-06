import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import { useAuthStore } from './auth.store';
import { logger } from '../../utils/logger';
import type {
  LoginRequest,
  RegisterRequest,
  OtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../../types/api';

/**
 * Login mutation.
 * Navigation is handled by the calling page's onSuccess/onError callbacks.
 */
export const useLogin = () => {
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => {
      logger.info('AUTH_HOOK', 'Initiating login request', { email: data.email });
      return authApi.login(data);
    },
    onSuccess: (response, variables) => {
      logger.info('AUTH_HOOK', 'Login successful', { email: variables.email, userId: response.user?.id });
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      // Navigation is handled by the calling page
    },
    onError: (error: any, variables) => {
      logger.error('AUTH_HOOK', 'Login failed', {
        email: variables.email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });
};

/**
 * Register mutation.
 * Navigation to OTP page is handled by the calling page's onSuccess callback.
 */
export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterRequest) => {
      logger.info('AUTH_HOOK', 'Initiating registration request', { email: data.email, fullName: data.fullName });
      return authApi.register(data);
    },
    onSuccess: (_, variables) => {
      logger.info('AUTH_HOOK', 'Registration successful, OTP sent', { email: variables.email });
    },
    onError: (error: any, variables) => {
      logger.error('AUTH_HOOK', 'Registration failed', {
        email: variables.email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });

/**
 * Verify OTP mutation.
 * Does NOT auto-store tokens — the calling page decides based on flow context:
 *   - Registration flow: page stores tokens → navigate to home
 *   - Password reset flow: page uses resetToken → navigate to reset-password (NO login)
 */
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: OtpRequest) => {
      logger.info('AUTH_HOOK', 'Initiating OTP verification', { email: data.email, flow: data.flow });
      return authApi.verifyOtp(data);
    },
    onSuccess: (response, variables) => {
      logger.info('AUTH_HOOK', 'OTP verification successful', {
        email: variables.email,
        hasAccessToken: !!response.accessToken,
        hasResetToken: !!response.resetToken,
      });
    },
    onError: (error: any, variables) => {
      logger.error('AUTH_HOOK', 'OTP verification failed', {
        email: variables.email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });
};

export const useResendOtp = () =>
  useMutation({
    mutationFn: (email: string) => {
      logger.info('AUTH_HOOK', 'Requesting resend OTP', { email });
      return authApi.resendOtp(email);
    },
    onSuccess: (_, email) => {
      logger.info('AUTH_HOOK', 'Resend OTP successful', { email });
    },
    onError: (error: any, email) => {
      logger.error('AUTH_HOOK', 'Resend OTP failed', {
        email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });

/**
 * Forgot password mutation.
 * Navigation is handled by the calling page's onSuccess callback.
 */
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordRequest) => {
      logger.info('AUTH_HOOK', 'Initiating forgot password request', { email: data.email });
      return authApi.forgotPassword(data);
    },
    onSuccess: (_, variables) => {
      logger.info('AUTH_HOOK', 'Forgot password request successful, OTP sent', { email: variables.email });
    },
    onError: (error: any, variables) => {
      logger.error('AUTH_HOOK', 'Forgot password request failed', {
        email: variables.email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });

/**
 * Reset password mutation.
 * Navigation is handled by the calling page.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => {
      logger.info('AUTH_HOOK', 'Initiating reset password', { email: data.email });
      return authApi.resetPassword(data);
    },
    onSuccess: (_, variables) => {
      logger.info('AUTH_HOOK', 'Password reset successful', { email: variables.email });
    },
    onError: (error: any, variables) => {
      logger.error('AUTH_HOOK', 'Password reset failed', {
        email: variables.email,
        errorCode: error?.response?.data?.errorCode,
        message: error?.message,
      });
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      logger.info('AUTH_HOOK', 'Initiating logout request');
      return authApi.logout();
    },
    onSettled: () => {
      logger.info('AUTH_HOOK', 'Logout cleared local auth state and navigating to /login');
      clearAuth();
      // Replace history so browser back button doesn't go to protected pages
      navigate('/login', { replace: true });
    },
  });
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authApi.me(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

