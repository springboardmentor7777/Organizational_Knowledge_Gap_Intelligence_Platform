import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('signin');

  const openAuthModal = (view) => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <>
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-black/50 backdrop-blur-md transition-colors duration-300">
      <nav className="flex items-center justify-between px-8 py-4 w-full">

        {/* Left side: Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="OKGIP Logo"
            className="h-16 w-auto object-contain mix-blend-multiply dark:mix-blend-normal"
          />
          <span className="font-semibold text-xl tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            Knowledge Gap Analyzer
          </span>
        </div>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="relative group text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-colors duration-200 py-1">
            Platform
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-[#d9f95d] transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a href="#" className="relative group text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-colors duration-200 py-1">
            Modules
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-[#d9f95d] transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a href="#" className="relative group text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-colors duration-200 py-1">
            Analytics
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-[#d9f95d] transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
          <a href="#" className="relative group text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-colors duration-200 py-1">
            Mentorship
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-[#d9f95d] transition-all duration-300 ease-out group-hover:w-full"></span>
          </a>
        </div>

        {/* Right side: Auth Buttons, Theme Toggle, & Mobile Menu */}
        <div className="flex items-center gap-4">
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-[#d9f95d] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => openAuthModal('signin')}
              className="relative overflow-hidden px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-[#d9f95d] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(34,211,238,0.15)] dark:hover:shadow-[0_4px_15px_rgba(217,249,93,0.1)] active:scale-95 cursor-pointer rounded-full border border-transparent hover:border-cyan-100 dark:hover:border-[#d9f95d]/20 group"
            >
              <span className="relative z-10">Sign In</span>
              {/* Subtle background fade on hover */}
              <div className="absolute inset-0 bg-cyan-50 dark:bg-[#d9f95d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </button>
            <button 
              onClick={() => openAuthModal('signup')}
              className="relative overflow-hidden px-5 py-2 text-sm font-bold text-white dark:text-black bg-gradient-to-r from-cyan-500 to-blue-600 dark:bg-none dark:bg-[#d9f95d] hover:from-cyan-400 hover:to-blue-500 dark:hover:bg-[#cbf033] rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)] dark:shadow-[0_0_15px_rgba(217,249,93,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] dark:hover:shadow-[0_0_25px_rgba(217,249,93,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign Up
                {/* Small arrow that slides right on hover */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              {/* Button Shine Effect */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shimmer_1s_forwards]"></div>
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-[#d9f95d] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <AuthModal 
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      initialView={authView}
    />
    </>
  );
};

export default Navbar;







