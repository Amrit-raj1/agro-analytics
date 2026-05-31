import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertOctagon, 
  BarChart3,
  HelpCircle,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function MarketImpactRatings() {
  const [hoveredCrop, setHoveredCrop] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const trendData = [
    { name: 'Day 1', volatility: 22, sentiment: 82 },
    { name: 'Day 2', volatility: 25, sentiment: 88 },
    { name: 'Day 3', volatility: 48, sentiment: 60 },
    { name: 'Day 4', volatility: 92, sentiment: 18 }, // Dip/spike mid-week
    { name: 'Day 5', volatility: 68, sentiment: 42 },
    { name: 'Day 6', volatility: 38, sentiment: 72 },
    { name: 'Day 7', volatility: 20, sentiment: 85 }  // Day 7 recovery
  ];

  const commodities = [
    { 
      name: 'Wheat', 
      width: 'w-[90%]', 
      percentage: 90, 
      color: 'bg-rose-500 hover:bg-rose-600', 
      indicator: 'Severe supply disruption risk', 
      volumeShift: '+24.5% trade velocity shift' 
    },
    { 
      name: 'Soybean', 
      width: 'w-[72%]', 
      percentage: 72, 
      color: 'bg-amber-500 hover:bg-amber-600', 
      indicator: 'Steady crushing demand', 
      volumeShift: '+12.8% crushing volume' 
    },
    { 
      name: 'Cotton', 
      width: 'w-[55%]', 
      percentage: 55, 
      color: 'bg-blue-500 hover:bg-blue-600', 
      indicator: 'Slight export contraction', 
      volumeShift: '-4.2% offload rate' 
    },
    { 
      name: 'Mustard', 
      width: 'w-[38%]', 
      percentage: 38, 
      color: 'bg-emerald-500 hover:bg-emerald-600', 
      indicator: 'Stable domestic arrivals', 
      volumeShift: '+2.1% market buffer' 
    },
    { 
      name: 'Rice', 
      width: 'w-[20%]', 
      percentage: 20, 
      color: 'bg-slate-500 hover:bg-slate-600', 
      indicator: 'Baseline MSP procurement', 
      volumeShift: '0.0% standard trade deviation' 
    }
  ];

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - bounds.left + 15,
      y: e.clientY - bounds.top - 40
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      
      {/* 1. Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl mt-1 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Market Impact & AI Ratings</h1>
            <p className="text-sm text-slate-500 mt-1">
              Quantifying the effect of news on agricultural markets
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Grid: Interactive Metric Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Overall Market Sentiment */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between min-h-[320px]">
          <div className="w-full">
            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block text-center mb-4">
              OVERALL MARKET SENTIMENT
            </span>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            {/* SVG Circular Radial Progress Ring */}
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Background path */}
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Accent path (65%) */}
                <path
                  className="text-emerald-600 transition-all duration-1000 ease-out"
                  strokeWidth="3.5"
                  strokeDasharray="65, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              {/* Inner score labels */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">65</span>
                <span className="text-[9px] font-extrabold tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1 uppercase">
                  POSITIVE
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center leading-relaxed mt-4 max-w-xs font-medium">
            AI analysis of 1,200+ news articles indicates a generally positive outlook for the upcoming harvest season.
          </p>
        </div>

        {/* Card 2: High Volatility Alert */}
        <div className="bg-rose-50/70 border border-rose-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[320px] relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
            <AlertOctagon className="w-40 h-40 text-rose-950" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="text-[10px] font-black text-rose-600 tracking-wider uppercase block">
                HIGH VOLATILITY ALERT
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-rose-950 tracking-tight">Wheat Futures</h3>
            <p className="text-xs font-extrabold text-rose-800 mt-1">Risk Index: 85/100</p>
          </div>

          <div className="space-y-3 mt-4 relative z-10">
            {/* Driver Box */}
            <div className="bg-white p-3 rounded-xl border border-rose-100/50 shadow-2xs">
              <p className="text-xs text-rose-950 leading-relaxed font-semibold">
                <span className="text-[10px] font-black text-rose-600 block tracking-wide mb-0.5">DRIVER:</span>
                Export ban rumors circulating in North Indian mandis.
              </p>
            </div>

            {/* Action Box */}
            <div className="bg-white p-3 rounded-xl border border-rose-100/50 shadow-2xs">
              <p className="text-xs text-rose-950 leading-relaxed font-semibold">
                <span className="text-[10px] font-black text-rose-600 block tracking-wide mb-0.5">ACTION:</span>
                Hold inventory; expect price swings of ±4% this week.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Commodities Impacted */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[320px] relative">
          <div>
            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase block mb-5">
              COMMODITIES IMPACTED
            </span>

            {/* Hover container for custom tooltip alignment */}
            <div className="space-y-4 relative" onMouseMove={handleMouseMove}>
              {commodities.map((crop) => (
                <div 
                  key={crop.name} 
                  className="space-y-1.5 cursor-pointer group"
                  onMouseEnter={() => setHoveredCrop(crop)}
                  onMouseLeave={() => setHoveredCrop(null)}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="group-hover:text-emerald-800 transition-colors">{crop.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{crop.percentage}% Impact</span>
                  </div>
                  
                  {/* Progress track */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${crop.color} transition-all duration-500 rounded-full ${crop.width}`}
                    />
                  </div>
                </div>
              ))}

              {/* Crop Micro-Tooltip */}
              {hoveredCrop && (
                <div 
                  className="absolute bg-slate-900 text-white rounded-lg p-2.5 text-[10px] shadow-lg pointer-events-none z-20 max-w-[200px] border border-slate-800/80 animate-fadeIn space-y-1 font-sans"
                  style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
                >
                  <div className="font-extrabold text-emerald-400 border-b border-slate-800 pb-1 mb-1">
                    {hoveredCrop.name} Analytics
                  </div>
                  <div className="font-medium text-slate-200">
                    {hoveredCrop.indicator}
                  </div>
                  <div className="text-slate-400 font-mono italic">
                    {hoveredCrop.volumeShift}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Row: Interactive 7-Day Trend Analytics Chart */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        
        {/* Chart Header block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              7-Day News Sentiment vs. Price Volatility
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Correlation between negative news cycles and market price swings.
            </p>
          </div>

          {/* Custom Legends */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>News Sentiment Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Price Volatility Index</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={trendData} 
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="sentimentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="volatilityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
                dy={8}
              />
              
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                ticks={[25, 50, 75, 100]}
                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} 
              />
              
              {/* Dual Shared Custom Tooltip */}
              <Tooltip 
                content={<CustomChartTooltip />} 
                cursor={{ stroke: '#e2e8f0', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
              />

              {/* Curve 1: Sentiment */}
              <Area 
                type="monotone" 
                dataKey="sentiment" 
                stroke="#10b981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#sentimentGrad)" 
              />
              
              {/* Curve 2: Volatility */}
              <Area 
                type="monotone" 
                dataKey="volatility" 
                stroke="#ef4444" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#volatilityGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

// Styled Chart Tooltip matching mockup specs
function CustomChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const sentiment = payload.find(p => p.dataKey === 'sentiment')?.value || 0;
    const volatility = payload.find(p => p.dataKey === 'volatility')?.value || 0;
    return (
      <div className="bg-slate-900 border border-slate-800 text-white p-3.5 rounded-xl shadow-xl space-y-2 max-w-[220px] font-sans">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-1">
          {label} Analysis
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs gap-3">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sentiment:
            </span>
            <span className="font-extrabold text-emerald-400 font-mono">{sentiment}/100</span>
          </div>
          <div className="flex items-center justify-between text-xs gap-3">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Volatility:
            </span>
            <span className="font-extrabold text-red-450 font-mono">{volatility}/100</span>
          </div>
        </div>
        
        {/* Dynamic Context Tag */}
        <div className="text-[9px] text-slate-350 leading-relaxed font-semibold bg-slate-950/80 p-1.5 rounded border border-slate-800/40">
          {sentiment < 30 ? (
            <span className="text-red-400 flex items-center gap-1">
              <AlertOctagon className="w-3 h-3 text-red-400 shrink-0" />
              <span>Negative cycle detected</span>
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>Market outlook stable</span>
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
}
