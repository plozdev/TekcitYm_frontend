import { apiClient } from './client';
import type { ApiResponse, Ticket } from '../../types/api';

export const ticketsApi = {
  getMyTickets: () =>
    apiClient.get<ApiResponse<Ticket[]>>('/tickets/my').then((r) => r.data.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Ticket>>(`/tickets/${id}`).then((r) => r.data.data),
};
