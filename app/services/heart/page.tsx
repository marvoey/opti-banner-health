import TopNav from '../../_components/TopNav';
import MainNav from '../../_components/MainNav';
import HeartHero from './_components/HeartHero';
import IntentTriggers from './_components/IntentTriggers';
import Footer from '../../_components/Footer';

/**
 * STAGE 2: BEHAVIORAL INTENT - HEART & CARDIOVASCULAR SERVICES
 *
 * Scenario: Visitor interacts with cardiology conditions; ODP builds the
 * "Cardiology Persona" in real-time.
 *
 * Composed from the shared site chrome (TopNav, MainNav, Footer) plus the
 * heart-specific sections in ./_components, mirroring app/page.tsx.
 */
const HeartServicesPage = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
    {/* Overlay Edit Simulation Label (Internal Only) */}
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] bg-blue-600 text-white text-[10px] px-10 py-2 rounded-b-[20px] font-bold uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border border-blue-400 pointer-events-none">
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
      Scenario Step 2: Intent Signal (Cardiology)
    </div>

    <TopNav />
    <MainNav />
    <HeartHero />
    <IntentTriggers />
    <Footer />
  </div>
);

export default HeartServicesPage;
