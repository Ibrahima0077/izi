import React from 'react';
import { Truck, Gift, MessageCircle, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'convoys', label: 'Convois', icon: Truck },
    { id: 'loyalty', label: 'Fidélité', icon: Gift },
    { id: 'support', label: 'Support', icon: MessageCircle },
    { id: 'help', label: 'Aide', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700 active:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform ${
                activeTab === tab.id ? 'scale-110' : ''
              }`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;