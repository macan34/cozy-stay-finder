import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Shirt,
  Wifi,
  Car,
  Wind,
  Tv,
  UtensilsCrossed,
  Refrigerator,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Tag,
  ChevronDown,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toSlug } from "@/lib/utils";



/* ================= INTERFACES ================= */
interface HomestayDetailData {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  rating: number;
  capacity: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
  location: string;
  address: string;
  images: string[];
  facilities: string[];
  rules: string[];
  coordinates?: { lat: number; lng: number };
}

// Default coordinates for fallback
const defaultCoordinates = { lat: -7.7956, lng: 110.3695 };

const WHATSAPP_NUMBER = "6285713577240";

const HomestayDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [homestay, setHomestay] = useState<HomestayDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [activeTab, setActiveTab] = useState("gallery");

  // Refs for sections
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const fasilitasRef = useRef<HTMLDivElement>(null);
  const tentangRef = useRef<HTMLDivElement>(null);
  const mapsRef = useRef<HTMLDivElement>(null);

  // Fetch homestay data from API
  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/homestays');
        if (!response.ok) {
          throw new Error('Failed to fetch homestays');
        }
        const allHomestays = await response.json();

        // Find homestay by slug
        const foundHomestay = allHomestays.find((h: any) => toSlug(h.title) === slug);

        if (foundHomestay) {
          // Transform API data to component interface
          const transformedHomestay: HomestayDetailData = {
            id: foundHomestay.id,
            slug: toSlug(foundHomestay.title),
            title: foundHomestay.title,
            description: foundHomestay.description,
            longDescription: foundHomestay.description + '\n\nHomestay ini dilengkapi dengan berbagai fasilitas untuk kenyamanan Anda selama menginap.',
            price: foundHomestay.price,
            rating: foundHomestay.rating || 9.0,
            capacity: { min: Math.max(1, foundHomestay.capacity - 2), max: foundHomestay.capacity },
            bedrooms: foundHomestay.rooms,
            bathrooms: Math.ceil(foundHomestay.rooms / 2),
            location: foundHomestay.location,
            address: foundHomestay.location + ', Yogyakarta',
            images: [foundHomestay.image, foundHomestay.image, foundHomestay.image], // Use same image for now
            facilities: foundHomestay.facilities || [],
            rules: ["Check-in: 14:00", "Check-out: 12:00", "Tidak boleh membawa hewan peliharaan", "Dilarang mengadakan pesta/acara", "Dilarang merokok di dalam ruangan"],
            coordinates: { lat: -7.7956, lng: 110.3695 }, // Default coordinates
          };
          setHomestay(transformedHomestay);
        } else {
          setError('Homestay tidak ditemukan');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load homestay');
      } finally {
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [slug]);

  const scrollToSection = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      gallery: galleryRef,
      detail: detailRef,
      fasilitas: fasilitasRef,
      tentang: tentangRef,
      maps: mapsRef,
    };
    
    const ref = refs[sectionId];
    if (ref?.current) {
      const offset = 80; // Height of sticky header
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveTab(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "gallery", ref: galleryRef },
        { id: "detail", ref: detailRef },
        { id: "fasilitas", ref: fasilitasRef },
        { id: "tentang", ref: tentangRef },
        { id: "maps", ref: mapsRef },
      ];

      const offset = 100;
      for (const section of sections.reverse()) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID").format(price || 0);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * (homestay?.price || 0); // Perbaikan di sini

const handleWhatsAppOrder = () => {
  if (!homestay) return; // Tambahkan pengecekan
  
  const homestayName = encodeURIComponent(homestay.title);
  const checkIn = encodeURIComponent(checkInDate || "Belum dipilih");
  const checkOut = encodeURIComponent(checkOutDate || "Belum dipilih");
  const guests = encodeURIComponent(guestCount.toString());
  const total = encodeURIComponent(formatPrice(totalPrice));
  
  const message = encodeURIComponent(
    `Halo, saya ingin memesan:\n\n` +
    `🏠 Homestay: ${homestay.title}\n` +
    `📅 Check-in: ${checkInDate || "Belum dipilih"}\n` +
    `📅 Check-out: ${checkOutDate || "Belum dipilih"}\n` +
    `👥 Jumlah Tamu: ${guestCount} orang\n` +
    `💰 Total: Rp ${formatPrice(totalPrice)}\n\n` +
    `Mohon konfirmasi ketersediaannya. Terima kasih!`
  );
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
};
const nextImage = () => {
  if (!homestay) return; // Tambahkan pengecekan
  setCurrentImageIndex((prev) => (prev + 1) % homestay.images.length);
};

const prevImage = () => {
  if (!homestay) return; // Tambahkan pengecekan
  setCurrentImageIndex((prev) => (prev - 1 + homestay.images.length) % homestay.images.length);
};

  const facilityIcons: { [key: string]: any } = {
    "WiFi Gratis": Wifi,
    "AC": Wind,
    "Parkir": Car,
    "Parkir Luas": Car,
    "Dapur": UtensilsCrossed,
    "TV": Tv,
    "Kulkas": Refrigerator,
    "Setrika": Shirt,
    "Kolam Renang": Bath,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat detail homestay...</p>
        </div>
      </div>
    );
  }

  if (error || !homestay) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat detail homestay</p>
          <p className="text-gray-600">{error || 'Homestay tidak ditemukan'}</p>
        </div>
      </div>
    );
  }

  const coords = homestay.coordinates || defaultCoordinates;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex">
              <button 
                onClick={() => scrollToSection("gallery")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "gallery" 
                    ? "text-white bg-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection("detail")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "detail" 
                    ? "text-white bg-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Detail
              </button>
              <button 
                onClick={() => scrollToSection("fasilitas")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "fasilitas" 
                    ? "text-white bg-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Fasilitas
              </button>
              <button 
                onClick={() => scrollToSection("tentang")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "tentang" 
                    ? "text-white bg-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Tentang
              </button>
              <button 
                onClick={() => scrollToSection("maps")}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "maps" 
                    ? "text-white bg-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Maps
              </button>
            </div>
            <Button 
              onClick={() => scrollToSection("maps")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Lihat di Maps
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div ref={galleryRef} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative aspect-video">
                <img
                  src={homestay.images[currentImageIndex]}
                  alt={`${homestay.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {homestay.images.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {homestay.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? "border-blue-600" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Room Info Icons (Detail) */}
            <div ref={detailRef} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Detail Kamar</h2>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{homestay.bedrooms}</span>
                  <span className="text-xs text-gray-500">Kamar Tidur</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                    <Bath className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{homestay.bathrooms}</span>
                  <span className="text-xs text-gray-500">Kamar Mandi</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{homestay.capacity.min} - {homestay.capacity.max}</span>
                  <span className="text-xs text-gray-500">Orang</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                    <Shirt className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">✓</span>
                  <span className="text-xs text-gray-500">Setrika</span>
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            <div ref={fasilitasRef} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Fasilitas</h2>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {homestay.facilities.map((facility, idx) => {
                  const IconComponent = facilityIcons[facility] || Wind;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-700">{facility}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About Section */}
            <div ref={tentangRef} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Tentang {homestay.title}</h2>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {homestay.longDescription}
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Peraturan</h2>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <ul className="space-y-2">
                {homestay.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-600">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Maps Section */}
            <div ref={mapsRef} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Lokasi</h2>
                <a 
                  href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  Buka di Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{homestay.address}</span>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <iframe
                  title="Lokasi Homestay"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01}%2C${coords.lat - 0.01}%2C${coords.lng + 0.01}%2C${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{homestay.title}</h3>
                <ChevronDown className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 text-sm">Mulai</span>
                <span className="text-2xl font-bold text-red-500">Rp. {formatPrice(homestay.price)}</span>
                <span className="text-gray-500 text-sm">/mlm</span>
                <Tag className="w-5 h-5 text-gray-300 ml-auto" />
              </div>

              <div className="bg-blue-50 text-blue-700 text-center py-3 rounded-lg text-sm mb-4">
                Silahkan pilih tanggal pemesanan Anda.
              </div>

              {/* Check In/Out */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check In dan Check Out
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="pl-10 text-sm"
                      placeholder="Check In"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="pl-10 text-sm"
                      min={checkInDate}
                    />
                  </div>
                </div>
              </div>

              {/* Guest Count */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Jumlah Orang
                    </label>
                    <span className="text-xs text-gray-500">(di atas 5 Tahun)</span>
                  </div>
                  <Input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min={1}
                    max={homestay.capacity.max}
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                <span className="font-medium text-gray-900">Total Harga</span>
                <span className="text-xl font-bold text-red-500">
                  Rp. {formatPrice(totalPrice)}
                </span>
              </div>

              {/* WhatsApp Order Button */}
              <Button 
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pesan via WhatsApp
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Anda cukup membayar DP sebesar 40% sebagai tanda jadi pemesanan homestay ini. Lunasi saat Check In. 
                <a href="#" className="text-blue-600 hover:underline ml-1">Lihat Selengkapnya.</a>
              </p>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">WHouse Homestay Management</h4>
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-600">{homestay.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">0858-4274-8470</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">booking@homestayjogja.co.id</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomestayDetail;
