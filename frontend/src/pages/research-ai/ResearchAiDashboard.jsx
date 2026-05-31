import React, { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  Search, 
  FileText, 
  Globe, 
  Brain, 
  Sparkles, 
  Plus, 
  ArrowRight,
  Send,
  Loader2,
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function ResearchAiDashboard() {
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // States
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      title: 'RAG Retrieval Core Initialized',
      text: 'Welcome to AgroIndia Pathology & Agronomic Research RAG. Upload any PDF agronomy circular or search our national directory. Ask me complex biological questions below.'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Summarize recommended treatments for Rice Bacterial Leaf Blight based on Indian Council of Agricultural Research guidelines.'
    },
    {
      id: 3,
      sender: 'rag',
      meta: 'Retrieved 2 documents (ICAR Bulletin 2024; Pathology Circular 18)',
      text: `According to the retrieved bulletins:
1. Spray Agrimycin-100 (0.05%) paired with Copper Oxychloride (0.3%) at first onset.
2. Avoid excess Nitrogen application (limit top dressing during humid weeks).
3. Implement immediate field drainage and secure 2.5cm dry period window.`
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Optimal Nitrogen Blends for Wheat Yields in Semi-Arid Soil",
      date: "May 2026",
      size: "4.2 MB",
      status: "INDEXED"
    },
    {
      id: 2,
      title: "Pathological Identification of Leaf Rust (Puccinia triticina) via CNNs",
      date: "April 2026",
      size: "8.1 MB",
      status: "INDEXED"
    },
    {
      id: 3,
      title: "Water Stagnation and Root Decay Tolerances in Oryza Sativa",
      date: "March 2026",
      size: "3.6 MB",
      status: "INDEXED"
    }
  ]);

  const [papersCount, setPapersCount] = useState(452);
  const [queriesCount, setQueriesCount] = useState(48);

  // Auto-scroll chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText.trim();
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: userMsg }
    ]);
    setInputText('');

    // Trigger AI semantic response sequence
    setIsTyping(true);
    setLoadingText('Parsing Knowledge Map...');
    setQueriesCount(q => q + 1);

    setTimeout(() => {
      setLoadingText('Querying Vector Index...');
      setTimeout(() => {
        setLoadingText('Synthesizing Academic Bulletins...');
        setTimeout(() => {
          // Generate a context-relevant mock response
          let responseText = '';
          let metaText = '';

          const queryLower = userMsg.toLowerCase();
          if (queryLower.includes('wheat') || queryLower.includes('rust')) {
            metaText = 'Retrieved 1 document (Pathological Identification of Leaf Rust)';
            responseText = `Based on the latest CNN pathology research:
1. Apply Triadimefon (0.1%) or Propiconazole (0.1%) immediately upon detection of rust pustules.
2. Plant resistant varieties such as HD-2967 or PBW-550 to mitigate outbreak vectors.
3. Keep nitrogen application balanced; excess soil nitrogen promotes Puccinia spore propagation.`;
          } else if (queryLower.includes('nitrogen') || queryLower.includes('soil')) {
            metaText = 'Retrieved 2 documents (Optimal Nitrogen Blends; Soil Microbiome Research)';
            responseText = `From the retrieved agronomy research:
1. Optimal split-application is 40% basal, 30% tillering, and 30% jointing stage.
2. Semi-arid soils benefit from paired organic manure (FYM) to improve Nitrogen Use Efficiency (NUE).
3. Consider slow-release neem-coated urea to minimize nitrate leaching into water tables.`;
          } else {
            metaText = 'Retrieved 3 search nodes (National Agri Database)';
            responseText = `Based on the retrieved agricultural directory documents:
1. Ensure crop rotations with leguminous varieties to boost natural nitrogen fixation.
2. Maintain clean drainage channels to prevent fungal and bacterial pathogen accumulation.
3. Consult localized state weather advisories before applying broad-spectrum foliar sprays.`;
          }

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'rag',
              meta: metaText,
              text: responseText
            }
          ]);
          setIsTyping(false);
        }, 1000);
      }, 800);
    }, 600);
  };

  // Mock PDF Uploader trigger
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Add to Indexed list
      const newPaper = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""), // remove extension
        date: "Today",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: "INDEXED"
      };

      setPapers((prev) => [newPaper, ...prev]);
      setPapersCount(p => p + 1);
      
      // Simulate indexing toast/alert in conversation log
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'system',
          title: 'Document Indexing Complete',
          text: `Successfully parsed and vector-indexed "${file.name}". Metadata catalog updated. 4.0 Million tokens ingested into GPT-4o semantic context.`
        }
      ]);
    }
  };

  const metrics = [
    {
      value: `${papersCount}+`,
      subtitle: "SCIENTIFIC DATABASE",
      label: "INDEXED PAPERS",
      color: "text-emerald-800 bg-emerald-50 border-emerald-100"
    },
    {
      value: "50 MB",
      subtitle: "MAX STORAGE CAPACITY",
      label: "PDF SIZE LIMIT",
      color: "text-[#31572c] bg-[#31572c]/10 border-[#31572c]/10"
    },
    {
      value: "12 Languages",
      subtitle: "BILINGUAL ENGINES",
      label: "TRANSLATION NODES",
      color: "text-blue-700 bg-blue-50 border-blue-100"
    },
    {
      value: `${queriesCount} queries`,
      subtitle: "OPTIMIZED RESPONSE",
      label: "RAG SEARCH LOGS",
      color: "text-amber-700 bg-amber-50 border-amber-100"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      {/* Hidden file input for mock uploader */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf"
      />

      {/* 1. Page Header matching template */}
      <div className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between">
        <div className="relative z-10 w-full md:w-2/3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-[#31572c] rounded-xl">
              <Leaf className="h-6 w-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950 flex items-baseline gap-2">
              <span>White Paper & Research AI</span>
              <span className="text-gray-300 font-light font-sans">|</span>
              <span className="text-[#31572c] font-bold text-sm md:text-base font-hindi">
                अनुसंधान एआई
              </span>
            </h1>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-3 max-w-xl leading-relaxed">
            Query deep academic research papers, crop pathology reports, and state bulletins via retrieval-augmented generation.
          </p>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-2xl border shadow-2xs flex flex-col justify-between space-y-2 hover:shadow-xs transition-shadow ${m.color.split(' ').slice(2).join(' ')}`}
          >
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
                {m.label}
              </span>
              <h4 className="text-gray-900 text-xl font-extrabold tracking-tight">
                {m.value}
              </h4>
            </div>
            <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${m.color.split(' ').slice(0, 2).join(' ')}`}>
              {m.subtitle}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Research split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Document RAG Engine - 7 columns */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[520px]">
          
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-4.5 w-4.5 text-[#31572c]" />
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
                DOCUMENT RAG ENGINE
              </span>
            </div>
            <span className="text-[10px] font-bold bg-[#31572c]/10 text-[#31572c] border border-[#31572c]/10 px-2 py-0.5 rounded-md">
              GPT-4o Deep Semantics
            </span>
          </div>

          {/* Chat Window */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar bubble */}
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-[10px] shadow-2xs ${
                  msg.sender === 'user' 
                    ? 'bg-slate-900 text-white' 
                    : msg.sender === 'system'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-[#31572c]/15 text-[#31572c]'
                }`}>
                  {msg.sender === 'user' ? 'USR' : msg.sender === 'system' ? 'SYS' : 'RAG'}
                </div>

                {/* Message body bubble */}
                <div className={`rounded-2xl p-4 max-w-[85%] border shadow-2xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : msg.sender === 'system'
                    ? 'bg-blue-50/50 border-blue-100 text-blue-900'
                    : 'bg-slate-50/80 border-slate-100 text-slate-700'
                }`}>
                  {msg.title && (
                    <h5 className="font-extrabold mb-1 flex items-center gap-1">
                      <Database className="h-3.5 w-3.5" /> {msg.title}
                    </h5>
                  )}
                  {msg.meta && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/70 px-2.5 py-0.5 rounded-md mb-2">
                      <Sparkles className="h-2.5 w-2.5" /> {msg.meta}
                    </span>
                  )}
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Simulated typing/loading state */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-xl bg-[#31572c]/15 text-[#31572c] flex items-center justify-center shrink-0 font-bold text-[10px] shadow-2xs">
                  RAG
                </div>
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex items-center gap-2.5 text-slate-500 font-medium">
                  <Loader2 className="h-4 w-4 animate-spin text-[#31572c]" />
                  <span>{loadingText}</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Query input panel */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Search research database or ask agricultural questions (e.g. 'Wheat rust', 'Nitrogen split')..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#31572c] focus:border-[#31572c] placeholder-gray-400"
            />
            <button 
              type="submit"
              disabled={isTyping || !inputText.trim()}
              className="p-3 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl shadow-xs transition-all flex items-center justify-center shrink-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={15} />
            </button>
          </form>
        </div>

        {/* Right Panel: Indexed Literature (Vault Reference System) - 4 columns */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-[520px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText size={14} className="text-[#31572c]" />
                <span>INDEXED LITERATURE</span>
              </h3>
              <button 
                onClick={handleUploadClick}
                className="p-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-100 rounded-lg text-slate-500 transition-all active:scale-[0.97]"
                title="Index Local PDF Document"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-slate-50/50 hover:bg-[#31572c]/5 border border-slate-200/50 p-3.5 rounded-xl flex flex-col justify-between hover:shadow-2xs cursor-default transition-all group border-l-3 border-l-emerald-800"
                >
                  <span className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-emerald-900 transition-colors">
                    {paper.title}
                  </span>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100/50">
                    <span className="text-[10px] font-bold text-gray-400">
                      {paper.date} • {paper.size}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/70">
                      {paper.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/55 p-3 rounded-2xl border border-emerald-100/60 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-emerald-800" />
              <span>Multi-lingual directory synced.</span>
            </span>
            <a href="/module/research-ai/translate" className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-0.5">
              Translate <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

