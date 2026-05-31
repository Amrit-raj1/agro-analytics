import React, { useState } from 'react';
import { 
  BookOpen, 
  Folder, 
  FileText, 
  Download, 
  X,
  ChevronRight,
  Info,
  CheckCircle,
  Loader2,
  Bookmark
} from 'lucide-react';

export default function KnowledgeBase() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    {
      id: "soil",
      title: "Soil Health & Management",
      count: "24 Articles",
      color: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-700",
      articles: [
        { 
          id: "npk", 
          title: "Understanding NPK Ratios", 
          downloadable: true,
          content: `### Understanding NPK Ratios in Crop Management

Nitrogen (N), Phosphorus (P), and Potassium (K) are the three primary macronutrients required by agricultural crops for healthy development.

#### 1. Nutrient Functions
- **Nitrogen (N)**: Promotes vigorous leaf and stem vegetative growth. Essential for chlorophyll synthesis.
- **Phosphorus (P)**: Stimulates early root development, seed formatting, and flowering.
- **Potassium (K)**: Increases disease resistance, water-use efficiency, and crop quality metrics.

#### 2. Standard Recommended Ratios (Crop-Specific)
- **Paddy Rice**: 4:2:1 (N:P:K) for early monsoon transplantation.
- **Wheat (Kharif/Rabi transition)**: 4:2:1 standard buffer ratios depending on soil health card analysis.
- **Vegetables (Leafy)**: Requires higher Nitrogen (e.g., 3:1:2 ratio).

#### 3. Corrective Measures
Before chemical applications, measure electrical conductivity and organic carbon values to prevent salt toxicity.`,
          guideMeta: "APEDA Guide Vol. 2 (1.2 MB PDF)"
        },
        { 
          id: "compost", 
          title: "Composting Techniques", 
          downloadable: false,
          content: `### Composting Techniques for Organic Farming

Recycling agricultural organic waste improves soil organic carbon, moisture retention, and micro-fauna populations.

#### 1. Aerobic Compost Pits
- Excavate a pit sized 3m x 2m x 1m in a shaded area.
- Layer carbon-rich dry residue (straw, husk) with nitrogen-rich green matter (weeds, cow dung).
- Turn the compost pile every 15 days to ensure proper aeration and oxygen flow.

#### 2. Vermicomposting
- Deploy Eisenia fetida (red earthworms) in organic waste beds.
- Maintain moisture index at 60-70% and temperatures below 30°C.
- Produces high-grade castings rich in humic acids within 45-60 days.`,
          guideMeta: "ICAR Extension Bulletin 14"
        },
        { 
          id: "acidity", 
          title: "Correcting Soil Acidity", 
          downloadable: false,
          content: `### Correcting Soil Acidity and pH Corrections

Soil pH levels below 5.5 restrict nutrient uptake, causing aluminum toxicity and phosphorus lockup.

#### 1. Remediation Methods
- **Agricultural Lime (CaCO3)**: Standard application for acidic sandy clay soils.
- **Dolomite Lime**: Adds magnesium along with calcium carbonate.
- **Wood Ash**: Provides quick neutralizing capability but must be monitored closely.

#### 2. Application Timing
Incorporate amendments 2-3 months prior to sowing, allowing chemical interaction with soil moisture.`,
          guideMeta: "Soil Science Dept, PAU"
        }
      ],
      extraArticles: [
        { id: "soil-4", title: "Micro-Nutrient Application Guide", downloadable: true, content: "Details on Zinc, Iron, and Boron deficiency correctors." },
        { id: "soil-5", title: "Green Manuring with Dhaincha", downloadable: false, content: "Sowing Sesbania aculeata to fix atmospheric Nitrogen." },
        { id: "soil-6", title: "Salinity Reclamation Methods", downloadable: false, content: "Gypsum application protocols for sodic soils." }
      ]
    },
    {
      id: "pest",
      title: "Pest & Disease Control",
      count: "45 Articles",
      color: "bg-rose-50 border-rose-100",
      iconColor: "text-rose-700",
      articles: [
        { 
          id: "armyworm", 
          title: "Fall Armyworm Management", 
          downloadable: true,
          content: `### Fall Armyworm (FAW) Management in Maize Crops

Spodoptera frugiperda represents a highly destructive pest affecting maize crop cycles across India.

#### 1. Early Detection Anomaly
- Check crop leaf whorls for 'window pane' damage.
- Inspect fields during early morning or late evening when larvae are active.

#### 2. Integrated Pest Management (IPM)
- **Biological**: Deploy Trichogramma parasitoid wasps or spray Bacillus thuringiensis formulations.
- **Chemical**: Use Azadirachtin (Neem Oil) or recommended chemical formulations at economic threshold levels (ETL > 10% damage).`,
          guideMeta: "National Institute of Plant Health (1.8 MB PDF)"
        },
        { 
          id: "rust", 
          title: "Identifying Wheat Rust", 
          downloadable: false,
          content: `### Identifying and Managing Wheat Rust Fungi

Wheat rust causes massive crop failure if left uncontrolled in northern crop corridors.

#### 1. Classification
- **Yellow/Stripe Rust (Puccinia striiformis)**: Orange-yellow pustules arranged in parallel lines on leaves.
- **Brown/Leaf Rust**: Scattered brown circular pustules.
- **Black/Stem Rust**: Large dark reddish-brown pustules on stems and leaf sheaths.

#### 2. Control Protocols
Sow rust-resistant wheat seed varieties certified by ICAR. Spray Propiconazole at first visual detection.`,
          guideMeta: "Wheat Pathology Hub"
        },
        { 
          id: "pesticide", 
          title: "Organic Pesticide Recipes", 
          downloadable: false,
          content: `### Organic Pesticide Recipes for Smallholders

Utilizing natural extracts controls chewing and sucking pests without chemical residue.

#### 1. Neem Seed Kernel Extract (NSKE 5%)
- Soak 5kg neem seed kernel powder in 100 liters of water overnight.
- Filter and add 200g of soap powder as an emulsifier.
- Spray immediately on cotton or vegetable crops.

#### 2. Dashparni Arka
- Ferment extracts from 10 regional leaves (Neem, Papaya, Castor, etc.) with cow urine.
- Matures in 30 days. Dilute 2.5 liters in 100 liters of water.`,
          guideMeta: "NPOP Organic Manual"
        }
      ],
      extraArticles: [
        { id: "pest-4", title: "Whitefly Management in Cotton", downloadable: true, content: "Yellow sticky trap layouts and early chemical deterrents." },
        { id: "pest-5", title: "Bacterial Leaf Blight of Paddy", downloadable: false, content: "Symptom tracking and copper hydroxide applications." },
        { id: "pest-6", title: "Storage Pest Control Guidelines", downloadable: false, content: "Herbal repellents for grain preservation." }
      ]
    },
    {
      id: "irrigation",
      title: "Modern Irrigation",
      count: "18 Articles",
      color: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-700",
      articles: [
        { 
          id: "drip", 
          title: "Setting up Drip Lines", 
          downloadable: true,
          content: `### Setting up Drip Lines for Horticulture Crops

Precision watering reduces moisture stress and optimizes localized fertilizer applications.

#### 1. Basic Component Check
- Mainline & Submain Pipe layouts (PVC/HDPE).
- Screen or Disc Filters to prevent emitter clogging.
- Venturi injection system for direct liquid fertilization (fertigation).

#### 2. Emitter Placement
Place drippers 30-50 cm apart matching crop root zone canopy parameters. Keep pressure at 1.0 - 1.5 kg/cm².`,
          guideMeta: "Micro-Irrigation Handbook (2.1 MB PDF)"
        },
        { 
          id: "harvest", 
          title: "Rainwater Harvesting", 
          downloadable: false,
          content: `### Rainwater Harvesting for Dryland Agriculture

Securing runoff rainfall supplies critical micro-irrigation windows during dry weather spells.

#### 1. Farm Pond Design
- Construct ponds sized 20m x 20m x 3m with sloping walls.
- Line with 500-micron LDPE geomembrane to stop seepage.
- Build silt trap basins at inlet nodes.

#### 2. Rooftop Systems
Direct rainfall runoff from warehouse rooftops into closed storage wells.`,
          guideMeta: "Dryland Research Institute"
        },
        { 
          id: "pump", 
          title: "Pump Maintenance", 
          downloadable: false,
          content: `### Submersible Pump Maintenance Guidelines

Preventing electrical burnouts and dry-run damage on agricultural tubewell pumps.

#### 1. Preventive Actions
- Install auto-cut starters and single-phase prevention relays.
- Keep voltage fluctuations stabilized.
- Lubricate pump motor bearings annually.

#### 2. Troubleshooting Clogging
If output pressure drops, check check-valves and clean sandy deposit blockages at suction grids.`,
          guideMeta: "State Agri-Engg Dept"
        }
      ],
      extraArticles: [
        { id: "irr-4", title: "Solar Pump Configuration Guide", downloadable: true, content: "Panel capacity calculators and variable frequency drive tuning." },
        { id: "irr-5", title: "Sprinkler Layout Calculations", downloadable: false, content: "Wetted radius charts for wheat and mustard fields." },
        { id: "irr-6", title: "Soil Moisture Sensor Setup", downloadable: false, content: "Deploying tensiometers for scheduled watering." }
      ]
    },
    {
      id: "storage",
      title: "Post-Harvest Storage",
      count: "12 Articles",
      color: "bg-emerald-50 border-emerald-100",
      iconColor: "text-emerald-700",
      articles: [
        { 
          id: "silo", 
          title: "Silo Temperature Control", 
          downloadable: true,
          content: `### Silo Temperature Control and Preservation

Maintaining storage temperature blocks insect activity and grain respiration.

#### 1. Critical Thresholds
- Maintain grain temperatures below 15°C for storage.
- If temperatures rise above 20°C, run aeration fans immediately.

#### 2. Aeration Control
Operate exhaust fans during dry atmospheric humidity cycles. Avoid running fans during wet rain spells to prevent grain swelling.`,
          guideMeta: "FCI Storage Protocols (900 KB PDF)"
        },
        { 
          id: "weevil", 
          title: "Preventing Weevil Infestation", 
          downloadable: false,
          content: `### Preventing Weevil Infestation in Warehouses

Sitophilus oryzae (Rice Weevil) destroys stored cereal grains if warehouse hygiene protocols are ignored.

#### 1. Warehouse Sanitation
- Vacuum or sweep dust from floor crevices and wall cracks before stacking.
- Hermetic bags or gas-tight silos prevent weevil oxygen supply.

#### 2. Fumigation Guidelines
Deploy recommended organic or chemical deterrents at secure airtight ports.`,
          guideMeta: "Post-Harvest Technology Dept"
        },
        { 
          id: "moisture", 
          title: "Moisture Monitoring", 
          downloadable: false,
          content: `### Moisture Monitoring in Stored Grains

Excess moisture results in mold formations, aflatoxin build-up, and localized seed germination failures.

#### 1. Recommended Safe Levels
- **Paddy**: 13-14% moisture ceiling.
- **Wheat**: 12% moisture ceiling.
- **Soybean**: 11% moisture ceiling.

#### 2. Testing Method
Perform handheld digital moisture meter tests on representative batch samples.`,
          guideMeta: "APEDA Storage Manual"
        }
      ],
      extraArticles: [
        { id: "store-4", title: "Hermetic Bag Storage Guidelines", downloadable: true, content: "Sealing techniques and plastic thickness requirements." },
        { id: "store-5", title: "Cold Storage Chain Outlines", downloadable: false, content: "Relative humidity metrics for horticultural perishables." },
        { id: "store-6", title: "Rat Proofing Warehouses", downloadable: false, content: "Silo structural modifications and bait protocols." }
      ]
    }
  ];

  const handleDownload = (e, artId, title) => {
    e.stopPropagation(); // Prevent opening slide drawer
    setDownloadingId(artId);
    
    // Simulate API delay
    setTimeout(() => {
      setDownloadingId(null);
      setShowToast(`Successfully downloaded "${title}"`);
      setTimeout(() => setShowToast(null), 3000);
    }, 1500);
  };

  const toggleCategoryExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn antialiased relative">
      
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold font-sans">{showToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start space-x-4 z-10">
          <div className="p-3 bg-[#31572c]/10 text-[#31572c] rounded-xl mt-1 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Agri-Knowledge Base</h1>
            <p className="text-sm text-slate-500 mt-1">
              Curated guides and best practices for modern farming
            </p>
          </div>
        </div>
      </div>

      {/* 2x2 Responsive Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const isExpanded = expandedCategories[cat.id];
          const activeArticles = isExpanded 
            ? [...cat.articles, ...cat.extraArticles] 
            : cat.articles;

          return (
            <div 
              key={cat.id} 
              className="bg-white border border-slate-150 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-all group flex flex-col justify-between h-fit"
            >
              <div>
                {/* Card Title & Directory stats */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl border ${cat.color}`}>
                      <Folder className={`h-6 w-6 ${cat.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {cat.title}
                      </h2>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">
                        {cat.count}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Nodes List */}
                <div className="space-y-2.5">
                  {activeArticles.map((art) => {
                    const isNpk = art.id === 'npk';
                    return (
                      <div 
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group/item ${
                          isNpk 
                          ? 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300' 
                          : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-150'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className={`w-4 h-4 shrink-0 ${isNpk ? 'text-emerald-850' : 'text-slate-400'}`} />
                          <span className={`text-xs font-bold truncate ${isNpk ? 'text-slate-900' : 'text-slate-650'}`}>
                            {art.title}
                          </span>
                        </div>

                        {art.downloadable && (
                          <button
                            onClick={(e) => handleDownload(e, art.id, art.title)}
                            disabled={downloadingId !== null}
                            className="p-1 text-slate-400 hover:text-emerald-800 rounded hover:bg-white transition-all disabled:opacity-50"
                          >
                            {downloadingId === art.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Download className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* View All Topics Expansion Trigger */}
              <div className="mt-5 pt-3 border-t border-slate-50">
                <button 
                  onClick={() => toggleCategoryExpand(cat.id)}
                  className="w-full text-center text-xs font-extrabold text-emerald-850 hover:text-emerald-950 py-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all flex items-center justify-center gap-1"
                >
                  <span>{isExpanded ? "Collapse Topics" : "View All Topics"}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sliding Side Article Reader Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end z-50 animate-fadeIn">
          {/* Overlay Click Close */}
          <div className="absolute inset-0" onClick={() => setSelectedArticle(null)} />
          
          <div className="bg-white h-full max-w-xl w-full border-l border-slate-100 shadow-2xl relative z-10 flex flex-col justify-between p-6 sm:p-8 animate-slideOver">
            
            <div>
              {/* Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-850 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                  Agri-Knowledge Document
                </span>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Article Headline Header */}
              <div className="mb-5 space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 leading-snug">{selectedArticle.title}</h3>
                {selectedArticle.guideMeta && (
                  <span className="text-[10px] text-slate-450 font-bold block">{selectedArticle.guideMeta}</span>
                )}
              </div>

              {/* Scrollable Document Body */}
              <div className="prose prose-sm max-h-[62vh] overflow-y-auto pr-2 space-y-4 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedArticle.content ? (
                  // Mock rich markdown translation formatting
                  <div className="space-y-4">
                    {selectedArticle.content.split('\n\n').map((para, pIdx) => {
                      if (para.startsWith('###')) {
                        return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-1 pt-2">{para.replace('### ', '')}</h3>;
                      }
                      if (para.startsWith('####')) {
                        return <h4 key={pIdx} className="text-sm font-bold text-slate-800 pt-1">{para.replace('#### ', '')}</h4>;
                      }
                      if (para.startsWith('-')) {
                        return (
                          <ul key={pIdx} className="list-disc pl-5 space-y-1.5">
                            {para.split('\n').map((li, lIdx) => (
                              <li key={lIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {li.replace('- ', '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx} className="text-slate-650 leading-relaxed">{para}</p>;
                    })}
                  </div>
                ) : (
                  <p className="italic text-slate-400">Content loading from extension storage node...</p>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Bookmark Article</span>
              </span>
              
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-[#31572c] hover:bg-[#1a3018] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-xs"
              >
                Close Document
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
