import { MapPin, Phone, ChevronRight } from 'lucide-react';

const SPECIALIZATIONS = [
  "Structural Heart", "Heart Transplant", "Valve Clinic",
  "Aortic Care", "Clinical Trials", "Vascular Center",
];

const InstituteHero = () => (
  <section className="bg-[#002E4D] text-white pt-24 pb-20" data-cms-component="InstituteHero">
    <div className="container mx-auto px-12">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 mb-8">
        <a href="#" className="hover:text-white">Locations</a>
        <ChevronRight size={10} />
        <a href="#" className="hover:text-white">Phoenix</a>
        <ChevronRight size={10} />
        <span className="text-white">Heart Institute</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-5xl font-serif font-bold leading-tight mb-8" data-cms-field="headline">
            Louisiana Blue Heart & Cardiovascular Institute
          </h1>
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-[#55C6E6] mt-1 shrink-0" />
              <div>
                <p className="text-xl font-bold">1111 E McDowell Rd</p>
                <p className="text-blue-200 font-medium">Phoenix, AZ 85006</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={24} className="text-[#55C6E6] shrink-0" />
              <p className="text-xl font-bold">(602) 839-2000</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#55C6E6] text-[#002E4D] px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-blue-400 transition-all shadow-xl">Schedule Appointment</button>
            <button className="border-2 border-white/20 hover:bg-white/10 px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all">Get Directions</button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 border border-white/10">
          <h3 className="text-[#55C6E6] font-black uppercase tracking-widest text-xs mb-8">Institute Specializations</h3>
          <div className="grid grid-cols-2 gap-y-8 gap-x-12">
            {SPECIALIZATIONS.map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#55C6E6] rounded-full shrink-0" />
                <span className="font-bold text-sm text-blue-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InstituteHero;
