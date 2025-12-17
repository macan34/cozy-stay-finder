import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { homestayCategories, HomestayCategory } from "@/components/HomestaySection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Users, MapPin, Eye, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Import images
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";

/* ================= UTIL ================= */
export const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ================= INTERFACES ================= */
export interface ExploreCategory {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
  views: number;
  date: string;
}

/* ================= DATA ================= */
export const exploreCategories: ExploreCategory[] = [
  {
    id: 1,
    slug: "homestay-dekat-uin-sunan-kalijaga",
    image: homestay1,
    title: "Homestay Dekat UIN Sunan Kalijaga",
    description: "Dibawah ini adalah kumpulan Homestay Dekat UIN Sunan Kalijaga. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan. Anda juga dapat memes...",
    views: 2760,
    date: "23 Agustus 2025",
  },
  {
    id: 2,
    slug: "homestay-dekat-jec-jogja",
    image: homestay2,
    title: "Homestay Dekat JEC Jogja",
    description: "Jogja Expo Center atau yang biasa dikenal dengan JEC merupakan salah satu tempat pengadaan event di Jogja. Nah, dibawah ini adalah homestay dekat jec jogja yang berjarak...",
    views: 3453,
    date: "21 Agustus 2025",
  },
  {
    id: 3,
    slug: "homestay-jogja-dekat-rs-sardjito",
    image: homestay3,
    title: "Homestay Jogja Dekat RS Sardjito",
    description: "Jika anda ada kegiatan di dekat RS Sardjito, homestay dibawah ini adalah opsi terbaik apalagi jika membawa rombongan lebih dari 4 orang. Homestay Jogja dekat RS Sardjito...",
    views: 2813,
    date: "20 Agustus 2025",
  },
  {
    id: 4,
    slug: "homestay-dekat-tugu-jogja",
    image: homestay4,
    title: "Homestay Dekat Tugu Jogja",
    description: "Tugu Jogja menjadi salah satu icon dari kota Yogyakarta. Berikut adalah daftar homestay dekat tugu Jogja dengan jarak maksimal 4 KM. Anda dapat memesan langsung...",
    views: 4680,
    date: "19 Agustus 2025",
  },
  {
    id: 5,
    slug: "homestay-jogja-dekat-umy",
    image: homestay1,
    title: "Homestay Jogja Dekat UMY",
    description: "Berikut adalah list pilihan homestay yang lokasinya dekat dengan UMY. Setiap homestay memiliki fasilitas yang berbeda, silahkan pilih sesuai dengan kebutuhan anda...",
    views: 1463,
    date: "18 Agustus 2025",
  },
  {
    id: 6,
    slug: "homestay-jogja-dekat-upn",
    image: homestay2,
    title: "Homestay Jogja Dekat UPN",
    description: "Pilihan tepat untuk menginap dekat UPN Veteran adalah homestay. Lokasinya strategis, memudahkan akses ke kampus, tempat makan, dan pusat perbelanjaan...",
    views: 1565,
    date: "17 Agustus 2025",
  },
  {
    id: 7,
    slug: "homestay-jogja-dekat-uny",
    image: homestay3,
    title: "Homestay Jogja Dekat UNY",
    description: "Mencari homestay dekat UNY? Berikut Homestay Jogja dekat UNY adalah pilihan tepat. Lokasinya strategis, mudah diakses, dan harganya terjangkau...",
    views: 2694,
    date: "16 Agustus 2025",
  },
  {
    id: 8,
    slug: "homestay-jogja-dekat-ugm",
    image: homestay4,
    title: "Homestay Jogja Dekat UGM",
    description: "Homestay Jogja dekat UGM yang ada dibawah ini adalah berjarak maksimal 3 Km dari lokasi kampus pusat UGM. Jika ingin melihat homestay yang lainnya bisa menggunakan...",
    views: 1800,
    date: "15 Agustus 2025",
  },
];

// Trending data
const trendingHomestays = [
  {
    id: 1,
    image: homestay1,
    title: "Homestay Jogja 3 Kamar",
    description: "Berikut adalah homestay Jogja 3 kamar di berbagai lokasi strategis. Setiap homestaynya kami sewakan dengan full 1 rumah dengan berbagai fasilitas...",
    views: 119059,
    slug: "homestay-jogja-3-kamar",
  },
  {
    id: 2,
    image: homestay2,
    title: "Rekomendasi Villa Di Jogja",
    description: "Villa di Jogja yang kami miliki. Villa Eudora, Villa Kadita, Villa Aurora, Villa Amiena, Villa Jogja Gamelan, Villa JEC Kuning...",
    views: 118235,
    slug: "rekomendasi-villa-di-jogja",
  },
  {
    id: 3,
    image: homestay3,
    title: "Homestay Jogja Private Pool",
    description: "Homestay Jogja Private Pool. Berikut adalah homestay dengan fasilitas kolam renang pribadi. Lokasinya berada di berbagai daerah...",
    views: 8069,
    slug: "homestay-jogja-private-pool",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = exploreCategories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Header />

      {/* Hero Section */}
      <div 
        className="text-white py-16 relative"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Explore berbagai homestay terbaik di Jogja!!!
          </h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded mt-4"></div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b py-3">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-blue-600 font-medium">Explore</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Cards Grid */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="Cari lokasi atau nama homestay..."
                  className="pl-10 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Cards Grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/explore/${category.slug}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2 group-hover:text-blue-700 flex items-start justify-between">
                      {category.title}
                      <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {category.description}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">W</span>
                      </div>
                      <span className="text-sm text-gray-600">by <strong>WHouse Indonesia</strong></span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 pt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{category.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{category.views.toLocaleString()}x dilihat</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Homestay tidak ditemukan
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba ubah kata kunci pencarian Anda
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Reset Filter
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Trending Homestay!!!</h3>
                <ChevronDown className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-6">
                {trendingHomestays.map((item) => (
                  <div 
                    key={item.id}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/explore/${item.slug}`)}
                  >
                    <div className="flex gap-3">
                      <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Button 
                          size="sm" 
                          className="absolute bottom-1 left-1 right-1 text-xs py-1 h-auto bg-blue-600 hover:bg-blue-700"
                        >
                          Lihat
                        </Button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-blue-600 group-hover:text-blue-700 transition-colors line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-3 mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span>{item.views.toLocaleString()}x dilihat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
