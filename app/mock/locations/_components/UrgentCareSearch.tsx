import { MapPin } from 'lucide-react';

const UrgentCareSearch = () => (
  <section className="bg-[#00205C] text-white py-12" data-cms-component="UrgentCareSearch">
    <div className="container mx-auto px-12">
      <h1 className="text-4xl font-serif font-bold mb-8" data-cms-field="headline">
        Urgent Care Near You
      </h1>
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
        <div className="flex-grow relative">
          <input
            type="text"
            defaultValue="Phoenix, AZ"
            className="w-full bg-white text-slate-900 px-6 py-4 rounded-xl font-medium focus:ring-4 focus:ring-yellow-400 outline-none"
          />
          <MapPin size={20} className="absolute right-4 top-4 text-blue-600" />
        </div>
        <button className="bg-[#FFD100] text-[#00205C] px-10 py-4 rounded-xl font-bold uppercase hover:bg-yellow-400 transition-colors">
          Update Location
        </button>
      </div>
    </div>
  </section>
);

export default UrgentCareSearch;
