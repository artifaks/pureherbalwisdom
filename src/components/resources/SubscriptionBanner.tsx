
import React from 'react';
import { Button } from '@/components/ui/button';

const SubscriptionBanner: React.FC = () => {
  return (
    <div className="mt-16 bg-white/70 rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe for Premium Access</h2>
      <p className="text-gray-600 mb-6">
        Get unlimited access to all our premium resources, plus early access to new content,
        with our monthly subscription plan.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Unlimited downloads of all e-books and guides</span>
            </li>
            <li className="flex items-center">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Early access to new releases</span>
            </li>
            <li className="flex items-center">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Exclusive monthly herbal recipes</span>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-amber-600 mb-2">$14.99<span className="text-sm text-gray-600">/month</span></p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-8">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
