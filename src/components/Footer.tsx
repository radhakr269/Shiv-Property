import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, X, ShieldCheck, FileText } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/contactConfig';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (page: string) => void;
  variant?: 'full' | 'minimal';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, variant = 'full' }) => {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'rera' | null>(null);

  return (
    <footer className="bg-[#040e1f] text-slate-300 pt-8 sm:pt-12 md:pt-16 pb-24 md:pb-8 border-t border-slate-800" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= MOBILE FOOTER (4 COMPACT ROWS) ================= */}
        <div className="block md:hidden space-y-5">
          {/* Row 1 — Compact Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex items-end gap-0.5 text-[#d4a359]">
                <svg
                  className="w-6 h-7 fill-current"
                  fill="none"
                  viewBox="0 0 32 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#D4A359" height="20" opacity="0.8" rx="1" width="6" x="2" y="16"></rect>
                  <rect fill="#E5B268" height="28" rx="1" width="6" x="10" y="8"></rect>
                  <rect fill="#F4CA88" height="34" rx="1" width="6" x="18" y="2"></rect>
                  <rect fill="#C58E3D" height="24" opacity="0.9" rx="1" width="5" x="26" y="12"></rect>
                  <path d="M0 35H32V36H0z" fill="#D4A359"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.22em] font-semibold text-[#e5b268] font-sans uppercase leading-none">
                  PROPERTY
                </span>
                <span className="text-lg font-bold tracking-tight text-white leading-tight font-serif mt-0.5">
                  दर्शन
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide text-right">
              Premium Properties. <br className="sm:hidden" />
              <span className="text-[#e5b268]">A Brighter Tomorrow.</span>
            </p>
          </div>

          {/* Row 2 — Two-Column Layout (Get in Touch | Quick Links) */}
          <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-800/80 text-[11px]">
            {/* Left Column: Get in Touch */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Get in Touch
              </h4>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e5b976] shrink-0" />
                <a href={CONTACT_CONFIG.getTelLink()} className="hover:text-white transition-colors truncate">
                  {CONTACT_CONFIG.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={CONTACT_CONFIG.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-emerald-400 font-medium truncate"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e5b976] shrink-0" />
                <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-white transition-colors truncate">
                  {CONTACT_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e5b976] shrink-0 mt-0.5" />
                <span className="line-clamp-2">{CONTACT_CONFIG.city}, UP</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5 text-[#e5b976]">
                <Instagram className="w-3.5 h-3.5 shrink-0" />
                <a
                  href={CONTACT_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {CONTACT_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            {/* Right Column: Quick Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Quick Links
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('properties')} className="text-[#e6bc79] font-semibold hover:text-white transition-colors">
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 3 — Follow Us Compact Strip */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Official Social
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#e5b976] text-white hover:text-[#051329] flex items-center justify-center transition-colors"
                title="Follow on Instagram @_property.darshan_"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Row 4 — Bottom Copyright and Policies */}
          <div className="pt-2 flex flex-col items-center justify-center text-[10px] text-slate-500 gap-1.5 text-center">
            <p>© {currentYear} Property Darshan. All rights reserved.</p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModal('rera')}
                className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
              >
                RERA Info
              </button>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP FOOTER (PRESERVED 4-COLUMN LAYOUT) ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Motto */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-end gap-0.5 text-[#d4a359]">
                <svg
                  className="w-7 h-8 fill-current"
                  fill="none"
                  viewBox="0 0 32 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#D4A359" height="20" opacity="0.8" rx="1" width="6" x="2" y="16"></rect>
                  <rect fill="#E5B268" height="28" rx="1" width="6" x="10" y="8"></rect>
                  <rect fill="#F4CA88" height="34" rx="1" width="6" x="18" y="2"></rect>
                  <rect fill="#C58E3D" height="24" opacity="0.9" rx="1" width="5" x="26" y="12"></rect>
                  <path d="M0 35H32V36H0z" fill="#D4A359"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] tracking-[0.25em] font-semibold text-[#e5b268] font-sans uppercase leading-none">
                  PROPERTY
                </span>
                <span className="text-xl font-bold tracking-tight text-white leading-tight font-serif mt-0.5">
                  दर्शन
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium tracking-wide">
              Premium Properties. A Brighter Tomorrow.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Lucknow&apos;s most trusted luxury real estate platform delivering authentic listings and hassle-free verified site visits.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('properties')} className="text-[#e6bc79] font-semibold hover:text-white transition-colors">
                  Properties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Get in Touch */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e5b976] shrink-0" />
                <a href={CONTACT_CONFIG.getTelLink()} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.displayPhones}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={CONTACT_CONFIG.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-emerald-400 font-medium"
                >
                  WhatsApp: {CONTACT_CONFIG.displayWhatsApp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#e5b976] shrink-0" />
                <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e5b976] shrink-0 mt-0.5" />
                <span>{CONTACT_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#e5b976] shrink-0" />
                <span>{CONTACT_CONFIG.timing}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Follow Us</h4>
            <p className="text-xs text-slate-400 mb-3">
              Follow for daily property updates, video tours, and investment insights across Lucknow.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white text-[#051329] hover:bg-[#e5b976] flex items-center justify-center transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-[#e5b976] font-medium">
              Instagram: <a href={CONTACT_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{CONTACT_CONFIG.instagramHandle}</a>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar: Copyright & Terms */}
        <div className="hidden md:flex pt-6 flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} Property Darshan. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
            >
              Terms & Conditions
            </button>
            <span>|</span>
            <button
              onClick={() => setLegalModal('rera')}
              className="hover:text-slate-300 transition-colors underline-offset-2 hover:underline"
            >
              RERA Compliance
            </button>
          </div>
        </div>
      </div>

      {/* Meaningful Legal & Privacy Policy Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-[#d4a359]/15 text-[#b87834] flex items-center justify-center shrink-0">
                {legalModal === 'privacy' && <ShieldCheck className="w-5 h-5 stroke-[2]" />}
                {legalModal === 'terms' && <FileText className="w-5 h-5 stroke-[2]" />}
                {legalModal === 'rera' && <ShieldCheck className="w-5 h-5 stroke-[2]" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {legalModal === 'privacy' && 'Privacy Policy'}
                  {legalModal === 'terms' && 'Terms & Conditions'}
                  {legalModal === 'rera' && 'RERA Compliance & Verification Notice'}
                </h3>
                <p className="text-xs text-slate-500">Property Darshan • Lucknow, Uttar Pradesh</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed pr-1">
              {legalModal === 'privacy' && (
                <>
                  <p>
                    <strong>1. Commitment to Privacy:</strong> Property Darshan respects your privacy. We collect personal details (full name, contact telephone number, and property preferences) solely for the purpose of assisting your property search, arranging accompanied site visits, and dispatching matching property documentation in Lucknow.
                  </p>
                  <p>
                    <strong>2. Zero Data Selling:</strong> We never sell, rent, or lease your contact information or personal data to third-party telemarketers or external advertisers.
                  </p>
                  <p>
                    <strong>3. Direct Communication:</strong> By submitting an enquiry form, you authorize our verified Lucknow property advisors to contact you via direct phone call, SMS, or WhatsApp regarding your requested property criteria.
                  </p>
                  <p>
                    <strong>4. Data Removal Requests:</strong> You may at any time request the deletion of your enquiry history and contact record by emailing us at{' '}
                    <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-[#b87834] font-semibold underline">
                      {CONTACT_CONFIG.email}
                    </a>{' '}
                    or sending a WhatsApp message to {CONTACT_CONFIG.displayWhatsApp}.
                  </p>
                </>
              )}

              {legalModal === 'terms' && (
                <>
                  <p>
                    <strong>1. Advisory Scope:</strong> Property Darshan operates as a premium real estate advisory and tour coordination service in Lucknow. We assist buyers and investors with property discovery, site tours, and developer coordination.
                  </p>
                  <p>
                    <strong>2. Showcase & Sample Listings Notice:</strong> Properties, floor plans, dimensions, and indicative price figures presented on this platform are sample showcase representations. Final prices, unit availability, and specifications are subject to written confirmation from respective developers or legal property owners.
                  </p>
                  <p>
                    <strong>3. Due Diligence:</strong> While Property Darshan verifies developer credentials and site status prior to scheduling tours, all prospective purchasers are strongly advised to perform independent legal title deed searches and municipal sanction checks before committing any financial booking tokens.
                  </p>
                  <p>
                    <strong>4. Governing Law:</strong> All advisory interactions and transactions coordinated in connection with Property Darshan are subject to the exclusive jurisdiction of the competent courts in Lucknow, Uttar Pradesh.
                  </p>
                </>
              )}

              {legalModal === 'rera' && (
                <>
                  <p>
                    <strong>1. UP-RERA Verification:</strong> The Real Estate (Regulation and Development) Act (RERA) protects property buyers in Uttar Pradesh. Property Darshan strictly advocates transparency and advises all buyers to verify project registrations on the official government portal{' '}
                    <a
                      href="https://www.up-rera.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b87834] font-semibold underline"
                    >
                      www.up-rera.in
                    </a>.
                  </p>
                  <p>
                    <strong>2. Project Disclosures:</strong> We do not publish unverified RERA registration numbers. For any specific residential or commercial project listed, our team facilitates access to the developer&apos;s verified sanction documents, approved layouts, and RERA registration certificates upon request.
                  </p>
                  <p>
                    <strong>3. Direct Enquiry:</strong> To request verified RERA documentation for any shortlisted property, contact our advisory desk directly on {CONTACT_CONFIG.displayWhatsApp}.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#071426] hover:bg-[#0c1e34] text-white text-xs font-bold transition"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
