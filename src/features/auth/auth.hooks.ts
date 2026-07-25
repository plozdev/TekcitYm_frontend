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

export const useLogin = () => {
  const { setUser, setTokens } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      navigate('/');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (_, variables) => {
      navigate(`/verify-otp?email=${encodeURIComponent(variables.email)}`);
    },
  });
};

export const useVerifyOtp = () => {
  const { setUser, setTokens } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: OtpRequest) => authApi.verifyOtp(data),
    onSuccess: (response) => {
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      navigate('/');
    },
  });
};

export const useResendOtp = () =>
  useMutation({
    mutationFn: (email: string) => authApi.resendOtp(email),
  });

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: () => {
      navigate('/reset-password');
    },
  });
};

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
