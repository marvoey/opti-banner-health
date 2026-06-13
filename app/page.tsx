import TopNav from './_components/TopNav';
import MainNav from './_components/MainNav';
import Hero, { type HeroContent } from './_components/Hero';
import QuickCareCards from './_components/QuickCareCards';
import ServicesGrid from './_components/ServicesGrid';
import Testimonial from './_components/Testimonial';
import Footer from './_components/Footer';

/**
 * BANNER HEALTH - GENERIC AWARENESS MOCKUP
 *
 * This Next.js (App Router style) application is structured as a collection of
 * modular components. Each component is designed to simulate a "Live Preview"
 * environment where individual fields (headlines, images, CTAs) can be
 * targeted for overlay editing.
 */

const BannerHomepageMockup = () => {
  // Simulating CMS Content Data
  const heroContent: HeroContent = {
    kicker: "Health Care Made Easier",
    headline: "Compassionate care for your entire family",
    description: "From routine check-ups to specialized care, we're dedicated to keeping you and your loved ones healthy at every stage of life.",
    primaryCTA: "Find Care Now",
    secondaryCTA: "Explore Our Services",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Overlay Edit Simulation Label (Internal Only) */}
      <div className="fixed top-4 left-4 z-[100] bg-blue-600 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest shadow-lg pointer-events-none">
        DXP Preview: Draft
      </div>

      <TopNav />
      <MainNav />
      <Hero data={heroContent} />
      <QuickCareCards />
      <ServicesGrid />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default BannerHomepageMockup;
