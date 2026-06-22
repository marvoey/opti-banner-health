import Link from 'next/link';
import { Search, User, Menu } from 'lucide-react';

const MainNav = () => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
    <div className="container mx-auto px-4 flex justify-between items-center h-20">
      {/* Brand Logo */}
      <div className="navbar-brand branding flex items-center" data-cms-field="brand_logo">
        <a href="/" title="Go to home page" className="header-logo flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lablue-logo.svg" alt="Louisiana Blue" className="h-9 w-auto" />
        </a>
      </div>

      {/* Desktop Links */}
      <nav className="hidden lg:flex gap-8 font-semibold text-slate-700">
        <a href="#" className="hover:text-blue-800 flex items-center gap-1 transition-colors">Shop Plans</a>
        <a href="#" className="hover:text-blue-800 flex items-center gap-1 transition-colors">Find a Doctor or Drug</a>
        <Link href="/services" className="hover:text-blue-800 flex items-center gap-1 transition-colors">Wellness</Link>
        <Link href="/locations" className="hover:text-blue-800 flex items-center gap-1 transition-colors">Learn</Link>
      </nav>

      {/* Action Buttons (utility menu) */}
      <div className="utility-container flex items-center gap-3">
        <Link
          href="/services"
          className="hidden sm:inline-flex items-center px-5 py-2 bg-blue-800 text-white font-bold rounded-full hover:bg-blue-900 transition-colors"
        >
          Shop Plans
        </Link>
        <button className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-700 font-semibold hover:bg-slate-50 rounded-lg transition-colors">
          <Search size={20} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-800 text-blue-800 font-bold rounded-full hover:bg-blue-50 transition-all">
          <User size={18} />
          <span className="hidden sm:inline">MyLABlue</span>
        </button>
        <button className="lg:hidden p-2 text-slate-700">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </header>
);

export default MainNav;
