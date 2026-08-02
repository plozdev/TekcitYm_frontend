import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate({ email: data.email }, {
      onSuccess: () => {
        setIsSubmitted(true);
      }
    });
  };

  const resetForm = () => {
    reset();
    setIsSubmitted(false);
    forgotPasswordMutation.reset();
  };

  const isLoading = forgotPasswordMutation.isPending;

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tighter">TekcitYm</h1>
      </div>
      
      {/* Glassmorphism Card */}
      <GlassCard className="rounded-xl p-8 shadow-2xl">
        {!isSubmitted ? (
          <div>
            <div className="mb-8 text-center">
              <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">Reset Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter the email associated with your account and we'll send an email with instructions to reset your password.
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
              
              {forgotPasswordMutation.isError && (
                <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded border border-destructive/20">
                  {(forgotPasswordMutation.error as any)?.response?.data?.message || forgotPasswordMutation.error.message || 'Failed to send reset link'}
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
                    Send Reset Link
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
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-3">Check your email</h3>
            <p className="text-sm text-muted-foreground mb-8">
              We have sent a password reset link to your email address. Please check your inbox and spam folder.
            </p>
            <button 
              onClick={resetForm}
              className="w-full bg-card hover:bg-card/80 text-foreground text-sm font-semibold py-3 px-4 rounded-lg transition-colors border border-border"
            >
              Didn't receive the email? Try again
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
