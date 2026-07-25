import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';

export default function PaymentFailedPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-4 md:p-10 relative z-10 w-full min-h-[calc(100vh-80px)] overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[100px] opacity-30 transform -translate-y-1/4" />
      </div>
      
      <div className="w-full max-w-md z-10 animate-float-up">
        {/* Glassmorphism Card */}
        <GlassCard className="rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden glow-error">
          {/* Inner subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <span className="material-symbols-outlined text-destructive text-5xl icon-fill">error</span>
            </div>
            
            <h1 className="font-heading font-semibold text-3xl text-foreground mb-2">Payment Failed</h1>
            <p className="text-sm text-muted-foreground mb-8 max-w-[280px]">
              Your transaction was declined by the bank. Please check your payment details and try again.
            </p>
            
            {/* Transaction Details */}
            <div className="w-full bg-card/50 rounded-lg p-4 mb-8 border border-border text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-muted-foreground">Order Total</span>
                <span className="text-sm font-semibold text-foreground">$149.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">Payment Method</span>
                <span className="text-xs text-foreground flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px]">credit_card</span>
                  •••• 4242
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="w-full flex flex-col gap-4">
              <Link to="/payment/processing" className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 px-6 rounded-lg transition-all duration-300 glow-effect flex items-center justify-center gap-2 hover:brightness-110">
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                Retry Payment
              </Link>
              <Link to="/checkout" className="w-full bg-transparent border border-border text-foreground font-semibold text-sm py-3 px-6 rounded-lg hover:bg-white/5 transition-colors duration-200 block text-center">
                Back to Checkout
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* Support Link */}
        <div className="mt-8 text-center relative z-10">
          <Link to="/support" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-[16px]">help</span>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
