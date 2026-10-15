import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface GalleryModalProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  title,
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1)));
    }
  }, [isOpen, initialIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 max-w-6xl mx-auto w-full">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400">
            Photo {currentIndex + 1} of {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
          aria-label="Close Gallery"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Showcase Stage */}
      <div className="relative flex-1 flex items-center justify-center py-4 max-w-5xl mx-auto w-full">
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="w-full h-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={images[currentIndex]}
            alt={`${title} - photo ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
          />
        </div>

        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnails Strip */}
      <div className="max-w-4xl mx-auto w-full overflow-x-auto no-scrollbar pt-2 flex items-center justify-center gap-2.5">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${
              currentIndex === idx ? 'border-[#d4a359] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
