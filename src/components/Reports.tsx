import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Leaf, Zap } from 'lucide-react';
import type { EnergyData } from '../types';

interface ReportsProps {
  energyData: EnergyData;
}

const Reports: React.FC<ReportsProps> = ({ energyData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('comprehensive');

  const reportTypes = [
    { id: 'comprehensive', name: 'Comprehensive Energy Report', icon: FileText },
    { id: 'carbon', name: 'Carbon Savings Report', icon: Leaf },
    { id: 'generation', name: 'Generation Performance', icon: TrendingUp },
    { id: 'consumption', name: 'Consumption Analysis', icon: Zap },
  ];

  const periods = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'yearly', name: 'Yearly' },
  ];

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Reports</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>{period.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
              <Download className="h-5 w-5" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Impact Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Leaf className="h-5 w-5 text-green-600 mr-2" />
            Carbon Impact Summary
          </h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Total CO₂ Avoided</h4>
              <div className="text-3xl font-bold text-green-600">
                {energyData.carbonSavings.totalOffset.toFixed(1)} kg
              </div>
              <div className="text-sm text-green-700 mt-1">
                Equivalent to planting {Math.floor(energyData.carbonSavings.totalOffset / 22)} trees
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {energyData.carbonSavings.today.toFixed(1)} kg
                </div>
                <div className="text-sm text-gray-600">Today</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {energyData.carbonSavings.monthly.toFixed(1)} kg
                </div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {energyData.carbonSavings.yearly.toFixed(1)} kg
                </div>
                <div className="text-sm text-gray-600">This Year</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h5 className="font-medium text-gray-900 mb-2">Environmental Benefits</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Reduced coal consumption: {(energyData.carbonSavings.totalOffset / 0.82).toFixed(1)} kg</div>
                <div>• Clean air contribution: {(energyData.carbonSavings.totalOffset * 0.1).toFixed(1)} m³</div>
                <div>• Renewable energy percentage: 78.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            Performance Metrics
          </h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">System Efficiency</h4>
              <div className="text-3xl font-bold text-blue-600">91.2%</div>
              <div className="text-sm text-blue-700 mt-1">
                +3.4% improvement from last month
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Solar Capacity Factor</span>
                <span className="font-semibold text-yellow-600">{energyData.solar.efficiency}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Wind Capacity Factor</span>
                <span className="font-semibold text-blue-600">{energyData.wind.efficiency}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grid Independence</span>
                <span className="font-semibold text-green-600">
                  {(((energyData.solar.current + energyData.wind.current) / energyData.consumption.current) * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Efficiency</span>
                <span className="font-semibold text-purple-600">94.2%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h5 className="font-medium text-gray-900 mb-2">Cost Savings</h5>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">₹12,450</div>
                  <div className="text-xs text-gray-600">This Month</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">₹1,48,500</div>
                  <div className="text-xs text-gray-600">This Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reports</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Report Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Generated</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'Monthly Energy Performance',
                  period: 'December 2024',
                  date: '2024-12-28',
                  size: '2.3 MB',
                  type: 'comprehensive'
                },
                {
                  name: 'Carbon Savings Report',
                  period: 'Q4 2024',
                  date: '2024-12-25',
                  size: '1.8 MB',
                  type: 'carbon'
                },
                {
                  name: 'Generation Analysis',
                  period: 'Week 51',
                  date: '2024-12-22',
                  size: '1.2 MB',
                  type: 'generation'
                },
                {
                  name: 'Consumption Patterns',
                  period: 'November 2024',
                  date: '2024-12-01',
                  size: '1.5 MB',
                  type: 'consumption'
                },
              ].map((report, index) => {
                const reportType = reportTypes.find(t => t.id === report.type);
                const Icon = reportType?.icon || FileText;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{report.period}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600">{report.size}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1 transition-colors">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance & Statutory */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance & Statutory Reports</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Renewable Purchase Obligation (RPO)</h4>
            <div className="text-2xl font-bold text-green-600 mb-1">87.4%</div>
            <div className="text-sm text-green-700">Compliance achieved</div>
            <button className="mt-3 text-green-700 hover:text-green-800 text-sm font-medium">
              Generate RPO Certificate
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Energy Audit Report</h4>
            <div className="text-sm text-blue-700 mb-2">Last audit: Nov 2024</div>
            <div className="text-sm text-blue-700 mb-3">Next due: May 2025</div>
            <button className="text-blue-700 hover:text-blue-800 text-sm font-medium">
              View Audit Report
            </button>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-2">Environment Impact</h4>
            <div className="text-sm text-purple-700 mb-2">Annual filing ready</div>
            <div className="text-sm text-purple-700 mb-3">Due: Jan 31, 2025</div>
            <button className="text-purple-700 hover:text-purple-800 text-sm font-medium">
              Prepare Filing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;