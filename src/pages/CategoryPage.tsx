import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Search, Bed } from "lucide-react";
import { exploreCategories } from "./Explore";

// Import images
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";

/* ================= INTERFACES ================= */
interface Homestay {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  capacity: number;
  rooms: number;
  location: string;
  distance: string;
  facilities: string[];
}

/* ================= SAMPLE DATA FOR CATEGORY ================= */
const categoryHomestays: Homestay[] = [
  {
    id: 1,
    image: homestay1,
    title: "Homestay Gembira Loka 2",
    description: "Homestay ini berlokasi strategis di tengah Kota Yogyakarta, letaknya tidak jauh dari wisata Gembira Loka Zoo dan UAD Kampus 3. Disekitar homestay terdapat berbagai macam kuliner dan minimarket yang a...",
    price: 780000,
    rating: 9.43,
    capacity: 15,
    rooms: 4,
    location: "KABUPATEN BANTUL",
    distance: "± 0.5KM",
    facilities: ["Garasi", "AC", "Dapur", "Kipas Angin", "Kulkas"],
  },
  {
    id: 2,
    image: homestay2,
    title: "Homestay JEC Kuning",
    description: "Homestay di Jogja dengan kolam renang plus desain interior estetik??? WHouse JEC Kuning adalah homestay yang tepat apalagi jika Anda mengagendakan staycation di Jogja. Homestay ini juga privat, artin...",
    price: 850000,
    rating: 9.53,
    capacity: 18,
    rooms: 4,
    location: "KOTA YOGYAKARTA",
    distance: "± 0.6KM",
    facilities: ["Garasi", "AC", "Dapur", "Kolam Renang", "WiFi"],
  },
  {
    id: 3,
    image: homestay3,
    title: "Homestay Gembira Loka",
    description: "Homestay ini cocok untuk rombongan karna memiliki ruangan yang cukup luas. Suasana homestaynya asri dan suasana lingkungannya tenang, cocok untuk Anda yang penat dengan suasana keramaian. Homestay i...",
    price: 720000,
    rating: 9.47,
    capacity: 16,
    rooms: 4,
    location: "KOTA YOGYAKARTA",
    distance: "± 0.9KM",
    facilities: ["Garasi", "AC", "Dapur", "Kipas Angin", "TV"],
  },
  {
    id: 4,
    image: homestay4,
    title: "Homestay Sanggrahan 2",
    description: "Homestay yang berlokasi di daerah Sanggrahan ini memiliki 4 kamar tidur dengan kapasitas maksimal 12 orang. Fasilitas lengkap dan nyaman untuk keluarga atau rombongan...",
    price: 650000,
    rating: 9.35,
    capacity: 12,
    rooms: 4,
    location: "KABUPATEN BANTUL",
    distance: "± 1.2KM",
    facilities: ["Garasi", "AC", "Dapur", "TV", "WiFi"],
  },
  {
    id: 5,
    image: homestay1,
    title: "Homestay Kotagede",
    description: "Homestay klasik dengan nuansa Jawa yang kental. Cocok untuk Anda yang ingin merasakan suasana tradisional Yogyakarta dengan tetap mendapatkan fasilitas modern...",
    price: 600000,
    rating: 9.28,
    capacity: 10,
    rooms: 3,
    location: "KOTA YOGYAKARTA",
    distance: "± 1.5KM",
    facilities: ["Parkir", "AC", "Dapur", "WiFi"],
  },
  {
    id: 6,
    image: homestay2,
    title: "Homestay Mergangsan",
    description: "Homestay nyaman dengan lokasi strategis dekat pusat kota. Akses mudah ke berbagai destinasi wisata dan kuliner Yogyakarta...",
    price: 550000,
    rating: 9.21,
    capacity: 8,
    rooms: 2,
    location: "KOTA YOGYAKARTA",
    distance: "± 1.8KM",
    facilities: ["Parkir", "AC", "Dapur", "TV"],
  },
];

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find category info
  const category = exploreCategories.find((cat) => cat.slug === slug);
  const categoryTitle = category?.title || slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Homestay";
  const categoryDesc = category?.description || "Temukan berbagai pilihan homestay terbaik di lokasi ini. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan Anda.";

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b py-3">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">›</span>
            <Link to="/explore" className="text-gray-600 hover:text-blue-600">Explore</Link>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-medium">{categoryHomestays.length} {categoryTitle}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white py-12 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
              {categoryHomestays.length} {categoryTitle}
            </h1>
            <div className="w-16 h-1 bg-yellow-400 mx-auto rounded mb-4"></div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {categoryDesc} Temen-temen bisa langsung booking di website ini secara langsung atau hubungi admin via whatsapp di nomer 0857 1357 7240. Masih ada pilihan 150 homestay lainnya yang dapat anda pilih di fitur pencarian dengan mengklik "Pencarian Homestay Lebih lanjut".
            </p>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="bg-gray-100 py-6">
        <div className="container">
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Search className="w-4 h-4 mr-2" />
              Pencarian Homestay Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-y border-blue-100 py-4">
        <div className="container">
          <p className="text-center text-blue-700 text-sm">
            <strong>Info:</strong> Anda dapat memesan homestay-homestay berikut ini secara langsung melalui website ini ya... Silahkan pilih homestaynya, dan tentukan tanggal menginap Anda. Yuk... ^_^
          </p>
        </div>
      </div>

      {/* Homestay Cards */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryHomestays.map((homestay) => (
            <div 
              key={homestay.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/homestay/${toSlug(homestay.title)}`)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={homestay.image}
                  alt={homestay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                </div>
                
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {homestay.rooms} Kamar
                  </span>
                </div>

                {/* Bottom badges */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {homestay.capacity} org
                  </span>
                  <span className="bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {homestay.rating.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 line-clamp-1">
                    {homestay.title}
                  </h3>
                </div>

                <p className="text-xs text-yellow-600 font-medium mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {homestay.location} <span className="text-blue-500">({homestay.distance})</span>
                </p>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {homestay.description}
                </p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {homestay.facilities.slice(0, 5).map((facility, idx) => (
                    <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {facility}
                    </span>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xl font-bold text-red-500">
                      Rp {formatPrice(homestay.price)}
                    </p>
                    <p className="text-xs text-gray-500">/ malam</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Lihat di Maps
                    </Button>
                    <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
