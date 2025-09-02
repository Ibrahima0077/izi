import React, { useState } from 'react';
import { Package, Gift, X } from 'lucide-react';
import LoyaltySignupModal from './LoyaltySignupModal';

const Header: React.FC = () => {
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-1.5 rounded-lg shadow-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">iKite</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Mali Express</p>
              </div>
            </div>

            {/* Loyalty Button */}
            <button
              onClick={() => setShowLoyaltyModal(true)}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Gift className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">S'inscrire au programme de fidelité</span>
              <span className="text-sm font-medium sm:hidden">Code fidélité</span>
            </button>
          </div>
        </div>
      </header>

      {/* Loyalty Signup Modal */}
      {showLoyaltyModal && (
        <LoyaltySignupModal onClose={() => setShowLoyaltyModal(false)} />
      )}
    </>
  );
};

export default Header;