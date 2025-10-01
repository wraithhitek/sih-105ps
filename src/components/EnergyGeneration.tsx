import React from 'react';
import { Sun, Wind, TrendingUp, Zap } from 'lucide-react';
import MetricCard from './MetricCard';
import type { EnergyData } from '../types';

interface EnergyGenerationProps {
  energyData: EnergyData;
}

const EnergyGeneration: React.FC<EnergyGenerationProps> = ({ energyData }) => {
  const totalCapacity = energyData.solar.capacity + energyData.wind.capacity;
  const totalGeneration = energyData.solar.current + energyData.wind.current;
  const overallEfficiency = ((totalGeneration / totalCapacity) * 100);

  const generationKpis = [
    {
      title: 'Solar Generation',
      value: `${energyData.solar.current.toFixed(1)} kW`,
      change: `${energyData.solar.efficiency}% efficiency`,
      changeType: 'neutral' as const,
      icon: Sun,
      color: 'yellow' as const,
    },
    {
      title: 'Wind Generation',
      value: `${energyData.wind.current.toFixed(1)} kW`,
      change: `${energyData.wind.efficiency}% efficiency`,
      changeType: 'neutral' as const,
      icon: Wind,
      color: 'blue' as const,
    },
    {
      title: 'Total Capacity',
      value: `${totalCapacity.toFixed(1)} kW`,
      change: `${overallEfficiency.toFixed(1)}% utilization`,
      changeType: 'positive' as const,
      icon: Zap,
      color: 'green' as const,
    },
    {
      title: 'Peak Today',
      value: `${Math.max(...energyData.solar.forecast24h, ...energyData.wind.forecast24h).toFixed(1)} kW`,
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {generationKpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Generation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solar Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Sun className="h-5 w-5 text-yellow-600 mr-2" />
              Solar Energy System
            </h3>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Output</span>
              <span className="font-semibold text-gray-900">{energyData.solar.current.toFixed(1)} kW</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Installed Capacity</span>
              <span className="font-semibold text-gray-900">{energyData.solar.capacity.toFixed(1)} kW</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Efficiency</span>
              <span className="font-semibold text-yellow-600">{energyData.solar.efficiency}%</span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Utilization Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {((energyData.solar.current / energyData.solar.capacity) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(energyData.solar.current / energyData.solar.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Today's Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Peak Output</div>
                  <div className="font-semibold text-yellow-600">{Math.max(...energyData.solar.forecast24h).toFixed(1)} kW</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Output</div>
                  <div className="font-semibold text-yellow-600">
                    {(energyData.solar.forecast24h.reduce((a, b) => a + b, 0) / 24).toFixed(1)} kW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wind Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Wind className="h-5 w-5 text-blue-600 mr-2" />
              Wind Energy System
            </h3>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Output</span>
              <span className="font-semibold text-gray-900">{energyData.wind.current.toFixed(1)} kW</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Installed Capacity</span>
              <span className="font-semibold text-gray-900">{energyData.wind.capacity.toFixed(1)} kW</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Efficiency</span>
              <span className="font-semibold text-blue-600">{energyData.wind.efficiency}%</span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Utilization Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {((energyData.wind.current / energyData.wind.capacity) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(energyData.wind.current / energyData.wind.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Today's Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Peak Output</div>
                  <div className="font-semibold text-blue-600">{Math.max(...energyData.wind.forecast24h).toFixed(1)} kW</div>
                </div>
                <div>
                  <div className="text-gray-600">Avg Output</div>
                  <div className="font-semibold text-blue-600">
                    {(energyData.wind.forecast24h.reduce((a, b) => a + b, 0) / 24).toFixed(1)} kW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Forecast */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">24-Hour Generation Forecast</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Solar Forecast */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <Sun className="h-4 w-4 text-yellow-600 mr-2" />
              Solar Generation Forecast
            </h4>
            <div className="space-y-2">
              {Array.from({ length: 8 }, (_, i) => i * 3).map((hour) => (
                <div key={hour} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{hour}:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${(energyData.solar.forecast24h[hour] / energyData.solar.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {energyData.solar.forecast24h[hour].toFixed(1)} kW
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wind Forecast */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <Wind className="h-4 w-4 text-blue-600 mr-2" />
              Wind Generation Forecast
            </h4>
            <div className="space-y-2">
              {Array.from({ length: 8 }, (_, i) => i * 3).map((hour) => (
                <div key={hour} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{hour}:00</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(energyData.wind.forecast24h[hour] / energyData.wind.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {energyData.wind.forecast24h[hour].toFixed(1)} kW
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyGeneration;