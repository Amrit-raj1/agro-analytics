import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Maximize2, 
  Play, 
  Loader2, 
  X,
  Info,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function VirtualFarmTours() {
  const [tours, setTours] = useState([
    {
      id: 1,
      title: "Precision Hydroponics Facility",
      location: "Gurugram, Haryana",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
      badge: "360° PANORAMA",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
      metric: "Efficiency: +40% Water Saving",
      description: "Explore a state-of-the-art vertical hydroponic farming setup optimizing nutrient delivery loops for leafy greens.",
      hotspots: [
        { id: "h1", top: "35%", left: "45%", title: "AI Lux Sensor Node", spec: "Monitors photosynthetic active radiation (PAR) and regulates overhead LED spectra in real-time." },
        { id: "h2", top: "65%", left: "60%", title: "Nutrient Dosing Pump", spec: "Automated injection loops balancing electrical conductivity (EC) and pH within 0.05 tolerances." }
      ]
    },
    {
      id: 2,
      title: "Polyhouse Automated Cultivation",
      location: "Pune, Maharashtra",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80",
      badge: "3D WALKTHROUGH",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-100",
      metric: "Yield Factor: 3.5x Baseline",
      description: "Step inside an automated climate-controlled greenhouse featuring sensor-driven misting, shade sails, and drip line matrices.",
      hotspots: [
        { id: "h3", top: "40%", left: "30%", title: "Automated Misting Nozzle", spec: "Micro-drip fogging system designed to drop temperature by up to 5°C during dry noon cycles." },
        { id: "h4", top: "25%", left: "70%", title: "Motorized Shade Sail", spec: "Proportional solar blocking sails which self-retract at irradiance drop limits below 250 W/m²." }
      ]
    },
    {
      id: 3,
      title: "Solar-Powered Micro-Irrigation Orchard",
      location: "Alwar, Rajasthan",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80",
      badge: "DRONE OVERVIEW",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-100",
      metric: "Power Source: 100% Off-Grid Solar",
      description: "Navigate an expansive citrus orchard utilizing integrated KUSUM solar pump stations paired with high-efficiency subsurface irrigation network topologies.",
      hotspots: [
        { id: "h5", top: "50%", left: "40%", title: "KUSUM Solar Pump Inverter", spec: "7.5 HP solar water pump controller converting DC panel input to variable AC motor frequency." },
        { id: "h6", top: "70%", left: "55%", title: "Netafim Drip Valve", spec: "Pressure-compensated subsurface drippers ensuring uniform water flow regardless of topological elevation." }
      ]
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [activeTour, setActiveTour] = useState(null);
  const [isInitializingEngine, setIsInitializingEngine] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/extended/tours');
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          // Merge local hotspots with API result
          const merged = result.data.map(item => {
            const match = tours.find(t => t.id === item.id);
            return { ...item, hotspots: match ? match.hotspots : [] };
          });
          setTours(merged);
        }
      } catch (error) {
        console.warn("API offline, rendering pre-configured local tours:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLaunchTour = (tour) => {
    setIsInitializingEngine(true);
    // Simulate 3D Render engine initialization latency
    setTimeout(() => {
      setIsInitializingEngine(false);
      setActiveTour(tour);
      setSelectedHotspot(null);
    }, 1800);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="h-8 w-8 text-[#31572c] animate-spin" />
        <p className="text-gray-500 font-medium">Loading virtual environments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn antialiased relative">
      
      {/* 3D Engine Loading Overlay */}
      {isInitializingEngine && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fadeIn text-center">
          <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
          <h3 className="text-white font-extrabold text-lg tracking-tight">Initializing 3D Render Engine...</h3>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs">Connecting to local spatial rendering node. Please wait.</p>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-[#31572c]/10 text-[#31572c] rounded-xl mt-1 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Virtual Farm Tours</h1>
            <p className="text-sm text-slate-500 mt-1">
              Immersive 3D/360° explorations of advanced agricultural setups
            </p>
          </div>
        </div>
      </div>

      {/* Tours Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div 
            key={tour.id} 
            className="bg-white border border-slate-150 rounded-2xl p-4 shadow-2xs hover:-translate-y-1.5 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full group"
          >
            <div>
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-100">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Badge Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[9px] font-black tracking-widest px-2.5 py-1 rounded border shadow-2xs ${tour.badgeColor || 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                    {tour.badge}
                  </span>
                </div>
              </div>

              {/* Card Meta & Desc */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-450 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{tour.location}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors">
                  {tour.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {tour.description}
                </p>
              </div>
            </div>

            {/* Bottom Section: CTA & Stats */}
            <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wide bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                {tour.metric}
              </span>

              <button 
                onClick={() => handleLaunchTour(tour)}
                className="bg-[#31572c] hover:bg-[#1a3018] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0"
              >
                <span>Launch Tour</span>
                <Play className="w-3 h-3 fill-white" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Immersive 360/3D Virtual Tour Viewer Modal */}
      {activeTour && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col justify-between animate-fadeIn">
          
          {/* Top Bar Header */}
          <div className="p-4 bg-slate-900/50 border-b border-slate-900 flex items-center justify-between text-white relative z-20">
            <div>
              <span className="text-[9px] font-black tracking-widest text-emerald-450 uppercase">
                {activeTour.badge} HUD ACTIVE
              </span>
              <h3 className="text-sm sm:text-base font-extrabold leading-tight tracking-tight mt-0.5">
                {activeTour.title} — {activeTour.location}
              </h3>
            </div>
            <button 
              onClick={() => setActiveTour(null)}
              className="text-slate-450 hover:text-white p-2 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-5.5 h-5.5" />
            </button>
          </div>

          {/* Simulated 3D Panorama Canvas viewport */}
          <div className="flex-1 relative overflow-hidden bg-slate-900 flex items-center justify-center">
            
            {/* Immersive image display */}
            <img 
              src={activeTour.image} 
              alt="Simulated 3D Panorama Viewport" 
              className="w-full h-full object-cover opacity-80 select-none scale-105 pointer-events-none filter blur-xs"
            />
            <div className="absolute inset-0 bg-slate-950/20" />

            {/* Hotspot Floating Overlay States */}
            {activeTour.hotspots && activeTour.hotspots.map((hotspot) => (
              <div 
                key={hotspot.id} 
                className="absolute z-10" 
                style={{ top: hotspot.top, left: hotspot.left }}
              >
                {/* Hotspot Pulse Trigger Button */}
                <button 
                  onClick={() => setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)}
                  className={`w-6.5 h-6.5 rounded-full flex items-center justify-center text-white border shadow-lg transition-transform hover:scale-115 relative ${
                    selectedHotspot?.id === hotspot.id 
                    ? 'bg-emerald-600 border-emerald-400' 
                    : 'bg-emerald-800/80 border-white/60 animate-bounce'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
                  <Info className="w-4.5 h-4.5" />
                </button>

                {/* Hotspot Tooltip Micro-card */}
                {selectedHotspot?.id === hotspot.id && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-xl p-3.5 shadow-xl w-60 text-slate-800 animate-fadeIn space-y-1.5">
                    <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span>{hotspot.title}</span>
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      {hotspot.spec}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Navigational Instruction HUD overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-800 text-white/95 px-4 py-2 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-2 backdrop-blur-xs select-none">
              <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Use Hotspots to Inspect Advanced Equipment Nodes</span>
            </div>

          </div>

          {/* Bottom HUD statistics bar */}
          <div className="p-4 bg-slate-900/50 border-t border-slate-900 text-white z-10 flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Telemetry: 1080p Stream (Stable)</span>
            </span>
            <span className="text-emerald-450">{activeTour.metric}</span>
          </div>

        </div>
      )}

    </div>
  );
}
