import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import OrganizerLayout from '../layouts/OrganizerLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Pages - Lazy Loaded
const DashboardPage = React.lazy(() => import('../pages/dashboard/DashboardPage'));
const DiscoverEventsPage = React.lazy(() => import('../pages/events/DiscoverEventsPage'));
const EventDetailsPage = React.lazy(() => import('../pages/events/EventDetailsPage'));
const SelectSeatsPage = React.lazy(() => import('../pages/booking/SelectSeatsPage'));
const CheckoutPage = React.lazy(() => import('../pages/checkout/CheckoutPage'));
const PaymentProcessingPage = React.lazy(() => import('../pages/payment/PaymentProcessingPage'));
const PaymentFailedPage = React.lazy(() => import('../pages/payment/PaymentFailedPage'));
const BookingConfirmedPage = React.lazy(() => import('../pages/booking/BookingConfirmedPage'));
const MyTicketsPage = React.lazy(() => import('../pages/tickets/MyTicketsPage'));
const TicketDetailsPage = React.lazy(() => import('../pages/tickets/TicketDetailsPage'));
const UserProfilePage = React.lazy(() => import('../pages/profile/UserProfilePage'));

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import OTPVerificationPage from '../pages/auth/OtpVerificationPage';

const OrganizerDashboardPage = React.lazy(() => import('../pages/organizer/OrganizerDashboardPage'));
const RevenueAnalyticsPage = React.lazy(() => import('../pages/organizer/RevenueAnalyticsPage'));
const EventListPage = React.lazy(() => import('../pages/organizer/EventListPage'));
const CreateEventPage = React.lazy(() => import('../pages/organizer/CreateEventPage'));
const SeatLayoutBuilderPage = React.lazy(() => import('../pages/organizer/SeatLayoutBuilderPage'));

import GlobalErrorPage from '../pages/error/GlobalErrorPage';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

/** Helper to wrap a page in Suspense + ProtectedRoute */
const protectedPage = (Page: React.LazyExoticComponent<any>) => (
  <ProtectedRoute>
    <Suspense fallback={<LoadingFallback />}>
      <Page />
    </Suspense>
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      // Public pages
      { index: true, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },
      { path: 'events', element: <Suspense fallback={<LoadingFallback />}><DiscoverEventsPage /></Suspense> },
      { path: 'events/:eventId', element: <Suspense fallback={<LoadingFallback />}><EventDetailsPage /></Suspense> },

      // Protected pages — require authentication
      { path: 'events/:eventId/seats', element: protectedPage(SelectSeatsPage) },
      { path: 'checkout', element: protectedPage(CheckoutPage) },
      { path: 'payment/processing', element: protectedPage(PaymentProcessingPage) },
      { path: 'payment/failed', element: protectedPage(PaymentFailedPage) },
      { path: 'booking/confirmed', element: protectedPage(BookingConfirmedPage) },
      { path: 'tickets', element: protectedPage(MyTicketsPage) },
      { path: 'tickets/:ticketId', element: protectedPage(TicketDetailsPage) },
      { path: 'profile', element: protectedPage(UserProfilePage) },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'verify-otp', element: <OTPVerificationPage /> },
    ],
  },
  {
    path: '/organizer',
    element: <OrganizerLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: protectedPage(OrganizerDashboardPage) },
      { path: 'events', element: protectedPage(EventListPage) },
      { path: 'events/new', element: protectedPage(CreateEventPage) },
      { path: 'analytics', element: protectedPage(RevenueAnalyticsPage) },
      { path: 'seats-builder', element: protectedPage(SeatLayoutBuilderPage) },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
