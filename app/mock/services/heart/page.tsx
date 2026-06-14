import TopNav from '../../_components/TopNav';
import MainNav from '../../_components/MainNav';
import HeartHero from './_components/HeartHero';
import IntentTriggers from './_components/IntentTriggers';
import Footer from '../../_components/Footer';
import PreviewBadge from '../../_components/PreviewBadge';

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
    <PreviewBadge
      className="bg-blue-600 text-white border-blue-400"
      dotClassName="bg-yellow-400 animate-ping"
      label="Stage 3: Intent (Capturing the Signal)"
    />

    <TopNav />
    <MainNav />
    <HeartHero />
    <IntentTriggers />
    <Footer />
  </div>
);

export default HeartServicesPage;
