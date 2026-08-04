// ─── Shared Response Envelopes ───────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
  createdAt: string;
}

export interface OtpRequest {
  email: string;
  otpCode: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// ─── Events ──────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  bannerUrl: string;
  posterUrl: string;
  images: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  startDate: string;
  endDate: string;
  venue: Venue;
  organizer: OrganizerProfile;
  ticketTiers: TicketTier[];
  totalCapacity: number;
  soldCount: number;
  viewerCount?: number;
  minPrice: number;
  maxPrice: number;
  createdAt: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface TicketTier {
  id: string;
  name: string;
  description?: string;
  price: number;
  capacity: number;
  sold: number;
  status: 'AVAILABLE' | 'SOLD_OUT' | 'PAUSED';
}

export interface OrganizerProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  verified: boolean;
}

// ─── Seats ───────────────────────────────────────────────────────────────────
export interface SeatSection {
  id: string;
  name: string;
  type: 'SEATED' | 'STANDING';
  color: string;
  rows: SeatRow[];
  ticketTierId: string;
  price: number;
  totalCapacity: number;
  availableCount: number;
}

export interface SeatRow {
  id: string;
  label: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  seatNumber: string;
  status: 'AVAILABLE' | 'SELECTED' | 'RESERVED' | 'SOLD';
}

export interface SeatSelectionRequest {
  eventId: string;
  seatIds: string[];
}

export interface SeatReservationResponse {
  reservationId: string;
  expiresAt: string;
  seatIds: string[];
  totalPrice: number;
}

// ─── Booking ─────────────────────────────────────────────────────────────────
export type PaymentMethod = 'CARD' | 'VNPAY' | 'MOMO';

export interface CreateBookingRequest {
  reservationId: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
}

export interface Booking {
  id: string;
  event: Event;
  seats: BookedSeat[];
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: PaymentMethod;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  totalAmount: number;
  promoDiscount: number;
  paymentUrl?: string;
  paymentReference?: string;
  createdAt: string;
}

export interface BookedSeat {
  seatId: string;
  section: string;
  row: string;
  seatNumber: string;
  price: number;
}

// ─── Tickets ─────────────────────────────────────────────────────────────────
export interface Ticket {
  id: string;
  booking: Booking;
  event: Event;
  seat: BookedSeat;
  qrCode: string;
  status: 'ACTIVE' | 'USED' | 'CANCELLED' | 'EXPIRED';
  tier: string;
  holderName: string;
  issuedAt: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export interface UpdateProfileRequest {
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ─── Organizer ───────────────────────────────────────────────────────────────
export interface OrganizerStats {
  totalRevenue: number;
  ticketsSold: number;
  activeEvents: number;
  refundRate: number;
  revenueChange: number;
  ticketsChange: number;
}

export interface OrganizerEvent extends Event {
  revenue: number;
}
