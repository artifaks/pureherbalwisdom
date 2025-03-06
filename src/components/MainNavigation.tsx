
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Leaf, FileText, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

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
  const { user, signOut, isAdmin } = useAuth();
  console.log('Navigation isAdmin:', isAdmin); // Debug log

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="glass sticky top-0 z-20 py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <Leaf className="h-6 w-6 text-amber-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Herb Guide</span>
          </NavLink>
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center space-x-2">
          <NavItem to="/" label="Herbs" icon={<Home className="h-5 w-5" />} />
          <NavItem to="/resources" label="E-Books & Resources" icon={<BookOpen className="h-5 w-5" />} />
          <NavItem to="/blog" label="Blog" icon={<FileText className="h-5 w-5" />} />
          
          {user && (
            <NavItem to="/admin" label="Admin" icon={<Shield className="h-5 w-5" />} />
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              className="ml-2 flex items-center gap-2 border-amber-200 hover:bg-amber-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <NavLink 
              to="/auth" 
              className="ml-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
