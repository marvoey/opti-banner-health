import React from 'react';

/**
 * BANNER HEALTH - SERVICES INDEX MOCKUP
 * 
 * Purpose: A comprehensive directory of all medical services.
 * Scenario: Visitor is exploring available care options across the Banner network.
 * DXP Value: Demonstrates "Content Engineering" (Req ID 16) and "Taxonomy" (Req ID 11) 
 * by showing how services are organized and searchable.
 */

// --- Pixel-Perfect Icons (SVG) ---
const Icon = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);

const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Icon>;
const ChevronRightIcon = (p) => <Icon {...p} strokeWidth="3"><path d="m9 18 6-6-6-6"/></Icon>;
const HeartIcon = (p) => <Icon {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></Icon>;
const UserIcon = (p) => <Icon {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const PhoneIcon = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const GlobeIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></Icon>;

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
        <div className="navbar-brand branding flex items-center cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/banner-logo.svg" alt="Banner Health" className="h-9 w-auto" />
        </div>
        <nav className="hidden lg:flex gap-10 font-bold text-[#00205C] text-[15px]">
          <a href="#" className="hover:text-blue-600 transition-colors">Get Care Now</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Find a Doctor</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Locations</a>
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

const ServicesHero = () => (
  <section className="bg-slate-50 py-20 border-b border-gray-200">
    <div className="container mx-auto px-12">
      <div className="max-w-3xl">
        <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#00205C] leading-tight mb-8">
          Conditions {'&'} Services
        </h1>
        <p className="text-xl text-[#4A4A4A] leading-relaxed mb-12 font-medium">
          Find world-class care and treatments tailored to your needs. Search our comprehensive directory of services across Arizona, Colorado, Wyoming, Nebraska, Nevada, and California.
        </p>
        
        {/* Real-time Filter Simulation */}
        <div className="relative max-w-xl group">
          <input 
            type="text" 
            placeholder="Search for a service or condition (e.g. Cardiology)" 
            className="w-full bg-white border-2 border-gray-200 rounded-2xl py-5 pl-14 pr-6 text-lg font-medium shadow-sm group-hover:border-[#FFD100] transition-all outline-none"
          />
          <SearchIcon size={24} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#00205C] transition-colors" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 px-3 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">A-Z Index</div>
        </div>
      </div>
    </div>
  </section>
);

const ServiceCategories = () => {
  const sections = [
    {
      title: "Everyday Medicine",
      desc: "Care for routine health needs and immediate concerns.",
      items: ["Urgent Care", "Primary Care", "Pediatrics", "Imaging", "Telehealth", "Laboratory"]
    },
    {
      title: "Specialty Care",
      desc: "Advanced treatment for complex conditions.",
      items: ["Cardiology", "Cancer Care", "Neurosciences", "Orthopedics", "Women's Health", "Maternity"]
    },
    {
      title: "Rehab & Support",
      desc: "Specialized services to aid recovery and wellness.",
      items: ["Physical Therapy", "Behavioral Health", "Hospice", "Home Care", "Diabetes Care", "Wound Care"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-12">
        <div className="grid grid-cols-1 gap-20">
          {sections.map((section, i) => (
            <div key={i} className="group">
              <div className="flex flex-col md:flex-row justify-between items-baseline border-b-2 border-gray-100 pb-8 mb-12">
                 <div className="max-w-xl">
                    <h2 className="text-3xl font-serif font-bold text-[#00205C] mb-2">{section.title}</h2>
                    <p className="text-gray-500 font-medium">{section.desc}</p>
                 </div>
                 <a href="#" className="text-[#00205C] font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1.5 mt-4 md:mt-0">
                    View Section <ChevronRightIcon size={14} />
                 </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item === "Cardiology" ? "#" : "#"} 
                    className={`p-8 border border-gray-100 rounded-3xl transition-all duration-300 flex items-center justify-between group/card ${item === "Cardiology" ? "bg-blue-50/50 border-[#FFD100] shadow-md" : "hover:bg-slate-50 hover:border-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item === "Cardiology" ? "bg-[#FFD100] text-[#00205C]" : "bg-gray-50 text-gray-400 group-hover/card:bg-[#00205C] group-hover/card:text-white"}`}>
                          <HeartIcon size={20} />
                       </div>
                       <span className="text-lg font-bold text-[#00205C]">{item}</span>
                    </div>
                    <ChevronRightIcon size={18} className="text-gray-300 group-hover/card:text-[#00205C] group-hover/card:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 bg-[#00205C] rounded-[40px] p-12 lg:p-16 text-white flex flex-col lg:flex-row justify-between items-center gap-12 overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/30 rounded-full blur-3xl -mr-32 -mt-32" />
           <div className="max-w-2xl relative z-10">
              <h2 className="text-4xl font-serif font-bold mb-6 italic lowercase">Not sure which service you need?</h2>
              <p className="text-xl text-blue-100/70 font-medium">Use our automated symptom checker to find the right level of care for you or a loved one.</p>
           </div>
           <button className="bg-[#FFD100] text-[#00205C] px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm whitespace-nowrap hover:bg-yellow-400 transition-all shadow-xl relative z-10">Start Symptom Checker</button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#00205C] text-white pt-24 pb-12 uppercase italic not-italic tracking-normal">
    <div className="container mx-auto px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-[14px]">
        <div>
          <div className="mb-8">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/banner-logo.svg" alt="Banner Health" className="h-8 w-auto brightness-0 invert" />
          </div>
          <p className="text-blue-100/60 leading-relaxed font-medium uppercase italic not-italic">Health care made easier in AZ, CO, WY, NE, NV, CA.</p>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10">Quick Links</h4>
          <ul className="space-y-5 text-blue-100/80 font-medium lowercase italic">
            <li><a href="#" className="hover:text-white">Find a Doctor</a></li>
            <li><a href="#" className="hover:text-white">Pay Your Bill</a></li>
            <li><a href="#" className="hover:text-white">Patient Account</a></li>
          </ul>
        </div>
        <div>
           <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10">Resources</h4>
           <ul className="space-y-5 text-blue-100/80 font-medium lowercase italic">
             <li><a href="#" className="hover:text-white">Classes {'&'} Events</a></li>
             <li><a href="#" className="hover:text-white">Health Blog</a></li>
             <li><a href="#" className="hover:text-white">Careers</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-[#FFD100] font-bold uppercase text-[11px] tracking-[0.25em] mb-10">Connect</h4>
           <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'YT'].map(soc => (
                <div key={soc} className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center font-bold text-[10px] hover:bg-[#FFD100] hover:text-[#00205C] transition-all cursor-pointer italic not-italic">{soc}</div>
              ))}
           </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/10 text-blue-100/30 text-[11px] font-bold uppercase flex justify-between items-center tracking-widest lowercase italic not-italic">
        <p>© 2026 Banner Health. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function ServicesIndexMockup() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simulation Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-[#FFD100] text-[#00205C] text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-[#00205C]/10">
        <div className="w-2 h-2 bg-[#00205C] rounded-full animate-pulse" />
        Previewing: Services Directory
      </div>
      <SharedHeader />
      <ServicesHero />
      <ServiceCategories />
      <Footer />
    </div>
  );
}