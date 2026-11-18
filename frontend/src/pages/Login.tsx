import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface LoginProps {
  onLoginSuccess?: (userEmail: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check initial auth state
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.email) {
          setCurrentUserEmail(session.user.email);
          onLoginSuccess?.(session.user.email);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user?.email) {
          setCurrentUserEmail(session.user.email);
          onLoginSuccess?.(session.user.email);
        } else {
          setCurrentUserEmail(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Supabase is not configured yet. Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend/.env.'
      );
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setSuccessMessage('Registration successful! Please check your email for the verification link.');
        } else {
          setSuccessMessage('Account created and signed in successfully!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setSuccessMessage('Welcome back to Billora!');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setCurrentUserEmail(null);
    setSuccessMessage('Successfully signed out.');
  };

  if (currentUserEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">BILLORA</h2>
              <p className="text-xs text-emerald-400 font-medium">Track Smart. Spend Better.</p>
            </div>
            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          </div>

          <div className="my-6 space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Active Account</span>
              <p className="mt-1 text-sm font-medium text-slate-100 truncate">{currentUserEmail}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-300">
              ✓ Authenticated with Supabase. Ready for subscription management.
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Fintech Subscription Hub
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">BILLORA</h1>
          <p className="mt-1 text-sm font-medium text-emerald-400">Track Smart. Spend Better.</p>
          <p className="mt-2 text-xs text-slate-400">
            Personal Subscription and Auto-Debit Management Platform
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">
          {/* Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-slate-950/80 p-1 mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`rounded-lg py-2 text-xs font-semibold transition ${
                !isSignUp
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`rounded-lg py-2 text-xs font-semibold transition ${
                isSignUp
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Setup notice if Supabase not configured */}
          {!isSupabaseConfigured && (
            <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
              <span className="font-semibold block mb-0.5">⚠️ Supabase Configuration Required</span>
              Add your <code className="bg-amber-950/60 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and{' '}
              <code className="bg-amber-950/60 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> to{' '}
              <code className="bg-amber-950/60 px-1 py-0.5 rounded">frontend/.env</code> to enable live authentication.
            </div>
          )}

          {/* Error & Success Messages */}
          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-400 hover:text-emerald-400"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignUp ? 'Create Billora Account' : 'Sign In to Billora'}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 border-t border-slate-800 pt-4 text-center">
            <p className="text-xs text-slate-400">
              Secured with Supabase Authentication & PostgreSQL RLS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
