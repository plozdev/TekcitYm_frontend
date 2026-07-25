import fs from 'fs';
import path from 'path';

const pages = [
  { path: 'src/pages/dashboard/DashboardPage.tsx', name: 'DashboardPage' },
  { path: 'src/pages/events/DiscoverEventsPage.tsx', name: 'DiscoverEventsPage' },
  { path: 'src/pages/events/EventDetailsPage.tsx', name: 'EventDetailsPage' },
  { path: 'src/pages/booking/SelectSeatsPage.tsx', name: 'SelectSeatsPage' },
  { path: 'src/pages/checkout/CheckoutPage.tsx', name: 'CheckoutPage' },
  { path: 'src/pages/payment/PaymentProcessingPage.tsx', name: 'PaymentProcessingPage' },
  { path: 'src/pages/payment/PaymentFailedPage.tsx', name: 'PaymentFailedPage' },
  { path: 'src/pages/booking/BookingConfirmedPage.tsx', name: 'BookingConfirmedPage' },
  { path: 'src/pages/tickets/MyTicketsPage.tsx', name: 'MyTicketsPage' },
  { path: 'src/pages/tickets/TicketDetailsPage.tsx', name: 'TicketDetailsPage' },
  { path: 'src/pages/profile/UserProfilePage.tsx', name: 'UserProfilePage' },
  { path: 'src/pages/auth/LoginPage.tsx', name: 'LoginPage' },
  { path: 'src/pages/auth/RegisterPage.tsx', name: 'RegisterPage' },
  { path: 'src/pages/auth/ForgotPasswordPage.tsx', name: 'ForgotPasswordPage' },
  { path: 'src/pages/auth/ResetPasswordPage.tsx', name: 'ResetPasswordPage' },
  { path: 'src/pages/auth/OtpVerificationPage.tsx', name: 'OtpVerificationPage' },
  { path: 'src/pages/organizer/RevenueAnalyticsPage.tsx', name: 'RevenueAnalyticsPage' },
  { path: 'src/pages/organizer/EventListPage.tsx', name: 'EventListPage' },
  { path: 'src/pages/organizer/SeatLayoutBuilderPage.tsx', name: 'SeatLayoutBuilderPage' },
  { path: 'src/layouts/MainLayout.tsx', name: 'MainLayout' },
  { path: 'src/layouts/AuthLayout.tsx', name: 'AuthLayout' },
  { path: 'src/layouts/OrganizerLayout.tsx', name: 'OrganizerLayout' },
];

for (const page of pages) {
  const dir = path.dirname(page.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const content = `export default function ${page.name}() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold tracking-tight">${page.name}</h1>
      <p className="text-muted-foreground mt-2">Placeholder for ${page.name}</p>
    </div>
  );
}
`;
  fs.writeFileSync(page.path, content, 'utf8');
}
console.log('Pages created successfully.');
