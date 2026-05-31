import React, { useState } from 'react';
import { Search, Send, FileText, Database, BookOpen, Quote, ChevronRight } from 'lucide-react';

export default function RagEngine() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    
    setIsSearching(true);
    // Mock RAG response
    setTimeout(() => {
      setResults([
        {
          id: 1,
          text: "For optimal wheat yields in semi-arid regions of Haryana, the application of nitrogenous fertilizers should be split into three stages: basal dressing (20%), maximum tillering (40%), and late jointing (40%).",
          source: "ICAR Wheat Guidelines 2024",
          page: 42,
          relevance: 98
        },
        {
          id: 2,
          text: "Recent trials show that replacing urea with nano-urea at the tillering stage reduces overall nitrogen runoff by 30% without negatively impacting the final grain weight.",
          source: "Journal of Indian Agronomy, Vol. 65",
          page: 112,
          relevance: 85
        }
      ]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="p-2 bg-[#31572c]/10 rounded-lg">
          <Database className="h-6 w-6 text-[#31572c]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950">RAG Knowledge Engine</h1>
          <p className="text-sm text-gray-500">Query across 10,000+ indexed agricultural white papers and ICAR journals.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#31572c]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., 'What is the optimal nitrogen split for wheat in Haryana?'"
            className="w-full pl-12 pr-16 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#31572c]/10 focus:border-[#31572c] focus:bg-white outline-none transition-all shadow-inner"
          />
          <button 
            type="submit" 
            disabled={isSearching || !query}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#31572c] text-white rounded-xl hover:bg-[#1a3018] transition-colors disabled:opacity-50 shadow-md"
          >
            {isSearching ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>

        {/* Results Area */}
        <div className="space-y-6">
          {results.length === 0 && !isSearching ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-bold">Vector Database is Ready</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-2">Enter a semantic query above to extract exact passages from our certified agricultural document corpus.</p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200" onClick={() => setQuery("Best practices for direct seeded rice")}>"Best practices for direct seeded rice"</span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200" onClick={() => setQuery("Fall armyworm chemical control")}>"Fall armyworm chemical control"</span>
              </div>
            </div>
          ) : isSearching ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-2xl p-6 h-32 border border-gray-100"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Extracted Passages (Semantic Match)</h3>
              
              {results.map((result) => (
                <div key={result.id} className="group p-5 bg-white border border-gray-200 rounded-2xl hover:border-[#31572c] hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#31572c] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-start gap-4">
                    <Quote className="h-5 w-5 text-gray-300 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">
                        {/* Highlight query terms mock */}
                        {result.text.split(/(nitrogen|wheat|Haryana)/i).map((part, i) => 
                          /nitrogen|wheat|Haryana/i.test(part) ? <mark key={i} className="bg-emerald-100 text-emerald-900 px-1 rounded">{part}</mark> : part
                        )}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                          <FileText className="h-3.5 w-3.5 text-[#31572c]" /> {result.source}
                        </span>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                          Page {result.page}
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Score: {result.relevance}%</span>
                          <button className="h-7 w-7 flex items-center justify-center bg-gray-50 border border-gray-200 rounded hover:bg-[#31572c] hover:text-white transition-colors group/btn">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
