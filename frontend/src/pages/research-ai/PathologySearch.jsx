import React, { useState, useRef } from 'react';
import { 
  Microscope, 
  ShieldAlert, 
  ScanLine, 
  FlaskConical,
  UploadCloud,
  Dna,
  Eye,
  Activity,
  Loader2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function PathologySearch() {
  const fileInputRef = useRef(null);

  // States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diseases, setDiseases] = useState([
    {
      id: 'wheat-rust',
      name: "Wheat Rust (Puccinia triticina)",
      type: "FUNGAL PATHOGEN",
      severity: "HIGH",
      confidence: "AI 98.5%",
      symptoms: "Orange-brown pustules on leaf surface, reduced grain size.",
      treatment: "Apply Propiconazole 25% EC at 0.1% concentration.",
      image: "https://images.unsplash.com/photo-1628189851614-2c6b4121a1f1?auto=format&fit=crop&q=80&w=400&h=250",
      severityClass: "bg-amber-500 text-white"
    },
    {
      id: 'rice-blast',
      name: "Rice Blast (Magnaporthe oryzae)",
      type: "FUNGAL PATHOGEN",
      severity: "CRITICAL",
      confidence: "AI 96.2%",
      symptoms: "Spindle-shaped spots with grey center and brown margin.",
      treatment: "Tricyclazole 75% WP @ 300g/ha in 500L water.",
      image: "https://images.unsplash.com/photo-1595183842188-466db357a79d?auto=format&fit=crop&q=80&w=400&h=250",
      severityClass: "bg-rose-600 text-white"
    },
    {
      id: 'cotton-curl',
      name: "Cotton Leaf Curl Virus",
      type: "VIRAL PATHOGEN",
      severity: "HIGH",
      confidence: "AI 94.8%",
      symptoms: "Upward curling of leaves, thickened veins, stunted growth.",
      treatment: "Control whitefly vector using Imidacloprid. Uproot infected plants.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=400&h=250",
      severityClass: "bg-amber-500 text-white"
    }
  ]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsAnalyzing(true);
      
      // Simulate image analysis latency
      setTimeout(() => {
        setIsAnalyzing(false);
        
        // Add a newly analyzed leaf disease item to the vault
        const newlyAnalyzedDisease = {
          id: `analyzed-${Date.now()}`,
          name: "Late Blight of Potato (Phytophthora infestans)",
          type: "OOMYCETE PATHOGEN",
          severity: "CRITICAL",
          confidence: "AI 93.4% (Analyzed)",
          symptoms: "Water-soaked dark spots on leaves turning blackish. Fuzzy white mold underneath in humid conditions.",
          treatment: "Spray Metalaxyl 8% + Mancozeb 64% @ 2g/L of water. Ensure crop sanitation.",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400&h=250",
          severityClass: "bg-rose-600 text-white animate-pulse"
        };
        
        setDiseases((prev) => [newlyAnalyzedDisease, ...prev]);
      }, 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* 1. Page Header & Visual Upload Hook */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-[#31572c]/10 rounded-xl">
            <Microscope className="h-6 w-6 text-[#31572c]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">Crop Pathology Database</h1>
            <p className="text-sm text-gray-500">AI-powered visual identification and chemical control repository</p>
          </div>
        </div>
        
        <button 
          onClick={handleUploadClick}
          disabled={isAnalyzing}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            isAnalyzing 
              ? 'bg-[#31572c]/75 text-white cursor-not-allowed' 
              : 'bg-[#31572c] hover:bg-[#1a3018] text-white active:scale-[0.98]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing Cellular Map...</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4" />
              <span>Upload Leaf Image</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Top Info Alert Banner (contextual help) */}
      {isAnalyzing && (
        <div className="bg-[#31572c]/5 border border-[#31572c]/10 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-[#31572c] animate-pulse">
          <Dna className="h-5 w-5 text-[#31572c] animate-spin" />
          <div>
            <span className="font-bold">Neural Net Engine active:</span> Running segmentation and leaf spot density algorithms on the uploaded image. Please stand by...
          </div>
        </div>
      )}

      {/* 3. Disease catalog responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases.map((disease) => (
          <div 
            key={disease.id} 
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            {/* Top Preview Image Canvas */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={disease.image} 
                alt={disease.name}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              
              {/* Absolute Badge Severity (Top-Left) */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider shadow-xs ${disease.severityClass}`}>
                  {disease.severity}
                </span>
              </div>

              {/* Absolute Badge Confidence (Top-Right) */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20 shadow-xs flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#31572c]" />
                <span className="text-[9px] font-black text-gray-900 tracking-wider uppercase">{disease.confidence}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">{disease.type}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#31572c] transition-colors">{disease.name}</h3>
              </div>

              <div className="space-y-3">
                {/* Visual Symptoms box with soft slate background */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <h4 className="text-[9px] font-black uppercase text-gray-400 flex items-center gap-1.5 mb-1.5 tracking-wider">
                    <Eye className="h-3.5 w-3.5 text-gray-400" />
                    <span>VISUAL SYMPTOMS</span>
                  </h4>
                  <p className="text-[11px] text-gray-650 leading-relaxed font-medium">
                    {disease.symptoms}
                  </p>
                </div>

                {/* Recommended Control box with subtle green tint and high contrast text */}
                <div className="bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/50">
                  <h4 className="text-[9px] font-black uppercase text-emerald-800 flex items-center gap-1.5 mb-1.5 tracking-wider">
                    <FlaskConical className="h-3.5 w-3.5 text-emerald-700" />
                    <span>RECOMMENDED CONTROL</span>
                  </h4>
                  <p className="text-[11px] text-emerald-950 leading-relaxed font-extrabold">
                    {disease.treatment}
                  </p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
