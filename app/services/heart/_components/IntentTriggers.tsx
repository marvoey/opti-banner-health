'use client';

import { Heart, ChevronRight } from 'lucide-react';

const IntentTriggers = () => {
  const conditions = [
    { title: "Heart Valve Disease", desc: "Expert treatment for aortic, mitral, and tricuspid valve issues." },
    { title: "Arrhythmia", desc: "Advanced mapping and ablation for irregular heart rhythms." },
    { title: "Heart Failure", desc: "Coordinated care for managing congestive heart failure." },
    { title: "Vascular Care", desc: "Specialized surgery and treatment for circulatory health." },
    { title: "Cardiac Rehab", desc: "Personalized recovery programs after a heart event." },
    { title: "Pediatric Heart", desc: "Specialized cardiology for our youngest patients." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-12">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-gray-100 pb-8 mb-16 uppercase italic">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold text-[#00205C] mb-4 lowercase">Conditions We Treat</h2>
            <p className="text-gray-500 font-medium text-lg lowercase">Click a category below to explore expert care options.</p>
          </div>
          <div className="mt-8 md:mt-0 flex items-center gap-4 bg-blue-50 px-6 py-3 rounded-full border border-blue-100 lowercase italic">
             <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
             <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">ODP Intent Tracking Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((item, i) => (
            <div
              key={i}
              className="group p-10 border border-gray-100 rounded-3xl hover:border-[#FFD100] hover:bg-[#f8fafc] transition-all cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden"
              onClick={() => alert(`ODP Event: interest_cardiology_${item.title.toLowerCase().replace(/ /g, '_')}`)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD100]/10 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
              <div className="w-14 h-14 bg-blue-50 text-[#00205C] rounded-2xl mb-8 flex items-center justify-center group-hover:bg-[#FFD100] transition-colors relative z-10">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#00205C] mb-4 relative z-10">{item.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 lowercase italic">{item.desc}</p>
              <div className="flex items-center text-[#00205C] font-bold text-xs uppercase tracking-widest group-hover:underline">
                Explore Care <ChevronRight size={14} className="ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntentTriggers;
