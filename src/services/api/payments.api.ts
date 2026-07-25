import { apiClient } from './client';
import type { ApiResponse, Booking } from '../../types/api';

export interface PaymentStatusResponse {
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  booking?: Booking;
  message?: string;
}

export const paymentsApi = {
  getStatus: (bookingId: string) =>
    apiClient.get<ApiResponse<PaymentStatusResponse>>(`/payments/${bookingId}/status`).then((r) => r.data.data),

  retry: (bookingId: string) =>
    apiClient.post<ApiResponse<{ paymentUrl: string }>>(`/payments/${bookingId}/retry`).then((r) => r.data.data),
};
