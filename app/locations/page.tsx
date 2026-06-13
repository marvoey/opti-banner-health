import TopNav from '../_components/TopNav';
import MainNav from '../_components/MainNav';
import UrgentCareSearch from './_components/UrgentCareSearch';
import LocationResults from './_components/LocationResults';
import Footer from '../_components/Footer';
import PreviewBadge from '../_components/PreviewBadge';

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
    <PreviewBadge
      className="bg-green-600 text-white border-green-400"
      dotClassName="bg-white animate-pulse"
      label="Stage 4: Context (Localized Utility)"
    />

    <TopNav />
    <MainNav />
    <UrgentCareSearch />
    <LocationResults />
    <Footer />
  </div>
);

export default LocationsPage;
