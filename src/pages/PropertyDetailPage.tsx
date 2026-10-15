import React, { useState } from 'react';
import {
  MapPin,
  Home as HomeIcon,
  Heart,
  Bed,
  Bath,
  Maximize2,
  Building,
  ShieldCheck,
  Calendar,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Images,
  Calculator,
  Compass,
  CheckCircle2,
  Check,
  Layers,
  Waves,
  Utensils,
  Leaf,
  Columns,
  Armchair,
  Lock,
  Warehouse,
  Zap,
  CloudRain,
} from 'lucide-react';
import { Property, PROPERTIES } from '../data/propertiesData';
import { IMAGES } from '../data/imageConfig';
import { ScheduleVisitModal } from '../components/ScheduleVisitModal';
import { LoanEstimateModal } from '../components/LoanEstimateModal';
import { GalleryModal } from '../components/GalleryModal';
import { CONTACT_CONFIG } from '../data/contactConfig';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface PropertyDetailPageProps {
  property: Property;
  onNavigate: (page: string, propertySlug?: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onNavigate,
  favorites,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Floor Plan' | 'Amenities' | 'Location' | 'Price Details' | 'Contact'>('Overview');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const isFav = favorites.includes(property.id);

  const similarProperties = PROPERTIES.filter((p) => p.id !== property.id).slice(0, 4);

  const openGalleryAt = (idx: number) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  const featureIconsMap: Record<string, React.ReactNode> = {
    water: <Waves className="w-5 h-5" />,
    utensils: <Utensils className="w-5 h-5" />,
    leaf: <Leaf className="w-5 h-5" />,
    columns: <Columns className="w-5 h-5" />,
    couch: <Armchair className="w-5 h-5" />,
    shield: <ShieldCheck className="w-5 h-5" />,
    warehouse: <Warehouse className="w-5 h-5" />,
    bolt: <Zap className="w-5 h-5" />,
    gate: <Layers className="w-5 h-5" />,
    tint: <CloudRain className="w-5 h-5" />,
  };

  return (
    <div className="w-full bg-[#fcfcfd] pb-24 md:pb-0">
      {/* ================= BREADCRUMBS & COUNTER ================= */}
      <section className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 pt-5 pb-3">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          {/* Breadcrumbs List */}
          <nav className="flex items-center space-x-2">
            <button onClick={() => onNavigate('home')} className="hover:text-slate-900 transition-colors">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <button onClick={() => onNavigate('properties')} className="hover:text-slate-900 transition-colors">
              Properties
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-slate-800 font-medium">{property.title}</span>
          </nav>

          {/* Pagination Nav Controls */}
          <div className="flex items-center space-x-3 text-xs text-gray-600 font-medium">
            <button
              onClick={() =>
                openGalleryAt(galleryIndex > 0 ? galleryIndex - 1 : Math.max(0, property.gallery.length - 1))
              }
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-700" />
            </button>
            <span className="tracking-widest font-semibold text-slate-700">
              {property.gallery.length > 0 ? `${galleryIndex + 1} / ${property.gallery.length}` : '1 / 1'}
            </span>
            <button
              onClick={() =>
                openGalleryAt(property.gallery.length > 0 ? (galleryIndex + 1) % property.gallery.length : 0)
              }
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SHOWCASE GRID ================= */}
      <section className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 mb-7" data-purpose="property-photo-gallery">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 h-auto lg:h-[450px]">
          {/* Big Hero Villa Image (Left) */}
          <div
            className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm group h-[320px] lg:h-full bg-slate-900 cursor-pointer"
            onClick={() => openGalleryAt(0)}
          >
            <img
              src={property.gallery[0] || property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            {/* For Sale Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
              <span className="bg-[#b47a32] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md tracking-wide">
                {property.tag}
              </span>
              {property.isDemo && (
                <span className="bg-[#071426]/85 backdrop-blur-sm text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-300/30">
                  Sample Listing
                </span>
              )}
            </div>
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(property.id);
              }}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
              aria-label="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            {/* View Gallery Pill */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGalleryOpen(true);
              }}
              className="absolute bottom-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-md transition border border-white/20"
            >
              <Images className="w-4 h-4" />
              <span>View Gallery ({property.gallery.length})</span>
            </button>
          </div>

          {/* Right 2x2 Gallery Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-rows-2 gap-3.5 h-[240px] lg:h-full">
            {/* Top Left: Living Room */}
            <div
              className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer"
              onClick={() => openGalleryAt(1)}
            >
              <img
                src={property.gallery[1] || IMAGES.gallery.living}
                alt="Living room"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Top Right: Pool Area */}
            <div
              className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer"
              onClick={() => openGalleryAt(2)}
            >
              <img
                src={property.gallery[2] || IMAGES.gallery.pool}
                alt="Patio lounge with pool"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Bottom Left: Evening pool view */}
            <div
              className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer"
              onClick={() => openGalleryAt(3)}
            >
              <img
                src={property.gallery[3] || IMAGES.gallery.evening}
                alt="Villa evening lighting"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Bottom Right: Master Bedroom */}
            <div
              className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer"
              onClick={() => openGalleryAt(4)}
            >
              <img
                src={property.gallery[4] || IMAGES.gallery.bedroom}
                alt="Master bedroom"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN PROPERTY CONTENT ================= */}
      <main className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <section className="lg:col-span-8 space-y-6" data-purpose="property-detailed-info">
            {/* Title, Price & Quick Badges Container */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Title & Location */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#051329] tracking-tight">{property.title}</h1>
                  <div className="flex items-center text-slate-500 mt-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-[#b47a32] mr-2 shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Price Block & Loan CTA */}
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-baseline md:justify-end gap-2">
                    <span className="text-3xl font-extrabold text-[#051329]">{property.price}</span>
                    {property.priceLabel && (
                      <span className="text-xs text-slate-400 font-medium">{property.priceLabel}</span>
                    )}
                  </div>
                  {/* Get Loan Estimate Button */}
                  <button
                    onClick={() => setLoanModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#fdf8f0] border border-[#f3e5cd] hover:border-[#d4a359] text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl transition"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#b47a32]" />
                    <span>Get Loan Estimate</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Quick Spec Chips row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Bed className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{property.bhk || '4 BHK'}</p>
                    <p className="text-xs text-slate-400">Bedrooms</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Bath className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{property.baths || '4 Baths'}</p>
                    <p className="text-xs text-slate-400">Bathrooms</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Maximize2 className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{property.area}</p>
                    <p className="text-xs text-slate-400">Super Built-up Area</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Building className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{property.type}</p>
                    <p className="text-xs text-slate-400">Property Type</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Showcase / Demo Listing Highlight Banner */}
            <div className="bg-[#fef9f0] border border-[#f5e4c8] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center space-x-2 text-[#b0742a] font-bold text-sm whitespace-nowrap min-w-[170px]">
                <span className="w-7 h-7 rounded-full bg-[#faecd6] flex items-center justify-center text-[#b0742a] text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span>Portfolio Showcase</span>
              </div>
              <div className="text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t md:border-t-0 md:border-l border-amber-200/60 pt-2 md:pt-0 md:pl-4">
                Showcase concepts for Rudrapur &amp; Udham Singh Nagar corridor. Pricing, floor dimensions, and specifications are indicative.
                Contact our property advisors for active inventory, on-site walkthroughs, and local title guidance.
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm flex items-center overflow-x-auto text-xs sm:text-sm font-semibold">
              {(['Overview', 'Floor Plan', 'Amenities', 'Location', 'Price Details', 'Contact'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'bg-[#051329] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Tab: Overview (Narrative & Key Specs Table) */}
            {activeTab === 'Overview' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Narrative Column */}
                  <div className="md:col-span-7">
                    <h2 className="text-xl font-bold text-slate-900 mb-3.5">Property Overview</h2>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {property.longOverview}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Positioned with convenient access to key highway corridors, connecting Rudrapur, Dineshpur, Pantnagar, and Kichha across Udham Singh Nagar.
                    </p>
                  </div>

                  {/* Specs Table Column */}
                  <div className="md:col-span-5 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                    <dl className="divide-y divide-slate-200 text-xs sm:text-[13px]">
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Property ID</dt>
                        <dd className="text-slate-900 font-semibold">{property.id}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">RERA Registered</dt>
                        <dd className="text-slate-900 font-semibold">{property.reraRegistered || 'Inquire for Title Details'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Possession Status</dt>
                        <dd className="text-slate-900 font-semibold">{property.possession || 'Inquire for Timelines'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Furnishing</dt>
                        <dd className="text-slate-900 font-semibold">{property.furnishing || 'Semi-Furnished'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Facing</dt>
                        <dd className="text-slate-900 font-semibold">{property.facing || 'East Facing'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Total Floors</dt>
                        <dd className="text-slate-900 font-semibold">{property.floors || 'G+1'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Parking</dt>
                        <dd className="text-slate-900 font-semibold">{property.parking || '2 Covered'}</dd>
                      </div>
                      <div className="flex justify-between py-2">
                        <dt className="text-slate-500 font-medium">Age of Property</dt>
                        <dd className="text-slate-900 font-semibold">{property.ageOfProperty || 'Inquire for Details'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Floor Plan */}
            {activeTab === 'Floor Plan' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Architectural Floor Plan</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Ground Floor: Foyer, Double-height Grand Living Hall, Dining Room, Modular Island Kitchen with Utility, Guest Bedroom with attached Bath, Powder Room, and Private Pool deck.
                  <br />
                  First Floor: Master Suite with Walk-in Wardrobe & Balcony, 2 En-suite Bedrooms, Family Lounge, and Open Terrace.
                </p>
                <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-slate-300 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-[#d4a359] shadow-sm">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Super Built-up Area: {property.area}</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Contact our property advisor to receive high-resolution CAD floor plans and structural blueprints.
                  </p>
                  <button
                    onClick={() => setScheduleModalOpen(true)}
                    className="mt-4 px-5 py-2 bg-[#051329] text-white text-xs font-semibold rounded-full"
                  >
                    Request Blueprint PDF
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Amenities */}
            {activeTab === 'Amenities' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Clubhouse & Community Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-700">
                  {[
                    'Swimming Pool with Sun Deck',
                    'Fully Equipped Gymnasium',
                    '24/7 CCTV & Security Patrol',
                    'High-speed Elevators',
                    'Intercom Facility',
                    'EV Charging Station',
                    'Jogging & Cycling Track',
                    'Badminton & Tennis Court',
                    'Solar Powered Street Lights',
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50">
                      <Check className="w-4 h-4 text-[#d4a359] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Location */}
            {activeTab === 'Location' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Neighbourhood &amp; Connectivity</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900">Commercial &amp; Transit Hubs</h4>
                    <p className="text-slate-600">Metropolis City Mall - 8 mins</p>
                    <p className="text-slate-600">Rudrapur Railway Station - 10 mins</p>
                    <p className="text-slate-600">Kichha Road Industrial Corridor - 6 mins</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                    <h4 className="font-bold text-slate-900">Healthcare &amp; Education</h4>
                    <p className="text-slate-600">District Hospital &amp; Medical Centers - 8 mins</p>
                    <p className="text-slate-600">Pantnagar Airport Corridor - 15 mins</p>
                    <p className="text-slate-600">Reputed Schools &amp; Colleges - 5 mins</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Price Details */}
            {activeTab === 'Price Details' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Transparent Pricing Breakdown</h2>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Base Property Cost</span>
                    <span className="font-bold text-slate-900">{property.price}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Estimated Registration &amp; Stamp Duty</span>
                    <span className="font-bold text-slate-900">Subject to Uttarakhand Revenue circle rates</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Maintenance Advance</span>
                    <span className="font-bold text-slate-900">As applicable</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-600">Brokerage / Hidden Fees</span>
                    <span className="font-bold text-emerald-600">ZERO (Direct Consultation)</span>
                  </div>
                </div>
                <button
                  onClick={() => setLoanModalOpen(true)}
                  className="mt-2 text-xs font-bold text-[#b47a32] hover:underline flex items-center gap-1"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculate Custom EMI for this property</span>
                </button>
              </div>
            )}

            {/* Tab: Contact */}
            {activeTab === 'Contact' && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Direct Advisor Desk</h2>
                <p className="text-xs text-slate-600">
                  Call or WhatsApp our dedicated Rudrapur property advisors for immediate pricing discussions, site visits, or tailored queries:
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={CONTACT_CONFIG.getTelLink()}
                    className="px-5 py-2.5 bg-[#b87834] text-white text-xs font-semibold rounded-full flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {CONTACT_CONFIG.displayPhones}</span>
                  </a>
                  <a
                    href={CONTACT_CONFIG.getWhatsAppLink(property.title, property.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#00a859] text-white text-xs font-semibold rounded-full flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            )}

            {/* Key Features Section (All 10 features as shown in Stitch design) */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm" data-purpose="features-amenities-section">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-7 gap-x-4 text-center">
                {(property.features || [
                  { title: 'Private Swimming Pool', icon: 'water' },
                  { title: 'Modular Kitchen', icon: 'utensils' },
                  { title: 'Landscaped Garden', icon: 'leaf' },
                  { title: 'Spacious Balcony', icon: 'columns' },
                  { title: 'Premium Interiors', icon: 'couch' },
                  { title: '24/7 Security', icon: 'shield' },
                  { title: 'Covered Parking', icon: 'warehouse' },
                  { title: 'Power Backup', icon: 'bolt' },
                  { title: 'Gated Community', icon: 'gate' },
                  { title: 'Rainwater Harvesting', icon: 'tint' },
                ]).map((feat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#fcf8f2] border border-[#f3e5ce] flex items-center justify-center text-[#b87834] mb-2.5 shadow-xs">
                      {featureIconsMap[feat.icon] || <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 leading-snug">
                      {feat.title.split(' ')[0]}
                      <br />
                      {feat.title.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= RIGHT COLUMN: Sticky Lead Box & Map ================= */}
          <aside className="lg:col-span-4 space-y-6" data-purpose="sidebar-cta-and-location">
            {/* Contact & Booking CTA Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm" data-purpose="lead-capture-card">
              <h3 className="text-xl font-bold text-slate-900 leading-snug">Interested in this Property?</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">Get more details or schedule a site visit.</p>

              {/* Buttons Group */}
              <div className="space-y-3">
                {/* Call Button */}
                <a
                  className="w-full bg-[#b87834] hover:bg-[#a36829] text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 transition shadow-xs"
                  href={CONTACT_CONFIG.getTelLink()}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  className="w-full bg-[#00a859] hover:bg-[#00924d] text-white font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 transition shadow-xs"
                  href={CONTACT_CONFIG.getWhatsAppLink(property.title, property.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Enquiry</span>
                </a>

                {/* Schedule Visit Button */}
                <button
                  onClick={() => setScheduleModalOpen(true)}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2.5 transition shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Schedule a Site Visit</span>
                </button>
              </div>

              {/* Trust Badges Under Buttons */}
              <div className="grid grid-cols-3 gap-2 text-center pt-6 mt-6 border-t border-slate-100">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#fbf5ea] text-[#b87834] flex items-center justify-center text-xs mb-1.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Guided Site Tours
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#fbf5ea] text-[#b87834] flex items-center justify-center text-xs mb-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Expert Guidance at Every Step
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#fbf5ea] text-[#b87834] flex items-center justify-center text-xs mb-1.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Best Deals &amp; Transparent Pricing
                  </span>
                </div>
              </div>
            </div>

            {/* Location & Map Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm" data-purpose="location-map-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Location</h3>
                <a
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1 transition"
                  href="https://maps.google.com/?q=Rudrapur+Udham+Singh+Nagar+Uttarakhand"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>View on Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map Graphic Preview matching Stitch SVG illustration */}
              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-slate-200 bg-[#e5e3df]">
                <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#f0ede5" height="250" width="400"></rect>
                  {/* Kalyani River Corridor */}
                  <path d="M-10 160 C 80 140, 120 180, 220 155 C 270 140, 310 180, 410 160" fill="none" stroke="#bfd9f2" strokeLinecap="round" strokeWidth="22"></path>
                  <path d="M-10 160 C 80 140, 120 180, 220 155 C 270 140, 310 180, 410 160" fill="none" stroke="#9bc6ea" strokeLinecap="round" strokeWidth="12"></path>
                  {/* Roads */}
                  <path d="M30 -10 L140 260" stroke="#ffffff" strokeWidth="10"></path>
                  <path d="M30 -10 L140 260" stroke="#f6c280" strokeWidth="4"></path>
                  <path d="M410 30 L-10 190" stroke="#ffffff" strokeWidth="14"></path>
                  <path d="M410 30 L-10 190" stroke="#e0ded6" strokeWidth="8"></path>
                  {/* Nainital Highway Arterial */}
                  <path d="M220 -20 Q350 100, 380 260" stroke="#ffffff" strokeWidth="12"></path>
                  <path d="M220 -20 Q350 100, 380 260" stroke="#ffd180" strokeWidth="6"></path>
                  <path d="M70 70 L350 70" stroke="#ffffff" strokeWidth="6"></path>
                  <path d="M70 70 L350 70" stroke="#d5d3ca" strokeWidth="3"></path>
                  {/* Landmark Labels */}
                  <text fill="#71717a" fontSize="9" fontWeight="600" x="270" y="65">Nainital Highway</text>
                  <text fill="#71717a" fontSize="9" fontWeight="600" x="260" y="195">Dineshpur Road</text>
                  <circle cx="250" cy="85" fill="#e11d48" r="4"></circle>
                  <text fill="#475569" fontSize="9" fontWeight="600" x="258" y="88">Rudrapur City</text>
                  <circle cx="340" cy="115" fill="#0284c7" r="4"></circle>
                  <text fill="#475569" fontSize="8.5" fontWeight="600" x="330" y="118">Metropolis Mall</text>
                  <circle cx="280" cy="170" fill="#059669" r="4"></circle>
                  <text fill="#475569" fontSize="8.5" fontWeight="600" x="230" y="174">Kichha Corridor</text>
                  {/* Central Red Pin */}
                  <g transform="translate(275, 95)">
                    <ellipse cx="12" cy="28" fill="rgba(0,0,0,0.2)" rx="7" ry="3"></ellipse>
                    <path d="M12 0C5.37 0 0 5.37 0 12C0 21 12 30 12 30C12 30 24 21 24 12C24 5.37 18.63 0 12 0Z" fill="#dc2626"></path>
                    <circle cx="12" cy="11" fill="#ffffff" r="5"></circle>
                  </g>
                </svg>

                {/* Floating Current Location Pill */}
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg shadow-xs border border-slate-200/80 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b87834]" />
                  <span className="text-[11px] font-bold text-slate-800">{property.location}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ================= FULL WIDTH SECTION: Similar Properties ================= */}
        <section className="mt-14" data-purpose="similar-properties-carousel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Similar Properties</h2>
            <button
              onClick={() => onNavigate('properties')}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 flex items-center space-x-1"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Properties Grid: 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarProperties.map((simProp) => {
              const isSimFav = favorites.includes(simProp.id);
              return (
                <article
                  key={simProp.id}
                  onClick={() => onNavigate('property-detail', simProp.slug)}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition group cursor-pointer"
                >
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={simProp.image}
                      alt={simProp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#b47a32] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-xs">
                      {simProp.tag}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(simProp.id);
                      }}
                      className="absolute top-3 right-3 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full backdrop-blur-xs transition"
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSimFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#b47a32] transition">
                      {simProp.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate">{simProp.location}</span>
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                      {simProp.bhk && (
                        <span>
                          <Bed className="w-3 h-3 inline mr-1" />
                          {simProp.bhk}
                        </span>
                      )}
                      <span>
                        <Maximize2 className="w-3 h-3 inline mr-1" />
                        {simProp.area}
                      </span>
                    </div>
                    <div className="mt-3.5 flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-base">{simProp.price}</span>
                      <button
                        aria-label="View property"
                        className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* ================= PRE-FOOTER CTA BANNER ================= */}
      <section className="bg-[#051329] text-white py-8 border-b border-slate-800" data-purpose="dream-property-banner">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Find Your Dream Property</h2>
              <p className="text-[#d4a359] font-medium text-base">with Shiv Property Uttarakhand</p>
            </div>
            <div className="hidden sm:block h-10 w-[1px] bg-slate-700"></div>
            <p className="text-xs text-slate-300 max-w-sm">
              Get local guidance, personalized property tours and the best opportunities in Rudrapur.
            </p>
          </div>
          <div>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#d4a359] hover:bg-[#c2934a] text-slate-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center space-x-2 transition shadow-xs active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= MOBILE STICKY BOTTOM ACTION BAR (Matching Mobile 4.png) ================= */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-4 py-3 z-40 shadow-2xl flex items-center gap-3">
        <a
          href={CONTACT_CONFIG.getTelLink()}
          className="flex-1 flex items-center justify-center bg-[#071426] text-white py-3 px-3 rounded-xl font-semibold text-sm shadow-xs"
        >
          <Phone className="w-4 h-4 mr-2" />
          <span>Call Now</span>
        </a>
        <a
          href={CONTACT_CONFIG.getWhatsAppLink(property.title, property.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center bg-[#00874c] hover:bg-[#007441] text-white py-3 px-3 rounded-xl font-semibold text-sm shadow-xs"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Modals */}
      <ScheduleVisitModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
      <LoanEstimateModal
        property={property}
        isOpen={loanModalOpen}
        onClose={() => setLoanModalOpen(false)}
      />
      <GalleryModal
        images={property.gallery}
        title={property.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
      />
    </div>
  );
};
