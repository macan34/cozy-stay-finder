import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';
import heroBg2 from '@/assets/hero-bg2.jpg';
// import heroBg3 from '@/assets/hero-bg3.jpg';
// import heroBg4 from '@/assets/hero-bg4.jpg';
// import heroBg5 from '@/assets/hero-bg5.jpg';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array gambar untuk slider - tambahkan gambar lainnya dengan meng-uncomment import di atas
  const sliderImages = [
    heroBg,
    heroBg2,
    // heroBg3,
    // heroBg4,
    // heroBg5,
  ];

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location && !checkIn && !checkOut && !guests) {
      toast({
        title: "Isi form pencarian",
        description: "Silakan isi minimal satu field untuk mencari homestay.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Mencari homestay...",
      description: `Mencari homestay ${location ? `di ${location}` : ''} ${checkIn ? `dari ${checkIn}` : ''} ${guests ? `untuk ${guests} orang` : ''}`.trim(),
    });
  };

  const handleClearLocation = () => {
    setLocation('');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-header/60" />

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="container relative z-10 py-12 md:py-20">
        {/* Stars decoration */}
        <div className="flex justify-center gap-2 mb-6">
          <span className="text-accent text-lg">✦</span>
          <span className="text-accent text-2xl">★</span>
          <span className="text-accent text-lg">✦</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-primary-foreground">
          Booking Homestay di Jogja
        </h1>
        
        {/* Underline */}
        <div className="w-16 h-1 bg-accent mx-auto mb-6" />
        
        {/* Subtitle */}
        <p className="text-center text-primary-foreground/90 text-lg mb-10 max-w-2xl mx-auto">
          Tersedia lebih dari 200 Homestay yang siap dipesan! Jaminan Pelayanan dan Ketersediaan Sesuai Aplikasi!
        </p>

        {/* Search Card */}
        <div className="search-card max-w-4xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Mau ke mana nih?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="search-input pl-10 pr-10"
                />
                {location && (
                  <button
                    type="button"
                    onClick={handleClearLocation}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive hover:opacity-70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Date */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Buat Kapan Nih?"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                  className="search-input pl-10 pr-10"
                />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
              </div>

              {/* Guests */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  placeholder="Jumlah Orang"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  className="search-input pl-10"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Cari Homestay</span>
              </button>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-accent/50 mx-auto my-8" />

        {/* Browse All Link */}
        <div className="text-center">
          <p className="text-primary-foreground/90 mb-4">
            Belum menentukan tanggal? Lihat-lihat semua homestay-nya dulu yuk!!!
          </p>
          <a
            href="#explore"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>Lihat Semua Homestay &gt;&gt;</span>
            <div className="w-8 h-8 bg-accent-foreground/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Scroll Down Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#explore"
            className="bg-accent hover:bg-accent/90 text-accent-foreground p-3 rounded-lg transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;