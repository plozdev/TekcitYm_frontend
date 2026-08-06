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
 * Does NOT auto-store tokens — the calling page decides based on flow context:
 *   - Registration flow: page stores tokens → navigate to home
 *   - Password reset flow: page uses resetToken → navigate to reset-password (NO login)
 */
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: OtpRequest) => authApi.verifyOtp(data),
    // Tokens are handled by the calling page's onSuccess callback
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
 * Navigation is handled by the calling page.
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
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
