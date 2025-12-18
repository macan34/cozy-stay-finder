import { X, Star, Users, MapPin, Wifi, Car, Coffee, Tv, Wind, UtensilsCrossed, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import ImageGallery from './ImageGallery';

interface HomestayModalProps {
  isOpen: boolean;
  onClose: () => void;
  homestay: {
    id?: number;
    image?: string;
    images?: string[];
    title: string;
    description: string;
    price: number;
    location?: string;
    rating?: number;
    capacity?: number;
  };
}

const facilities = [
  { icon: Wifi, label: 'WiFi Gratis' },
  { icon: Car, label: 'Parkir' },
  { icon: Coffee, label: 'Dapur' },
  { icon: Tv, label: 'TV' },
  { icon: Wind, label: 'AC' },
  { icon: UtensilsCrossed, label: 'Breakfast' },
];

const HomestayModal = ({ isOpen, onClose, homestay }: HomestayModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slide-down">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{homestay.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Image Gallery */}
          <div className="relative aspect-video">
            <img
              src={homestay.image}
              alt={homestay.title}
              className="w-full h-full object-cover"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 rounded-full flex items-center justify-center hover:bg-card transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 rounded-full flex items-center justify-center hover:bg-card transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="p-6">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {homestay.location && (
                <span className="flex items-center gap-1 text-primary text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {homestay.location}
                </span>
              )}
              {homestay.rating && (
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <strong>{homestay.rating.toFixed(2)}</strong>
                  <span className="text-muted-foreground">(120 ulasan)</span>
                </span>
              )}
              {homestay.capacity && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {homestay.capacity} orang
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              {homestay.description} Homestay ini memiliki suasana yang nyaman dan asri, cocok untuk liburan bersama keluarga atau teman. Lokasi strategis dekat dengan berbagai tempat wisata populer di Yogyakarta.
            </p>

            {/* Facilities */}
            <h3 className="font-semibold text-foreground mb-3">Fasilitas</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {facilities.map((facility) => (
                <div key={facility.label} className="flex flex-col items-center gap-2 p-3 bg-muted rounded-lg">
                  <facility.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-center text-muted-foreground">{facility.label}</span>
                </div>
              ))}
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-2xl font-bold text-primary">
                  Rp {formatPrice(homestay.price)}
                </span>
                <span className="text-muted-foreground"> / malam</span>
              </div>
              <button
                className="btn-primary"
                onClick={() => {
                  addToCart({
                    id: homestay.id || Math.random(),
                    name: homestay.title,
                    price: homestay.price,
                    image: homestay.image,
                  });
                  onClose();
                }}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomestayModal;