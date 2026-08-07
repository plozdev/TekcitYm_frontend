import React, { useState } from 'react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showStrengthMeter?: boolean;
  showRequirements?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label = 'Password',
      error,
      showStrengthMeter = false,
      showRequirements = false,
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState('');

    const isControlled = value !== undefined;
    const val = String(isControlled ? value : internalValue);

    // Requirements checks
    const reqLength = val.length >= 8;
    const reqUppercase = /[A-Z]/.test(val);
    const reqNumber = /\d/.test(val);
    const reqSpecial = /[^a-zA-Z0-9]/.test(val);

    // Calculate strength (0 to 3)
    const passedCount = [reqLength, reqUppercase, reqNumber, reqSpecial].filter(Boolean).length;
    let strengthText = 'Weak';
    let strengthColor = 'bg-destructive';
    let strengthScore = 1;

    if (passedCount >= 4) {
      strengthText = 'Strong';
      strengthColor = 'bg-emerald-400';
      strengthScore = 3;
    } else if (passedCount >= 2) {
      strengthText = 'Medium';
      strengthColor = 'bg-amber-400';
      strengthScore = 2;
    } else if (val.length > 0) {
      strengthText = 'Weak';
      strengthColor = 'bg-destructive';
      strengthScore = 1;
    } else {
      strengthScore = 0;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="space-y-2 relative group w-full">
        {label && (
          <label className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center justify-between">
            <span>{label}</span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-normal lowercase"
            >
              <span className="material-symbols-outlined text-[16px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
              <span>{showPassword ? 'hide' : 'show'}</span>
            </button>
          </label>
        )}

        <div
          className={`input-glass rounded-lg flex items-center px-4 py-3 transition-colors ${
            error ? 'border-destructive bg-destructive/5' : 'group-focus-within:border-primary'
          }`}
        >
          <span className="material-symbols-outlined text-muted-foreground mr-3 group-focus-within:text-primary transition-colors text-[20px]">
            lock
          </span>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            {...(isControlled ? { value } : {})}
            onChange={handleChange}
            className={`bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground/50 focus:ring-0 p-0 ${className}`}
            {...props}
          />
        </div>

        {error && <p className="text-xs text-destructive mt-1 font-medium">{error}</p>}

        {showStrengthMeter && val.length > 0 && (
          <div className="mt-2 space-y-1.5 animate-float-up">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-foreground">Strength:</span>
              <span
                className={
                  strengthScore === 3
                    ? 'text-emerald-400'
                    : strengthScore === 2
                    ? 'text-amber-400'
                    : 'text-destructive'
                }
              >
                {strengthText}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  strengthScore >= 1 ? strengthColor : 'bg-border/40'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  strengthScore >= 2 ? strengthColor : 'bg-border/40'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  strengthScore >= 3 ? strengthColor : 'bg-border/40'
                }`}
              />
            </div>
          </div>
        )}

        {showRequirements && (
          <div className="bg-background/50 rounded-lg p-3 border border-border space-y-1.5 mt-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Password Requirements:</p>
            <ul className="space-y-1.5 text-xs font-medium text-muted-foreground">
              <li className={`flex items-center gap-2 transition-colors ${reqLength ? 'text-emerald-400' : ''}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {reqLength ? 'check_circle' : 'circle'}
                </span>
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 transition-colors ${reqUppercase ? 'text-emerald-400' : ''}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {reqUppercase ? 'check_circle' : 'circle'}
                </span>
                At least 1 uppercase letter
              </li>
              <li className={`flex items-center gap-2 transition-colors ${reqNumber ? 'text-emerald-400' : ''}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {reqNumber ? 'check_circle' : 'circle'}
                </span>
                At least 1 digit
              </li>
              <li className={`flex items-center gap-2 transition-colors ${reqSpecial ? 'text-emerald-400' : ''}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {reqSpecial ? 'check_circle' : 'circle'}
                </span>
                At least 1 special character (@, $, #, ^, etc.)
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
