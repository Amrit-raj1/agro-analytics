import React, { useState } from 'react';
import { Newspaper, Filter, Clock, MapPin, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export default function MandiNewsFeed() {
  const [activeFilter, setActiveFilter] = useState('All');

  const newsItems = [
    { 
      id: 1,
      title: "Wheat Arrival Surges by 15% in Haryana Region as Harvest Peaks", 
      excerpt: "Local mandis across Rohtak and Hisar report a massive influx of wheat, leading to temporary storage shortages. Authorities are working on emergency procurement measures.",
      category: "Supply Chain",
      impact: "High Supply", 
      impactColor: "text-blue-600 bg-blue-50",
      rating: "Price Stabilized", 
      time: "2 hours ago",
      location: "Haryana",
      trend: "down"
    },
    { 
      id: 2,
      title: "Monsoon Front Enters Central India 4 Days Ahead of Schedule", 
      excerpt: "Meteorological department confirms early arrival of monsoon in MP and Maharashtra. Farmers advised to prepare fields for early Kharif sowing.",
      category: "Weather",
      impact: "Atmospheric", 
      impactColor: "text-indigo-600 bg-indigo-50",
      rating: "Early Sowing Alert", 
      time: "1 day ago",
      location: "Central India",
      trend: "neutral"
    },
    { 
      id: 3,
      title: "Soybean Prices Hit New High at Indore Mandi Amid Export Demand", 
      excerpt: "International demand pushes soybean prices past previous resistance levels. Traders anticipate continued volatility throughout the week.",
      category: "Prices",
      impact: "Price Alert", 
      impactColor: "text-red-600 bg-red-50",
      rating: "High Volatility", 
      time: "3 hours ago",
      location: "Indore, MP",
      trend: "up"
    },
    { 
      id: 4,
      title: "New E-NAM Integration Guidelines Released for Onion Traders", 
      excerpt: "Lasalgaon mandi moves to fully digital auctioning starting next week. Registration camps set up for farmers.",
      category: "Policy",
      impact: "Regulation", 
      impactColor: "text-amber-600 bg-amber-50",
      rating: "Process Change", 
      time: "5 hours ago",
      location: "Lasalgaon, MH",
      trend: "neutral"
    }
  ];

  const filters = ['All', 'Prices', 'Supply Chain', 'Weather', 'Policy'];

  const filteredNews = activeFilter === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#31572c]/10 rounded-lg">
            <Newspaper className="h-6 w-6 text-[#31572c]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">Mandi News Feed</h1>
            <p className="text-sm text-gray-500">Real-time localized agricultural updates</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Filter className="h-4 w-4 text-gray-400 mr-1" />
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              activeFilter === f 
                ? 'bg-[#31572c] text-white shadow-md' 
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="space-y-6">
          {filteredNews.map((item) => (
            <div key={item.id} className="group flex flex-col md:flex-row gap-5 p-5 border border-gray-100 rounded-xl hover:border-[#31572c]/30 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/50">
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#31572c]">{item.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center text-gray-500 gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#31572c] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${item.impactColor}`}>
                    {item.impact}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                  <div className="ml-auto flex items-center gap-1 text-[#31572c] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    Read Full Story <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="hidden md:flex flex-col items-end justify-between border-l border-gray-100 pl-5 w-48">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Market Rating</span>
                  <span className="text-sm font-black text-gray-800">{item.rating}</span>
                </div>
                <div className={`p-3 rounded-full ${
                  item.trend === 'up' ? 'bg-red-50 text-red-600' : 
                  item.trend === 'down' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                }`}>
                  {item.trend === 'up' ? <TrendingUp className="h-6 w-6" /> : 
                   item.trend === 'down' ? <TrendingDown className="h-6 w-6" /> : 
                   <div className="h-6 w-6 flex items-center justify-center font-bold">-</div>}
                </div>
              </div>
            </div>
          ))}
          
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">No news found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
