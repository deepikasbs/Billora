import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          System Initialized
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          BILLORA
        </h1>
        <p className="mt-2 text-lg font-medium text-emerald-400">
          Track Smart. Spend Better.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Personal Subscription and Auto-Debit Management Platform. Manage recurring subscriptions,
          track upcoming renewals, monitor expenses, and calculate annual subscription spending.
        </p>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Stack Status
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400 block text-xs">Frontend</span>
              <span className="font-medium text-slate-200">React + TS + Vite + Tailwind</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400 block text-xs">Backend</span>
              <span className="font-medium text-slate-200">Python + FastAPI</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400 block text-xs">Database</span>
              <span className="font-medium text-slate-200">Supabase PostgreSQL</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <span className="text-slate-400 block text-xs">Environment</span>
              <span className="font-medium text-emerald-400">Initialized Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
