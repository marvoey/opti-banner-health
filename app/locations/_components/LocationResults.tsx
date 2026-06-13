import { Phone } from 'lucide-react';

const LocationResults = () => {
  const locations = [
    { name: "Banner Urgent Care - Phoenix (7th St)", address: "4201 N 7th St, Phoenix, AZ 85014", wait: "12 min", status: "Open until 9:00 PM" },
    { name: "Banner Urgent Care - Phoenix (Thomas Rd)", address: "2025 W Thomas Rd, Phoenix, AZ 85015", wait: "5 min", status: "Open until 9:00 PM" },
    { name: "Banner Urgent Care - Arcadia", address: "3801 E Indian School Rd, Phoenix, AZ 85018", wait: "25 min", status: "Open until 9:00 PM" },
  ];

  return (
    <main className="container mx-auto px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12" data-cms-component="LocationResults">
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
                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{loc.address}</p>
              </div>
              <div className="text-right">
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-green-100 mb-2">
                  {loc.wait} Wait
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{loc.status}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-50">
              <button className="flex-grow bg-[#00205C] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors">Schedule Online</button>
              <button className="w-12 h-12 border-2 border-slate-100 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Phone size={18} className="text-[#00205C]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="lg:col-span-7 bg-slate-200 rounded-[40px] relative overflow-hidden shadow-inner border border-slate-300 h-[600px] lg:h-auto">
        <div className="absolute inset-0 opacity-40 grayscale">
          {/* This represents a static map image or canvas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
  );
};

export default LocationResults;
