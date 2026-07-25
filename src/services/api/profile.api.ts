import { apiClient } from './client';
import type { ApiResponse, User, UpdateProfileRequest, ChangePasswordRequest } from '../../types/api';

export const profileApi = {
  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/profile').then((r) => r.data.data),

  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.patch<ApiResponse<User>>('/profile', data).then((r) => r.data.data),

  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post<ApiResponse<null>>('/profile/change-password', data).then((r) => r.data),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.post<ApiResponse<{ avatarUrl: string }>>('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data.data);
  },
};
