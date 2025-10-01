import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Zap, TrendingUp, Battery } from 'lucide-react';
import type { EnergyData, ChatMessage } from '../types';

interface ChatbotProps {
  energyData: EnergyData;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ energyData, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your energy assistant. I can help you with real-time energy data, optimization recommendations, and answer questions about the REOP system. What would you like to know?',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('energy') || message.includes('generation')) {
      const totalGeneration = energyData.solar.current + energyData.wind.current;
      return `Current energy generation is ${totalGeneration.toFixed(1)} kW. Solar is producing ${energyData.solar.current.toFixed(1)} kW (${energyData.solar.efficiency}% efficiency) and wind is producing ${energyData.wind.current.toFixed(1)} kW (${energyData.wind.efficiency}% efficiency). Would you like more details about any specific source?`;
    }
    
    if (message.includes('consumption') || message.includes('usage')) {
      return `Current energy consumption is ${energyData.consumption.current.toFixed(1)} kW. The breakdown is: HVAC ${energyData.consumption.byCategory.hvac.toFixed(1)} kW, Lighting ${energyData.consumption.byCategory.lighting.toFixed(1)} kW, Equipment ${energyData.consumption.byCategory.equipment.toFixed(1)} kW, and Other ${energyData.consumption.byCategory.other.toFixed(1)} kW. Peak consumption today is expected around 16:00.`;
    }
    
    if (message.includes('battery') || message.includes('storage')) {
      const chargeLevel = (energyData.storage.current / energyData.storage.capacity) * 100;
      return `Battery storage is currently at ${chargeLevel.toFixed(1)}% capacity (${energyData.storage.current.toFixed(1)} kWh of ${energyData.storage.capacity} kWh). The system is currently ${energyData.storage.chargeRate > energyData.storage.dischargeRate ? 'charging' : 'discharging'} with a net rate of ${(energyData.storage.chargeRate - energyData.storage.dischargeRate).toFixed(1)} kW.`;
    }
    
    if (message.includes('carbon') || message.includes('savings') || message.includes('co2')) {
      return `Today's carbon savings are ${energyData.carbonSavings.today.toFixed(1)} kg CO₂. This month we've saved ${energyData.carbonSavings.monthly.toFixed(1)} kg CO₂, and our total carbon offset is ${energyData.carbonSavings.totalOffset.toFixed(1)} kg CO₂. This is equivalent to planting approximately ${Math.floor(energyData.carbonSavings.totalOffset / 22)} trees!`;
    }
    
    if (message.includes('efficiency') || message.includes('performance')) {
      const totalGeneration = energyData.solar.current + energyData.wind.current;
      const gridIndependence = (totalGeneration / energyData.consumption.current) * 100;
      return `System efficiency is excellent! We're currently achieving ${gridIndependence.toFixed(1)}% grid independence. Solar panels are operating at ${energyData.solar.efficiency}% efficiency and wind turbines at ${energyData.wind.efficiency}% efficiency. Overall system performance is 91.2% which is above our target of 85%.`;
    }
    
    if (message.includes('alert') || message.includes('problem') || message.includes('issue')) {
      const activeAlerts = energyData.alerts.filter(alert => !alert.acknowledged);
      if (activeAlerts.length === 0) {
        return `Great news! There are currently no active alerts. All systems are operating normally. The last system check was completed successfully and all equipment is performing within optimal parameters.`;
      }
      return `There are ${activeAlerts.length} active alert(s): ${activeAlerts.map(alert => alert.message).join(', ')}. Would you like me to help you troubleshoot any of these issues?`;
    }
    
    if (message.includes('optimize') || message.includes('recommendation')) {
      return `Based on current data, I recommend: 1) Shifting 15% of equipment load to 10:00-14:00 when solar generation peaks, 2) Reducing HVAC load by 8% during 16:00-19:00 peak hours, 3) Scheduling energy-intensive workshops during 11:00-15:00. These optimizations could save approximately 12 kWh/day and reduce grid dependence by 5%.`;
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
      return `I can help you with:\n• Real-time energy data and insights\n• Carbon savings information\n• System performance metrics\n• Energy optimization recommendations\n• Troubleshooting and alerts\n• Battery storage status\n• Generation forecasts\n• Consumption analysis\n\nJust ask me anything about the energy system!`;
    }
    
    // Default responses
    const responses = [
      `I understand you're asking about "${userMessage}". Let me check the current system data... Based on our latest readings, everything is operating within normal parameters. Could you be more specific about what information you need?`,
      `That's an interesting question about "${userMessage}". Currently, our renewable energy system is generating ${(energyData.solar.current + energyData.wind.current).toFixed(1)} kW and consuming ${energyData.consumption.current.toFixed(1)} kW. Is there a particular aspect you'd like me to focus on?`,
      `Regarding "${userMessage}", I'd be happy to help! Our system is currently operating at high efficiency with good renewable energy utilization. What specific data or recommendations would be most helpful for you?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Current Status', icon: Zap, action: 'What is the current energy status?' },
    { label: 'Performance', icon: TrendingUp, action: 'How is the system performing?' },
    { label: 'Battery Level', icon: Battery, action: 'What is the battery status?' },
  ];

  return (
    <div className="fixed right-6 bottom-6 w-96 h-[26rem] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-50 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Energy Assistant</h3>
            <div className="text-xs text-green-600">Online</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-blue-600' 
                  : 'bg-gray-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-3 w-3 text-white" />
                ) : (
                  <Bot className="h-3 w-3 text-white" />
                )}
              </div>
              <div className={`px-3 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Quick actions:</div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => setInputMessage(action.action)}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs transition-colors"
                >
                  <Icon className="h-3 w-3" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about energy data, performance, or optimization..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows={2}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;