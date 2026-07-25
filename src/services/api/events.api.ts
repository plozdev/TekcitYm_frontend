import { apiClient } from './client';
import type {
  ApiResponse,
  PaginatedResponse,
  Event,
  OrganizerEvent,
  OrganizerStats,
} from '../../types/api';

export interface EventsFilter {
  page?: number;
  size?: number;
  category?: string;
  search?: string;
  city?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  category: string;
  tags: string[];
  startDate: string;
  endDate: string;
  venueId: string;
}

export const eventsApi = {
  getAll: (params?: EventsFilter) =>
    apiClient.get<ApiResponse<PaginatedResponse<Event>>>('/events', { params }).then((r) => r.data.data),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Event>>(`/events/${id}`).then((r) => r.data.data),

  getFeatured: () =>
    apiClient.get<ApiResponse<Event[]>>('/events/featured').then((r) => r.data.data),

  // Organizer-scoped
  getMyEvents: (params?: EventsFilter) =>
    apiClient.get<ApiResponse<PaginatedResponse<OrganizerEvent>>>('/organizer/events', { params }).then((r) => r.data.data),

  getStats: () =>
    apiClient.get<ApiResponse<OrganizerStats>>('/organizer/stats').then((r) => r.data.data),

  create: (data: CreateEventPayload) =>
    apiClient.post<ApiResponse<Event>>('/organizer/events', data).then((r) => r.data.data),

  update: (id: string, data: Partial<CreateEventPayload>) =>
    apiClient.patch<ApiResponse<Event>>(`/organizer/events/${id}`, data).then((r) => r.data.data),

  publish: (id: string) =>
    apiClient.post<ApiResponse<Event>>(`/organizer/events/${id}/publish`).then((r) => r.data.data),
};
