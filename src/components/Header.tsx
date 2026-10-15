import React, { useState } from 'react';
import { Heart, User, Menu, X, ArrowRight, Phone, MapPin, Mail, ShieldAlert } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, propertySlug?: string) => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  favoritesCount = 0,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    if (pageId !== 'services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="bg-[#071426] text-white sticky top-0 z-50 border-b border-white/10 pt-[env(safe-area-inset-top)]"
        data-purpose="site-navigation-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Container */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            data-purpose="brand-logo"
            aria-label="Shiv Property Uttarakhand Home"
          >
            <div className="flex items-end gap-0.5 text-[#d4a359]">
              {/* Geometric Architectural & Mountain Peak Emblem */}
              <svg
                className="w-8 h-9 fill-current"
                fill="none"
                viewBox="0 0 32 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 2L2 14V34H12V24H20V34H30V14L16 2Z" fill="#F4CA88" opacity="0.95" />
                <path d="M16 5L5 14.5V32H10V22H22V32H27V14.5L16 5Z" fill="#E5B268" />
                <path d="M16 9L9 15.5V30H13V22H19V30H23V15.5L16 9Z" fill="#D4A359" />
                <path d="M16 13L13 16V22H19V16L16 13Z" fill="#C58E3D" opacity="0.95" />
                <path d="M0 35H32V36H0z" fill="#D4A359" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] tracking-[0.22em] font-bold text-[#e5b268] font-sans uppercase leading-none">
                SHIV PROPERTY
              </span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-serif mt-0.5">
                UTTARAKHAND
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9 text-[15px] font-medium" data-purpose="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors duration-200 relative py-1 focus:outline-none ${
                    isActive
                      ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#d4a359]"
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3 sm:space-x-5" data-purpose="user-actions">
            {/* Favorites Heart Icon */}
            <button
              onClick={onOpenFavorites}
              aria-label="Favorites"
              className="p-2 text-slate-300 hover:text-[#e5b268] transition-colors duration-200 relative focus:outline-none"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d4a359] text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              onClick={() => setProfileModalOpen(true)}
              aria-label="User Account"
              className="p-2 text-slate-300 hover:text-[#e5b268] transition-colors duration-200 focus:outline-none"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* CTA Pill Button (Desktop) */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a359] to-[#c58e3d] hover:from-[#e5b268] hover:to-[#d4a359] text-slate-900 font-semibold text-sm shadow-md transition-all duration-300 hover:shadow-[#d4a359]/20 active:scale-95 focus:outline-none"
              data-purpose="cta-button"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-white hover:text-[#e5b268] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2]" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#071426] border-t border-slate-800 px-5 py-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 text-base font-semibold transition-colors ${
                    currentPage === item.id ? 'text-[#e5b268] pl-2 border-l-2 border-[#d4a359]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 bg-gradient-to-r from-[#d4a359] to-[#c58e3d] text-slate-950 font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-slate-400 space-y-1 pt-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#e5b268]" />
                  <span>{CONTACT_CONFIG.displayPhones}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#e5b268]" />
                  <span>{CONTACT_CONFIG.city}, {CONTACT_CONFIG.state}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Profile / Client Portal Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-800 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#fcf5ed] text-[#d4a359] flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  Private Beta / Demo
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Client Portal</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Live OTP login and document management are currently enabled for registered clients in private beta. For instant property tours, verified site inspections, or custom proposals in Rudrapur and surrounding Uttarakhand regions, connect directly with our advisory desk:
            </p>

            <div className="space-y-2.5">
              <a
                href={CONTACT_CONFIG.getWhatsAppLink(undefined, 'Client Portal Inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href={CONTACT_CONFIG.getTelLink()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#071426] hover:bg-[#0c1e34] text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Call Advisor: {CONTACT_CONFIG.primaryPhone}</span>
              </a>

              <div className="pt-2 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400 block">
                  SMS OTP gateway integration in progress.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
