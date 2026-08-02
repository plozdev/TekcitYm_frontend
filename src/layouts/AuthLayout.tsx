import { Outlet } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-[20%] w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 -right-[20%] w-[1000px] h-[1000px] bg-indigo-500/20 rounded-full blur-[180px]"></div>
      </div>
      
      <div className="w-full flex items-center justify-center z-10">
        <PageTransition />
      </div>
    </div>
  );
}
