import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import { useUser, UserProvider } from './context/UserContext'; 

import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import AiCoach from './pages/AiCoach';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <UserProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="habits" element={<Habits />} />
            <Route path="ai-coach" element={<AiCoach />} />
            <Route path="analytics" element={<Analytics />} /> 
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;