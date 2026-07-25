import React from 'react';
import { Link } from 'react-router-dom';

export function TopNavBar() {
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
        <div className="flex space-x-4 items-center text-primary">
          <button aria-label="Location" className="hover:bg-white/5 transition-all duration-300 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined" aria-hidden="true">location_on</span>
          </button>
          <button aria-label="Notifications" className="hover:bg-white/5 transition-all duration-300 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
          </button>
          <Link to="/profile">
            <img 
              alt="User profile" 
              className="w-10 h-10 rounded-full border border-white/10 ml-4 cursor-pointer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbMLSrj58oHYFaKRmheZJsnifjZ_lQCVf4wz9BULNzAba__Iu5d3Dbuh04QFFRq_0La_xSsUiv6MocnvAnLDGz1YgIFJdlRrZCCg79odLhMYngax3bcco4xaqyvWf24MthDripxJxN48BcqZWc2FLB7YthY1J3NU-PONpwkNnX5Vqp9gvVrVZpJR6hwN1iij_4_XlsqGJbAqHhXpjDbOqQdBuXfFkWZYyRFtA92AV0FzrpsB7faW46_b1Mh02hqg9rfhYSjUQjcjg" 
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center px-4 h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-white/5">
        <Link to="/" className="font-heading font-bold text-2xl text-primary tracking-tighter">
          TekcitYm
        </Link>
        <button aria-label="Notifications" className="text-primary p-2">
          <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
        </button>
      </header>
    </>
  );
}
