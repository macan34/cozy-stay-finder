import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { homestayCategories, HomestayCategory } from "@/components/HomestaySection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Users, MapPin, Eye, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

// Import images
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";
import ImageGallery from "@/components/ImageGallery";

/* ================= UTIL ================= */
export const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ================= INTERFACES ================= */
export interface ExploreCategory {
  id: number;
  slug: string;
  image: string;
  images?: string[];
  title: string;
  description: string;
  views: number;
  date: string;
}

/* ================= DATA ================= */
export const exploreCategories: ExploreCategory[] = [
  {
    id: 1,
    slug: "homestay-jogja-private-pool",
    image: homestay1,
    title: "Homestay Jogja Private Pool",
    description: "Homestay Jogja Private Pool. Berikut adalah homestay dengan fasilitas kolam renang pribadi. Lokasinya berada di berbagai daerah strategis dengan privasi dan kenyamanan ekstra...",
    views: 8069,
    date: "23 Agustus 2025",
  },
  {
    id: 2,
    slug: "homestay-jogja-murah",
    image: homestay2,
    title: "Homestay Jogja Murah",
    description: "Pilihan homestay murah di Jogja dengan harga terjangkau namun tetap nyaman. Cocok untuk backpacker dan wisatawan hemat yang mencari penginapan berkualitas...",
    views: 5680,
    date: "22 Agustus 2025",
  },
  {
    id: 3,
    slug: "homestay-jogja-4-kamar",
    image: homestay3,
    title: "Homestay Jogja 4 Kamar",
    description: "Homestay Jogja 4 kamar, ideal untuk keluarga besar atau rombongan. Setiap homestay memiliki fasilitas lengkap dengan kapasitas besar...",
    views: 4520,
    date: "21 Agustus 2025",
  },
  {
    id: 4,
    slug: "homestay-jogja-untuk-rombongan",
    image: homestay4,
    title: "Homestay untuk Rombongan",
    description: "Homestay Jogja untuk rombongan dengan kapasitas besar dan fasilitas lengkap. Cocok untuk acara gathering, reuni, atau liburan bersama...",
    views: 3890,
    date: "20 Agustus 2025",
  },
  {
    id: 5,
    slug: "homestay-jogja-honeymoon",
    image: homestay1,
    title: "Homestay Honeymoon Jogja",
    description: "Homestay honeymoon di Jogja dengan suasana romantis dan privat. Pilihan terbaik untuk pasangan yang ingin menikmati momen spesial...",
    views: 6240,
    date: "19 Agustus 2025",
  },
  {
    id: 6,
    slug: "homestay-dekat-uin-sunan-kalijaga",
    image: homestay2,
    title: "Homestay Dekat UIN Sunan Kalijaga",
    description: "Dibawah ini adalah kumpulan Homestay Dekat UIN Sunan Kalijaga. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan...",
    views: 2760,
    date: "18 Agustus 2025",
  },
  {
    id: 7,
    slug: "homestay-dekat-jec-jogja",
    image: homestay3,
    title: "Homestay Dekat JEC Jogja",
    description: "Jogja Expo Center atau yang biasa dikenal dengan JEC merupakan salah satu tempat pengadaan event di Jogja. Nah, dibawah ini adalah homestay dekat jec jogja...",
    views: 3453,
    date: "17 Agustus 2025",
  },
  {
    id: 8,
    slug: "homestay-jogja-dekat-ugm",
    image: homestay4,
    title: "Homestay Jogja Dekat UGM",
    description: "Homestay Jogja dekat UGM yang ada dibawah ini adalah berjarak maksimal 3 Km dari lokasi kampus pusat UGM. Jika ingin melihat homestay yang lainnya...",
    views: 1800,
    date: "16 Agustus 2025",
  },
];

// Trending data
const trendingHomestays = [
  {
    id: 1,
    image: homestay1,
    title: "Homestay Jogja 4 Kamar",
    description: "Berikut adalah homestay Jogja 4 kamar di berbagai lokasi strategis. Setiap homestaynya kami sewakan dengan full 1 rumah dengan berbagai fasilitas...",
    views: 119059,
    slug: "homestay-jogja-4-kamar",
  },
  {
    id: 2,
    image: homestay2,
    title: "Homestay Jogja Private Pool",
    description: "Homestay Jogja Private Pool. Berikut adalah homestay dengan fasilitas kolam renang pribadi. Lokasinya berada di berbagai daerah...",
    views: 118235,
    slug: "homestay-jogja-private-pool",
  },
  {
    id: 3,
    image: homestay3,
    title: "Homestay Honeymoon Jogja",
    description: "Homestay honeymoon di Jogja dengan suasana romantis dan privat. Pilihan terbaik untuk pasangan yang ingin menikmati momen spesial...",
    views: 8069,
    slug: "homestay-jogja-honeymoon",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [exploreCategories, setExploreCategories] = useState<ExploreCategory[]>([]);
  const [trendingHomestays, setTrendingHomestays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        // Fetch homestays from API
        const homestaysResponse = await fetch('http://localhost:5000/api/homestays');
        const homestays = await homestaysResponse.json();

        // Convert homestays to explore categories format
        const categories: ExploreCategory[] = homestayCategories.map((cat, index) => ({
          id: index + 1,
          slug: cat.slug,
          image: homestays[index % homestays.length]?.image || '/uploads/default.jpg',
          images: [homestays[index % homestays.length]?.image || '/uploads/default.jpg'], // Add images array
          title: cat.title,
          description: cat.subtitle + '. ' + cat.title + ' dengan berbagai pilihan homestay terbaik di Jogja.',
          views: Math.floor(Math.random() * 10000) + 1000, // Random views for demo
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        }));

        // Create trending homestays from top homestays
        const trending = homestays.slice(0, 3).map((homestay: any, index: number) => ({
          id: homestay.id,
          image: homestay.image,
          images: [homestay.image], // Add images array
          title: homestay.title,
          description: homestay.description,
          views: Math.floor(Math.random() * 100000) + 10000,
          slug: toSlug(homestay.title)
        }));

        setExploreCategories(categories);
        setTrendingHomestays(trending);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  const filteredCategories = exploreCategories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data explore...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat data explore</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
                    <ImageGallery
                      images={category.images || [category.image]}
                      title={category.title}
                      showThumbnails={false}
                      aspectRatio="aspect-[4/3]"
                      className="group-hover:scale-105 transition-transform duration-500"
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
                        <ImageGallery
                          images={item.images || [item.image]}
                          title={item.title}
                          showThumbnails={false}
                          aspectRatio="aspect-[6/5]"
                          className="group-hover:scale-110 transition-transform duration-300"
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
