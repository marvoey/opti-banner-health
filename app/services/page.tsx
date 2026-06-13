import TopNav from '../_components/TopNav';
import MainNav from '../_components/MainNav';
import ServicesHero from './_components/ServicesHero';
import ServiceCategories from './_components/ServiceCategories';
import Footer from '../_components/Footer';

/**
 * BANNER HEALTH - SERVICES INDEX
 *
 * A comprehensive directory of all medical services, organized by category.
 *
 * Composed from the shared site chrome (TopNav, MainNav, Footer) plus the
 * services-specific sections in ./_components, mirroring app/page.tsx.
 */
const ServicesPage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    {/* Overlay Edit Simulation Label (Internal Only) */}
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-[#FFD100] text-[#00205C] text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-[#00205C]/10 pointer-events-none">
      <div className="w-2 h-2 bg-[#00205C] rounded-full animate-pulse" />
      Previewing: Services Directory
    </div>

    <TopNav />
    <MainNav />
    <ServicesHero />
    <ServiceCategories />
    <Footer />
  </div>
);

export default ServicesPage;
