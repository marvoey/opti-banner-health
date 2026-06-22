import { Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-blue-950 text-white pt-16 pb-8" data-cms-group="Footer">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">+</div>
          <span className="text-xl font-bold tracking-tight">Louisiana Blue</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Louisiana Blue is the trade name of Blue Cross and Blue Shield of Louisiana — proudly serving the health of Louisianians for more than 90 years.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">MyLABlue Login</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Find a Doctor or Drug</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pay My Bill</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Shop Plans</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Resources</h4>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Wellness</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">LA Blue Foundation</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
        <p className="text-slate-400 text-sm mb-4">Questions about your coverage?</p>
        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all font-bold">
          <Phone size={18} />
          <span>1-800-599-2583</span>
        </button>
      </div>
    </div>
    <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-slate-500 text-xs flex flex-wrap justify-between gap-4">
      <p>&copy; 2026 Blue Cross and Blue Shield of Louisiana. All rights reserved. An independent licensee of the Blue Cross Blue Shield Association.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Privacy Statement</a>
        <a href="#" className="hover:text-white">Terms of Use</a>
        <a href="#" className="hover:text-white">Nondiscrimination</a>
      </div>
    </div>
  </footer>
);

export default Footer;
