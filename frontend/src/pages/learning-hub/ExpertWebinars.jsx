import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Users, 
  ArrowRight, 
  Calendar, 
  Loader2, 
  CheckCircle2, 
  X, 
  BookOpen, 
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ExpertWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [registeredWebinarIds, setRegisteredWebinarIds] = useState([]);
  const [loadingWebinarId, setLoadingWebinarId] = useState(null);
  const [selectedPresenter, setSelectedPresenter] = useState(null);
  
  // App state management for API calls
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);

  // BASE_URL can be pointed to your environment variables
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourdomain.com/v1';

  // 1. Fetch Webinars on Mount
  useEffect(() => {
    const fetchWebinarsAndRegistrations = async () => {
      try {
        setPageLoading(true);
        
        // Fetch both webinars data and user registration states concurrently
        const [webinarsRes, registrationsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/webinars`),
          fetch(`${API_BASE_URL}/users/me/registrations`) 
        ]);

        if (!webinarsRes.ok || !registrationsRes.ok) {
          throw new Error('Failed to synchronize server data.');
        }

        const webinarsData = await webinarsRes.json();
        const registrationsData = await registrationsRes.json();

        setWebinars(webinarsData);
        // Expecting an array of IDs from the backend, e.g., [1, 5, 12]
        setRegisteredWebinarIds(registrationsData.registeredIds || []);
        
      } catch (err) {
        setError(err.message || 'Something went wrong while loading webinars.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchWebinarsAndRegistrations();
  }, [API_BASE_URL]);

  // 2. Handle Action Booking Registration
  const handleRegister = async (id) => {
    if (registeredWebinarIds.includes(id)) return;
    
    setLoadingWebinarId(id);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/webinars/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If authorization header infrastructure is present, attach your token/key here:
          // 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        },
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      // Sync state with server confirmation
      setRegisteredWebinarIds(prev => [...prev, id]);
      setWebinars(prevList => 
        prevList.map(webinar => 
          webinar.id === id 
            ? { ...webinar, attendees: webinar.attendees + 1 } 
            : webinar
        )
      );
    } catch (err) {
      alert(err.message); // Fallback notice element 
    } finally {
      setLoadingWebinarId(null);
    }
  };

  // Render Loader State while loading page data
  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-8 h-8 text-[#31572c] animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Loading upcoming webinars...</p>
      </div>
    );
  }

  // Render Global Fetch Error State
  if (error && webinars.length === 0) {
    return (
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center max-w-md mx-auto my-12">
        <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900">Unable to load webinars</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn antialiased relative">
      
      {/* Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-[#31572c]/10 text-[#31572c] rounded-xl mt-1 shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Expert Webinars</h1>
            <p className="text-sm text-slate-500 mt-1">
              Live sessions with top agronomists and policymakers
            </p>
          </div>
        </div>
      </div>

      {/* Grid: 2 Card Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {webinars.map((webinar) => {
          const isRegistered = registeredWebinarIds.includes(webinar.id);
          const isLoading = loadingWebinarId === webinar.id;

          return (
            <div 
              key={webinar.id} 
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between min-h-[290px]"
            >
              {/* Crimson Status Ribbon */}
              {webinar.status === 'LIVE SOON' && (
                <div className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-bl-2xl shadow-xs flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
                  <span>LIVE SOON</span>
                </div>
              )}

              {/* Title & Schedule */}
              <div className="pr-12">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{webinar.date}</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug tracking-tight mb-4">
                  {webinar.title}
                </h3>
              </div>

              {/* Speaker Profile Capsule */}
              <div 
                onClick={() => setSelectedPresenter(webinar)}
                className="bg-slate-50/60 hover:bg-slate-100/70 border border-slate-100 rounded-2xl p-4 transition-colors cursor-pointer flex items-center gap-3 mb-5"
              >
                <div className="h-10 w-10 bg-slate-300 rounded-full flex items-center justify-center font-extrabold text-slate-700 shrink-0 border-2 border-white shadow-sm font-sans">
                  {webinar.speakerInitial || webinar.speaker?.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 leading-tight">
                    {webinar.speaker}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                    {webinar.role}
                  </p>
                </div>
                <div className="ml-auto text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  View Bio
                </div>
              </div>

              {/* Bottom Metadata & CTA Action Trigger */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-50">
                
                {/* Registered counts */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50/60 border border-slate-200 px-3 py-1.5 rounded-xl shadow-3xs">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{webinar.attendees} Registered</span>
                </div>

                {/* State Transition Register CTA Button */}
                <button
                  disabled={isRegistered || isLoading}
                  onClick={() => handleRegister(webinar.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    isRegistered
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default shadow-none'
                      : 'bg-[#31572c] hover:bg-[#1a3018] text-white hover:shadow-xs'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : isRegistered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Added to Calendar</span>
                    </>
                  ) : (
                    <>
                      <span>Register Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Presenter Profile Detail Slide-over Panel */}
      {selectedPresenter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end z-50 animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setSelectedPresenter(null)} />
          
          <div className="bg-white h-full max-w-md w-full border-l border-slate-100 shadow-2xl relative z-10 flex flex-col justify-between p-6 sm:p-8 animate-slideOver">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-850 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                  PRESENTER PROFILE INFO
                </span>
                <button 
                  onClick={() => setSelectedPresenter(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-slate-200 rounded-2xl flex items-center justify-center font-extrabold text-2xl text-slate-700 shrink-0 border-2 border-slate-100 shadow-sm font-sans">
                  {selectedPresenter.speakerInitial || selectedPresenter.speaker?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                    {selectedPresenter.speaker}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    {selectedPresenter.role}
                  </p>
                </div>
              </div>

              <div className="space-y-5 overflow-y-auto max-h-[60vh] pr-2">
                {selectedPresenter.speakerBio?.about && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>Agronomist Profile Summary</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedPresenter.speakerBio.about}
                    </p>
                  </div>
                )}

                {selectedPresenter.speakerBio?.highlights && (
                  <div className="p-4 bg-emerald-50/20 border border-emerald-100/50 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-850 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-emerald-700" />
                      <span>Sector Highlights</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 font-bold leading-relaxed">
                      {selectedPresenter.speakerBio.highlights}
                    </p>
                  </div>
                )}

                {selectedPresenter.speakerBio?.bibliography && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-wider">
                      <BookOpen className="w-4 h-4 text-blue-700" />
                      <span>Research Bibliography Publications</span>
                    </div>
                    <ul className="space-y-2">
                      {selectedPresenter.speakerBio.bibliography.map((bib, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-slate-600 items-start">
                          <span className="text-blue-600 font-black">•</span>
                          <span className="leading-relaxed italic">{bib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSelectedPresenter(null)}
                className="w-full bg-[#31572c] hover:bg-[#1a3018] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                Close Bio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}