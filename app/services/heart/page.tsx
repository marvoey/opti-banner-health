import { HeartIcon, SearchIcon, UserIcon, ChevronRightIcon, GlobeIcon, PhoneIcon } from './_components/icons';
import IntentTriggers from './_components/IntentTriggers';

/**
 * STAGE 2: BEHAVIORAL INTENT - HEART & CARDIOVASCULAR SERVICES
 *
 * Purpose: This page demonstrates how Banner Health captures patient intent.
 * Scenario: Visitor interacts with "Heart Valve Disease" or "Arrhythmia" sections.
 * DXP Value: Optimizely Data Platform (ODP) builds the "Cardiology Persona" in real-time.
 */

// --- Components ---

const SharedHeader = () => (
  <div className="w-full antialiased border-b border-gray-100">
    <div className="bg-[#00205C] text-white py-2.5 hidden lg:block">
      <div className="container mx-auto px-12 flex justify-between items-center text-[10.5px] font-bold uppercase tracking-wider">
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#FFD100]">Patients {'&'} Visitors</a>
          <a href="#" className="hover:text-[#FFD100]">Health Professionals</a>
          <a href="#" className="hover:text-[#FFD100]">Employees</a>
        </div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5"><GlobeIcon size={14} /> Español</span>
          <span className="flex items-center gap-1.5 border-l border-white/20 pl-6 h-4"><PhoneIcon size={14} /> (800) 230-2273</span>
        </div>
      </div>
    </div>
    <header className="bg-white py-6 shadow-sm sticky top-0 z-[100]">
      <div className="container mx-auto px-12 flex justify-between items-center">
        <div className="navbar-brand branding flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/banner-logo.svg" alt="Banner Health" className="h-9 w-auto" />
        </div>
        <nav className="hidden lg:flex gap-10 font-bold text-[#00205C] text-[15px]">
          <a href="#">Get Care Now</a>
          <a href="#">Find a Doctor</a>
          <a href="#">Locations</a>
          <a href="#" className="text-blue-600 border-b-2 border-blue-600">Services</a>
        </nav>
        <div className="flex items-center gap-4">
          <SearchIcon size={24} className="text-[#00205C]" />
          <button className="px-6 py-3 bg-[#00205C] text-white font-bold rounded-full text-[13px] flex items-center gap-2">
            <UserIcon size={16} /> Patient Account
          </button>
        </div>
      </div>
    </header>
  </div>
);

const ServiceHero = () => (
  <section className="bg-slate-50 py-16">
    <div className="container mx-auto px-12">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
        <a href="#" className="hover:text-[#00205C]">Services</a>
        <ChevronRightIcon size={10} />
        <span className="text-[#00205C]">Heart {'&'} Cardiovascular</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#00205C] leading-tight mb-8">
            World-Class Heart Care
          </h1>
          <p className="text-xl text-[#4A4A4A] leading-relaxed mb-10 font-medium max-w-xl">
            From routine screenings to complex heart transplants, Banner Health provides comprehensive cardiovascular care with a patient-first approach.
          </p>
          <div className="flex gap-4">
            <button className="px-10 py-5 bg-[#FFD100] text-[#00205C] font-bold rounded-full text-base hover:shadow-xl transition-all">
              Find a Heart Specialist
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118" 
              className="w-full h-full object-cover" 
              alt="Heart Institute Facility" 
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-[#00205C] text-white p-8 rounded-2xl shadow-2xl max-w-xs">
            <HeartIcon size={32} className="text-[#FFD100] mb-4" />
            <h3 className="text-xl font-bold mb-2 tracking-tight">Preferred Choice</h3>
            <p className="text-sm text-blue-100/70 font-medium lowercase">Ranked #1 for cardiology in the Southwest for 2026.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#00205C] text-white pt-24 pb-12 lowercase italic">
    <div className="container mx-auto px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-[14px]">
        <div>
          <div className="mb-8">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/banner-logo.svg" alt="Banner Health" className="h-8 w-auto brightness-0 invert" />
          </div>
          <p className="text-blue-100/60 leading-relaxed font-medium">Helping to make health care easier for the communities we serve.</p>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10 not-italic">Heart Services</h4>
          <ul className="space-y-5 text-blue-100/80 font-medium lowercase italic">
            <li><a href="#" className="hover:text-white">Valve Clinic</a></li>
            <li><a href="#" className="hover:text-white">Transplant Services</a></li>
            <li><a href="#" className="hover:text-white">Cardiac Rehab</a></li>
          </ul>
        </div>
        <div>
           <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10 not-italic">Patient Tools</h4>
           <ul className="space-y-5 text-blue-100/80 font-medium lowercase italic">
             <li><a href="#" className="hover:text-white">Find a Location</a></li>
             <li><a href="#" className="hover:text-white">Request Appointment</a></li>
             <li><a href="#" className="hover:text-white">Bill Pay</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10 not-italic">Contact</h4>
           <div className="bg-white/10 rounded-2xl p-6 border border-white/10 not-italic">
              <p className="text-white font-bold mb-2">Talk to a specialist</p>
              <p className="text-2xl font-serif font-bold text-[#FFD100]">(800) 230-2273</p>
           </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/10 text-blue-100/30 text-[11px] font-bold uppercase flex justify-between items-center not-italic tracking-widest">
        <p>© 2026 Banner Health. all rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function HeartServicesMockup() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simulation Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-blue-600 text-white text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-blue-400">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
        Scenario Step 2: Intent Signal (Cardiology)
      </div>
      <SharedHeader />
      <ServiceHero />
      <IntentTriggers />
      <Footer />
    </div>
  );
}