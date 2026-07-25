import React from 'react';
import { TopNavBar } from '../components/layout/TopNavBar';
import { BottomNavBar } from '../components/layout/BottomNavBar';
import { Outlet } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-20 md:pb-0">
      <TopNavBar />
      <main className="flex-1 flex flex-col w-full max-w-[1280px] mx-auto">
        <PageTransition />
      </main>
      <BottomNavBar />
    </div>
  );
}
