
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Leaf, Search, Heart, User, Coffee, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

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
        flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-amber-100 text-amber-800 font-medium' 
          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'}
      `}
      onClick={onClick}
    >
      {icon}
      <span className="md:inline">{label}</span>
    </NavLink>
  );
};

const MainNavigation: React.FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="glass sticky top-0 z-20 py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <Leaf className="h-6 w-6 text-amber-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Wellness is Golden</span>
          </NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-amber-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 md:space-x-2">
          <NavItem to="/" label="Herb Guide" icon={<Home className="h-5 w-5" />} />
          <NavItem to="/search" label="Search" icon={<Search className="h-5 w-5" />} />
          <NavItem to="/symptom-matcher" label="Symptom Matcher" icon={<Search className="h-5 w-5" />} />
          <NavItem to="/herbal-teas" label="Herbal Teas" icon={<Coffee className="h-5 w-5" />} />
          <NavItem to="#" label="Saved Herbs" icon={<Heart className="h-5 w-5" />} />
          <NavItem to="/resources" label="E-Books & Resources" icon={<BookOpen className="h-5 w-5" />} />
          {user && (
            <NavItem to="/auth" label="Account" icon={<User className="h-5 w-5" />} />
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-30 animate-slide-in">
          <div className="flex flex-col p-2 space-y-1">
            <NavItem to="/" label="Herb Guide" icon={<Home className="h-5 w-5" />} onClick={closeMenu} />
            <NavItem to="/search" label="Search" icon={<Search className="h-5 w-5" />} onClick={closeMenu} />
            <NavItem to="/symptom-matcher" label="Symptom Matcher" icon={<Search className="h-5 w-5" />} onClick={closeMenu} />
            <NavItem to="/herbal-teas" label="Herbal Teas" icon={<Coffee className="h-5 w-5" />} onClick={closeMenu} />
            <NavItem to="#" label="Saved Herbs" icon={<Heart className="h-5 w-5" />} onClick={closeMenu} />
            <NavItem to="/resources" label="E-Books & Resources" icon={<BookOpen className="h-5 w-5" />} onClick={closeMenu} />
            {user && (
              <NavItem to="/auth" label="Account" icon={<User className="h-5 w-5" />} onClick={closeMenu} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
