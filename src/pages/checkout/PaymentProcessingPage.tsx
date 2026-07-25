import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';

export default function PaymentProcessingPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    // Simulate payment processing delay and redirect
    const redirectTimer = setTimeout(() => {
      // randomly succeed or fail for demo purposes
      if (Math.random() > 0.5) {
        navigate('/payment/success');
      } else {
        navigate('/payment/failed');
      }
    }, 3000);
    
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] absolute" />
      </div>

      {/* Glassmorphism Payment Card */}
      <GlassCard className="w-full max-w-md p-8 flex flex-col items-center text-center z-10 relative shadow-[0_0_20px_rgba(99,102,241,0.15)]">
        {/* Security Icon Header */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <span className="material-symbols-outlined text-primary text-[48px] relative z-10 icon-fill">lock</span>
        </div>
        
        <h1 className="font-heading font-semibold text-3xl text-foreground mb-2">Securing your transaction</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Please wait while we redirect you to <strong className="text-foreground">VNPay</strong> to complete your purchase.
        </p>
        
        {/* Circular Loading Spinner */}
        <div className="mb-8 flex justify-center items-center h-24">
          <div className="spinner shadow-[0_0_15px_rgba(192,193,255,0.4)]" />
        </div>
        
        {/* Warning Message */}
        <div className="bg-card/50 rounded-lg p-4 w-full mb-6 flex items-center gap-3 border border-border">
          <span className="material-symbols-outlined text-amber-500 icon-fill">warning</span>
          <p className="text-xs text-muted-foreground text-left m-0">
            <span className="block text-foreground font-semibold mb-1">Do not refresh this page</span>
            Refreshing may result in duplicate charges or a failed booking.
          </p>
        </div>
        
        {/* Security Countdown */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="material-symbols-outlined text-[18px]">timer</span>
          <span className="font-semibold text-sm animate-pulse">{formatTime(timeLeft)}</span>
        </div>
        
        {/* Subtle Trust Badge */}
        <div className="mt-8 opacity-60 flex items-center gap-1 justify-center">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">verified_user</span>
          <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">End-to-End Encrypted</span>
        </div>
      </GlassCard>
    </div>
  );
}
