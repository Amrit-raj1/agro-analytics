export const getCommodityExports = async (req, res) => {
  try {
    const exportData = [
      { month: 'Jan 2026', volume: 380, price: 1050, category: 'Basmati Rice' },
      { month: 'Feb 2026', volume: 410, price: 1080, category: 'Basmati Rice' },
      { month: 'Mar 2026', volume: 450, price: 1110, category: 'Basmati Rice' },
      { month: 'Apr 2026', volume: 390, price: 1150, category: 'Basmati Rice' },
      { month: 'May 2026', volume: 420, price: 1130, category: 'Basmati Rice' },
      { month: 'Jun 2026', volume: 440, price: 1170, category: 'Basmati Rice' }
    ];
    res.json({ success: true, data: exportData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStateBudgets = async (req, res) => {
  try {
    const budgetData = [
      { name: 'PM-KISAN (Direct Benefit Transfer)', value: 63500, color: '#0f5132' },
      { name: 'Modified Interest Subvention Scheme (MISS)', value: 22600, color: '#31572c' },
      { name: 'Crop Insurance Scheme (PMFBY)', value: 12242, color: '#4f772d' },
      { name: 'Rashtriya Krishi Vikas Yojana (RKVY)', value: 8500, color: '#90a955' },
      { name: 'Krishonnati Yojana & Missions (Seeds/Pulses/Horticulture)', value: 8000, color: '#ecf39e' },
      { name: 'Other Allied Agri-Welfare Programs', value: 12448, color: '#6b7280' },
    ];

    const stateUtilization = [
      { state: 'Madhya Pradesh', utilized: 88, pending: 12, details: 'Funds deployed primarily to Solar Pump infrastructure, micro-irrigation, and post-harvest storage grants.' },
      { state: 'Maharashtra', utilized: 84, pending: 16, details: 'Investment focused on organic farming initiatives, cooling chains, and horticulture hubs in Nashik/Pune.' },
      { state: 'Uttar Pradesh', utilized: 79, pending: 21, details: 'Funds allocated to direct DBT input subsidies, canal irrigation networks, and grain warehouses.' },
      { state: 'Haryana', utilized: 76, pending: 24, details: 'Primary focus on crop residue management (Stubble burning prevention) and custom hiring centers.' },
      { state: 'Punjab', utilized: 72, pending: 28, details: 'Deployment towards water conservation structures, deep tube wells, and smart machinery subsidies.' }
    ];

    res.json({ success: true, data: { budgetData, stateUtilization } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMicrobiomeData = async (req, res) => {
  try {
    const radarData = [
      { subject: 'Nitrogen (N)', treated: 120, untreated: 65, fullMark: 150 },
      { subject: 'Phosphorus (P)', treated: 98, untreated: 40, fullMark: 150 },
      { subject: 'Potassium (K)', treated: 86, untreated: 70, fullMark: 150 },
      { subject: 'Organic Carbon', treated: 99, untreated: 30, fullMark: 150 },
      { subject: 'Microbial Mass', treated: 130, untreated: 50, fullMark: 150 },
      { subject: 'pH Balance', treated: 85, untreated: 85, fullMark: 150 },
      { subject: 'Zinc (Zn)', treated: 110, untreated: 45, fullMark: 150 },
      { subject: 'Iron (Fe)', treated: 95, untreated: 60, fullMark: 150 },
      { subject: 'Sulfur (S)', treated: 105, untreated: 55, fullMark: 150 },
    ];
    res.json({ success: true, data: radarData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVirtualTours = async (req, res) => {
  try {
    const tours = [
      {
        id: 1,
        title: "Precision Hydroponics Facility",
        location: "Gurugram, Haryana",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
        badge: "360° PANORAMA",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-100",
        metric: "Efficiency: +40% Water Saving",
        description: "Explore a state-of-the-art vertical hydroponic farming setup optimizing nutrient delivery loops for leafy greens."
      },
      {
        id: 2,
        title: "Polyhouse Automated Cultivation",
        location: "Pune, Maharashtra",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80",
        badge: "3D WALKTHROUGH",
        badgeColor: "bg-blue-50 text-blue-800 border-blue-100",
        metric: "Yield Factor: 3.5x Baseline",
        description: "Step inside an automated climate-controlled greenhouse featuring sensor-driven misting, shade sails, and drip line matrices."
      },
      {
        id: 3,
        title: "Solar-Powered Micro-Irrigation Orchard",
        location: "Alwar, Rajasthan",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80",
        badge: "DRONE OVERVIEW",
        badgeColor: "bg-amber-50 text-amber-800 border-amber-100",
        metric: "Power Source: 100% Off-Grid Solar",
        description: "Navigate an expansive citrus orchard utilizing integrated KUSUM solar pump stations paired with high-efficiency subsurface irrigation network topologies."
      }
    ];
    res.json({ success: true, data: tours });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
