import React from 'react';
import { BarChart3 } from 'lucide-react';
import type { EnergyData } from '../types';

interface EnergyChartProps {
  energyData: EnergyData;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ energyData }) => {
  // Generate 24-hour mock data for visualization
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxValue = Math.max(
    ...energyData.solar.forecast24h,
    ...energyData.wind.forecast24h,
    ...energyData.consumption.forecast24h
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
          24-Hour Energy Forecast
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Solar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Wind</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Consumption</span>
          </div>
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValue.toFixed(0)}kW</span>
          <span>{(maxValue * 0.75).toFixed(0)}kW</span>
          <span>{(maxValue * 0.5).toFixed(0)}kW</span>
          <span>{(maxValue * 0.25).toFixed(0)}kW</span>
          <span>0kW</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full flex items-end space-x-1">
          {hours.map((hour) => (
            <div key={hour} className="flex-1 relative h-full flex items-end">
              {/* Grid lines */}
              <div className="absolute inset-0 border-r border-gray-100"></div>
              
              {/* Bars */}
              <div className="w-full flex items-end space-x-0.5">
                {/* Solar */}
                <div
                  className="bg-yellow-500 rounded-t min-h-1 transition-all duration-300"
                  style={{
                    height: `${(energyData.solar.forecast24h[hour] / maxValue) * 100}%`,
                    width: '30%'
                  }}
                ></div>
                
                {/* Wind */}
                <div
                  className="bg-blue-500 rounded-t min-h-1 transition-all duration-300"
                  style={{
                    height: `${(energyData.wind.forecast24h[hour] / maxValue) * 100}%`,
                    width: '30%'
                  }}
                ></div>
                
                {/* Consumption */}
                <div
                  className="bg-red-500 rounded-t min-h-1 transition-all duration-300"
                  style={{
                    height: `${(energyData.consumption.forecast24h[hour] / maxValue) * 100}%`,
                    width: '30%'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* X-axis */}
        <div className="ml-12 mt-2 flex justify-between text-xs text-gray-500">
          {[0, 6, 12, 18, 24].map((hour) => (
            <span key={hour}>{hour}:00</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyChart;