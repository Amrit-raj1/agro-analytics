import React, { useState } from 'react';
import { 
  Network, 
  Binary, 
  LineChart, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Brain
} from 'lucide-react';

const MODEL_DATA = {
  'neural-net': {
    id: 'neural-net',
    name: 'Neural Net (LSTM)',
    title: 'Active Model: LSTM Ensembles',
    accuracy: 92,
    architectureTitle: 'Time-Series Weather Analysis',
    architectureIcon: Brain,
    architectureDescription: 'Utilizes Long Short-Term Memory (LSTM) networks to analyze sequential weather data over a 90-day growing period, capturing non-linear relationships between rainfall distribution and yield.',
    inputs: ['Soil Moisture', 'NDVI', 'Temperature', 'Solar Radiation']
  },
  'xgboost': {
    id: 'xgboost',
    name: 'XGBoost',
    title: 'Active Model: XGBoost Regressor',
    accuracy: 89,
    architectureTitle: 'Gradient Boosting Decision Trees',
    architectureIcon: Cpu,
    architectureDescription: 'Builds sequential decision trees where each new tree corrects errors from the previous one, optimizing prediction performance for tabular soil and nutrient profiles.',
    inputs: ['Nitrogen Level', 'Phosphorus Level', 'Potassium Level', 'Soil pH', 'Organic Matter']
  },
  'random-forest': {
    id: 'random-forest',
    name: 'Random Forest',
    title: 'Active Model: Random Forest Regressor',
    accuracy: 84,
    architectureTitle: 'Bootstrap Ensemble Aggregation',
    architectureIcon: Layers,
    architectureDescription: 'Constructs a multitude of decision trees during training and outputs the mean prediction of the individual trees, reducing overfitting and handling highly diverse soil parameters.',
    inputs: ['Historical Yields', 'Crop Variety Coefficient', 'Planting Density', 'Soil Texture']
  },
  'svr': {
    id: 'svr',
    name: 'SVR',
    title: 'Active Model: Support Vector Regression (SVR)',
    accuracy: 78,
    architectureTitle: 'Kernel-Based Margin Optimization',
    architectureIcon: Binary,
    architectureDescription: 'Finds a hyperplane in a high-dimensional space that fits the data points within a defined boundary margin, particularly effective for limited crop datasets and low-dimensional inputs.',
    inputs: ['Rainfall Volume', 'Irrigation Days', 'Elevation Coefficient']
  }
};

export default function YieldPredictorModels() {
  const [activeModelId, setActiveModelId] = useState('neural-net');
  const activeModel = MODEL_DATA[activeModelId];
  
  const chartItems = [
    { id: 'neural-net', label: 'Neural Net (LSTM)', val: 92 },
    { id: 'xgboost', label: 'XGBoost', val: 89 },
    { id: 'random-forest', label: 'Random Forest', val: 84 },
    { id: 'svr', label: 'SVR', val: 78 }
  ];

  const ArchitectureIcon = activeModel.architectureIcon;

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      {/* 1. Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2.5 bg-[#31572c]/10 rounded-xl">
          <Network className="h-6 w-6 text-[#31572c]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">Yield Prediction Models</h1>
          <p className="text-sm text-gray-500">Technical breakdown of AI methodologies for crop forecasting</p>
        </div>
      </div>

      {/* 2. Responsive 5-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column: Dynamic Active Model Analytics Workspace - 3/5 width */}
        <div className="lg:col-span-3 bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h2 className="text-lg font-bold text-gray-900 leading-tight">
                {activeModel.title}
              </h2>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> {activeModel.accuracy}% Accuracy
              </span>
            </div>
            
            <div className="space-y-6">
              {/* Upper Content Block: Core Architecture */}
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-800 text-white rounded-lg">
                    <ArchitectureIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    {activeModel.architectureTitle}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {activeModel.architectureDescription}
                </p>
              </div>
              
              {/* Lower Content Block: Multivariate Inputs */}
              <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-800 text-white rounded-lg">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    Multivariate Inputs
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {activeModel.inputs.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="flex items-center gap-1.5 text-xs font-bold bg-white border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl shadow-2xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/40 p-4 border border-emerald-100/50 rounded-2xl flex items-center justify-between text-xs text-emerald-950 font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              <span>Model compiled & validated. Ready for forecast run.</span>
            </div>
            <button 
              onClick={() => alert(`Running forecast simulations with ${activeModel.name}...`)}
              className="bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] text-white px-3.5 py-1.5 rounded-lg transition-all"
            >
              Run Forecast
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Benchmark Comparison Chart - 2/5 width */}
        <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Model Benchmark Comparison</h2>
            <p className="text-xs text-gray-400 mt-1 mb-6 leading-relaxed">
              Comparison of overall target validation accuracy across models. Click a bar to load its configuration.
            </p>
          </div>

          {/* Pure Tailwind CSS Vertical Bar Chart */}
          <div className="flex-1 flex gap-4 h-64 mt-2">
            
            {/* Y-Axis scale label markers */}
            <div className="flex flex-col justify-between text-[10px] font-bold text-gray-400 text-right w-6 pb-6 select-none">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* Bars container */}
            <div className="flex-1 border-l border-b border-slate-100 flex justify-around items-end relative pb-2 px-2 gap-3">
              {chartItems.map((item) => {
                const isActive = activeModelId === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setActiveModelId(item.id)}
                    className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip percentage on hover/active */}
                    <span className={`text-[10px] font-black tracking-wide mb-1.5 transition-all py-0.5 px-1.5 rounded ${
                      isActive 
                        ? 'bg-emerald-800 text-white shadow-xs scale-105' 
                        : 'text-gray-500 group-hover:text-emerald-800 group-hover:scale-105'
                    }`}>
                      {item.val}%
                    </span>

                    {/* Bar visual graphic */}
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-emerald-800 ring-4 ring-emerald-800/20 scale-[1.02]' 
                          : 'bg-emerald-800/40 hover:bg-emerald-800/70'
                      }`}
                      style={{ height: `${item.val}%` }}
                    />
                  </div>
                );
              })}
            </div>

          </div>

          {/* X-Axis labels explicitly named */}
          <div className="flex text-[10px] font-black text-gray-400 text-center select-none pt-2 mt-1 border-t border-slate-100/50">
            <span className="w-6 shrink-0" />
            <div className="flex-1 flex justify-around pl-2">
              <span className="w-12 truncate block font-sans" title="Neural Net (LSTM)">LSTM</span>
              <span className="w-12 truncate block font-sans" title="XGBoost">XGBoost</span>
              <span className="w-12 truncate block font-sans" title="Random Forest">R. Forest</span>
              <span className="w-12 truncate block font-sans" title="Support Vector Regression">SVR</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
