import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import { useLogin } from '../../features/auth/auth.hooks';
import { logger } from '../../utils/logger';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    logger.info('LOGIN_PAGE', 'Navigated to Login Page');
  }, []);
  
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    setServerError(null);
    logger.info('LOGIN_PAGE', 'Login form submitted', { email: data.email });

    loginMutation.mutate(data, {
      onSuccess: () => {
        logger.info('LOGIN_PAGE', 'Login succeeded, navigating to home page');
        navigate('/');
      },
      onError: (error: any) => {
        const resData = error?.response?.data;

        // Handle specific error codes
        if (resData?.errorCode === 'EMAIL_NOT_VERIFIED') {
          logger.warn('LOGIN_PAGE', 'Email not verified, redirecting to verify OTP', { email: data.email });
          navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
          return;
        }

        if (resData?.errorCode === 'ACCOUNT_DISABLED') {
          logger.warn('LOGIN_PAGE', 'Account disabled error encountered');
          setServerError('Your account has been disabled. Please contact support.');
          return;
        }

        // Handle field-level validation errors (e.g. "email must not be blank")
        const fieldErrors = resData?.details;
        if (fieldErrors && typeof fieldErrors === 'object') {
          logger.warn('LOGIN_PAGE', 'Validation errors from server', fieldErrors);
          Object.keys(fieldErrors).forEach((field) => {
            setError(field as keyof LoginFormValues, {
              type: 'server',
              message: fieldErrors[field],
            });
          });
          return;
        }

        // Handle network/timeout errors (no response from server)
        if (!error.response) {
          logger.error('LOGIN_PAGE', 'Network/Timeout error during login');
          setServerError('Unable to connect to the server. Please check your network and try again.');
          return;
        }

        // Generic server error message
        logger.warn('LOGIN_PAGE', 'Generic login error message displayed', { message: resData?.message });
        setServerError(resData?.message || 'Invalid email or password.');
      }
    });
  };

  const isLoading = loginMutation.isPending;


  return (
    <div className="w-full max-w-md mx-auto">

      {/* The Form Container */}
      <GlassCard className="p-8 md:p-10 rounded-2xl relative overflow-hidden">
        <div className="text-center">
          <Link to="/" className="font-heading font-bold text-3xl text-primary tracking-tighter mb-6 inline-block hover:opacity-80 transition-opacity">TekcitYm</Link>  
        </div>
        <div className="mb-8">
          <h2 className="font-heading font-semibold text-3xl text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm">Sign in to access your tickets and digital venues.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email / Username */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-wide text-muted-foreground" htmlFor="email">Email or Username</label>
            <div className={`input-glass rounded-lg flex items-center px-4 py-3 ${errors.email ? 'border-destructive' : ''}`}>
              <span className="material-symbols-outlined text-muted-foreground mr-3">person</span>
              <input 
                id="email" 
                placeholder="Enter your email or username" 
                type="text" 
                className="bg-transparent border-none outline-none w-full text-sm font-sans font-normal text-foreground placeholder:text-muted-foreground focus:ring-0 p-0"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold tracking-wide text-muted-foreground" htmlFor="password">Password</label>
              <Link to="/forgot-password" className="text-sm font-semibold tracking-wide text-primary hover:text-primary/80 transition-colors">Forgot Password?</Link>
            </div>
            <div className={`input-glass rounded-lg flex items-center px-4 py-3 ${errors.password ? 'border-destructive' : ''}`}>
              <span className="material-symbols-outlined text-muted-foreground mr-3">lock</span>
              <input 
                id="password" 
                placeholder="Enter your password" 
                type={showPassword ? 'text' : 'password'} 
                className="bg-transparent border-none outline-none w-full text-sm font-sans font-normal text-foreground placeholder:text-muted-foreground focus:ring-0 p-0"
                {...register('password')}
              />
              <button 
                type="button"
                tabIndex={-1}
                className="text-muted-foreground hover:text-foreground transition-colors ml-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{ showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>
          
          {serverError && (
            <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-lg border border-destructive/20 transition-all">
              {serverError}
            </div>
          )}
          
          {/* Remember Me */}
          <div className="flex items-center">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer group">
              <div className="relative">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="peer sr-only"
                />
                <div className="w-4 h-4 rounded border border-white/20 bg-card/40 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50">
                  <span className="material-symbols-outlined text-[12px] text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity font-bold">check</span>
                </div>
              </div>
              <span className="ml-2.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors select-none">
                Remember Me
              </span>
            </label>
          </div>
          
          {/* Sign In Button */}
          <Button 
            type="submit" 
            className="w-full text-sm font-semibold py-3 glow-effect flex items-center justify-center gap-2 group relative h-[48px]"
            disabled={isLoading}
          >
            <span className={`flex items-center transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              Sign In
              <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
            </span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                </svg>
              </div>
            )}
          </Button>
        </form>
        
        {/* Divider */}
        <div className="mt-8 mb-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground text-xs font-medium">Or continue with</span>
          </div>
        </div>
        
        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="bg-card/40 border border-border rounded-lg py-2.5 px-4 flex justify-center items-center hover:bg-card transition-colors group">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Google</span>
          </button>
          <button type="button" className="bg-card/40 border border-border rounded-lg py-2.5 px-4 flex justify-center items-center hover:bg-card transition-colors group">
            <svg className="w-5 h-5 mr-2 fill-muted-foreground group-hover:fill-foreground transition-colors" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.97c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.86-1 2.97 1.07.08 2.15-.56 2.81-1.37z"/>
            </svg>
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Apple</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? 
            <Link to="/register" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-1">Sign Up</Link>
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
