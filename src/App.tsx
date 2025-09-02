import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ConvoysPage from './components/ConvoysPage';
import LoyaltyPage from './components/LoyaltyPage';
import SupportPage from './components/SupportPage';
import HelpPage from './components/HelpPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('convoys');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'convoys':
        return <ConvoysPage />;
      case 'loyalty':
        return <LoyaltyPage />;
      case 'support':
        return <SupportPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <ConvoysPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">
        {renderActiveTab()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;