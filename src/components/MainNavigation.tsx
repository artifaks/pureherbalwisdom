
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Leaf } from 'lucide-react';

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
      <span>{label}</span>
    </NavLink>
  );
};

const MainNavigation: React.FC = () => {
  return (
    <nav className="glass sticky top-0 z-20 py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Leaf className="h-6 w-6 text-amber-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">Herb Guide</span>
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-2">
          <NavItem to="/" label="Herbs" icon={<Home className="h-5 w-5" />} />
          <NavItem to="/resources" label="E-Books & Resources" icon={<BookOpen className="h-5 w-5" />} />
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
