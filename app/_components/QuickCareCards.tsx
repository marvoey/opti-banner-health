import { MapPin, User, ChevronRight, Calendar, Activity } from 'lucide-react';

const QuickCareCards = () => {
  const options = [
    { title: "Find a Doctor", desc: "Find a provider that is the right match.", icon: <User className="text-blue-800" />, link: "#" },
    { title: "Urgent Care", desc: "For non-life threatening medical needs.", icon: <Activity className="text-blue-800" />, link: "#" },
    { title: "Find a Location", desc: "Hospitals, clinics and medical offices.", icon: <MapPin className="text-blue-800" />, link: "#" },
    { title: "Classes {'&'} Events", desc: "Join our health and wellness programs.", icon: <Calendar className="text-blue-800" />, link: "#" },
  ];

  return (
    <section className="container mx-auto px-4 -mt-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-cms-group="QuickActions">
      {options.map((opt, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 group hover:border-blue-300 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {opt.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{opt.title}</h3>
          <p className="text-slate-600 mb-4 text-sm">{opt.desc}</p>
          <div className="flex items-center text-blue-800 font-bold text-sm">
            <span>Get Started</span>
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default QuickCareCards;
