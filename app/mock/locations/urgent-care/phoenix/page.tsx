import TopNav from '../../../../_components/TopNav';
import MainNav from '../../../../_components/MainNav';
import PreviewBadge from '../../../../_components/PreviewBadge';
import InstituteHero from './_components/InstituteHero';
import FeaturedDoctors from './_components/FeaturedDoctors';
import FacilityInfo from './_components/FacilityInfo';
import Footer from '../../../../_components/Footer';

/**
 * STAGE 4: FINAL DESTINATION - BANNER UNIVERSITY MEDICINE HEART INSTITUTE
 *
 * The localized conversion destination a high-intent Phoenix visitor lands on.
 *
 * Composed from the shared site chrome (TopNav, MainNav, Footer, PreviewBadge)
 * plus the institute-specific sections in ./_components, mirroring app/page.tsx.
 */
const PhoenixHeartInstitutePage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    {/* Overlay Edit Simulation Label (Internal Only) */}
    <PreviewBadge
      className="bg-[#00205C] text-white border-blue-900"
      dotClassName="bg-yellow-400 shadow-[0_0_8px_#FFD100]"
      label="Stage 5: Conversion (The Finish Line)"
    />

    <TopNav />
    <MainNav />
    <InstituteHero />
    <FeaturedDoctors />
    <FacilityInfo />
    <Footer />
  </div>
);

export default PhoenixHeartInstitutePage;
