import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { seatsApi } from '../../services/api/seats.api';
import { bookingsApi } from '../../services/api/bookings.api';
import { useBookingStore } from './booking.store';
import type { CreateBookingRequest } from '../../types/api';

export const useSeats = (eventId: string) =>
  useQuery({
    queryKey: ['seats', eventId],
    queryFn: () => seatsApi.getSeatMap(eventId),
    enabled: !!eventId,
    staleTime: 30 * 1000, // seats refresh every 30s
    refetchInterval: 30 * 1000,
  });

export const useReserveSeats = () => {
  const { setReservation } = useBookingStore();
  return useMutation({
    mutationFn: seatsApi.reserveSeats,
    onSuccess: (data) => setReservation(data),
  });
};

export const useCreateBooking = () => {
  const qc = useQueryClient();
  const { clearBooking } = useBookingStore();
  return useMutation({
    mutationFn: (data: CreateBookingRequest) => bookingsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tickets'] });
      clearBooking();
    },
  });
};

export const useApplyPromo = () => {
  const { setPromo } = useBookingStore();
  return useMutation({
    mutationFn: ({ code, reservationId }: { code: string; reservationId: string }) =>
      bookingsApi.applyPromo(code, reservationId),
    onSuccess: (data, variables) => {
      setPromo(variables.code, data.discount);
    },
  });
};

export const useMyBookings = () =>
  useQuery({
    queryKey: ['bookings', 'my'],
    queryFn: () => bookingsApi.getMyBookings(),
  });
