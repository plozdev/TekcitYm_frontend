import { useQuery } from '@tanstack/react-query';
import { ticketsApi } from '../../services/api/tickets.api';

export const useMyTickets = () =>
  useQuery({
    queryKey: ['tickets', 'my'],
    queryFn: () => ticketsApi.getMyTickets(),
  });

export const useTicket = (id: string) =>
  useQuery({
    queryKey: ['tickets', id],
    queryFn: () => ticketsApi.getById(id),
    enabled: !!id,
  });
