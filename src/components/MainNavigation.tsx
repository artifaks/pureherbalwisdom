
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, Search, Heart, User, Coffee, Menu, X, LogIn, BookOpen, BookText } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, onClick }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
        ${isActive 
          ? 'bg-amber-100 text-amber-800 dark:bg-amber-800/50 dark:text-amber-400 font-medium translate-x-1' 
          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-100 dark:hover:bg-amber-800/40 dark:hover:text-amber-400 hover:translate-x-1'}
      `}
      onClick={onClick}
    >
      {icon}
      <span className="md:inline transition-all group-hover:font-medium">{label}</span>
    </NavLink>
  );
};

const MainNavigation: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add custom animations to the CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slide-down {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(0); }
      }
      @keyframes bounce-in {
        0% { transform: scale(0.8); opacity: 0; }
        70% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-slide-down {
        animation: slide-down 0.5s ease forwards;
      }
      .animate-bounce-in {
        animation: bounce-in 0.5s ease forwards;
      }
    `;
    document.head.appendChild(style);
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className={`glass sticky top-0 z-20 py-3 px-4 mb-6 bg-white/80 dark:bg-[#1a1207]/90 backdrop-blur-md transition-all duration-300 animate-slide-down ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <Leaf className="h-6 w-6 text-amber-600 dark:text-amber-500 animate-bounce-in" style={{animationDelay: '300ms'}} />
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-amber-300 animate-bounce-in" style={{animationDelay: '500ms'}}>Wellness is Golden</span>
          </NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-amber-50 dark:text-amber-200 dark:hover:bg-amber-800/40"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 
            <X className="h-6 w-6 dark:text-amber-400 transition-transform duration-300 rotate-90" /> : 
            <Menu className="h-6 w-6 dark:text-amber-400 transition-transform duration-300 hover:rotate-12" />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 md:space-x-2">
          <div className="animate-bounce-in" style={{animationDelay: '600ms'}}>
            <NavItem to="/" label="Herb Guide" icon={<Home className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
          </div>
          <div className="animate-bounce-in" style={{animationDelay: '700ms'}}>
            <NavItem to="/search" label="Search" icon={<Search className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
          </div>
          <div className="animate-bounce-in" style={{animationDelay: '800ms'}}>
            <NavItem to="/symptom-matcher" label="Symptom Matcher" icon={<Search className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
          </div>
          {/* Blog and Ebooks links removed as requested */}
          <div className="animate-bounce-in" style={{animationDelay: '900ms'}}>
            <NavItem to="/herbal-teas" label="Herbal Teas" icon={<Coffee className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
          </div>
          <div className="animate-bounce-in" style={{animationDelay: '1000ms'}}>
            <NavItem to="#" label="Saved Herbs" icon={<Heart className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
          </div>
          {user ? (
            <div className="animate-bounce-in" style={{animationDelay: '1100ms'}}>
              <NavItem to="/auth" label="Account" icon={<User className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
            </div>
          ) : (
            <div className="animate-bounce-in" style={{animationDelay: '1100ms'}}>
              <NavItem to="/auth" label="Login" icon={<LogIn className="h-5 w-5 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors" />} />
            </div>
          )}
          <div className="ml-2 animate-bounce-in" style={{animationDelay: '1200ms'}}>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#231c12] shadow-lg rounded-b-lg z-30 origin-top transition-all duration-300 ease-out" style={{transform: isMenuOpen ? 'scaleY(1)' : 'scaleY(0)', opacity: isMenuOpen ? 1 : 0, maxHeight: isMenuOpen ? '500px' : '0px'}}>
          <div className="flex flex-col p-2 space-y-1">
            <NavItem to="/" label="Herb Guide" icon={<Home className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            <NavItem to="/search" label="Search" icon={<Search className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            <NavItem to="/symptom-matcher" label="Symptom Matcher" icon={<Search className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            {/* Blog and Ebooks links removed as requested */}
            <NavItem to="/herbal-teas" label="Herbal Teas" icon={<Coffee className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            <NavItem to="#" label="Saved Herbs" icon={<Heart className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            {user ? (
              <NavItem to="/auth" label="Account" icon={<User className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            ) : (
              <NavItem to="/auth" label="Login" icon={<LogIn className="h-5 w-5 dark:text-amber-400 transition-colors" />} onClick={closeMenu} />
            )}
            <div className="px-4 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
