/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PROPERTIES, Property } from './data/propertiesData';
import { X, Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'property-detail' | 'about' | 'services' | 'contact'>('home');
  const [selectedPropertySlug, setSelectedPropertySlug] = useState<string>(PROPERTIES[0]?.slug || 'residential-plot-dineshpur-road');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('shiv_property_favorites') || localStorage.getItem('property_darshan_favorites');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const validIds = new Set(PROPERTIES.map((p) => p.id));
        return parsed.filter((id) => typeof id === 'string' && validIds.has(id));
      }
      return [];
    } catch {
      return [];
    }
  });
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<{ location: string; type: string; budget: string }>({
    location: 'Rudrapur',
    type: 'Any',
    budget: 'Any',
  });

  useEffect(() => {
    try {
      localStorage.setItem('shiv_property_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Sync route with URL hash for predictable back/forward and refresh support
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
      } else if (hash === 'services') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else if (hash === 'properties') {
        setCurrentPage('properties');
      } else if (hash.startsWith('property/')) {
        const slug = hash.replace('property/', '');
        if (slug) {
          setSelectedPropertySlug(slug);
          setCurrentPage('property-detail');
        }
      } else if (hash === 'about' || hash === 'contact') {
        setCurrentPage(hash as any);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleNavigate = (page: string, param?: string) => {
    if (page === 'services') {
      window.location.hash = '#/services';
      if (currentPage === 'home') {
        const el = document.getElementById('services');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (page === 'properties') {
      if (param && ['Villa', 'Plot', 'House', 'Apartment', 'Commercial', 'All'].includes(param)) {
        setSearchFilters((prev) => ({ ...prev, type: param === 'All' ? 'Any' : param }));
      }
      window.location.hash = '#/properties';
      setCurrentPage('properties');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'property-detail' && param) {
      setSelectedPropertySlug(param);
      window.location.hash = `#/property/${param}`;
      setCurrentPage('property-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (param) {
      setSelectedPropertySlug(param);
    }
    window.location.hash = `#/${page}`;
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (filters: { location: string; type: string; budget: string }) => {
    setSearchFilters(filters);
  };

  const selectedProperty =
    PROPERTIES.find((p) => p.slug === selectedPropertySlug) || PROPERTIES[0];

  const favoritedProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-slate-800 font-sans selection:bg-[#dfb268] selection:text-[#071426]">
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            properties={PROPERTIES}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSearch={handleHeroSearch}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            properties={PROPERTIES}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            initialFilters={searchFilters}
          />
        )}

        {currentPage === 'property-detail' && (
          <PropertyDetailPage
            property={selectedProperty}
            onNavigate={handleNavigate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} variant="full" />

      {/* Mobile Sticky Bottom Bar (Active on Home, Properties, Contact, About) */}
      <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Favorites Modal Drawer */}
      {favoritesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="text-lg font-bold">Saved Properties ({favoritedProperties.length})</h3>
              </div>
              <button
                onClick={() => setFavoritesModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-3">
              {favoritedProperties.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  <p>You haven&apos;t saved any properties yet.</p>
                  <button
                    onClick={() => {
                      setFavoritesModalOpen(false);
                      handleNavigate('properties');
                    }}
                    className="mt-3 px-5 py-2 rounded-full bg-[#071426] text-white text-xs font-semibold"
                  >
                    Browse Listings
                  </button>
                </div>
              ) : (
                favoritedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50"
                  >
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{prop.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{prop.location}</p>
                      <p className="text-xs font-extrabold text-[#071426] mt-0.5">{prop.price}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setFavoritesModalOpen(false);
                          handleNavigate('property-detail', prop.slug);
                        }}
                        className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#d4a359] hover:text-white flex items-center justify-center text-slate-700 transition"
                        title="View details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(prop.id)}
                        className="w-8 h-8 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center transition"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {favoritedProperties.length > 0 && (
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <button
                  onClick={() => setFavorites([])}
                  className="text-slate-400 hover:text-rose-500 font-medium"
                >
                  Clear all
                </button>
                <button
                  onClick={() => {
                    setFavoritesModalOpen(false);
                    handleNavigate('contact');
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#d4a359] to-[#c58e3d] text-slate-900 font-bold"
                >
                  Enquire About All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
