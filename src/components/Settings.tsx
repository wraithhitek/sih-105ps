import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Database, Shield, Globe } from 'lucide-react';
import type { UserRole } from '../types';

interface SettingsProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const Settings: React.FC<SettingsProps> = ({ userRole, onRoleChange }) => {
  const [alertThresholds, setAlertThresholds] = useState({
    lowBattery: 20,
    highConsumption: 150,
    lowGeneration: 50,
  });
  
  const [refreshRate, setRefreshRate] = useState(5);

  return (
    <div className="space-y-6">
      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <User className="h-5 w-5 text-blue-600 mr-2" />
          User Management
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="viewer">Viewer - Read-only access</option>
              <option value="operator">Operator - Monitor and basic controls</option>
              <option value="admin">Administrator - Full access</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Energy Management</option>
              <option>Facilities</option>
              <option>Engineering</option>
              <option>Administration</option>
            </select>
          </div>
        </div>

        {userRole === 'admin' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Manage Users</h4>
            <div className="space-y-3">
              {[
                { name: 'John Doe', role: 'Operator', department: 'Engineering', status: 'Active' },
                { name: 'Jane Smith', role: 'Viewer', department: 'Facilities', status: 'Active' },
                { name: 'Mike Wilson', role: 'Admin', department: 'Energy Management', status: 'Active' },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.department} · {user.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-sm">{user.status}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Alert Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Bell className="h-5 w-5 text-yellow-600 mr-2" />
          Alert Configuration
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Battery Threshold ({alertThresholds.lowBattery}%)
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={alertThresholds.lowBattery}
              onChange={(e) => setAlertThresholds({
                ...alertThresholds,
                lowBattery: parseInt(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              High Consumption Alert ({alertThresholds.highConsumption} kW)
            </label>
            <input
              type="range"
              min="100"
              max="300"
              value={alertThresholds.highConsumption}
              onChange={(e) => setAlertThresholds({
                ...alertThresholds,
                highConsumption: parseInt(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100 kW</span>
              <span>300 kW</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Generation Alert ({alertThresholds.lowGeneration} kW)
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={alertThresholds.lowGeneration}
              onChange={(e) => setAlertThresholds({
                ...alertThresholds,
                lowGeneration: parseInt(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20 kW</span>
              <span>100 kW</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Notification Preferences</h4>
            <div className="space-y-2">
              {[
                { id: 'email', label: 'Email Notifications', checked: true },
                { id: 'sms', label: 'SMS Alerts', checked: false },
                { id: 'push', label: 'Push Notifications', checked: true },
                { id: 'dashboard', label: 'Dashboard Alerts', checked: true },
              ].map((pref) => (
                <label key={pref.id} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={pref.checked}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <SettingsIcon className="h-5 w-5 text-gray-600 mr-2" />
          System Configuration
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Refresh Rate ({refreshRate} seconds)
            </label>
            <input
              type="range"
              min="1"
              max="60"
              value={refreshRate}
              onChange={(e) => setRefreshRate(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1s</span>
              <span>60s</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Asia/Kolkata (IST)</option>
              <option>UTC</option>
              <option>Asia/Dubai</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800">Data Retention</h5>
              <div className="text-sm text-blue-700 mt-1">Real-time: 7 days</div>
              <div className="text-sm text-blue-700">Historical: 5 years</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-800">Backup Status</h5>
              <div className="text-sm text-green-700 mt-1">Last backup: 2 hours ago</div>
              <div className="text-sm text-green-700">Next: In 22 hours</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-medium text-purple-800">Database Size</h5>
              <div className="text-sm text-purple-700 mt-1">Current: 2.4 GB</div>
              <div className="text-sm text-purple-700">Growth: ~50 MB/month</div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Shield className="h-5 w-5 text-red-600 mr-2" />
          Security Settings
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Password Policy</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Minimum 8 characters</div>
                <div>• Must contain uppercase, lowercase, number</div>
                <div>• Password expires every 90 days</div>
                <div>• Cannot reuse last 5 passwords</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Session Management</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Session timeout: 30 minutes</div>
                <div>• Max concurrent sessions: 3</div>
                <div>• Failed login attempts: 5</div>
                <div>• Account lockout: 15 minutes</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Security Options</h4>
            <div className="space-y-2">
              {[
                { id: 'twofa', label: 'Two-Factor Authentication', checked: true },
                { id: 'audit', label: 'Audit Logging', checked: true },
                { id: 'encryption', label: 'Data Encryption at Rest', checked: true },
                { id: 'vpn', label: 'VPN Required for Remote Access', checked: false },
              ].map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Reset to Defaults
        </button>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;