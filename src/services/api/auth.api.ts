import { apiClient } from './client';
import type {
  ApiResponse,
  AuthTokens,
  User,
  LoginRequest,
  RegisterRequest,
  OtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../../types/api';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthTokens & { user: User }>>('/auth/login', data).then((r) => r.data.data),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/register', data).then((r) => r.data.data),

  verifyOtp: (data: OtpRequest) =>
    apiClient.post<ApiResponse<AuthTokens & { user: User; resetToken?: string }>>('/auth/verify-otp', data).then((r) => r.data.data),

  resendOtp: (email: string) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/resend-otp', { email }).then((r) => r.data.data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', data).then((r) => r.data.data),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', data).then((r) => r.data.data),

  logout: () =>
    apiClient.post<ApiResponse<null>>('/auth/logout').then((r) => r.data),

  me: () =>
    apiClient.get<ApiResponse<User>>('/auth/me').then((r) => r.data.data),
};
