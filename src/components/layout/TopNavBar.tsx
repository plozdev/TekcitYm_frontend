import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/auth.store';

export function TopNavBar() {
  const { user, isAuthenticated } = useAuthStore();

  // Get user initials for fallback avatar
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <>
      <nav className="hidden md:flex justify-between items-center w-full px-4 md:px-10 h-20 z-50 sticky top-0 bg-surface/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-primary/5">
        <Link to="/" className="font-heading font-bold text-3xl text-primary tracking-tighter">
          TekcitYm
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/events" className="font-sans font-semibold text-sm text-primary border-b-2 border-primary pb-1 hover:bg-white/5 transition-all duration-300 block">
              Discover
            </Link>
          </li>
          <li>
            <Link to="#" className="font-sans font-semibold text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 block">
              Venues
            </Link>
          </li>
          <li>
            <Link to="#" className="font-sans font-semibold text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 block">
              Schedule
            </Link>
          </li>
        </ul>

        {isAuthenticated ? (
          /* ── Authenticated: Location, Notifications, Avatar ── */
          <div className="flex space-x-4 items-center text-primary">
            <button aria-label="Location" className="hover:bg-white/5 transition-all duration-300 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
            </button>
            <button aria-label="Notifications" className="hover:bg-white/5 transition-all duration-300 p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
            </button>
            <Link to="/profile">
              {user?.avatarUrl ? (
                <img
                  alt="User profile"
                  className="w-10 h-10 rounded-full border border-white/10 ml-4 cursor-pointer object-cover"
                  src={user.avatarUrl}
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-white/10 ml-4 cursor-pointer bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {userInitial}
                </div>
              )}
            </Link>
          </div>
        ) : (
          /* ── Not Authenticated: Login & Sign Up buttons ── */
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all duration-300"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center px-4 h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-white/5">
        <Link to="/" className="font-heading font-bold text-2xl text-primary tracking-tighter">
          TekcitYm
        </Link>
        {isAuthenticated ? (
          <button aria-label="Notifications" className="text-primary p-2">
            <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm font-semibold text-primary-foreground bg-primary rounded-lg"
          >
            Log in
          </Link>
        )}
      </header>
    </>
  );
}
