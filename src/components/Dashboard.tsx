import React from 'react';
import { 
  Sun, 
  Wind, 
  Battery, 
  Zap, 
  TrendingUp, 
  Leaf,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import EnergyChart from './EnergyChart';
import MetricCard from './MetricCard';
import AlertPanel from './AlertPanel';
import type { EnergyData, UserRole } from '../types';

interface DashboardProps {
  energyData: EnergyData;
  userRole: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ energyData, userRole }) => {
  const totalGeneration = energyData.solar.current + energyData.wind.current;
  const netBalance = totalGeneration - energyData.consumption.current;
  const gridIndependence = Math.min(100, (totalGeneration / energyData.consumption.current) * 100);

  const kpis = [
    {
      title: 'Total Generation',
      value: `${totalGeneration.toFixed(1)} kW`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Energy Consumption',
      value: `${energyData.consumption.current.toFixed(1)} kW`,
      change: '-3.2%',
      changeType: 'positive' as const,
      icon: Zap,
      color: 'blue',
    },
    {
      title: 'Storage Level',
      value: `${((energyData.storage.current / energyData.storage.capacity) * 100).toFixed(1)}%`,
      change: `${energyData.storage.current.toFixed(1)} kWh`,
      changeType: 'neutral' as const,
      icon: Battery,
      color: 'purple',
    },
    {
      title: 'Carbon Savings Today',
      value: `${energyData.carbonSavings.today.toFixed(1)} kg CO₂`,
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: Leaf,
      color: 'green',
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Energy Balance Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Balance Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Sun className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="font-medium text-gray-900">Solar Generation</div>
                  <div className="text-sm text-gray-600">{energyData.solar.current.toFixed(1)} kW</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Efficiency</div>
                <div className="font-semibold text-green-600">{energyData.solar.efficiency}%</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wind className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Wind Generation</div>
                  <div className="text-sm text-gray-600">{energyData.wind.current.toFixed(1)} kW</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Efficiency</div>
                <div className="font-semibold text-blue-600">{energyData.wind.efficiency}%</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                netBalance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {netBalance >= 0 ? '+' : ''}{netBalance.toFixed(1)} kW
              </div>
              <div className="text-sm text-gray-600">Net Energy Balance</div>
              <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                netBalance >= 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {netBalance >= 0 ? 'Energy Surplus' : 'Energy Deficit'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">Grid Independence</div>
                <div className="font-semibold text-purple-600">{gridIndependence.toFixed(1)}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, gridIndependence)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Storage Status</div>
                  <div className="text-sm text-gray-600">
                    {energyData.storage.current.toFixed(1)} / {energyData.storage.capacity} kWh
                  </div>
                </div>
                <Battery className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnergyChart energyData={energyData} />
        </div>
        <div className="space-y-6">
          <AlertPanel alerts={energyData.alerts} />
          
          {/* Carbon Impact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Leaf className="h-5 w-5 text-green-600 mr-2" />
              Carbon Impact
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today</span>
                <span className="font-semibold text-green-600">{energyData.carbonSavings.today.toFixed(1)} kg CO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-green-600">{energyData.carbonSavings.monthly.toFixed(1)} kg CO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Year</span>
                <span className="font-semibold text-green-600">{energyData.carbonSavings.yearly.toFixed(1)} kg CO₂</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Total Offset</span>
                  <span className="text-lg font-bold text-green-600">{energyData.carbonSavings.totalOffset.toFixed(1)} kg CO₂</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;