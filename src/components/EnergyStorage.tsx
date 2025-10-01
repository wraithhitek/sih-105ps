import React from 'react';
import { Battery, Zap, TrendingUp, Clock } from 'lucide-react';
import MetricCard from './MetricCard';
import type { EnergyData } from '../types';

interface EnergyStorageProps {
  energyData: EnergyData;
}

const EnergyStorage: React.FC<EnergyStorageProps> = ({ energyData }) => {
  const { storage } = energyData;
  const chargeLevel = (storage.current / storage.capacity) * 100;
  
  const storageKpis = [
    {
      title: 'Current Storage',
      value: `${storage.current.toFixed(1)} kWh`,
      change: `${chargeLevel.toFixed(1)}% capacity`,
      changeType: 'neutral' as const,
      icon: Battery,
      color: 'blue' as const,
    },
    {
      title: 'Storage Capacity',
      value: `${storage.capacity.toFixed(1)} kWh`,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Zap,
      color: 'green' as const,
    },
    {
      title: 'Charge Rate',
      value: `${storage.chargeRate.toFixed(1)} kW`,
      change: 'Currently charging',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple' as const,
    },
    {
      title: 'Cycle Count',
      value: `${storage.cycleCount}`,
      change: '89% health',
      changeType: 'neutral' as const,
      icon: Clock,
      color: 'yellow' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storageKpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Battery Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Battery className="h-5 w-5 text-blue-600 mr-2" />
            Battery System Status
          </h3>
          
          <div className="space-y-6">
            {/* Charge Level Visualization */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Charge Level</span>
                <span className="text-2xl font-bold text-blue-600">{chargeLevel.toFixed(1)}%</span>
              </div>
              
              <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${chargeLevel}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-white drop-shadow">
                    {storage.current.toFixed(1)} / {storage.capacity} kWh
                  </span>
                </div>
              </div>
            </div>

            {/* Battery Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Charge Rate</span>
                <span className="font-semibold text-green-600">+{storage.chargeRate.toFixed(1)} kW</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discharge Rate</span>
                <span className="font-semibold text-red-600">-{storage.dischargeRate.toFixed(1)} kW</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Net Rate</span>
                <span className={`font-semibold ${(storage.chargeRate - storage.dischargeRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(storage.chargeRate - storage.dischargeRate) >= 0 ? '+' : ''}{(storage.chargeRate - storage.dischargeRate).toFixed(1)} kW
                </span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <div className="text-xs text-gray-600">System Health</div>
                <div className="text-sm font-medium text-green-600">Excellent</div>
              </div>
              <div className="text-center">
                <div className="h-3 w-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <div className="text-xs text-gray-600">Temperature</div>
                <div className="text-sm font-medium text-blue-600">Normal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Operations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Storage Operations</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Current Operation</h4>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700">Charging from solar excess</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                Estimated full charge in 3.2 hours
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Optimization Recommendations</h4>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Peak Shaving Opportunity</div>
                <div className="text-xs text-blue-600">
                  Discharge 25 kWh during 16:00-19:00 to reduce grid import costs
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-purple-800">Load Shifting</div>
                <div className="text-xs text-purple-600">
                  Store excess solar for evening consumption peak
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Battery Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">State of Health</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cycle Count</span>
                  <span className="font-medium text-gray-900">{storage.cycleCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Life</span>
                  <span className="font-medium text-blue-600">7.2 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Storage Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Daily Pattern</h4>
            <div className="space-y-2">
              {[
                { time: '06:00', action: 'Discharge', value: 15, color: 'red' },
                { time: '10:00', action: 'Charge', value: 25, color: 'green' },
                { time: '14:00', action: 'Charge', value: 30, color: 'green' },
                { time: '18:00', action: 'Discharge', value: 20, color: 'red' },
                { time: '22:00', action: 'Standby', value: 0, color: 'gray' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.time}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-16 bg-${item.color}-200 rounded-full`}>
                      <div 
                        className={`h-2 bg-${item.color}-500 rounded-full`}
                        style={{ width: `${(item.value / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-20">
                      {item.action} {item.value}kW
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Weekly Performance</h4>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const efficiency = 88 + Math.sin(index) * 5;
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{day}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">
                        {efficiency.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Key Metrics</h4>
            <div className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-green-700">Round-trip Efficiency</div>
              </div>
              
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-700">kWh Stored Today</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">₹2,340</div>
                <div className="text-sm text-purple-700">Cost Savings/Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyStorage;