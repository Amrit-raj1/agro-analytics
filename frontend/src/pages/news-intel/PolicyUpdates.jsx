import React, { useState } from 'react';
import { 
  Scale, 
  ExternalLink, 
  Globe, 
  Building, 
  TrendingUp, 
  AlertTriangle,
  BookOpen, 
  X,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function PolicyUpdates() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const policies = [
    {
      id: 1,
      date: "May 28, 2026",
      tag: "CENTRAL SCHEME",
      title: "Fertilizer Subsidy Re-allocation for Kharif Season",
      description: "The Union Cabinet has approved a revised nutrient-based subsidy (NBS) rate for Phosphatic and Potassic (P&K) fertilizers for the upcoming Kharif season, ensuring no price hike for farmers.",
      impact: "HIGH IMPACT",
      icon: Scale,
      iconColor: "text-emerald-700 bg-emerald-50 border-emerald-100",
      dotColor: "bg-emerald-500",
      gazetteMeta: {
        ministry: "Ministry of Chemicals and Fertilizers",
        department: "Department of Fertilizers",
        refNo: "F.No. 12012/3/2026-Ferts",
        signedBy: "Shri Rajesh Kumar, Joint Secretary",
        details: [
          { label: "Revised NBS Nitrogen (N) Rate", value: "₹22.50 per Kg" },
          { label: "Revised NBS Phosphate (P) Rate", value: "₹28.40 per Kg" },
          { label: "Revised NBS Potash (K) Rate", value: "₹18.60 per Kg" },
          { label: "Kharif Allocation Increment", value: "₹24,475 Crores Total Outlay" }
        ],
        background: "To insulate farmers from rise in international prices of fertilizers and raw materials. Subsidies will be directly routed to fertilizer manufacturing companies based on point-of-sale (PoS) machine transactions.",
        directives: [
          "No retail price revision permitted by manufacturers without prior departmental authorization.",
          "Buffer stocking nodes must report real-time supply chain inventory every 24 hours.",
          "State Agriculture Departments to monitor and penalize hoarding operations."
        ]
      }
    },
    {
      id: 2,
      date: "May 25, 2026",
      tag: "STATE LEVEL: MP",
      title: "Mukhya Mantri Bhavantar Bhugtan Yojana Revived",
      description: "Madhya Pradesh government reintroduces the price deficit financing scheme specifically for garlic and onion to protect farmers from distress sales.",
      impact: "MEDIUM IMPACT",
      icon: Building,
      iconColor: "text-blue-700 bg-blue-50 border-blue-100",
      dotColor: "bg-blue-500",
      gazetteMeta: {
        ministry: "Department of Agriculture & Farmer Welfare",
        department: "Government of Madhya Pradesh",
        refNo: "MP-BBY/2026/O-G-821",
        signedBy: "Smt. Anuradha Sen, Principal Secretary",
        details: [
          { label: "Target Commodities", value: "Garlic, Onion (Rabi Harvest)" },
          { label: "Registration Window", value: "June 1 - June 20, 2026" },
          { label: "Verification Node", value: "e-Uparjan Portal Validation" },
          { label: "Deficit Payment Mode", value: "Direct Benefit Transfer (DBT) to Bank Account" }
        ],
        background: "Following supply-chain gluts, the wholesale mandi rates dropped below production costs. This scheme compensates farmers directly for the difference between the government-declared modal price and the actual sale price.",
        directives: [
          "Farmers must upload valid Mandi Sale Receipts showing official auction dates.",
          "Maximum capping per hectare calculated on verified crop classification indexes.",
          "Payment processing completes within 14 working days of database registration."
        ]
      }
    },
    {
      id: 3,
      date: "May 18, 2026",
      tag: "EXPORT REGULATION",
      title: "Minimum Export Price (MEP) on Onion Removed",
      description: "DGFT notification confirms the removal of the $550 per tonne MEP on onions to boost exports and domestic wholesale prices following a bumper rabi harvest.",
      impact: "MARKET MOVING",
      icon: TrendingUp,
      iconColor: "text-amber-700 bg-amber-50 border-amber-100",
      dotColor: "bg-amber-500",
      gazetteMeta: {
        ministry: "Ministry of Commerce and Industry",
        department: "Directorate General of Foreign Trade (DGFT)",
        refNo: "Notification No. 08/2026-DGFT",
        signedBy: "Dr. Alok Vardhan, Director General",
        details: [
          { label: "Previous MEP Rate", value: "$550 per Metric Tonne" },
          { label: "Effective Date", value: "Immediate (From May 18, 2026)" },
          { label: "HS Code target", value: "07031010 (Fresh Onions)" },
          { label: "Export Policy Status", value: "Free (Shifted from Restricted)" }
        ],
        background: "A record rabi crop harvest in Maharashtra, Karnataka, and Gujarat has led to excessive domestic reserves. Removing the MEP enables competitive participation of domestic exporters in global markets.",
        directives: [
          "Exporters must obtain valid Phytosanitary Certificates before custom clearances.",
          "No MEP applies to consignments loaded on vessels prior to this gazette release.",
          "Quantity check monitoring will run weekly to prevent domestic scarcity."
        ]
      }
    },
    {
      id: 4,
      date: "May 10, 2026",
      tag: "QUALITY STANDARDS",
      title: "New FSSAI Limits for Pesticide Residues in Spices",
      description: "Stringent Maximum Residue Limits (MRLs) established for 14 common pesticides in export-grade spices. Testing mandatory at certified NABL labs.",
      impact: "COMPLIANCE REQUIRED",
      icon: AlertTriangle,
      iconColor: "text-rose-700 bg-rose-50 border-rose-100",
      dotColor: "bg-rose-500",
      gazetteMeta: {
        ministry: "Ministry of Health and Family Welfare",
        department: "Food Safety and Standards Authority of India (FSSAI)",
        refNo: "F.No. Spices-MRL/2026/FSSAI",
        signedBy: "Shri Vivek Chandra, Director (Standards)",
        details: [
          { label: "Pesticides Addressed", value: "Ethylene Oxide, Chlorpyrifos +12 others" },
          { label: "Enforcement Node", value: "All custom checkposts and domestic packaging hubs" },
          { label: "Audit Standard", value: "NABL Certified GC-MS/MS testing" },
          { label: "Compliance Deadline", value: "July 1, 2026" }
        ],
        background: "In response to international trade quality alerts, limits are updated to maintain export compliance protocols and guarantee residue-free agricultural produce.",
        directives: [
          "Spices exceeding 0.01 mg/kg residue limits will be rejected at export points.",
          "Compulsory batch sampling of Cardamom, Cumin, and Turmeric at regional labs.",
          "All organic farm claims must be supported by active NPOP certificates."
        ]
      }
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      
      {/* Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-[#31572c]/10 text-[#31572c] rounded-xl mt-1 shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Policy & Regulation Updates</h1>
            <p className="text-sm text-slate-500 mt-1">
              Timeline of state and central agricultural governance
            </p>
          </div>
        </div>
      </div>

      {/* Main Single Column Card Container */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Vertical Timeline Pipeline */}
        <div className="relative pl-4 sm:pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            return (
              <div key={policy.id} className={`relative mb-12 last:mb-0 group`}>
                
                {/* Timeline Dot / Icon Anchor */}
                <div className={`absolute -left-[19px] sm:-left-[23px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white ${policy.dotColor} shadow-sm z-10 transition-transform group-hover:scale-110`}>
                  {/* Outer circle decoration */}
                </div>

                <div className="ml-6 sm:ml-8">
                  {/* Date & Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="text-xs font-extrabold text-[#31572c] tracking-tight">{policy.date}</span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    
                    {/* Badge 1: Scope */}
                    <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase border border-slate-200">
                      {policy.tag}
                    </span>
                    
                    {/* Badge 2: Impact */}
                    <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 uppercase border border-amber-100">
                      {policy.impact}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors mb-2">
                    {policy.title}
                  </h3>

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 max-w-3xl">
                    {policy.description}
                  </p>

                  {/* Action Link Trigger */}
                  <button 
                    onClick={() => setSelectedPolicy(policy)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                  >
                    <span>View Official Gazette</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Gazette Bulletin Summary Drawer */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end z-50 animate-fadeIn">
          {/* Overlay Click Close */}
          <div className="absolute inset-0" onClick={() => setSelectedPolicy(null)} />
          
          <div className="bg-white h-full max-w-2xl w-full border-l border-slate-100 shadow-2xl relative z-10 flex flex-col justify-between animate-slideOver">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Official Gazette Bureau
                </span>
              </div>
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Content Box */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/50">
              
              {/* Gazette Document Wrapper */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden font-sans">
                
                {/* Government Watermark / Emblem Line */}
                <div className="text-center pb-6 border-b border-double border-slate-300">
                  <div className="text-[10px] tracking-widest font-black uppercase text-slate-400 mb-1">
                    THE GAZETTE OF INDIA / भारत का राजपत्र
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    EXTRAORDINARY / असाधारण
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                    PUBLISHED BY AUTHORITY / प्राधिकार से प्रकाशित
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Origin */}
                  <div className="text-center space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900 uppercase">
                      {selectedPolicy.gazetteMeta.ministry}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedPolicy.gazetteMeta.department}
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Ref No: {selectedPolicy.gazetteMeta.refNo}
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 my-4" />

                  {/* Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase block">
                      Subject Notification
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedPolicy.title}
                    </h3>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 my-4">
                    {selectedPolicy.gazetteMeta.details.map((detail, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-wider">
                          {detail.label}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Background Info */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
                      1. PREAMBLE & STATEMENT OF OBJECTIVES
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedPolicy.gazetteMeta.background}
                    </p>
                  </div>

                  {/* Directives / Mandates */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
                      2. LEGISLATIVE DIRECTIVES & MANDATES
                    </span>
                    <ul className="space-y-2">
                      {selectedPolicy.gazetteMeta.directives.map((directive, index) => (
                        <li key={index} className="flex gap-2 text-xs text-slate-600 items-start">
                          <span className="font-bold text-emerald-800 shrink-0 mt-0.5">{index + 1}.</span>
                          <span className="leading-relaxed">{directive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sign off */}
                  <div className="pt-8 text-right space-y-1">
                    <p className="text-xs font-extrabold text-slate-800">
                      By Order of the President,
                    </p>
                    <p className="text-xs font-bold text-slate-900 italic">
                      {selectedPolicy.gazetteMeta.signedBy}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold">
                      Authenticated Electronic Record
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Actions bar */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Simulating PDF Download...')}
                  className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-2xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
              </div>
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="bg-[#31572c] hover:bg-[#1a3018] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-xs"
              >
                Acknowledge
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
