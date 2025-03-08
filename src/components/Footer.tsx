
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-50 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-amber-600 mr-2" />
              <span className="text-xl font-semibold text-gray-800">Herb Guide</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Your trusted source for herbal wellness information and natural healing solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-700 hover:text-amber-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-700 hover:text-amber-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-700 hover:text-amber-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-700 hover:text-amber-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#herb-guide" className="text-gray-600 hover:text-amber-600">Herb Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Symptom Matcher</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Saved Herbs</a></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-amber-600">E-Books & Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Our Mission</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Research Methods</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Expert Contributors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-amber-600">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-200 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Wellness is Golden Herb Guide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
