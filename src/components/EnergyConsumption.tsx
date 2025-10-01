import React from 'react';
import { Zap, Home, Lightbulb, Monitor, MoreHorizontal } from 'lucide-react';
import MetricCard from './MetricCard';
import type { EnergyData } from '../types';

interface EnergyConsumptionProps {
  energyData: EnergyData;
}

const EnergyConsumption: React.FC<EnergyConsumptionProps> = ({ energyData }) => {
  const { consumption } = energyData;
  const totalConsumption = Object.values(consumption.byCategory).reduce((sum, value) => sum + value, 0);
  
  const consumptionKpis = [
    {
      title: 'Total Consumption',
      value: `${consumption.current.toFixed(1)} kW`,
      change: '-2.5%',
      changeType: 'positive' as const,
      icon: Zap,
      color: 'blue' as const,
    },
    {
      title: 'HVAC Systems',
      value: `${consumption.byCategory.hvac.toFixed(1)} kW`,
      change: `${((consumption.byCategory.hvac / totalConsumption) * 100).toFixed(1)}%`,
      changeType: 'neutral' as const,
      icon: Home,
      color: 'red' as const,
    },
    {
      title: 'Lighting',
      value: `${consumption.byCategory.lighting.toFixed(1)} kW`,
      change: `${((consumption.byCategory.lighting / totalConsumption) * 100).toFixed(1)}%`,
      changeType: 'neutral' as const,
      icon: Lightbulb,
      color: 'yellow' as const,
    },
    {
      title: 'Equipment',
      value: `${consumption.byCategory.equipment.toFixed(1)} kW`,
      change: `${((consumption.byCategory.equipment / totalConsumption) * 100).toFixed(1)}%`,
      changeType: 'neutral' as const,
      icon: Monitor,
      color: 'purple' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consumptionKpis.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Consumption Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumption by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Consumption by Category</h3>
          
          <div className="space-y-4">
            {[
              { name: 'HVAC Systems', value: consumption.byCategory.hvac, icon: Home, color: 'red' },
              { name: 'Lighting', value: consumption.byCategory.lighting, icon: Lightbulb, color: 'yellow' },
              { name: 'Equipment', value: consumption.byCategory.equipment, icon: Monitor, color: 'purple' },
              { name: 'Other', value: consumption.byCategory.other, icon: MoreHorizontal, color: 'gray' },
            ].map((category) => {
              const percentage = (category.value / totalConsumption) * 100;
              const Icon = category.icon;
              
              return (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${category.color}-100`}>
                      <Icon className={`h-4 w-4 text-${category.color}-600`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-500">{category.value.toFixed(1)} kW</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{percentage.toFixed(1)}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`bg-${category.color}-500 h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">24-Hour Load Profile</h3>
          
          <div className="relative h-64">
            <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between text-xs text-gray-500">
              <span>{Math.max(...consumption.forecast24h).toFixed(0)}kW</span>
              <span>{(Math.max(...consumption.forecast24h) * 0.75).toFixed(0)}kW</span>
              <span>{(Math.max(...consumption.forecast24h) * 0.5).toFixed(0)}kW</span>
              <span>{(Math.max(...consumption.forecast24h) * 0.25).toFixed(0)}kW</span>
              <span>0kW</span>
            </div>

            <div className="ml-12 h-full flex items-end space-x-1">
              {consumption.forecast24h.map((value, hour) => (
                <div
                  key={hour}
                  className="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{
                    height: `${(value / Math.max(...consumption.forecast24h)) * 100}%`,
                    minHeight: '2px'
                  }}
                  title={`${hour}:00 - ${value.toFixed(1)} kW`}
                ></div>
              ))}
            </div>

            <div className="ml-12 mt-2 flex justify-between text-xs text-gray-500">
              {[0, 6, 12, 18, 24].map((hour) => (
                <span key={hour}>{hour}:00</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Energy Optimization Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Energy Optimization Recommendations</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Load Shifting Opportunity</h4>
              <p className="text-sm text-green-700">
                Shift 15% of equipment load to 10:00-14:00 when solar generation peaks. 
                Potential savings: 12 kWh/day
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">HVAC Optimization</h4>
              <p className="text-sm text-blue-700">
                Reduce HVAC load by 8% during 16:00-19:00 peak hours. 
                Use thermal mass during solar peak hours.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Workshop Scheduling</h4>
              <p className="text-sm text-yellow-700">
                Schedule energy-intensive workshops during 11:00-15:00 when 
                renewable generation is highest.
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">Equipment Efficiency</h4>
              <p className="text-sm text-purple-700">
                3 pieces of equipment showing efficiency degradation. 
                Schedule maintenance to improve energy performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consumption Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Consumption Trends</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{consumption.current.toFixed(1)} kW</div>
            <div className="text-sm text-gray-500">Current Load</div>
            <div className="text-green-600 text-sm font-medium mt-1">2.5% below average</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.max(...consumption.forecast24h).toFixed(1)} kW
            </div>
            <div className="text-sm text-gray-500">Peak Today</div>
            <div className="text-blue-600 text-sm font-medium mt-1">Expected at 16:00</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {(consumption.forecast24h.reduce((a, b) => a + b, 0) / 24).toFixed(1)} kW
            </div>
            <div className="text-sm text-gray-500">Average Today</div>
            <div className="text-purple-600 text-sm font-medium mt-1">3.1% improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyConsumption;