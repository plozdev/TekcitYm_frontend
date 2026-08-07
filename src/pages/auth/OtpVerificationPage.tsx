import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import { useVerifyOtp, useResendOtp } from '../../features/auth/auth.hooks';
import { useAuthStore } from '../../features/auth/auth.store';
import { logger } from '../../utils/logger';

export default function OTPVerificationPage() {
  const [searchParams] = useSearchParams();
  
  // Capture initial query parameters on mount to prevent exit animation rerenders
  // from triggering guard redirects when query params disappear from the URL
  const [initialParams] = useState(() => ({
    email: searchParams.get('email') || '',
    flow: searchParams.get('flow') || 'verify',
  }));
  const { email, flow } = initialParams;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();
  
  const hasError = verifyOtpMutation.isError;
  const isLoading = verifyOtpMutation.isPending;

  // Guard: redirect to login if email is missing (run ONLY on initial mount)
  useEffect(() => {
    logger.info('OTP_PAGE', 'Navigated to OTP Verification Page', { email, flow });
    if (!email) {
      logger.warn('OTP_PAGE', 'No email found in query params, redirecting to /login');
      navigate('/login', { replace: true });
    }
  }, []); // Run guard strictly on mount

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (hasError) verifyOtpMutation.reset();
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Take last character
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (hasError) verifyOtpMutation.reset();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);
      
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const { setUser, setTokens } = useAuthStore();

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === 6 && !isLoading) {
      logger.info('OTP_PAGE', 'Submitting OTP verification', { email, flow });
      verifyOtpMutation.mutate({ email, otpCode: code }, {
        onSuccess: (response: any) => {
          const resetToken = response?.resetToken || response?.reset_token || response?.token || '';

          // If this is a password reset flow, go to reset-password
          // DO NOT log the user in yet (no tokens saved)
          if (flow === 'reset') {
            logger.info('OTP_PAGE', 'OTP verified for password reset flow, navigating to /reset-password', { hasResetToken: !!resetToken });
            navigate(`/reset-password?token=${encodeURIComponent(resetToken)}`, { replace: true });
          } else {
            // Registration verification flow — store tokens and log user in
            logger.info('OTP_PAGE', 'OTP verified for registration flow, setting auth state & navigating home');
            if (response?.accessToken && response?.user) {
              setTokens(response.accessToken, response.refreshToken);
              setUser(response.user);
            }
            navigate('/', { replace: true });
          }
        },
        onError: (err: any) => {
          logger.error('OTP_PAGE', 'OTP verification error', {
            email,
            errorCode: err?.response?.data?.errorCode,
            message: err?.response?.data?.message,
          });
        }
      });
    }
  };

  const handleResend = () => {
    logger.info('OTP_PAGE', 'Resend OTP button clicked', { email });
    resendOtpMutation.mutate(email, {
      onSuccess: () => {
        logger.info('OTP_PAGE', 'OTP resend successful, resetting timer');
        setTimeLeft(30);
        setOtp(['', '', '', '', '', '']);
        verifyOtpMutation.reset();
        inputRefs.current[0]?.focus();
      },
      onError: (err: any) => {
        logger.error('OTP_PAGE', 'OTP resend failed', { email, message: err?.message });
      }
    });
  };


  const isComplete = otp.every(val => val !== '');

  // Don't render if email is missing (redirect is happening)
  if (!email) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 md:px-0 relative z-10">
      {/* Brand Header */}
      <div className="text-center mb-10">
        <Link to="/" className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tighter hover:opacity-80 transition-opacity inline-block">TekcitYm</Link>
      </div>
      
      {/* Verification Card */}
      <GlassCard className="rounded-xl p-8 md:p-10 shadow-2xl flex flex-col items-center">
        <div className="mb-8 text-center w-full">
          <span className="material-symbols-outlined text-primary text-5xl mb-4 opacity-80 icon-fill">lock_open</span>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
            {flow === 'reset' ? 'Reset Password Verification' : 'Verify Your Account'}
          </h2>
          <p className="text-sm text-muted-foreground">We've sent a 6-digit code to<br/><strong className="text-foreground">{email}</strong></p>
        </div>
        
        {/* OTP Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (isComplete && !isLoading) {
              handleVerify();
            }
          }} 
          className="w-full flex flex-col items-center"
        >
          <div className={`flex justify-between w-full gap-2 mb-6 ${hasError ? 'otp-error-shake' : ''}`}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => {
                  handleKeyDown(index, e);
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (isComplete && !isLoading) {
                      handleVerify();
                    }
                  }
                }}
                onPaste={handlePaste}
                autoFocus={index === 0}
                className={`w-12 h-14 md:w-14 md:h-16 text-center font-heading font-semibold text-2xl md:text-3xl rounded-lg border transition-all duration-200 outline-none
                  ${hasError 
                    ? 'border-destructive text-destructive bg-destructive/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-card/50 border-white/10 text-foreground focus:border-primary focus:bg-card/80 focus:shadow-[0_0_15px_rgba(192,193,255,0.2)] focus:scale-105'
                  }`}
              />
            ))}
          </div>
          
          {/* Error Message */}
          {hasError && (
            <div className="w-full text-center mb-4 flex items-center justify-center gap-1 text-destructive text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>
                {!(verifyOtpMutation.error as any)?.response
                  ? 'Unable to connect to the server. Please try again.'
                  : (verifyOtpMutation.error as any)?.response?.data?.message || 'Invalid code. Please try again.'}
              </span>
            </div>
          )}
          
          <Button 
            type="submit"
            disabled={!isComplete || isLoading}
            className="w-full text-sm font-semibold py-4 rounded-lg flex justify-center items-center gap-2 mb-6 transition-all glow-effect"
          >
            {isLoading ? (
               <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
               </svg>
            ) : (
              <>
                <span>Verify</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn't receive the code?</span>
            <button 
              type="button" 
              onClick={handleResend}
              disabled={timeLeft > 0 || resendOtpMutation.isPending}
              className={`ml-1 text-sm font-semibold transition-colors ${timeLeft > 0 || resendOtpMutation.isPending ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:text-primary/80'}`}
            >
              {timeLeft > 0 ? `Resend in ${timeLeft}s` : resendOtpMutation.isPending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>
          {resendOtpMutation.isError && (
             <div className="mt-2 text-xs text-destructive text-center">
               {!(resendOtpMutation.error as any)?.response
                 ? 'Unable to connect to the server.'
                 : (resendOtpMutation.error as any)?.response?.data?.message || 'Failed to resend code'}
             </div>
          )}
          {resendOtpMutation.isSuccess && (
             <div className="mt-2 text-xs text-emerald-400 text-center flex items-center justify-center gap-1">
               <span className="material-symbols-outlined text-[14px]">check_circle</span>
               New code sent successfully!
             </div>
          )}
        </form>
      </GlassCard>
    </div>
  );
}
