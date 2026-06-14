const FacilityInfo = () => (
  <section className="py-24 bg-white" data-cms-component="FacilityInfo">
    <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-7 aspect-video bg-slate-100 rounded-[40px] overflow-hidden shadow-inner border border-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1586717791821-3f44a563eb4c" className="w-full h-full object-cover opacity-50 grayscale" alt="Location Map" />
      </div>
      <div className="lg:col-span-5">
        <h2 className="text-4xl font-serif font-bold text-[#00205C] mb-8">Visit the Institute</h2>
        <div className="space-y-8">
          <div>
            <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Hours of Operation</h4>
            <p className="text-lg font-bold text-[#00205C]">Mon - Fri: 8:00 AM - 5:00 PM</p>
            <p className="text-slate-500 font-medium">Weekend: Closed (Emergency 24/7)</p>
          </div>
          <div>
            <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Parking Information</h4>
            <p className="text-lg font-bold text-[#00205C]">Valet Parking Available</p>
            <p className="text-slate-500 font-medium">Free self-parking in the McDowell garage.</p>
          </div>
          <div className="pt-8 border-t border-gray-100">
            <p className="text-sm text-slate-400 leading-relaxed font-medium">Part of the Banner - University Medical Center Phoenix campus, ranked as a &quot;Best Hospital&quot; by U.S. News {'&'} World Report.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FacilityInfo;
