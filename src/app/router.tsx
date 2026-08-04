import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import OrganizerLayout from '../layouts/OrganizerLayout';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },
      { path: 'events', element: <Suspense fallback={<LoadingFallback />}><DiscoverEventsPage /></Suspense> },
      { path: 'events/:eventId', element: <Suspense fallback={<LoadingFallback />}><EventDetailsPage /></Suspense> },
      { path: 'events/:eventId/seats', element: <Suspense fallback={<LoadingFallback />}><SelectSeatsPage /></Suspense> },
      { path: 'checkout', element: <Suspense fallback={<LoadingFallback />}><CheckoutPage /></Suspense> },
      { path: 'payment/processing', element: <Suspense fallback={<LoadingFallback />}><PaymentProcessingPage /></Suspense> },
      { path: 'payment/failed', element: <Suspense fallback={<LoadingFallback />}><PaymentFailedPage /></Suspense> },
      { path: 'booking/confirmed', element: <Suspense fallback={<LoadingFallback />}><BookingConfirmedPage /></Suspense> },
      { path: 'tickets', element: <Suspense fallback={<LoadingFallback />}><MyTicketsPage /></Suspense> },
      { path: 'tickets/:ticketId', element: <Suspense fallback={<LoadingFallback />}><TicketDetailsPage /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<LoadingFallback />}><UserProfilePage /></Suspense> },
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
      { index: true, element: <Suspense fallback={<LoadingFallback />}><OrganizerDashboardPage /></Suspense> },
      { path: 'events', element: <Suspense fallback={<LoadingFallback />}><EventListPage /></Suspense> },
      { path: 'events/new', element: <Suspense fallback={<LoadingFallback />}><CreateEventPage /></Suspense> },
      { path: 'analytics', element: <Suspense fallback={<LoadingFallback />}><RevenueAnalyticsPage /></Suspense> },
      { path: 'seats-builder', element: <Suspense fallback={<LoadingFallback />}><SeatLayoutBuilderPage /></Suspense> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
