import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePaymentStatus } from '../../features/payment/payment.hooks';

export default function PaymentProcessingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') ?? '';

  const { data: paymentStatus } = usePaymentStatus(bookingId, !!bookingId);

  useEffect(() => {
    if (!paymentStatus) return;

    if (paymentStatus.status === 'SUCCESS') {
      navigate('/booking/confirmed?bookingId=' + bookingId, { replace: true });
    } else if (paymentStatus.status === 'FAILED') {
      navigate('/payment/failed?bookingId=' + bookingId, { replace: true });
    }
  }, [paymentStatus, bookingId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full text-center">
        {/* Animated ring */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-border opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-primary animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">lock</span>
          </div>
        </div>

        <div>
          <h1 className="font-heading font-bold text-3xl text-foreground mb-3">Processing Payment</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Please wait while we securely process your payment.<br />
            <strong className="text-foreground">Do not close this page.</strong>
          </p>
        </div>

        {/* Progress steps */}
        <div className="w-full flex flex-col gap-3 text-left">
          {[
            { icon: 'lock', label: 'Encrypting payment details', done: true },
            { icon: 'account_balance', label: 'Contacting payment gateway', done: true },
            { icon: 'confirmation_number', label: 'Reserving your tickets', done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-primary/10'}`}>
                {step.done ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <span className={`text-sm font-medium ${step.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{step.label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Secured by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}
