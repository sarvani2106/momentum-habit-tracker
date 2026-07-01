import { useState } from 'react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dynamically choose the correct secure endpoint based on the UI toggle
    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
    const payload = isLogin ? { email, password } : { username, email, password };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const user = await response.json();
        if (isLogin) {
          // If login is successful, pass the secure user object back to App.jsx
          onLogin(user); 
        } else {
          setMessage("Account created! You can now log in.");
          setIsLogin(true); // Automatically switch the UI to the Login view
          setUsername('');
          setPassword('');
        }
      } else {
        const errorText = await response.text();
        setMessage(errorText || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Server error. Ensure Spring Boot is running.");
    }
  };

  return (
    <div className="space-y-12 mt-20 max-w-3xl mx-auto relative z-10">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500">
          Build Momentum.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg">
          {isLogin ? 'Welcome back. Securely log in to continue.' : 'Create your secure profile.'}
        </p>
      </div>

      <div className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none max-w-md mx-auto">
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 tracking-widest uppercase mb-6 text-center">
          {isLogin ? 'Secure Login' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-5 py-3 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl text-sm focus:outline-none focus:border-blue-500/50 transition-colors" />
          
          <button type="submit" className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold py-3 rounded-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer mt-2 shadow-lg">
            {isLogin ? 'Access Dashboard' : 'Get Started'}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}

        {/* The Toggle Switch between Login and Register */}
        <p className="mt-6 text-center text-sm text-neutral-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer hover:underline font-medium">
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;