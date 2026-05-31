import React, { useState } from 'react';
import { 
  PlayCircle, 
  Video, 
  BookOpen, 
  Clock, 
  ThumbsUp, 
  Share2, 
  Download,
  User, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';
import videoUrl from '../../assets/208521_medium.mp4';

export default function LectureHall() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState({ 0: 42, 1: 18, 2: 29 });
  const [hasClickedHelpful, setHasClickedHelpful] = useState({});

  const playlist = [
    {
      id: 0,
      title: "Mastering Drip Irrigation Systems",
      duration: "14:20",
      instructor: "Dr. R. Sharma (ICAR)",
      thumb: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=360&q=80",
      description: "A detailed engineering breakdown of micro-irrigation installation, pressure regulations, drip emitter layouts, and filter maintenance schedules for commercial farming operations.",
      progress: 100
    },
    {
      id: 1,
      title: "Organic Certification: A Step-by-step Guide",
      duration: "22:15",
      instructor: "A. Patel (Agri-Expert)",
      thumb: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=360&q=80",
      description: "Learn the official NPOP guidelines, documentation compliance, soil conversion cycles, and NABL inspection protocols required to secure organic farming certification.",
      progress: 35
    },
    {
      id: 2,
      title: "Pest Management for Cotton (Kharif)",
      duration: "18:40",
      instructor: "N. Kumar (Extension)",
      thumb: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=360&q=80",
      description: "An intensive tactical module highlighting early detection of pink bollworm and whitefly, pest threshold index tracking, and ecological management solutions.",
      progress: 0
    }
  ];

  const handleSelectVideo = (index) => {
    setActiveVideo(index);
    setIsPlaying(false); // Reset playback on track change
  };

  const handleHelpfulClick = (id) => {
    if (hasClickedHelpful[id]) return;
    setHelpfulCounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setHasClickedHelpful(prev => ({ ...prev, [id]: true }));
  };

  const activeItem = playlist[activeVideo];

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      
      {/* Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-[#31572c]/10 text-[#31572c] rounded-xl mt-1 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Virtual Lecture Hall</h1>
            <p className="text-sm text-slate-500 mt-1">
              Expert-led courses translated into 12 regional languages
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Splits: 2/3 Left Panel & 1/3 Right Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel: Primary Video Workspace (2/3 width) */}
        <div className="flex-1 space-y-4 lg:max-w-[66%]">
          
          {/* Media Player Canvas */}
          <div className="w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden relative shadow-sm group">
            {isPlaying ? (
              <video 
                src={videoUrl}
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <img 
                  src={activeItem.thumb} 
                  alt={activeItem.title} 
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Large Center Translucent Green Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="h-16 w-16 sm:h-20 sm:w-20 bg-[#31572c]/90 hover:bg-[#1a3018] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <PlayCircle className="h-10 w-10 sm:h-12 sm:w-12 ml-1" />
                  </button>
                </div>
              </>
            )}

            {/* Fake progress bar track */}
            {!isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/60">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-500" 
                  style={{ width: `${activeItem.progress}%` }} 
                />
              </div>
            )}
          </div>

          {/* Dynamic Metadata Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {activeItem.title}
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 block leading-tight">{activeItem.instructor}</span>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">ICAR Certified</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Clock className="h-4 w-4 text-slate-450" />
                <span>Duration: {activeItem.duration}</span>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-50">
              <button 
                onClick={() => handleHelpfulClick(activeItem.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  hasClickedHelpful[activeItem.id] 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>Helpful ({helpfulCounts[activeItem.id]})</span>
              </button>

              <button 
                onClick={() => alert('Link copied to clipboard!')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </button>

              <button 
                onClick={() => alert('Simulating notes download...')}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs transition-all ml-auto"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Notes</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Panel: Interactive "Up Next" Queue (1/3 width) */}
        <div className="w-full lg:w-96 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Up Next
            </h3>
            <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-black tracking-wider">
              3 VIDEOS
            </span>
          </div>
          
          <div className="space-y-4">
            {playlist.map((vid, idx) => (
              <div 
                key={vid.id} 
                onClick={() => handleSelectVideo(idx)}
                className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-all border ${
                  activeVideo === idx 
                  ? 'bg-emerald-50/20 border-emerald-600/30' 
                  : 'hover:bg-slate-50 border-transparent'
                }`}
              >
                <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-100">
                  <img src={vid.thumb} className="w-full h-full object-cover" alt="thumb"/>
                  
                  {/* Crisp duration pill over bottom right */}
                  <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-black px-1.5 py-0.5 rounded font-sans tracking-wide">
                    {vid.duration}
                  </span>

                  {vid.progress === 100 && (
                    <div className="absolute top-1 left-1 bg-emerald-500 rounded-full p-0.5">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col py-0.5 flex-1 min-w-0">
                  <h4 className={`text-xs font-bold line-clamp-2 leading-snug ${activeVideo === idx ? 'text-emerald-800' : 'text-slate-900'}`}>
                    {vid.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-auto">{vid.instructor}</p>
                  
                  {vid.progress > 0 && vid.progress < 100 && (
                    <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${vid.progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
