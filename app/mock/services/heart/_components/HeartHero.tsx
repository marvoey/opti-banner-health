import { Heart, ChevronRight } from 'lucide-react';

const HeartHero = () => (
  <section className="bg-slate-50 py-16" data-cms-component="HeartHero">
    <div className="container mx-auto px-12">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
        <a href="#" className="hover:text-[#002E4D]">Services</a>
        <ChevronRight size={10} />
        <span className="text-[#002E4D]">Heart {'&'} Cardiovascular</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#002E4D] leading-tight mb-8" data-cms-field="headline">
            World-Class Heart Care
          </h1>
          <p className="text-xl text-[#4A4A4A] leading-relaxed mb-10 font-medium max-w-xl" data-cms-field="description">
            From routine screenings to complex heart transplants, Louisiana Blue provides comprehensive cardiovascular care with a patient-first approach.
          </p>
          <div className="flex gap-4">
            <button className="px-10 py-5 bg-[#55C6E6] text-[#002E4D] font-bold rounded-full text-base hover:shadow-xl transition-all">
              Find a Heart Specialist
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
              className="w-full h-full object-cover"
              alt="Heart Institute Facility"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-[#002E4D] text-white p-8 rounded-2xl shadow-2xl max-w-xs">
            <Heart size={32} className="text-[#55C6E6] mb-4" />
            <h3 className="text-xl font-bold mb-2 tracking-tight">Preferred Choice</h3>
            <p className="text-sm text-blue-100/70 font-medium lowercase">Ranked #1 for cardiology in the Southwest for 2026.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeartHero;
