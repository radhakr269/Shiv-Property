import React from 'react';
import { Home, Building2, Heart, Phone, Users } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'services', label: 'Services', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Phone, isContact: true },
    { id: 'about', label: 'About Us', icon: Users },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#051329]/95 backdrop-blur-lg border-t border-white/10 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] px-3 shadow-2xl"
      data-purpose="mobile-bottom-navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPage === item.id || (item.id === 'properties' && currentPage === 'property-detail');

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (item.id !== 'services') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center py-1 transition-all group focus:outline-none ${
                isActive ? 'text-[#e5b268]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="relative flex items-center justify-center mb-1">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.2] scale-110' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#e5b268]" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight leading-none transition-colors ${
                  isActive ? 'font-bold text-[#e5b268]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
