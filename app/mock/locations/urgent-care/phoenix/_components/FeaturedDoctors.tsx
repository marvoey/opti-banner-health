import { Star, ChevronRight } from 'lucide-react';

const FeaturedDoctors = () => {
  const doctors = [
    { name: "Dr. Paul Sorajja, MD", specialty: "Interventional Cardiology", rating: "4.9", reviews: "248", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" },
    { name: "Dr. Wilber Su, MD", specialty: "Electrophysiology", rating: "5.0", reviews: "192", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7" },
  ];

  return (
    <section className="py-24 bg-[#f8fafc]" data-cms-component="FeaturedDoctors">
      <div className="container mx-auto px-12">
        <div className="flex justify-between items-end mb-16 border-b-2 border-gray-200 pb-8">
          <h2 className="text-4xl font-serif font-bold text-[#002E4D]">Meet Our Phoenix Specialists</h2>
          <button className="text-[#002E4D] font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
            View Full Directory <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex gap-8 group hover:shadow-2xl transition-all">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={doc.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={doc.name} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-[#002E4D]">{doc.name}</h3>
                  <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-lg">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-black text-[#002E4D]">{doc.rating}</span>
                  </div>
                </div>
                <p className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-4">{doc.specialty}</p>
                <p className="text-slate-500 text-sm font-medium mb-6">Expert care specializing in {doc.specialty.toLowerCase()} at our Phoenix Institute.</p>
                <div className="flex gap-4">
                  <button className="bg-slate-50 text-[#002E4D] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-tighter hover:bg-[#55C6E6] transition-colors">Profile</button>
                  <button className="flex-grow border-2 border-[#002E4D] text-[#002E4D] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#002E4D] hover:text-white transition-all">Book Online</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
