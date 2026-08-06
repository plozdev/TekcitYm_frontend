import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import { PasswordInput } from '../../components/ui/password-input';
import { useResetPassword } from '../../features/auth/auth.hooks';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const resetPasswordMutation = useResetPassword();

  // Guard: if no token, show clear error
  useEffect(() => {
    if (!token) {
      // No token — user probably navigated here directly
    }
  }, [token]);

  // Requirements
  const reqLength = password.length >= 8;
  const reqNumber = /\d/.test(password);
  const reqSpecial = /[^a-zA-Z0-9]/.test(password);
  
  const isMatch = confirmPassword.length > 0 && password === confirmPassword;
  const showMatchError = confirmPassword.length > 0 && password !== confirmPassword;
  
  const isValid = reqLength && reqNumber && reqSpecial && isMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!token) {
      setServerError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }

    if (isValid) {
      resetPasswordMutation.mutate(
        {
          resetToken: token,
          newPassword: password,
          confirmNewPassword: confirmPassword,
        },
        {
          onError: (error: any) => {
            const resData = error?.response?.data;
            
            if (!error.response) {
              setServerError('Unable to connect to the server. Please try again.');
              return;
            }

            if (resData?.errorCode === 'INVALID_RESET_TOKEN') {
              setServerError('Your reset link has expired. Please request a new one.');
              return;
            }

            if (resData?.errorCode === 'PASSWORD_MISMATCH') {
              setServerError('Passwords do not match.');
              return;
            }

            // Handle validation errors from backend
            const fieldErrors = resData?.details;
            if (fieldErrors && typeof fieldErrors === 'object') {
              const messages = Object.values(fieldErrors).join(' ');
              setServerError(messages);
              return;
            }

            setServerError(resData?.message || 'Failed to reset password. Please try again.');
          }
        }
      );
    }
  };

  const isSubmitted = resetPasswordMutation.isSuccess;
  const isLoading = resetPasswordMutation.isPending;

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <div className="text-center mb-8 animate-float-up">
        <Link to="/" className="font-heading font-bold text-3xl md:text-4xl tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] mb-2 inline-block hover:opacity-80 transition-opacity">TekcitYm</Link>
        <p className="text-lg text-muted-foreground">Secure your access.</p>
      </div>
      
      {!isSubmitted ? (
        <GlassCard className="rounded-xl p-8 shadow-2xl animate-float-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">Reset Password</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <PasswordInput
              id="new-password"
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setServerError(null); }}
              showStrengthMeter={true}
              showRequirements={true}
            />
            
            {/* Confirm Password Field */}
            <div className="space-y-1">
              <PasswordInput
                id="confirm-password"
                label="Confirm Password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setServerError(null); }}
              />
              {showMatchError && (
                <p className="text-xs font-medium text-destructive mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  Passwords do not match.
                </p>
              )}
              {isMatch && (
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  Passwords match
                </p>
              )}
            </div>
            
            {/* Error messages */}
            {serverError && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-lg border border-destructive/20 mt-4 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                <span>{serverError}</span>
              </div>
            )}
            
            {!token && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-lg border border-destructive/20 mt-4 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">warning</span>
                <div>
                  <p>Invalid or missing reset token.</p>
                  <Link to="/forgot-password" className="text-primary hover:text-primary/80 font-semibold underline mt-1 inline-block">Request a new reset link</Link>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={!isValid || !token || isLoading}
                className="w-full text-sm font-semibold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed glow-effect"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                  </svg>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Return to Login</Link>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="rounded-xl p-8 shadow-2xl text-center animate-float-up">
          <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
            {/* SVG Checkmark Animation */}
            <svg className="w-full h-full" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <circle className="checkmark-circle" cx="26" cy="26" fill="none" r="25" />
              <path className="checkmark" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" />
            </svg>
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl -z-10" />
          </div>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">Password Updated</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Your password has been successfully reset. You can now log in with your new credentials.
          </p>
          <Link to="/login" className="w-full bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-lg flex items-center justify-center glow-effect transition-all hover:brightness-110">
            Continue to Login
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
