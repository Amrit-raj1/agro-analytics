import React, { useState } from 'react';
import { 
  Microscope, 
  Dna, 
  Download, 
  Sparkles, 
  LineChart, 
  FileText, 
  Loader2, 
  X,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export default function SoilMicrobiomeResearch() {
  // States
  const [highlightedCohort, setHighlightedCohort] = useState(null); // 'treated', 'untreated', or null
  const [isMicroscopeOpen, setIsMicroscopeOpen] = useState(false);
  const [downloadState, setDownloadState] = useState('idle'); // 'idle', 'downloading', 'completed'
  const [downloadProgress, setDownloadProgress] = useState(0);

  // ICAR trial metrics
  const rawChartData = [
    {
      metric: 'Nitrogen Availability',
      unit: 'mg/kg',
      treated: 84,
      untreated: 42,
      description: 'Nano-Urea treated soil displays doubled nitrogen availability due to controlled release dynamics.'
    },
    {
      metric: 'Phosphorus Solubil. Index',
      unit: '%',
      treated: 76,
      untreated: 38,
      description: 'Active phosphorus solubilization is enhanced by increased phosphatase enzyme secretions.'
    },
    {
      metric: 'Microbial Biomass (MBC)',
      unit: 'µg/g',
      treated: 320,
      untreated: 140,
      description: 'Microbial biomass carbon increases significantly, confirming improved soil biology.'
    }
  ];

  // Handler for simulating white paper download
  const handleDownloadClick = () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState('completed');
          // Reset to idle after 3 seconds
          setTimeout(() => {
            setDownloadState('idle');
          }, 3000);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      {/* 1. Page Header & Section Title */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2.5 bg-[#31572c]/10 rounded-xl">
          <Microscope className="h-6 w-6 text-[#31572c]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">Soil Microbiome Analysis</h1>
          <p className="text-sm text-gray-500 font-medium">ICAR White Paper data: Bio-stimulant efficacy on degraded topsoil</p>
        </div>
      </div>

      {/* 2. Grid split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Nutrient & Biotic Profiling Chart (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">Nutrient & Biotic Profiling</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#31572c]/5 text-[#31572c] border border-[#31572c]/10 rounded-md">6 Month Trial</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">Comparison of Nano-Urea Treated vs. Untreated Soil. Hover/click legend options to filter cohorts.</p>
          </div>

          {/* Grouped Comparative Metrics Displays */}
          <div className="space-y-6 flex-1 justify-center flex flex-col">
            {rawChartData.map((data, idx) => {
              const total = data.treated + data.untreated;
              const treatedPct = (data.treated / total) * 100;
              const untreatedPct = (data.untreated / total) * 100;
              
              const isTreatedDimmed = highlightedCohort === 'untreated';
              const isUntreatedDimmed = highlightedCohort === 'treated';

              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-gray-800">{data.metric}</span>
                      <span className="text-[10px] text-gray-400 font-bold ml-1.5">({data.unit})</span>
                    </div>
                    <div className="flex gap-3 text-xs font-black">
                      <span className={`text-[#31572c] transition-all ${isTreatedDimmed ? 'opacity-30 scale-95' : 'scale-100'}`}>
                        {data.treated} {data.unit}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className={`text-slate-500 transition-all ${isUntreatedDimmed ? 'opacity-30 scale-95' : 'scale-100'}`}>
                        {data.untreated} {data.unit}
                      </span>
                    </div>
                  </div>

                  {/* Side-by-side custom progress bars */}
                  <div className="h-6 w-full bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex shadow-inner relative">
                    <div 
                      className={`bg-[#31572c] h-full flex items-center justify-end pr-2 transition-all duration-300 ${
                        isTreatedDimmed ? 'opacity-20' : 'opacity-100'
                      }`}
                      style={{ width: `${treatedPct}%` }}
                    >
                      <span className="text-[9px] font-bold text-emerald-100 hidden sm:inline">+{(((data.treated - data.untreated) / data.untreated) * 100).toFixed(0)}%</span>
                    </div>
                    <div 
                      className={`bg-slate-300 h-full flex items-center justify-start pl-2 transition-all duration-300 ${
                        isUntreatedDimmed ? 'opacity-20' : 'opacity-100'
                      }`}
                      style={{ width: `${untreatedPct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed italic">{data.description}</p>
                </div>
              );
            })}
          </div>

          {/* Interactive Legend at bottom */}
          <div className="flex justify-center gap-6 mt-8 pt-4 border-t border-gray-100 flex-wrap">
            <button 
              onMouseEnter={() => setHighlightedCohort('treated')}
              onMouseLeave={() => setHighlightedCohort(null)}
              onClick={() => setHighlightedCohort(highlightedCohort === 'treated' ? null : 'treated')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                highlightedCohort === 'treated' 
                  ? 'border-[#31572c] bg-[#31572c]/10 text-[#31572c]' 
                  : 'border-transparent text-gray-700 hover:bg-slate-50'
              }`}
            >
              <span className="h-3 w-3 rounded bg-[#31572c] inline-block shadow-2xs" />
              <span>Nano–Urea Treated</span>
            </button>
            
            <button 
              onMouseEnter={() => setHighlightedCohort('untreated')}
              onMouseLeave={() => setHighlightedCohort(null)}
              onClick={() => setHighlightedCohort(highlightedCohort === 'untreated' ? null : 'untreated')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                highlightedCohort === 'untreated' 
                  ? 'border-slate-500 bg-slate-100 text-slate-700' 
                  : 'border-transparent text-gray-700 hover:bg-slate-50'
              }`}
            >
              <span className="h-3 w-3 rounded bg-slate-300 inline-block shadow-2xs" />
              <span>Untreated Control</span>
            </button>
          </div>
        </div>

        {/* Right Column: Lab Scan and Downloader Cards (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Top Right Card: Microscopy Lab Scan Feature */}
          <div 
            onClick={() => setIsMicroscopeOpen(true)}
            className="bg-gradient-to-br from-slate-900 to-[#102d15] rounded-3xl p-6 shadow-sm text-white relative overflow-hidden group cursor-pointer hover:shadow-md transition-all border border-slate-800/50"
          >
            {/* Soft decorative background grid representing cellular structures */}
            <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600&h=300" 
                alt="Microscopy Cells" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/10 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 animate-pulse" /> 🔬 MICROSCOPY LAB SCAN
                </span>
                <span className="text-[9px] font-black text-gray-300 hover:underline flex items-center gap-0.5">
                  Expand Scan <Sparkles className="h-3 w-3 text-emerald-400" />
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-bold leading-tight tracking-tight">Mycorrhizal Fungi Colonization</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
                  Visual confirmation of 300% increase in symbiotic root fungi networks, leading to superior phosphorus uptake in arid conditions.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Micro-analysis complete — 400x zoom grid interactive</span>
              </div>
            </div>
          </div>

          {/* Bottom Right Card: Interactive White Paper Downloader */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-snug">Download Full White Paper</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">ICAR Bulletin Vol 42. PDF format (2.4MB)</p>
              </div>
              
              <button 
                onClick={handleDownloadClick}
                disabled={downloadState === 'downloading'}
                className={`p-3.5 rounded-xl shadow-2xs border transition-all shrink-0 ${
                  downloadState === 'downloading'
                    ? 'bg-slate-50 text-[#31572c] border-slate-100'
                    : downloadState === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    : 'bg-slate-50 hover:bg-[#31572c] hover:text-white border-slate-200/80 text-gray-600 active:scale-[0.97]'
                }`}
              >
                {downloadState === 'downloading' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Download className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Dynamic loading progress bar */}
            {downloadState === 'downloading' && (
              <div className="mt-5 space-y-1.5 animate-fadeIn">
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#31572c] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>Downloading White Paper assets...</span>
                  <span>{downloadProgress}%</span>
                </div>
              </div>
            )}

            {downloadState === 'completed' && (
              <div className="mt-5 p-3 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-fadeIn font-bold">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>Download complete! PDF saved successfully.</span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Expanded Microscope Scan Modal */}
      {isMicroscopeOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-800 shadow-2xl relative overflow-hidden text-white animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">High-Resolution Cell Scan</span>
                <h3 className="text-lg font-bold text-white leading-snug">Mycorrhizal Fungi Root Network (400x Zoom)</h3>
              </div>
              <button 
                onClick={() => setIsMicroscopeOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Microscope cell scan visual simulation */}
            <div className="aspect-video w-full rounded-2xl border border-slate-800 bg-[#06180c] relative overflow-hidden flex items-center justify-center">
              {/* Circular scanner crosshair grid */}
              <div className="absolute inset-0 border border-emerald-950/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 to-slate-950 pointer-events-none" />
              
              <div className="absolute h-48 w-48 rounded-full border-2 border-emerald-500/20 border-dashed animate-spin duration-3000 pointer-events-none" />
              <div className="absolute h-64 w-64 rounded-full border border-emerald-500/10 pointer-events-none" />
              
              {/* Mock cell nodes */}
              <div className="flex gap-8 flex-wrap justify-center items-center z-10 px-8">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-[9px] font-black text-emerald-300 select-none animate-pulse">
                  FUNGI
                </div>
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-[9px] font-black text-emerald-300 select-none">
                  ROOT
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500/25 border-2 border-emerald-400 flex items-center justify-center text-[9px] font-black text-emerald-300 select-none animate-bounce">
                  SPORE
                </div>
                <div className="h-14 w-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[9px] font-black text-emerald-300 select-none">
                  HYPHAE
                </div>
              </div>

              {/* Absolute coordinates HUD label */}
              <div className="absolute bottom-4 left-4 text-[9px] text-gray-500 font-mono">
                COORDINATES: 28.6139° N, 77.2090° E // MAG: 400X
              </div>
              <div className="absolute top-4 right-4 bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/20 text-[9px] font-bold uppercase">
                Healthy Colonization
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 text-xs text-slate-300">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-500 font-bold">Observation Target</span>
                <span className="text-white font-extrabold">Glomus intraradices (Arbuscular Mycorrhizal)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                <span className="text-slate-500 font-bold">Colonization Index</span>
                <span className="text-emerald-400 font-black">88% (Highly Active)</span>
              </div>
              <div className="flex justify-between items-start py-1.5">
                <span className="text-slate-500 font-bold">Agronomic Benefit</span>
                <span className="text-white font-semibold text-right leading-relaxed max-w-[320px]">
                  Significantly extends root surface area, allowing moisture absorption from deep soil profiles and mobilizing insoluble rock phosphate.
                </span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button 
                onClick={() => setIsMicroscopeOpen(false)} 
                className="w-full bg-[#31572c] hover:bg-[#1a3018] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
