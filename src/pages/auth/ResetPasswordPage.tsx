import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { GlassInput } from '../../components/ui/glass-input';
import { Button } from '../../components/ui/button';
import { useResetPassword } from '../../features/auth/auth.hooks';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordMutation = useResetPassword();

  // Requirements
  const reqLength = password.length >= 8;
  const reqNumber = /\d/.test(password);
  const reqSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isMatch = confirmPassword.length > 0 && password === confirmPassword;
  const showMatchError = confirmPassword.length > 0 && password !== confirmPassword;
  
  const isValid = reqLength && reqNumber && reqSpecial && isMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && token) {
      resetPasswordMutation.mutate({ token, newPassword: password });
    }
  };

  const isSubmitted = resetPasswordMutation.isSuccess;
  const isLoading = resetPasswordMutation.isPending;

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-8 animate-float-up">
        <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.3)] mb-2">TekcitYm</h1>
        <p className="text-lg text-muted-foreground">Secure your access.</p>
      </div>
      
      {!isSubmitted ? (
        <GlassCard className="rounded-xl p-8 shadow-2xl animate-float-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-6">Reset Password</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="space-y-2 relative group">
              <label className="text-xs font-semibold text-muted-foreground flex items-center justify-between" htmlFor="new-password">
                New Password
                <span 
                  className="material-symbols-outlined text-[16px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">lock</span>
                <GlassInput 
                  id="new-password" 
                  placeholder="Enter new password" 
                  required 
                  type={showPassword ? 'text' : 'password'} 
                  className="pl-10 pr-4 py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div className="space-y-2 relative group">
              <label className="text-xs font-semibold text-muted-foreground flex items-center justify-between" htmlFor="confirm-password">
                Confirm Password
                <span 
                  className="material-symbols-outlined text-[16px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'visibility' : 'visibility_off'}
                </span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">lock_reset</span>
                <GlassInput 
                  id="confirm-password" 
                  placeholder="Confirm new password" 
                  required 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  className="pl-10 pr-4 py-3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {showMatchError && (
                <p className="text-xs font-medium text-destructive mt-1">Passwords do not match.</p>
              )}
            </div>
            
            {/* Password Requirements Checklist */}
            <div className="bg-background/50 rounded-lg p-4 border border-border space-y-2 mt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Password Requirements:</p>
              <ul className="space-y-2 text-xs font-medium text-muted-foreground">
                <li className={`flex items-center gap-2 transition-colors duration-300 ${reqLength ? 'text-emerald-400' : ''}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {reqLength ? 'check_circle' : 'circle'}
                  </span>
                  At least 8 characters
                </li>
                <li className={`flex items-center gap-2 transition-colors duration-300 ${reqNumber ? 'text-emerald-400' : ''}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {reqNumber ? 'check_circle' : 'circle'}
                  </span>
                  Contains a number
                </li>
                <li className={`flex items-center gap-2 transition-colors duration-300 ${reqSpecial ? 'text-emerald-400' : ''}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {reqSpecial ? 'check_circle' : 'circle'}
                  </span>
                  Contains a special character
                </li>
              </ul>
            </div>
            
            {resetPasswordMutation.isError && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded border border-destructive/20 mt-4">
                {(resetPasswordMutation.error as any)?.response?.data?.message || resetPasswordMutation.error.message || 'Failed to reset password'}
              </div>
            )}
            
            {!token && (
              <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded border border-destructive/20 mt-4">
                Invalid or missing reset token.
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
