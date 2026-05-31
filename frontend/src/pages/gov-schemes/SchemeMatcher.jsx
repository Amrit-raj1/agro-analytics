import React, { useState } from 'react';
import { FileText, CheckCircle2, Search, ChevronRight, MapPin, Sprout, Building2 } from 'lucide-react';

export default function SchemeMatcher() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 bg-[#31572c]/10 rounded-lg">
          <FileText className="h-6 w-6 text-[#31572c]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">AI Eligibility Engine</h1>
          <p className="text-sm text-gray-500">Find central and state schemes tailored to your farm profile</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Farm Profile Form */}
        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Your Farm Profile</h2>
          
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">State / Region</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#31572c]/20 focus:border-[#31572c] outline-none appearance-none cursor-pointer">
                  <option>Haryana</option>
                  <option>Madhya Pradesh</option>
                  <option>Punjab</option>
                  <option>Maharashtra</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Land Holding (Hectares)</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="number" defaultValue={1.5} step="0.1" className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#31572c]/20 focus:border-[#31572c] outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Primary Crop Category</label>
              <div className="relative">
                <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#31572c]/20 focus:border-[#31572c] outline-none appearance-none cursor-pointer">
                  <option>Cereals & Grains (Wheat/Rice)</option>
                  <option>Oilseeds (Soybean/Mustard)</option>
                  <option>Horticulture (Fruits/Veg)</option>
                  <option>Cash Crops (Cotton/Sugarcane)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={analyzing}
              className="w-full mt-6 bg-[#31572c] text-white py-3 rounded-xl font-bold hover:bg-[#1a3018] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4" /> Run AI Matcher
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          {!showResults && !analyzing ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
              <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Awaiting Profile Data</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-2">Enter your farm details on the left and run the AI Matcher to find subsidies you're eligible for.</p>
            </div>
          ) : analyzing ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="relative h-20 w-20 mb-6">
                <div className="absolute inset-0 border-4 border-[#31572c]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#31572c] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#31572c] animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#31572c]">Scanning 200+ Schemes...</h3>
              <p className="text-sm text-gray-500 mt-2">Cross-referencing state policies and land records.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">Top Matches (3)</h3>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Profile: Small & Marginal Farmer</span>
              </div>
              
              <div className="p-5 bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 rounded-2xl hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-emerald-500"></div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-emerald-950">PM-Kisan Samman Nidhi</h3>
                      <span className="bg-emerald-500 text-white text-xs font-black px-2 py-1 rounded shadow-sm">99% MATCH</span>
                    </div>
                    <p className="text-sm text-emerald-800 mt-2 font-medium">Income support of ₹6,000 per year in three equal installments. Based on your land record (1.5 hectares), you are fully eligible as a small farmer.</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition">Apply via E-Mitra</button>
                      <button className="px-4 py-1.5 bg-white text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg shadow-sm hover:bg-emerald-50 transition">Read Guidelines</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Haryana Micro-Irrigation Subsidy (MI)</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded">85% MATCH</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Available for your selected region. Up to 85% subsidy on drip and sprinkler irrigation setups to promote water conservation.</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="text-blue-600 text-sm font-bold flex items-center hover:text-blue-800 transition-colors">Start Application <ChevronRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow group opacity-80">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-50 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">PM Fasal Bima Yojana (PMFBY)</h3>
                      <span className="bg-amber-100 text-amber-700 text-xs font-black px-2 py-1 rounded">70% MATCH</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Crop insurance for Kharif/Rabi seasons. Premium is just 2% for Kharif crops like Cereals. Requires updated sowing certificate.</p>
                    <div className="flex items-center gap-3 mt-4">
                      <button className="text-amber-700 text-sm font-bold flex items-center hover:text-amber-900 transition-colors">Calculate Premium <ChevronRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
