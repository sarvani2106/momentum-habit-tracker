import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { fetchAuth } from '../utils/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { username, password } : { username, email, password };

    try {
      const data = await fetchAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row overflow-hidden md:min-h-[750px] relative border border-black/5">
        
        {/* ================= LEFT SECTION (ILLUSTRATION) ================= */}
        <div className="lg:w-1/2 relative bg-[#FAFAFA] p-12 flex-col justify-between hidden lg:flex overflow-hidden border-r border-slate-100">
          
          {/* Background Decor */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute top-20 right-20 w-12 h-12 bg-[#B7F056] rounded-full" />
          <div className="absolute top-32 right-32 w-4 h-4 border-2 border-blue-400 rounded-sm" />
          <div className="absolute bottom-40 left-10 w-16 h-16 bg-[#F472B6] rounded-full" />
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-slate-800 rounded-full" />

          {/* Header */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-6 bg-pink-400 rounded-full transform rotate-12" />
              <div className="w-2 h-6 bg-purple-400 rounded-full transform rotate-12" />
              <div className="w-2 h-6 bg-blue-500 rounded-full transform rotate-12" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">MOMENTUM</span>
          </div>

          {/* Main Text */}
          <div className="relative z-10 mt-16 max-w-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="absolute -top-10 -left-6"
            >
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="#F472B6"/>
                <circle cx="35" cy="45" r="3" fill="#1E293B"/>
                <circle cx="65" cy="45" r="3" fill="#1E293B"/>
                <path d="M45 60 Q50 65 55 60" stroke="#1E293B" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </motion.div>
            
            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] mb-4 font-sans tracking-tight">
              Small steps <br />
              build <br />
              <span className="text-[#6366F1]">MOMENTUM</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Track your habits, stay consistent and become your best self.
            </p>
          </div>

          {/* Mascot Area */}
          <div className="relative z-10 flex-1 flex items-end justify-center pb-10">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Speech Bubble */}
              <div className="absolute -top-20 -left-40 bg-purple-100/80 backdrop-blur-sm text-purple-900 px-5 py-3 rounded-2xl rounded-br-none font-medium text-sm shadow-sm border border-purple-200/50 max-w-[200px]">
                Every habit you build creates momentum. Keep going! 🚀
              </div>
              
              {/* The Green Mascot */}
              <div className="relative w-36 h-36 bg-[#B7F056] rounded-3xl border-4 border-transparent shadow-[inset_0_-8px_0_rgba(0,0,0,0.05)] flex flex-col items-center justify-center">
                {/* Headband */}
                <div className="absolute top-6 left-0 w-full h-5 bg-white border-y-2 border-[#6366F1] flex items-center justify-center">
                   <span className="text-[#6366F1] text-[10px] font-black">M</span>
                </div>
                {/* Face */}
                <div className="mt-8 flex gap-4">
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                </div>
                <div className="mt-2 w-4 h-2 border-b-2 border-slate-800 rounded-full" />
                
                {/* Arms */}
                <div className="absolute top-1/2 -left-6 w-8 h-2 bg-slate-800 rounded-full transform -rotate-45" />
                <div className="absolute top-1/2 -right-8 w-10 h-2 bg-slate-800 rounded-full transform -rotate-[70deg] flex items-start justify-end">
                  {/* Flag Pole */}
                  <div className="absolute -top-16 -right-1 w-1.5 h-24 bg-slate-800 rounded-full" />
                  {/* Flag */}
                  <div className="absolute -top-14 -right-16 bg-[#6366F1] text-white font-black text-xl w-16 h-10 rounded-lg rounded-bl-none flex items-center justify-center shadow-sm">
                    M
                  </div>
                </div>
                
                {/* Legs */}
                <div className="absolute -bottom-6 left-6 w-2 h-6 bg-slate-800 rounded-b-full" />
                <div className="absolute -bottom-6 right-6 w-2 h-6 bg-slate-800 rounded-b-full" />
                
                {/* Shoes */}
                <div className="absolute -bottom-7 left-3 w-6 h-3 bg-slate-800 rounded-full" />
                <div className="absolute -bottom-7 right-3 w-6 h-3 bg-slate-800 rounded-full" />
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Hills Decoration */}
          <div className="absolute bottom-0 left-0 w-[150%] h-40 bg-purple-100/50 rounded-[100%] -translate-x-10 translate-y-20 pointer-events-none" />
        </div>


        {/* ================= RIGHT SECTION (FORM) ================= */}
        <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative py-12 md:py-12">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md w-full mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                {isLogin ? 'Welcome back!' : 'Create an account'}
              </h2>
              <p className="text-slate-500 font-medium">
                {isLogin ? 'Log in to continue your momentum journey' : 'Sign up to start tracking your daily habits'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">@</div>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm"
                    placeholder="momentum_builder"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm"
                    placeholder="Enter your password"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {isLogin && (
                  <div className="flex justify-end mt-2">
                    <button type="button" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#6366F1] hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_4px_14px_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] mt-2 flex items-center justify-center gap-2"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </form>


            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>

            {/* Motivational Footer */}
            <div className="mt-10 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-center gap-4 mx-auto shadow-sm">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0">
                <Trophy className="text-indigo-500" size={18} strokeWidth={2.5} />
              </div>
              <p className="text-sm font-bold text-slate-700 leading-snug">
                Your best progress is still ahead.<br/>
                <span className="text-slate-500 font-medium">Let's build momentum together!</span>
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}