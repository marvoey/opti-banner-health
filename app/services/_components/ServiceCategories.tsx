import Link from 'next/link';
import { Heart, ChevronRight } from 'lucide-react';

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
    <section className="py-24 bg-white" data-cms-component="ServiceCategories">
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
                  View Section <ChevronRight size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item === "Cardiology" ? "/services/heart" : "#"}
                    className={`p-8 border border-gray-100 rounded-3xl transition-all duration-300 flex items-center justify-between group/card ${item === "Cardiology" ? "bg-blue-50/50 border-[#FFD100] shadow-md" : "hover:bg-slate-50 hover:border-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item === "Cardiology" ? "bg-[#FFD100] text-[#00205C]" : "bg-gray-50 text-gray-400 group-hover/card:bg-[#00205C] group-hover/card:text-white"}`}>
                        <Heart size={20} />
                      </div>
                      <span className="text-lg font-bold text-[#00205C]">{item}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover/card:text-[#00205C] group-hover/card:translate-x-1 transition-all" />
                  </Link>
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

export default ServiceCategories;
