import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import { useLogin } from '../../features/auth/auth.hooks';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/');
      }
    });
  };

  const isLoading = loginMutation.isPending;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Branding Above Form */}
      <div className="text-center mb-8">
        <h1 className="font-heading font-bold text-4xl text-primary tracking-tighter mb-4">TekcitYm</h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">Experience the digital venue. Your premium access to the world's most exclusive events starts here.</p>
      </div>
      
      {/* The Form Container */}
      <GlassCard className="p-8 md:p-10 rounded-2xl relative overflow-hidden">
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
                className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 p-0"
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
                className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 p-0"
                {...register('password')}
              />
              <button 
                type="button"
                className="text-muted-foreground hover:text-foreground transition-colors ml-2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{ showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
          </div>
          
          {loginMutation.isError && (
            <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded border border-destructive/20">
              {(loginMutation.error as any)?.response?.data?.message || loginMutation.error.message || 'Login failed. Please try again.'}
            </div>
          )}
          
          {/* Remember Me */}
          <div className="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary focus:ring-offset-background"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
              Remember Me
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
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd9B4k18PhY9pWh3WgNYQj2TMUBv1CG4iIytzkzqu1AWF1Rp_nIm0EBF_qod6Olw_04GNMaVvigtUAPqvYsht88wftT0tHdpQt0medGvAURSMRfZZAL5tcurrlr6AHcOfvjdshkIlyz9D0WmWPYfuica6rfpUPphWhc1VjAYs3DTlGIU7BHXtk7psXvbrx5oFuYnngBx346IpPaeJWLRO-BISH4rLACVoTRtlVkWFN-WKAbd8-zRc48ZCuQqadMYR4lR62xAfjJ_U" 
              alt="Google" 
              className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" 
            />
            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Google</span>
          </button>
          <button type="button" className="bg-card/40 border border-border rounded-lg py-2.5 px-4 flex justify-center items-center hover:bg-card transition-colors group">
            <span className="material-symbols-outlined text-muted-foreground mr-2 group-hover:text-foreground transition-colors text-[20px] icon-fill">file_download</span>
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
