
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Leaf, Search, Heart, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-amber-100 text-amber-800 font-medium' 
          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'}
      `}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  );
};

const MainNavigation: React.FC = () => {
  const { user } = useAuth();
  
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
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <NavItem to="/" label="Herb Guide" icon={<Home className="h-5 w-5" />} />
          <NavItem to="#" label="Symptom Matcher" icon={<Search className="h-5 w-5" />} />
          <NavItem to="#" label="Saved Herbs" icon={<Heart className="h-5 w-5" />} />
          <NavItem to="/resources" label="E-Books & Resources" icon={<BookOpen className="h-5 w-5" />} />
          {user && (
            <NavItem to="/auth" label="Account" icon={<User className="h-5 w-5" />} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
