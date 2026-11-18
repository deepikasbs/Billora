import React from 'react';
import Login from './pages/Login';

export const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100">
      <Login />
    </main>
  );
};

export default App;
