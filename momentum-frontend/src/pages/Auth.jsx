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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row overflow-hidden min-h-[750px] relative border border-black/5">
        
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
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          
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

            <div className="mt-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            </div>

            {/* Social Logins */}
            <div className="mt-6 flex justify-center gap-4">
              <button className="flex-1 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button className="flex-1 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.365 7.143c.962-1.168 1.611-2.793 1.435-4.423-1.402.057-3.136.936-4.135 2.102-.894 1.033-1.678 2.686-1.464 4.281 1.564.12 3.202-.79 4.164-1.96zm3.327 7.022c-.027-2.637 2.146-3.896 2.247-3.953-1.221-1.788-3.125-2.03-3.816-2.073-1.637-.166-3.197.962-4.032.962-.835 0-2.122-.943-3.486-.917-1.785.027-3.432.997-4.35 2.593-1.859 3.224-.475 7.994 1.34 10.612.888 1.282 1.942 2.723 3.33 2.671 1.336-.054 1.838-.863 3.456-.863 1.618 0 2.07.863 3.457.836 1.438-.027 2.341-1.31 3.205-2.564 1.002-1.467 1.415-2.889 1.437-2.964-.033-.014-2.761-1.06-2.788-4.34z"/>
                </svg>
              </button>
              <button className="flex-1 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                <svg width="22" height="22" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.77 10.77H0V0h10.77v10.77zM22.56 10.77H11.79V0h10.77v10.77zM10.77 22.56H0V11.79h10.77v10.77zM22.56 22.56H11.79V11.79h10.77v10.77z" fill="#00a4ef"/>
                </svg>
              </button>
            </div>

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