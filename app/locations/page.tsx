import React from 'react';

/**
 * STAGE 3: LOCALIZED URGENCY - PHOENIX URGENT CARE FINDER
 * 
 * Purpose: This page demonstrates geolocation and real-time utility.
 * Scenario: Visitor from Phoenix is looking for immediate care.
 * DXP Value: Dynamic surfacing of wait times and location-specific clinics.
 */

// --- Inline Icons ---
const Icon = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);

const MapPinIcon = (p) => <Icon {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></Icon>;
const ClockIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
const ChevronRightIcon = (p) => <Icon {...p} strokeWidth="3"><path d="m9 18 6-6-6-6"/></Icon>;
const PhoneIcon = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;

const UrgentCareFinder = () => {
  const locations = [
    { name: "Banner Urgent Care - Phoenix (7th St)", address: "4201 N 7th St, Phoenix, AZ 85014", wait: "12 min", status: "Open until 9:00 PM" },
    { name: "Banner Urgent Care - Phoenix (Thomas Rd)", address: "2025 W Thomas Rd, Phoenix, AZ 85015", wait: "5 min", status: "Open until 9:00 PM" },
    { name: "Banner Urgent Care - Arcadia", address: "3801 E Indian School Rd, Phoenix, AZ 85018", wait: "25 min", status: "Open until 9:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 antialiased font-sans">
      {/* Simulation Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-green-600 text-white text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-green-400">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        Scenario Step 3: Location Signal (Phoenix, AZ)
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="container mx-auto px-12 flex justify-between items-center">
          <div className="navbar-brand branding flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/banner-logo.svg" alt="Banner Health" className="h-8 w-auto" />
            <span className="text-2xl font-serif font-normal text-blue-600 italic lowercase border-l border-slate-200 pl-3">Urgent Care</span>
          </div>
          <button className="text-[#00205C] font-bold text-sm hover:underline uppercase tracking-widest lowercase italic">Back to BannerHealth.com</button>
        </div>
      </header>

      {/* Map/Search Toggle Area */}
      <div className="bg-[#00205C] text-white py-12">
        <div className="container mx-auto px-12">
           <h1 className="text-4xl font-serif font-bold mb-8 lowercase uppercase italic not-italic">Urgent Care Near You</h1>
           <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="flex-grow relative">
                 <input 
                   type="text" 
                   defaultValue="Phoenix, AZ" 
                   className="w-full bg-white text-slate-900 px-6 py-4 rounded-xl font-medium focus:ring-4 focus:ring-yellow-400 outline-none" 
                 />
                 <MapPinIcon size={20} className="absolute right-4 top-4 text-blue-600" />
              </div>
              <button className="bg-[#FFD100] text-[#00205C] px-10 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-colors uppercase italic not-italic">Update Location</button>
           </div>
        </div>
      </div>

      {/* Main Content: Split List/Map */}
      <main className="container mx-auto px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Location List */}
        <div className="lg:col-span-5 space-y-6">
           <div className="flex justify-between items-center mb-8">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">{locations.length} Locations Found</span>
              <select className="bg-transparent border-none text-[#00205C] font-bold text-xs uppercase cursor-pointer outline-none">
                 <option>Sort by Distance</option>
                 <option>Sort by Wait Time</option>
              </select>
           </div>

           {locations.map((loc, i) => (
             <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#FFD100] transition-all group cursor-pointer relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                   <div className="max-w-[70%]">
                      <h3 className="text-xl font-bold text-[#00205C] mb-2">{loc.name}</h3>
                      <p className="text-slate-500 text-sm font-medium lowercase italic leading-relaxed">{loc.address}</p>
                   </div>
                   <div className="text-right">
                      <div className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-green-100 mb-2">
                         {loc.wait} Wait
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{loc.status}</p>
                   </div>
                </div>
                <div className="flex gap-4 pt-6 border-t border-slate-50">
                   <button className="flex-grow bg-[#00205C] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors">Schedule Online</button>
                   <button className="w-12 h-12 border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <PhoneIcon size={18} className="text-[#00205C]" />
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-7 bg-slate-200 rounded-[40px] relative overflow-hidden shadow-inner border border-slate-300 h-[600px] lg:h-auto">
           <div className="absolute inset-0 opacity-40 grayscale">
              {/* This represents a static map image or canvas */}
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1" className="w-full h-full object-cover" alt="Map View" />
           </div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md px-10 py-6 rounded-full border border-white shadow-xl flex items-center gap-4">
                 <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping" />
                 <span className="text-[#00205C] font-black uppercase tracking-widest text-sm">Real-Time Map Data Loading...</span>
              </div>
           </div>
           
           {/* Custom Map Pins Simulation */}
           <div className="absolute top-1/3 left-1/2 w-10 h-10 bg-[#FFD100] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00205C] rounded-full" />
           </div>
           <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-[#00205C] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FFD100] rounded-full" />
           </div>
        </div>
      </main>

      {/* Trust Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-12 text-center">
           <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Patient Choice Award Winner</p>
           <h2 className="text-2xl font-serif font-bold text-[#00205C]">Trusted Care, Closer to Home.</h2>
        </div>
      </footer>
    </div>
  );
};

export default UrgentCareFinder;