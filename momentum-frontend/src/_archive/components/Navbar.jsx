import { Sun, Moon } from 'lucide-react';

const Navbar = ({ loggedInUser, onLogout, theme, setTheme }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    // Notice the backdrop-blur-md and the transparent background!
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Sleek Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400" />
          <span className="font-bold tracking-tight text-lg text-neutral-900 dark:text-white">
            Momentum
          </span>
        </div>

        {/* Minimalist Controls */}
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {loggedInUser && (
            <div className="flex items-center gap-4">
              <span className="text-neutral-500 dark:text-neutral-400 text-sm hidden sm:block">
                {loggedInUser.username}
              </span>
              <button onClick={onLogout} className="text-xs font-semibold tracking-wide text-neutral-500 hover:text-red-500 dark:text-neutral-400 dark:hover:text-red-400 transition-colors uppercase cursor-pointer">
                Log Out
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;