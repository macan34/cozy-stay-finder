import { useState, useEffect } from "react";
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
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import images
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";

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
}

/* ================= SAMPLE DATA ================= */
const homestayDetails: HomestayDetailData[] = [
  {
    id: 1,
    slug: "homestay-gembira-loka-2",
    title: "Homestay Gembira Loka 2",
    description: "Homestay ini berlokasi strategis di tengah Kota Yogyakarta, letaknya tidak jauh dari wisata Gembira Loka Zoo dan UAD Kampus 3.",
    longDescription: "Homestay murah di Jogja ini menawarkan berbagai macam fasilitas yang akan menjamin kenyamanan Anda selama menginap. Dengan lokasi yang strategis di tengah kota, Anda dapat dengan mudah mengakses berbagai tempat wisata dan kuliner terkenal di Yogyakarta. Homestay ini cocok untuk keluarga atau rombongan yang ingin berlibur dengan budget terjangkau namun tetap nyaman.\n\nHomestay ini dilengkapi dengan 3 kamar tidur yang nyaman, 2 kamar mandi bersih, dapur lengkap, ruang tamu yang luas, dan area parkir yang aman. Fasilitas lainnya termasuk AC, WiFi gratis, TV, kulkas, dan perlengkapan masak lengkap.\n\nLokasi homestay sangat strategis, dekat dengan Gembira Loka Zoo (±500m), UAD Kampus 3, berbagai warung makan dan minimarket. Akses ke Malioboro hanya 15 menit berkendara.",
    price: 575000,
    rating: 9.43,
    capacity: { min: 6, max: 8 },
    bedrooms: 3,
    bathrooms: 2,
    location: "KABUPATEN BANTUL",
    address: "Jl. Ireda No.43, Kota Yogyakarta, DIY",
    images: [homestay1, homestay2, homestay3, homestay4, homestay1, homestay2],
    facilities: ["WiFi Gratis", "AC", "Parkir", "Dapur", "TV", "Kulkas", "Setrika", "Kipas Angin", "Water Heater", "Perlengkapan Masak"],
    rules: ["Check-in: 14:00", "Check-out: 12:00", "Tidak boleh membawa hewan peliharaan", "Dilarang mengadakan pesta/acara", "Dilarang merokok di dalam ruangan"],
  },
  {
    id: 2,
    slug: "homestay-jec-kuning",
    title: "Homestay JEC Kuning",
    description: "Homestay di Jogja dengan kolam renang plus desain interior estetik. WHouse JEC Kuning adalah homestay yang tepat untuk staycation.",
    longDescription: "WHouse JEC Kuning adalah homestay premium di Jogja dengan kolam renang pribadi dan desain interior estetik yang instagramable. Homestay ini sangat cocok untuk Anda yang mengagendakan staycation di Jogja bersama keluarga atau teman-teman.\n\nHomestay ini memiliki 4 kamar tidur yang luas dengan AC, 3 kamar mandi bersih, kolam renang pribadi, dapur lengkap, dan ruang keluarga yang nyaman. Setiap sudut homestay dirancang dengan estetik modern yang cocok untuk spot foto.\n\nLokasi homestay dekat dengan JEC (±600m), akses mudah ke berbagai tempat wisata dan kuliner Yogyakarta.",
    price: 850000,
    rating: 9.53,
    capacity: { min: 15, max: 18 },
    bedrooms: 4,
    bathrooms: 3,
    location: "KOTA YOGYAKARTA",
    address: "Jl. Ring Road Timur, Kota Yogyakarta, DIY",
    images: [homestay2, homestay3, homestay4, homestay1, homestay2, homestay3],
    facilities: ["Kolam Renang", "WiFi Gratis", "AC", "Parkir", "Dapur", "TV", "Kulkas", "Setrika", "Water Heater", "BBQ Area"],
    rules: ["Check-in: 14:00", "Check-out: 12:00", "Tidak boleh membawa hewan peliharaan", "Dilarang mengadakan pesta/acara besar", "Anak-anak harus diawasi saat berenang"],
  },
  {
    id: 3,
    slug: "homestay-gembira-loka",
    title: "Homestay Gembira Loka",
    description: "Homestay ini cocok untuk rombongan karena memiliki ruangan yang cukup luas dengan suasana asri dan lingkungan tenang.",
    longDescription: "Homestay Gembira Loka adalah pilihan tepat untuk Anda yang mencari akomodasi dengan suasana asri dan lingkungan yang tenang. Cocok untuk rombongan keluarga atau gathering bersama teman-teman.\n\nHomestay ini memiliki 4 kamar tidur dengan kapasitas hingga 16 orang, 2 kamar mandi, dapur lengkap, ruang keluarga luas, dan taman yang asri. Suasana tenang dan jauh dari keramaian membuat homestay ini cocok untuk relaksasi.\n\nLokasi dekat dengan Gembira Loka Zoo dan berbagai tempat wisata di Yogyakarta.",
    price: 720000,
    rating: 9.47,
    capacity: { min: 12, max: 16 },
    bedrooms: 4,
    bathrooms: 2,
    location: "KOTA YOGYAKARTA",
    address: "Jl. Gembira Loka, Kota Yogyakarta, DIY",
    images: [homestay3, homestay4, homestay1, homestay2, homestay3, homestay4],
    facilities: ["WiFi Gratis", "AC", "Parkir Luas", "Dapur", "TV", "Kipas Angin", "Setrika", "Taman", "Ruang Keluarga Luas"],
    rules: ["Check-in: 14:00", "Check-out: 12:00", "Tidak boleh membawa hewan peliharaan", "Jaga kebersihan lingkungan"],
  },
];

// Default homestay for any slug not found
const defaultHomestay: HomestayDetailData = {
  id: 0,
  slug: "default",
  title: "Homestay Ambarukmo 2",
  description: "Homestay murah di Jogja dengan fasilitas lengkap dan lokasi strategis.",
  longDescription: "Homestay murah di Jogja ini menawarkan berbagai macam fasilitas yang akan menjamin kenyamanan Anda selama menginap. Dengan lokasi yang strategis, Anda dapat dengan mudah mengakses berbagai tempat wisata dan kuliner terkenal di Yogyakarta.\n\nHomestay ini dilengkapi dengan 3 kamar tidur yang nyaman, 2 kamar mandi bersih, dapur lengkap, ruang tamu yang luas, dan area parkir yang aman. Fasilitas lainnya termasuk AC, WiFi gratis, TV, kulkas, dan perlengkapan masak lengkap.\n\nLokasi homestay sangat strategis, dekat dengan berbagai destinasi wisata Yogyakarta. Akses ke Malioboro hanya 15 menit berkendara.",
  price: 575000,
  rating: 9.43,
  capacity: { min: 6, max: 8 },
  bedrooms: 3,
  bathrooms: 2,
  location: "KOTA YOGYAKARTA",
  address: "Jl. Ireda No.43, Kota Yogyakarta, DIY",
  images: [homestay1, homestay2, homestay3, homestay4, homestay1, homestay2],
  facilities: ["WiFi Gratis", "AC", "Parkir", "Dapur", "TV", "Kulkas", "Setrika", "Kipas Angin", "Water Heater", "Perlengkapan Masak"],
  rules: ["Check-in: 14:00", "Check-out: 12:00", "Tidak boleh membawa hewan peliharaan", "Dilarang mengadakan pesta/acara", "Dilarang merokok di dalam ruangan"],
};

const WHATSAPP_NUMBER = "6285713577240";

const HomestayDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  // Find homestay by slug or use default
  const homestay = homestayDetails.find((h) => h.slug === slug) || { ...defaultHomestay, title: slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || defaultHomestay.title };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * homestay.price;

  const handleWhatsAppOrder = () => {
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
    setCurrentImageIndex((prev) => (prev + 1) % homestay.images.length);
  };

  const prevImage = () => {
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

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex">
              <button className="px-6 py-4 text-sm font-medium text-white bg-blue-600 border-b-2 border-blue-600">
                Gallery
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600">
                Detail
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600">
                Fasilitas
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600">
                Tentang
              </button>
              <button className="px-6 py-4 text-sm font-medium text-gray-600 hover:text-blue-600">
                Reviews
              </button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
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

            {/* Room Info Icons */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-600">Tentang {homestay.title}</h2>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {homestay.longDescription}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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

            {/* Rules Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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
