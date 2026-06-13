import { Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-blue-950 text-white pt-16 pb-8" data-cms-group="Footer">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-950 font-serif italic text-xl font-bold">B</div>
          <span className="text-xl font-serif font-bold tracking-tight">Banner Health.</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Providing compassionate, high-quality care to communities across Arizona, Colorado, Wyoming, Nebraska, Nevada, and California.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Find a Doctor</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pay Your Bill</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Medical Records</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Resources</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Classes {'&'} Events</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Health {'&'} Wellness Blog</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
        <p className="text-slate-400 text-sm mb-4">Questions about your care?</p>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all font-bold">
          <Phone size={18} />
          <span>(800) 230-2273</span>
        </button>
      </div>
    </div>
    <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-slate-500 text-xs flex flex-wrap justify-between gap-4">
      <p>&copy; 2026 Banner Health. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Privacy Statement</a>
        <a href="#" className="hover:text-white">Terms of Use</a>
        <a href="#" className="hover:text-white">Nondiscrimination</a>
      </div>
    </div>
  </footer>
);

export default Footer;
