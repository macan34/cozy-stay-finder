import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Search, Bed, Loader2 } from "lucide-react";
import { homestayCategories } from "@/components/HomestaySection";

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

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find category info
  const category = homestayCategories.find((cat) => cat.slug === slug);
  const categoryTitle = category?.title || slug?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Homestay";
  const categoryDesc = category?.subtitle || "Temukan berbagai pilihan homestay terbaik di kategori ini. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan Anda.";

  useEffect(() => {
    const fetchCategoryHomestays = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/homestays');
        if (!response.ok) {
          throw new Error('Failed to fetch homestays');
        }
        const allHomestays = await response.json();

        // Filter homestays by category if category is found
        let filteredHomestays = allHomestays;
        if (category) {
          filteredHomestays = allHomestays.filter((homestay: any) =>
            homestay.categories && homestay.categories.includes(category.key)
          );
        }

        setHomestays(filteredHomestays);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load homestays');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryHomestays();
  }, [slug, category]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat homestay...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat data homestay</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
            <span className="text-blue-600 font-medium">{homestays.length} {categoryTitle}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white py-12 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
              {homestays.length} {categoryTitle}
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
          {homestays.map((homestay) => (
            <div 
              key={homestay.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/homestay/${toSlug(homestay.title)}`)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    homestay.image
                      ? `http://localhost:5000/uploads/${homestay.image}`
                      : "/images/placeholder.jpg"
                  }
                  alt={homestay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.jpg";
                  }}
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
                    {Number(homestay.rating || 0).toFixed(1)}
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