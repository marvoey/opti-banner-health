export interface HeroContent {
  kicker: string;
  headline: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  imageUrl: string;
}

const Hero = ({ data }: { data: HeroContent }) => (
  <section className="relative w-full h-[600px] overflow-hidden bg-slate-900" data-cms-component="HeroBanner">
    {/* Hero Background Image */}
    <div className="absolute inset-0 opacity-80 transition-transform duration-700 hover:scale-105">
      <img
        src={data.imageUrl}
        alt="Banner Health Care"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-transparent" />
    </div>

    {/* Content Overlay */}
    <div className="relative container mx-auto px-4 h-full flex items-center">
      <div className="max-w-2xl text-white">
        <span className="inline-block px-3 py-1 bg-yellow-500 text-blue-950 font-bold text-xs uppercase tracking-widest rounded mb-4 animate-fade-in" data-cms-field="kicker">
          {data.kicker}
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6" data-cms-field="headline">
          {data.headline}
        </h1>
        <p className="text-xl text-slate-100 mb-8 leading-relaxed max-w-xl" data-cms-field="description">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full text-lg hover:bg-yellow-400 transform transition-all hover:scale-105 shadow-lg active:scale-95" data-cms-field="primaryCTA">
            {data.primaryCTA}
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-blue-950 transition-all" data-cms-field="secondaryCTA">
            {data.secondaryCTA}
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
