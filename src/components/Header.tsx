import React from 'react';
import { Bell, MessageCircle, User, Zap, TrendingUp, Battery } from 'lucide-react';
import type { EnergyData, UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  energyData: EnergyData;
  onChatbotToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, energyData, onChatbotToggle }) => {
  const totalGeneration = energyData.solar.current + energyData.wind.current;
  const efficiency = ((totalGeneration / energyData.consumption.current) * 100).toFixed(1);
  const activeAlerts = energyData.alerts.filter(alert => !alert.acknowledged).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">REOP</h1>
            </div>
            <div className="hidden md:block text-sm text-gray-500">
              Renewable Energy Orchestration Platform
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{totalGeneration.toFixed(1)} kW</div>
                <div className="text-gray-500">Generation</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                <div className="font-medium text-gray-900">{efficiency}%</div>
                <div className="text-gray-500">Efficiency</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onChatbotToggle}
            className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-6 w-6" />
            {activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeAlerts}
              </span>
            )}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500 capitalize">{userRole}</div>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;