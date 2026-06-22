import { Search } from 'lucide-react';

const ServicesHero = () => (
  <section className="bg-slate-50 py-20 border-b border-gray-200" data-cms-component="ServicesHero">
    <div className="container mx-auto px-12">
      <div className="max-w-3xl">
        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#002E4D] leading-tight mb-8" data-cms-field="headline">
          Conditions {'&'} Services
        </h1>
        <p className="text-xl text-[#4A4A4A] leading-relaxed mb-12 font-medium" data-cms-field="description">
          Find world-class care and treatments tailored to your needs. Search our comprehensive directory of services across Arizona, Colorado, Wyoming, Nebraska, Nevada, and California.
        </p>

        {/* Real-time Filter Simulation */}
        <div className="relative max-w-xl group">
          <input
            type="text"
            placeholder="Search for a service or condition (e.g. Cardiology)"
            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-5 pl-14 pr-6 text-lg font-medium shadow-sm group-hover:border-[#55C6E6] transition-all outline-none"
          />
          <Search size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#002E4D] transition-colors" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 px-3 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">A-Z Index</div>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesHero;
