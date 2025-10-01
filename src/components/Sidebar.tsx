import React from 'react';
import { 
  LayoutDashboard, 
  Sun, 
  Zap, 
  Battery, 
  BarChart3, 
  Settings,
  Wind
} from 'lucide-react';
import type { UserRole } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, userRole }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'operator', 'viewer'] },
    { id: 'generation', label: 'Energy Generation', icon: Sun, roles: ['admin', 'operator', 'viewer'] },
    { id: 'consumption', label: 'Energy Consumption', icon: Zap, roles: ['admin', 'operator', 'viewer'] },
    { id: 'storage', label: 'Energy Storage', icon: Battery, roles: ['admin', 'operator', 'viewer'] },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, roles: ['admin', 'operator'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Wind className="h-6 w-6 text-green-600" />
            <Sun className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Rajasthan Campus</div>
            <div className="text-xs text-gray-500">Energy Grid</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <div className="text-sm font-medium text-green-800">System Status</div>
          </div>
          <div className="text-xs text-green-600 mt-1">All systems operational</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;