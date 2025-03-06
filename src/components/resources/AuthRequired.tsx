
import React from 'react';
import { LogIn, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthRequired: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Herbal E-Books & Resources
        </h1>
        <BookOpen className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white/70 rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to access our premium herbal resources, make purchases and download e-books.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-8"
            onClick={() => navigate('/auth')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In / Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
