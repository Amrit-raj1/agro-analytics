import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  HelpCircle 
} from 'lucide-react';

export default function GovernmentSchemeCenter() {
  // Mocking the user context state (Suresh Kumar, Farmer from Haryana)
  const [userProfile, setUserProfile] = useState({
    name: "Suresh Kumar",
    role: "Farmer",
    state: "Haryana"
  });

  // Top metric highlights matching image_a5bbc3.jpg
  const metrics = [
    { label: "ACTIVE SCHEMES", value: "214", subtext: "NATIONALLY MATCHED", color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "ELIGIBLE SUBSIDIES", value: "8 Schemes", subtext: "HIGH MATCH SCORE", color: "text-amber-700", bg: "bg-amber-50" },
    { label: "PENDING CLAIMS", value: "2", subtext: "UNDER VERIFICATION", color: "text-blue-700", bg: "bg-blue-50" },
    { label: "TOTAL DISBURSED", value: "₹45,000", subtext: "PLATFORM VERIFIED", color: "text-stone-700", bg: "bg-stone-100" }
  ];

  // Primary Data Array for the Eligibility Matrix
  const [schemes, setSchemes] = useState([
    {
      id: "pm-kisan",
      name: "PM-KISAN Samman Nidhi",
      eligibility: "100% Eligible",
      benefit: "₹6,000 / year",
      status: "Active Disbursal",
      actionType: "badge-success"
    },
    {
      id: "agri-machinery",
      name: "Agricultural Machinery Subsidies",
      eligibility: "95% Eligible",
      benefit: "50% Off Tractor/Seeder",
      status: "Apply Now",
      actionType: "button-primary"
    },
    {
      id: "pmfby",
      name: "PM Fasal Bima Yojana (PMFBY)",
      eligibility: "92% Eligible",
      benefit: "Crop Insurance Guard",
      status: "Active Cover",
      actionType: "badge-success"
    },
    {
      id: "pmksy",
      name: "Har Khet Ko Pani (PMKSY)",
      eligibility: "88% Eligible",
      benefit: "80% Tube-well Subsidy",
      status: "Verified",
      actionType: "badge-neutral"
    }
  ]);

  // Handle CTA button clicks
  const handleActionClick = (schemeName, actionType) => {
    if (actionType === 'button-primary') {
      alert(`Redirecting to application portal for: ${schemeName}`);
    } else {
      alert(`Opening tracking dashboard details for: ${schemeName}`);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      
      {/* 1. Header Hero Banner */}
      <div className="mb-6 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm relative overflow-hidden">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl mt-1">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline space-x-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Government Scheme Center</h1>
              <span className="text-emerald-800 font-medium font-hindi text-lg">सरकारी योजना केंद्र</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Match localized eligibility indices with active central and state agricultural welfare schemes.
            </p>
          </div>
        </div>
        
        {/* Subtle decorative vector matching the illustration tone */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none hidden lg:block">
          <div className="bg-emerald-800 w-48 h-full transform skew-x-12 translate-x-12" />
        </div>
      </div>

      {/* 2. Stat Grid Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 tracking-wider block mb-1">{metric.label}</span>
              <span className="text-2xl font-extrabold text-slate-900 block">{metric.value}</span>
            </div>
            <div className={`mt-3 inline-self-start text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${metric.bg} ${metric.color}`}>
              {metric.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Dashboard Matrix Splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Eligible Welfare & Subsidy Matrices Table */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Eligible Welfare & Subsidy Matrices</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Scheme Name</th>
                  <th className="pb-3 font-semibold">Eligibility Index</th>
                  <th className="pb-3 font-semibold">Benefits/Disbursal</th>
                  <th className="pb-3 font-semibold text-right">Action / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {schemes.map((scheme) => (
                  <tr key={scheme.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 font-medium text-slate-900 pr-2">{scheme.name}</td>
                    <td className="py-4 text-emerald-600 font-bold">{scheme.eligibility}</td>
                    <td className="py-4 text-slate-500 font-medium">{scheme.benefit}</td>
                    <td className="py-4 text-right">
                      {scheme.actionType === 'badge-success' && (
                        <span className="inline-block px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                          {scheme.status}
                        </span>
                      )}
                      {scheme.actionType === 'badge-neutral' && (
                        <span className="inline-block px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg">
                          {scheme.status}
                        </span>
                      )}
                      {scheme.actionType === 'button-primary' && (
                        <button 
                          onClick={() => handleActionClick(scheme.name, scheme.actionType)}
                          className="px-4 py-1 text-xs font-bold bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors shadow-sm"
                        >
                          {scheme.status}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Alerts & Reminders */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-4">
              <Clock className="w-4 h-4 text-slate-400" />
              <h2>Scheme Reminders</h2>
            </div>

            <div className="space-y-4">
              {/* Alert 1: e-KYC */}
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-orange-800">e-KYC Mandatory Deadline</h3>
                  <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                    PM-KISAN online OTP-based KYC must be completed by Sunday to avoid installment delay.
                  </p>
                </div>
              </div>

              {/* Alert 2: Super-Seeder Subsidy */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-emerald-900">Super-Seeder Subsidy</h3>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                    {userProfile.state} Department of Agriculture opens online portal window. First-come first-served registry active.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help link footer matching the premium layout style */}
          <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need help claiming?</span>
            </span>
            <a href="#help" className="text-emerald-800 hover:underline font-bold flex items-center">
              View Guide <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}