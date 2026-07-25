import { apiClient } from './client';
import type { ApiResponse, SeatSection, SeatSelectionRequest, SeatReservationResponse } from '../../types/api';

export const seatsApi = {
  getSeatMap: (eventId: string) =>
    apiClient.get<ApiResponse<SeatSection[]>>(`/events/${eventId}/seat-map`).then((r) => r.data.data),

  reserveSeats: (data: SeatSelectionRequest) =>
    apiClient.post<ApiResponse<SeatReservationResponse>>('/bookings/reserve', data).then((r) => r.data.data),

  releaseReservation: (reservationId: string) =>
    apiClient.delete<ApiResponse<null>>(`/bookings/reserve/${reservationId}`).then((r) => r.data),
};
