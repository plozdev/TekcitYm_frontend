import { apiClient } from './client';
import type { ApiResponse, Booking, CreateBookingRequest } from '../../types/api';

export const bookingsApi = {
  create: (data: CreateBookingRequest) =>
    apiClient.post<ApiResponse<Booking>>('/bookings', data).then((r) => r.data.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`).then((r) => r.data.data),

  getMyBookings: () =>
    apiClient.get<ApiResponse<Booking[]>>('/bookings/my').then((r) => r.data.data),

  cancelBooking: (id: string) =>
    apiClient.post<ApiResponse<null>>(`/bookings/${id}/cancel`).then((r) => r.data),

  applyPromo: (code: string, reservationId: string) =>
    apiClient.post<ApiResponse<{ discount: number; finalTotal: number }>>('/bookings/promo', { code, reservationId }).then((r) => r.data.data),
};
