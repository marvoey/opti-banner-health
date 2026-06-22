import TopNav from '../../_components/TopNav';
import MainNav from '../../_components/MainNav';
import ServicesHero from './_components/ServicesHero';
import ServiceCategories from './_components/ServiceCategories';
import Footer from '../../_components/Footer';
import PreviewBadge from '../../_components/PreviewBadge';

/**
 * LOUISIANA BLUE - SERVICES INDEX
 *
 * A comprehensive directory of all medical services, organized by category.
 *
 * Composed from the shared site chrome (TopNav, MainNav, Footer) plus the
 * services-specific sections in ./_components, mirroring app/page.tsx.
 */
const ServicesPage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    {/* Overlay Edit Simulation Label (Internal Only) */}
    <PreviewBadge
      className="bg-[#55C6E6] text-[#002E4D] border-[#002E4D]/10"
      dotClassName="bg-[#002E4D] animate-pulse"
      label="Stage 2: Discovery (Organization at Scale)"
    />

    <TopNav />
    <MainNav />
    <ServicesHero />
    <ServiceCategories />
    <Footer />
  </div>
);

export default ServicesPage;
