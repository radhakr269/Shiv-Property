import React from 'react';
import {
  ChevronRight,
  ArrowRight,
  Home as HomeIcon,
  TrendingUp,
  FileText,
  ArrowLeftRight,
  ShieldCheck,
  Users,
  Headphones,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { IMAGES } from '../data/imageConfig';
import { CONTACT_CONFIG } from '../data/contactConfig';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { PremiumCarousel } from '../components/PremiumCarousel';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FAFBFD]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-slate-900 min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] flex items-center overflow-hidden">
        {/* Hero Background Image with Subtle Parallax Feel & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <picture className="w-full h-full">
            <source media="(max-width: 768px)" srcSet={IMAGES.heroMobile} />
            <img
              src={IMAGES.heroDesktop}
              alt="Luxury Villa Property Darshan Hero"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </picture>
          {/* Subtle contrast gradient - reduced white fade for clear photograph visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/45 to-transparent w-full md:w-3/5 lg:w-[58%]"></div>
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-14 lg:py-18 w-full">
          <div className="max-w-xl">
            <p className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-[#DF9E52] uppercase mb-1.5 sm:mb-3">
              OUR STORY. YOUR DREAMS. A BRIGHTER TOMORROW.
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-[#0B192C] leading-[1.1] tracking-tight mb-2 sm:mb-4">
              About<br />
              <span className="text-[#0B192C]">Property Darshan</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#475569] font-medium leading-relaxed mb-4 sm:mb-6 max-w-md">
              Your trusted real estate partner in Lucknow, helping you find the right property for a better tomorrow.
            </p>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#0B192C] transition-colors focus:outline-none"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[#0B192C]">About</span>
            </nav>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY SECTION ================= */}
      <section className="py-20 lg:py-24 bg-[#FAFBFD]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left: Image Container */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/11]">
                <img
                  src={IMAGES.aboutInterior}
                  alt="Luxury Lucknow Living Room Interior"
                  className="w-full h-full object-cover object-[center_60%]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            {/* Right: Story Content */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.2em] text-[#DF9E52] uppercase mb-2">
                OUR STORY
              </span>
              <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#0B192C] leading-snug tracking-tight mb-6">
                Helping You Find<br className="hidden sm:inline" /> Your Dream Property in Lucknow
              </h2>
              <div className="space-y-4 text-[14.5px] leading-relaxed text-[#556376]">
                <p>
                  At Property Darshan, we believe that a home is more than just a place — it&apos;s a new beginning, a better
                  lifestyle, and a brighter future. Based in Lucknow, we are dedicated to helping our clients find the right
                  properties that match their goals, whether it&apos;s a dream home, a smart investment, or a commercial space
                  for their business.
                </p>
                <p>
                  With local expertise, genuine guidance, and a client-first approach, we make your real estate journey
                  simple, transparent, and hassle-free.
                </p>
              </div>
              {/* Side-by-Side Mobile CTA Buttons */}
              <div className="mt-7 flex flex-row items-center gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-[#e3a358] to-[#d89243] hover:from-[#ecc38c] hover:to-[#df9e52] text-[#0c1829] shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <a
                  href={CONTACT_CONFIG.getWhatsAppLink(undefined, 'About Page Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-wide bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR SERVICES SECTION (Mode A: Right → Left Animated Carousel) ================= */}
      <section className="py-16 sm:py-20 bg-white" id="services">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#DF9E52] uppercase mb-2 block">
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-[32px] font-extrabold text-[#0B192C] tracking-tight mb-2">
              Complete Real Estate Support
            </h2>
            <p className="text-xs sm:text-sm text-[#606D7F]">
              From property tours to investment guidance, we are here at every step of your journey.
            </p>
          </div>

          {/* Services Horizontal Animated Carousel (Mode A: Right to Left) */}
          <PremiumCarousel
            id="about-services-carousel"
            direction="rtl"
            speed={32}
            cardWidthClass="w-[270px] sm:w-[290px]"
            ariaLabel="Property Darshan Real Estate Services Carousel"
            items={[
              // Card 1: Property Tours
              <div
                key="about-srv-1"
                className="bg-[#FAFBFD] border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[280px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <HomeIcon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Property Tours
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Explore verified residential and commercial properties in Lucknow with personalized guided tours.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('properties')}
                  className="text-xs font-bold text-[#DF9E52] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pt-2"
                >
                  <span>Explore Tours</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>,

              // Card 2: Investment Insights
              <div
                key="about-srv-2"
                className="bg-[#FAFBFD] border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[280px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <TrendingUp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Investment Insights
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Get expert advice on property investments to help you make informed and profitable capital decisions.
                  </p>
                </div>
                <a
                  href={CONTACT_CONFIG.getWhatsAppLink(undefined, 'Investment Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#DF9E52] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pt-2"
                >
                  <span>Consult Advisory</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>,

              // Card 3: Real Estate Updates
              <div
                key="about-srv-3"
                className="bg-[#FAFBFD] border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[280px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <FileText className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Real Estate Updates
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Stay updated with the latest market trends, new launches, and growth opportunities across Lucknow.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-[#DF9E52] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pt-2"
                >
                  <span>Get Updates</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>,

              // Card 4: Buy / Sell / Rent Support
              <div
                key="about-srv-4"
                className="bg-[#FAFBFD] border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[280px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <ArrowLeftRight className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Buy / Sell / Rent Support
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    End-to-end assistance for buying, selling, or renting properties with verified title documentation.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-[#DF9E52] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform pt-2"
                >
                  <span>Connect Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>,
            ]}
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US SECTION (Mode B: Left → Right Animated Carousel) ================= */}
      <section className="py-16 sm:py-20 bg-[#FAFBFD]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#DF9E52] uppercase mb-2 block">
              WHY CHOOSE PROPERTY DARSHAN
            </span>
            <h2 className="text-2xl sm:text-[32px] font-extrabold text-[#0B192C] tracking-tight mb-2">
              A Trusted Partner in Your Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#606D7F]">
              We go beyond listings — offering verified inspections and honest advice.
            </p>
          </div>

          {/* Why Choose Horizontal Animated Carousel (Mode B: Left to Right) */}
          <PremiumCarousel
            id="about-why-choose-carousel"
            direction="ltr"
            speed={30}
            cardWidthClass="w-[270px] sm:w-[290px]"
            ariaLabel="Why Choose Property Darshan Trust Pillars"
            items={[
              // Pillar 1: Verified Listings
              <div
                key="why-1"
                className="bg-white border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[260px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Verified Listings
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Carefully vetted properties with verified details and genuine photographs.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  100% Genuine Physical Check
                </span>
              </div>,

              // Pillar 2: Local Expertise
              <div
                key="why-2"
                className="bg-white border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[260px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <Users className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Local Expertise
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    In-depth knowledge of Lucknow&apos;s real estate corridors, pricing and connectivity.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-[#DF9E52] bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Lucknow Native Advisors
                </span>
              </div>,

              // Pillar 3: Personalized Guidance
              <div
                key="why-3"
                className="bg-white border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[260px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <Headphones className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Personalized Guidance
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Tailored property recommendations based on your family&apos;s needs and budget.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Dedicated Relationship Desk
                </span>
              </div>,

              // Pillar 4: Transparent Process
              <div
                key="why-4"
                className="bg-white border border-gray-100 hover:border-[#DF9E52] rounded-2xl p-6 text-center flex flex-col items-center justify-between hover:shadow-lg transition-all duration-300 h-[260px] group"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#FCF5ED] flex items-center justify-center text-[#DF9E52] mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <CheckCircle2 className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B192C] mb-2 group-hover:text-[#DF9E52] transition-colors">
                    Transparent Process
                  </h3>
                  <p className="text-xs text-[#626E80] leading-relaxed">
                    Honest advice and clear communication at every step with no hidden surprises.
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Direct Owner Interaction
                </span>
              </div>,
            ]}
          />
        </div>
      </section>

      {/* ================= CALL TO ACTION BANNER (COMPACT LUXURY) ================= */}
      <section className="relative bg-[#061325] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.aboutInterior}
            alt="Interior Living Room Luxury"
            className="w-full h-full object-cover object-[center_60%] opacity-35 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061325] via-[#061325]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-12 sm:py-16">
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#DF9E52] uppercase mb-2 block">
              MORE THAN PROPERTIES.
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
              A Better Tomorrow Starts with the Right Property.
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 max-w-lg">
              Let Property Darshan guide you to verified homes, plots and commercial investments in Lucknow.
            </p>
            <button
              onClick={() => onNavigate('properties')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-[#e3a358] to-[#d89243] hover:from-[#ecc38c] hover:to-[#df9e52] text-[#0c1829] shadow-md transition-all active:scale-95"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
