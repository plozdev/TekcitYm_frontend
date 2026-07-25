import { useQuery, useMutation } from '@tanstack/react-query';
import { paymentsApi } from '../../services/api/payments.api';

export const usePaymentStatus = (bookingId: string, enabled = true) =>
  useQuery({
    queryKey: ['payment', 'status', bookingId],
    queryFn: () => paymentsApi.getStatus(bookingId),
    enabled: !!bookingId && enabled,
    refetchInterval: (data) => {
      // Poll every 2s until status is no longer PENDING
      if (data?.state?.data?.status === 'PENDING') return 2000;
      return false;
    },
  });

export const useRetryPayment = () =>
  useMutation({
    mutationFn: (bookingId: string) => paymentsApi.retry(bookingId),
  });
