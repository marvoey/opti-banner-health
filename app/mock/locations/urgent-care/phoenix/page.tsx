import TopNav from '../../../../_components/TopNav';
import MainNav from '../../../../_components/MainNav';
import PreviewBadge from '../../../../_components/PreviewBadge';
import InstituteHero from './_components/InstituteHero';
import FeaturedDoctors from './_components/FeaturedDoctors';
import FacilityInfo from './_components/FacilityInfo';
import Footer from '../../../../_components/Footer';

/**
 * STAGE 4: FINAL DESTINATION - LOUISIANA BLUE HEART & CARDIOVASCULAR INSTITUTE
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
      className="bg-[#002E4D] text-white border-blue-900"
      dotClassName="bg-blue-400 shadow-[0_0_8px_#55C6E6]"
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
