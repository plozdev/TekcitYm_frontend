import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../../services/api/profile.api';
import { useAuthStore } from '../auth/auth.store';
import type { UpdateProfileRequest, ChangePasswordRequest } from '../../types/api';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => profileApi.getProfile(),
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => profileApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      qc.setQueryData(['profile'], updatedUser);
      setUser(updatedUser);
    },
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: (data: ChangePasswordRequest) => profileApi.changePassword(data),
  });

export const useUploadAvatar = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => profileApi.uploadAvatar(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
