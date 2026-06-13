import TopNav from '../_components/TopNav';
import MainNav from '../_components/MainNav';
import UrgentCareSearch from './_components/UrgentCareSearch';
import LocationResults from './_components/LocationResults';
import Footer from '../_components/Footer';

/**
 * BANNER HEALTH - LOCALIZED URGENCY (PHOENIX URGENT CARE FINDER)
 *
 * Scenario: Visitor from Phoenix is looking for immediate care.
 * DXP Value: Dynamic surfacing of wait times and location-specific clinics.
 *
 * Composed from the shared site chrome (TopNav, MainNav, Footer) plus the
 * location-specific sections in ./_components, mirroring app/page.tsx.
 */
const LocationsPage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
    {/* Overlay Edit Simulation Label (Internal Only) */}
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-green-600 text-white text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-green-400 pointer-events-none">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      Scenario Step 3: Location Signal (Phoenix, AZ)
    </div>

    <TopNav />
    <MainNav />
    <UrgentCareSearch />
    <LocationResults />
    <Footer />
  </div>
);

export default LocationsPage;
