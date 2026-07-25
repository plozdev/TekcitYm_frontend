import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi, type EventsFilter } from '../../services/api/events.api';
import type { CreateEventPayload } from '../../services/api/events.api';

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: EventsFilter) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  featured: () => [...eventKeys.all, 'featured'] as const,
  myEvents: () => ['organizer', 'events'] as const,
  stats: () => ['organizer', 'stats'] as const,
};

export const useEvents = (filters?: EventsFilter) =>
  useQuery({
    queryKey: eventKeys.list(filters ?? {}),
    queryFn: () => eventsApi.getAll(filters),
    staleTime: 2 * 60 * 1000,
  });

export const useFeaturedEvents = () =>
  useQuery({
    queryKey: eventKeys.featured(),
    queryFn: () => eventsApi.getFeatured(),
    staleTime: 5 * 60 * 1000,
  });

export const useEvent = (id: string) =>
  useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });

export const useMyEvents = (filters?: EventsFilter) =>
  useQuery({
    queryKey: eventKeys.myEvents(),
    queryFn: () => eventsApi.getMyEvents(filters),
    staleTime: 1 * 60 * 1000,
  });

export const useOrganizerStats = () =>
  useQuery({
    queryKey: eventKeys.stats(),
    queryFn: () => eventsApi.getStats(),
    staleTime: 2 * 60 * 1000,
  });

export const useCreateEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventPayload) => eventsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.myEvents() });
    },
  });
};

export const usePublishEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventsApi.publish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.myEvents() });
    },
  });
};
