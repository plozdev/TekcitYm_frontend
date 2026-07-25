import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '../../components/ui/glass-card';
import { GlassInput } from '../../components/ui/glass-input';
import { Button } from '../../components/ui/button';
import { useRegister } from '../../features/auth/auth.hooks';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
      }
    });
  };

  const passwordValue = watch('password') || '';
  const isLoading = registerMutation.isPending;

  const calculateStrength = (val: string) => {
    let strength = 0;
    if(val.length > 0) strength = 1;
    if(val.length >= 8 && val.match(/[a-zA-Z]/) && val.match(/[0-9]/)) strength = 2;
    if(val.length >= 12 && val.match(/[^a-zA-Z0-9]/)) strength = 3;
    return strength;
  };

  const strength = calculateStrength(passwordValue);
  
  let strengthText = 'Password Strength';
  let strengthColor = 'text-muted-foreground';
  
  if (strength === 1) {
    strengthText = 'Weak';
    strengthColor = 'text-destructive';
  } else if (strength === 2) {
    strengthText = 'Medium';
    strengthColor = 'text-amber-500';
  } else if (strength === 3) {
    strengthText = 'Strong';
    strengthColor = 'text-emerald-400';
  }

  return (
    <div className="w-full max-w-md relative z-10">
      <GlassCard className="p-8 rounded-2xl shadow-2xl space-y-8 border border-white/5">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-primary tracking-tighter mb-6">TekcitYm</h1>
          <h2 className="font-heading font-semibold text-3xl text-foreground">Create Account</h2>
          <p className="text-sm text-muted-foreground mt-2">Join to secure your spot at exclusive events.</p>
        </div>
        
        <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground" htmlFor="fullName">Full Name</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-muted-foreground">person</span>
              <GlassInput 
                id="fullName" 
                placeholder="Jane Doe" 
                type="text" 
                className={`pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                {...register('fullName')}
              />
            </div>
            {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>}
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground" htmlFor="email">Email Address</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-muted-foreground">mail</span>
              <GlassInput 
                id="email" 
                placeholder="jane@example.com" 
                type="email" 
                className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-muted-foreground">lock</span>
              <GlassInput 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? 'text' : 'password'} 
                className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                {...register('password')}
              />
              <button 
                type="button"
                className="absolute right-3 text-muted-foreground hover:text-primary transition-colors focus:outline-none flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            
            {/* Password Strength Meter */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium ${strengthColor}`}>{strengthText}</span>
              </div>
              <div className="flex space-x-1 h-1.5 rounded-full overflow-hidden">
                <div className={`w-1/3 transition-colors duration-300 ${strength >= 1 ? (strength === 1 ? 'bg-destructive' : strength === 2 ? 'bg-amber-500' : 'bg-emerald-400') : 'bg-muted'}`}></div>
                <div className={`w-1/3 transition-colors duration-300 ${strength >= 2 ? (strength === 2 ? 'bg-amber-500' : 'bg-emerald-400') : 'bg-muted'}`}></div>
                <div className={`w-1/3 transition-colors duration-300 ${strength >= 3 ? 'bg-emerald-400' : 'bg-muted'}`}></div>
              </div>
            </div>
          </div>
          
          {registerMutation.isError && (
            <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded border border-destructive/20">
              {(registerMutation.error as any)?.response?.data?.message || registerMutation.error.message || 'Registration failed. Please try again.'}
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full text-sm font-semibold py-3.5 glow-effect flex justify-center items-center gap-2 group h-[48px]"
            disabled={isLoading}
          >
            {isLoading ? (
               <svg className="animate-spin h-5 w-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
               </svg>
            ) : (
              <>
                Create Account
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </Button>
        </form>
        
        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? 
          <Link to="/login" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-1">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
