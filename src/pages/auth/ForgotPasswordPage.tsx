import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import { useForgotPassword } from '../../features/auth/auth.hooks';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const RESEND_COOLDOWN_SECONDS = 60; // Show "Didn't receive?" after 60s

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const forgotPasswordMutation = useForgotPassword();

  // Cooldown timer for "Didn't receive the code?"
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate({ email: data.email }, {
      onSuccess: () => {
        navigate(`/verify-otp?email=${encodeURIComponent(data.email)}&flow=reset`);
      },
      onError: (error: any) => {
        const resData = error?.response?.data;
        if (resData?.errorCode === 'USER_NOT_FOUND') {
          setError('email', {
            type: 'server',
            message: resData.message || 'Email address not found in system.',
          });
        } else if (!error.response) {
          setError('email', {
            type: 'server',
            message: 'Unable to connect to the server. Please check your network.',
          });
        }
      }
    });
  };

  const handleContinueToOtp = () => {
    navigate(`/verify-otp?email=${encodeURIComponent(submittedEmail)}&flow=reset`);
  };

  const handleResend = () => {
    forgotPasswordMutation.mutate({ email: submittedEmail }, {
      onSuccess: () => {
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
      }
    });
  };

  const resetForm = () => {
    reset();
    setIsSubmitted(false);
    setSubmittedEmail('');
    setResendCooldown(0);
    forgotPasswordMutation.reset();
  };

  const isLoading = forgotPasswordMutation.isPending;

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <div className="text-center mb-8">
        <Link to="/" className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tighter hover:opacity-80 transition-opacity inline-block">TekcitYm</Link>
      </div>
      
      {/* Glassmorphism Card */}
      <GlassCard className="rounded-xl p-8 shadow-2xl">
        {!isSubmitted ? (
          <div>
            <div className="mb-8 text-center">
              <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">Reset Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter the email associated with your account and we'll send a verification code to reset your password.
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-semibold tracking-wide text-muted-foreground mb-2" htmlFor="email">Email Address</label>
                <div className={`input-glass rounded-lg flex items-center px-4 py-3 ${errors.email ? 'border-destructive' : ''}`}>
                  <span className="material-symbols-outlined text-muted-foreground mr-3">mail</span>
                  <input 
                    id="email" 
                    placeholder="name@example.com" 
                    type="email" 
                    className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 p-0"
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              
              {forgotPasswordMutation.isError && !(errors.email) && (
                <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  {!(forgotPasswordMutation.error as any)?.response
                    ? 'Unable to connect to the server. Please check your network.'
                    : (forgotPasswordMutation.error as any)?.response?.data?.message || 'Failed to send reset code. Please try again.'}
                </div>
              )}

              <Button disabled={isLoading} type="submit" className="w-full text-sm font-semibold py-3 glow-effect flex items-center justify-center gap-2">
                {isLoading ? (
                   <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                   </svg>
                ) : (
                  <>
                    Send Verification Code
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-float-up">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-emerald-400 text-4xl icon-fill">check_circle</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-3">Code Sent!</h3>
            <p className="text-sm text-muted-foreground mb-8">
              We've sent a 6-digit verification code to <strong className="text-foreground">{submittedEmail}</strong>. Please check your inbox and spam folder.
            </p>

            {/* Primary CTA: go to OTP page */}
            <Button
              onClick={handleContinueToOtp}
              className="w-full text-sm font-semibold py-6 glow-effect flex items-center justify-center gap-2 mb-8"
            >
              Enter Verification Code
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Button>

            {/* Resend with cooldown — only clickable after cooldown expires */}
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">Didn't receive the code?</span>
              {resendCooldown > 0 ? (
                <span className="ml-1 text-sm font-semibold text-muted-foreground cursor-not-allowed">
                  Resend in {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={forgotPasswordMutation.isPending}
                  className="ml-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {forgotPasswordMutation.isPending ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>

            {/* Option to change email */}
            <button 
              onClick={resetForm}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Use a different email address
            </button>
          </div>
        )}
        
        <div className="mt-8 text-center border-t border-border pt-6">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Login
          </Link>
        </div>
      </GlassCard>
      
      {/* Support link */}
      <div className="mt-8 text-center">
        <p className="text-xs font-medium text-muted-foreground">
          Need help? <Link to="/support" className="text-primary hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}
