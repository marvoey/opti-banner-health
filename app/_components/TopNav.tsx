import { Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const TopNav = () => (
  <div className="bg-slate-50 border-b border-slate-200 py-2 hidden md:block" data-cms-group="Navigation">
    <div className="container mx-auto px-4 flex justify-between items-center text-sm text-slate-600 font-medium">
      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-900 transition-colors">Patients {'&'} Visitors</a>
        <a href="#" className="hover:text-blue-900 transition-colors">Health Professionals</a>
        <a href="#" className="hover:text-blue-900 transition-colors">Employees</a>
      </div>
      <div className="flex gap-4 items-center">
        <span className="flex items-center gap-1"><Phone size={14} className="text-blue-800" /> (800) 230-2273</span>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
);

export default TopNav;
