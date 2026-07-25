import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProfile, useUpdateProfile, useChangePassword, useUploadAvatar } from '../../features/profile/profile.hooks';
import { useAuthStore } from '../../features/auth/auth.store';
import { useLogout } from '../../features/auth/auth.hooks';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const { data: profile, isPending: profileLoading } = useProfile();
  const { mutate: updateProfile, isPending: updating, isSuccess: profileUpdated, error: profileError } = useUpdateProfile();
  const { mutate: changePassword, isPending: changingPassword, isSuccess: passwordChanged, error: passwordError } = useChangePassword();
  const { mutate: uploadAvatar, isPending: uploadingAvatar } = useUploadAvatar();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: {
      fullName: profile?.fullName ?? user?.fullName ?? '',
      email: profile?.email ?? user?.email ?? '',
      phone: '',
      bio: '',
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileForm) => {
    updateProfile(data);
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword }, {
      onSuccess: () => passwordForm.reset(),
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
  };

  if (profileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const displayUser = profile ?? user;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8">
      <div>
        <h1 className="font-heading font-bold text-4xl text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground text-sm">Manage your account details and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Avatar + Quick info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <GlassCard className="p-6 flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 bg-card flex items-center justify-center">
                {displayUser?.avatarUrl ? (
                  <img src={displayUser.avatarUrl} alt={displayUser.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-5xl text-muted-foreground">person</span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors border-2 border-background">
                {uploadingAvatar ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-white text-[16px]">photo_camera</span>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
            <div>
              <h2 className="font-heading font-semibold text-2xl text-foreground">{displayUser?.fullName}</h2>
              <p className="text-sm text-muted-foreground">{displayUser?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                {displayUser?.role}
              </span>
            </div>
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive"
              onClick={() => logout()}
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">logout</span>
              Sign Out
            </Button>
          </GlassCard>

          {/* Quick Navigation */}
          <GlassCard className="p-4 flex flex-col gap-2">
            {[
              { icon: 'confirmation_number', label: 'My Tickets', to: '/tickets' },
              { icon: 'favorite', label: 'Saved Events', to: '/events' },
              { icon: 'help', label: 'Support', to: '#' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/80 transition-all text-left"
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
                <span className="material-symbols-outlined ml-auto text-[18px]">chevron_right</span>
              </button>
            ))}
          </GlassCard>
        </div>

        {/* Right: Edit forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Profile Info Form */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 border-b border-border pb-4">
              Profile Information
            </h3>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    {...profileForm.register('fullName')}
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="text-destructive text-xs mt-1">{profileForm.formState.errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    {...profileForm.register('email')}
                    type="email"
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {profileForm.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">{profileForm.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input
                  {...profileForm.register('phone')}
                  type="tel"
                  placeholder="+84 xxx xxx xxxx"
                  className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Bio</label>
                <textarea
                  {...profileForm.register('bio')}
                  rows={3}
                  placeholder="Tell us a bit about yourself..."
                  className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              {profileError && (
                <p className="text-destructive text-sm text-center bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2">
                  {(profileError as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to update profile'}
                </p>
              )}
              {profileUpdated && (
                <p className="text-emerald-400 text-sm text-center bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
                  Profile updated successfully!
                </p>
              )}

              <Button type="submit" disabled={updating} className="glow-effect">
                {updating ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <span className="material-symbols-outlined mr-2 text-[18px]">save</span>
                )}
                Save Changes
              </Button>
            </form>
          </GlassCard>

          {/* Change Password Form */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 border-b border-border pb-4">
              Change Password
            </h3>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Current Password</label>
                <input
                  {...passwordForm.register('currentPassword')}
                  type="password"
                  placeholder="Enter current password"
                  className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-destructive text-xs mt-1">{passwordForm.formState.errors.currentPassword.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">New Password</label>
                  <input
                    {...passwordForm.register('newPassword')}
                    type="password"
                    placeholder="Min. 8 characters"
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="text-destructive text-xs mt-1">{passwordForm.formState.errors.newPassword.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                  <input
                    {...passwordForm.register('confirmPassword')}
                    type="password"
                    placeholder="Repeat new password"
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-destructive text-xs mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {passwordError && (
                <p className="text-destructive text-sm text-center bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2">
                  {(passwordError as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to change password'}
                </p>
              )}
              {passwordChanged && (
                <p className="text-emerald-400 text-sm text-center bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2">
                  Password changed successfully!
                </p>
              )}

              <Button type="submit" disabled={changingPassword} variant="outline" className="border-border hover:bg-card">
                {changingPassword ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <span className="material-symbols-outlined mr-2 text-[18px]">lock_reset</span>
                )}
                Update Password
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
