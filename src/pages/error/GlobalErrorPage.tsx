import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function GlobalErrorPage() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected error occurred.";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping opacity-75"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-card rounded-full border border-destructive/20 text-destructive shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <span className="material-symbols-outlined text-5xl">warning</span>
          </div>
        </div>
        
        <h1 className="font-heading font-bold text-4xl text-foreground">
          {errorStatus === 404 ? 'Page Not Found' : 'Oops! Something went wrong.'}
        </h1>
        
        <p className="text-muted-foreground">
          {errorStatus === 404 
            ? "We couldn't find the page you were looking for." 
            : errorMessage}
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow-effect"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-card border border-border text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-card/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
