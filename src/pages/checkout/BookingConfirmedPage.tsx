import React from 'react';
import { Link } from 'react-router-dom';

export default function BookingConfirmedPage() {
  return (
    <div className="flex items-center justify-center p-4 md:p-10 relative overflow-x-hidden min-h-[calc(100vh-80px)] w-full">
      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 transform -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[100px] mix-blend-screen opacity-40 transform translate-x-1/3 translate-y-1/3" />
      </div>
      
      {/* Main Glassmorphism Card */}
      <main className="w-full max-w-2xl bg-card/60 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden animate-float-up flex flex-col">
        {/* Subtle top glow line */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />
        
        <div className="p-8 md:p-12 flex flex-col items-center text-center gap-8">
          {/* Success Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full" />
              <span className="material-symbols-outlined text-[80px] text-emerald-400 relative z-10 icon-fill">check_circle</span>
            </div>
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-4xl text-white tracking-tight">Payment Successful</h1>
              <p className="text-lg text-muted-foreground">Your transaction is complete and tickets are secured.</p>
            </div>
          </div>

          {/* Booking Summary Bento Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Visual */}
            <div className="relative w-full h-48 md:h-auto rounded-2xl overflow-hidden border border-white/5 bg-muted group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhci-b4CX1gz3WcnPH2YJjDUZqsuLNcG_P7otSeZtfNcwfKNtsfrtDg63nx6sYlUkshLXcWfpQogimMhLaXmAh-uMOM-DroXyhOtUSNrfCpo22zUdg4TTHJEe9JGwzHfkh4t7q6hLb-lsELB2YGduOQy8CYqGanelOx2NQ_qCVAfkZSbdZwdAJrfV-vaF_rOW0vk4Mf72TQsbeOFstjMX2FWo1cChwxqfc5edL8K9XlPdG3a74wcwOmySkFB-3G3_BzRy5u_jm8ss')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 w-full text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 mb-2">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 icon-fill">calendar_today</span>
                  <span className="text-xs font-medium text-amber-500">Oct 24, 2024</span>
                </div>
                <h2 className="font-heading font-semibold text-xl text-white shadow-sm">Neon Nights Festival 2024</h2>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="bg-card/50 backdrop-blur-md rounded-2xl p-5 border border-white/5 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-muted-foreground">Order Reference</span>
                  <span className="font-semibold text-white font-mono uppercase tracking-wider">TKY-8X92-VPA</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">confirmation_number</span>
                  <span className="text-sm font-semibold text-emerald-400">2 Tickets</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col text-left bg-background p-3 rounded-xl border border-white/5">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Section</span>
                  <span className="text-sm text-white font-medium">VIP-A</span>
                </div>
                <div className="flex flex-col text-left bg-background p-3 rounded-xl border border-white/5">
                  <span className="text-xs font-medium text-muted-foreground mb-1">Row</span>
                  <span className="text-sm text-white font-medium">4</span>
                </div>
                <div className="col-span-2 flex flex-col text-left bg-background p-3 rounded-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/20 blur-xl rounded-full transition-opacity group-hover:opacity-100 opacity-50" />
                  <span className="text-xs font-medium text-muted-foreground mb-1">Seats</span>
                  <div className="flex gap-2">
                    <span className="text-sm font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">12</span>
                    <span className="text-sm font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Preview Strip */}
          <div className="w-full bg-card/80 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex-shrink-0">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-sm" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8tv3VUsvotPqGIyn87ahcPr5R3Q-RERn6d4sKgcf_wrtXF7zUSq3Zvxtb4Lux5w0zAUwsCjTi2idms2TUjIaEkB_OZ9_HdkBQwOhER8b3jMYdGJlz8XIIuyleW-Y_KDROTohGgjqIrxSYXMEqLKBlJ0J3_30wfsyAvcodpJfL0zEiLKERnYI2zAgo4DjI3gi-MLutiBXW3nfwM75jJr2qO81d-5VVFrDMk1xupmkoljt_f_8HdPtcTpjYElVdRPFfAAjHV6Jd9GI')" }}
                />
              </div>
              <div className="text-left flex flex-col gap-0.5">
                <span className="font-semibold text-sm text-white">Digital Pass Ready</span>
                <span className="text-xs font-medium text-muted-foreground">Scan at the venue entrance</span>
              </div>
            </div>
            <div className="hidden sm:flex px-4 py-2 bg-muted rounded-full border border-white/5">
              <span className="material-symbols-outlined text-muted-foreground">qr_code_scanner</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            <button className="flex-1 bg-primary text-primary-foreground font-semibold text-sm py-4 px-6 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(73,75,214,0.2)] hover:shadow-[0_0_30px_rgba(73,75,214,0.4)] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-y-0.5">download</span>
              Download Ticket
            </button>
            <Link to="/my-tickets" className="flex-1 bg-card text-foreground font-semibold text-sm py-4 px-6 rounded-xl border border-white/10 hover:bg-muted hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">local_activity</span>
              View My Tickets
            </Link>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-white font-semibold text-sm py-2 px-4 transition-colors duration-200 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">home</span>
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}
