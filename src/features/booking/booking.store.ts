import { create } from 'zustand';
import type { SeatReservationResponse, PaymentMethod } from '../../types/api';

export interface SelectedSeat {
  seatId: string;
  section: string;
  row: string;
  seatNumber: string;
  price: number;
}

interface BookingState {
  eventId: string | null;
  selectedSeats: SelectedSeat[];
  reservation: SeatReservationResponse | null;
  paymentMethod: PaymentMethod;
  promoCode: string;
  promoDiscount: number;
  // Actions
  setEventId: (id: string) => void;
  toggleSeat: (seat: SelectedSeat) => void;
  clearSeats: () => void;
  setReservation: (r: SeatReservationResponse) => void;
  clearReservation: () => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  setPromo: (code: string, discount: number) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  eventId: null,
  selectedSeats: [],
  reservation: null,
  paymentMethod: 'CARD',
  promoCode: '',
  promoDiscount: 0,

  setEventId: (id) => set({ eventId: id }),

  toggleSeat: (seat) =>
    set((state) => {
      const exists = state.selectedSeats.find((s) => s.seatId === seat.seatId);
      if (exists) {
        return { selectedSeats: state.selectedSeats.filter((s) => s.seatId !== seat.seatId) };
      }
      return { selectedSeats: [...state.selectedSeats, seat] };
    }),

  clearSeats: () => set({ selectedSeats: [] }),

  setReservation: (r) => set({ reservation: r }),

  clearReservation: () => set({ reservation: null }),

  setPaymentMethod: (m) => set({ paymentMethod: m }),

  setPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),

  clearBooking: () =>
    set({
      selectedSeats: [],
      reservation: null,
      promoCode: '',
      promoDiscount: 0,
    }),
}));
