'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

type Location = {
  name: string;
  address: string;
  wait: number; // minutes
  status: string;
};

// Realistic per-location wait behaviour. Each clinic drifts around its own
// baseline so busier sites stay busy while quieter ones stay quiet.
const SEED: Location[] = [
  { name: "Banner Urgent Care - Phoenix (7th St)", address: "4201 N 7th St, Phoenix, AZ 85014", wait: 12, status: "Open until 9:00 PM" },
  { name: "Banner Urgent Care - Phoenix (Thomas Rd)", address: "2025 W Thomas Rd, Phoenix, AZ 85015", wait: 5, status: "Open until 9:00 PM" },
  { name: "Banner Urgent Care - Arcadia", address: "3801 E Indian School Rd, Phoenix, AZ 85018", wait: 25, status: "Open until 9:00 PM" },
];

const MIN_WAIT = 3;
const MAX_WAIT = 55;

// Nudge a wait time by a small, slightly mean-reverting amount so values feel
// like a live queue rather than a random walk that drifts off to the extremes.
const nextWait = (current: number, baseline: number) => {
  const pull = (baseline - current) * 0.15; // gentle reversion toward baseline
  const noise = Math.round((Math.random() - 0.5) * 6); // -3..+3 minutes
  const next = Math.round(current + pull + noise);
  return Math.max(MIN_WAIT, Math.min(MAX_WAIT, next));
};

const waitStyle = (wait: number) => {
  if (wait <= 10) return "bg-green-50 text-green-700 border-green-100";
  if (wait <= 25) return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-red-50 text-red-700 border-red-100";
};

const LocationResults = () => {
  const [locations, setLocations] = useState<Location[]>(SEED);
  // Baselines stay fixed; waits revert toward them.
  const [baselines] = useState<number[]>(() => SEED.map((l) => l.wait));
  const [pulse, setPulse] = useState<number | null>(null);
  const [updatedAgo, setUpdatedAgo] = useState(0);

  useEffect(() => {
    // Stagger each clinic on its own cadence so they never all tick together.
    const timers = SEED.map((_, i) =>
      setInterval(() => {
        setLocations((prev) =>
          prev.map((loc, j) =>
            j === i ? { ...loc, wait: nextWait(loc.wait, baselines[j]) } : loc
          )
        );
        setPulse(i);
        setUpdatedAgo(0);
        // Clear the highlight shortly after it fires.
        setTimeout(() => setPulse((p) => (p === i ? null : p)), 1200);
      }, 4000 + i * 1700)
    );

    const ticker = setInterval(() => setUpdatedAgo((s) => s + 1), 1000);

    return () => {
      timers.forEach(clearInterval);
      clearInterval(ticker);
    };
  }, [baselines]);

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

        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Live wait times · updated {updatedAgo === 0 ? 'just now' : `${updatedAgo}s ago`}
          </span>
        </div>

        {locations.map((loc, i) => (
          <Link
            key={i}
            href="/locations/urgent-care/phoenix"
            className="block bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-[#FFD100] transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="max-w-[70%]">
                <h3 className="text-xl font-bold text-[#00205C] mb-2">{loc.name}</h3>
                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{loc.address}</p>
              </div>
              <div className="text-right">
                <div
                  className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border mb-2 transition-all duration-500 ${waitStyle(loc.wait)} ${pulse === i ? 'scale-105 ring-2 ring-[#FFD100]' : 'scale-100'}`}
                >
                  {loc.wait} min Wait
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{loc.status}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-6 border-t border-slate-50">
              <span className="flex-grow text-center bg-[#00205C] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest group-hover:bg-blue-800 transition-colors">Schedule Online</span>
              <span className="w-12 h-12 border-2 border-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-50 transition-colors shrink-0">
                <Phone size={18} className="text-[#00205C]" />
              </span>
            </div>
          </Link>
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
