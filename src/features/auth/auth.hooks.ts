import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import { useAuthStore } from './auth.store';
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
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      // Navigation is handled by the calling page
    },
  });
};

/**
 * Register mutation.
 * Navigation to OTP page is handled by the calling page's onSuccess callback.
 */
export const useRegister = () =>
  useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });

/**
 * Verify OTP mutation.
 * Stores tokens on success. Navigation is handled by the calling page
 * (different destinations depending on context: registration vs password reset).
 */
export const useVerifyOtp = () => {
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: (data: OtpRequest) => authApi.verifyOtp(data),
    onSuccess: (response) => {
      if (response.accessToken && response.user) {
        setTokens(response.accessToken, response.refreshToken);
        setUser(response.user);
      }
      // Navigation is handled by the calling page
    },
  });
};

export const useResendOtp = () =>
  useMutation({
    mutationFn: (email: string) => authApi.resendOtp(email),
  });

/**
 * Forgot password mutation.
 * Navigation is handled by the calling page's onSuccess callback.
 */
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });

/**
 * Reset password mutation.
 * Navigates to login on success.
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: () => {
      navigate('/login');
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      navigate('/login');
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
