import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import EnergyGeneration from './components/EnergyGeneration';
import EnergyConsumption from './components/EnergyConsumption';
import EnergyStorage from './components/EnergyStorage';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Chatbot from './components/Chatbot';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { generateMockData } from './utils/mockData';
import type { EnergyData, UserRole } from './types';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [energyData, setEnergyData] = useState<EnergyData>(generateMockData());
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard energyData={energyData} userRole={userRole} />;
      case 'generation':
        return <EnergyGeneration energyData={energyData} />;
      case 'consumption':
        return <EnergyConsumption energyData={energyData} />;
      case 'storage':
        return <EnergyStorage energyData={energyData} />;
      case 'reports':
        return <Reports energyData={energyData} />;
      case 'settings':
        return <Settings userRole={userRole} onRoleChange={setUserRole} />;
      default:
        return <Dashboard energyData={energyData} userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} userRole={userRole} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userRole={userRole} 
          energyData={energyData}
          onChatbotToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>

      {isChatbotOpen && (
        <Chatbot 
          energyData={energyData} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;