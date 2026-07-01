import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  // Global State: We only need to track WHO is logged in, and WHAT the theme is.
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Theme Controller (Untouched)
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === 'dark') rootElement.classList.add('dark');
    else rootElement.classList.remove('dark');
  }, [theme]);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 transition-colors duration-500 font-sans selection:bg-neutral-300 dark:selection:bg-neutral-800 relative pt-24 pb-12">
          
          {/* Subtle background glow effect (Untouched) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 dark:bg-blue-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

          {/* Navbar sits outside the Routes so it always displays at the top */}
          <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} theme={theme} setTheme={setTheme} />
          
          <main className="max-w-4xl mx-auto px-6 relative z-10">
            <Routes>
              
              {/* Route 1: The Auth Page */}
              <Route 
                path="/login" 
                element={
                  // If they are already logged in, boot them to the dashboard
                  loggedInUser ? <Navigate to="/dashboard" replace /> : <Auth onLogin={setLoggedInUser} />
                } 
              />

              {/* Route 2: The Protected Dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  // If they try to access this without logging in, kick them back to login
                  loggedInUser ? <Dashboard user={loggedInUser} /> : <Navigate to="/login" replace />
                } 
              />

              {/* Route 3: Catch-all Fallback */}
              <Route 
                path="*" 
                element={<Navigate to={loggedInUser ? "/dashboard" : "/login"} replace />} 
              />

            </Routes>
          </main>

        </div>
      </div>
    </Router>
  );
}

export default App;