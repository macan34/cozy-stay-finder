import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  allHomestays,
  filterByCategory,
  homestayCategories,
  HomestayCategory,
} from "@/components/HomestaySection";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Users, MapPin, Eye, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

// Import images
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";

/* ================= UTIL ================= */
const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ================= INTERFACES ================= */
interface Villa {
  id: number;
  image: string | any; // Allow both string path and imported image
  title: string;
  description: string;
  price: number;
  rating: number;
  capacity: number;
  location: string;
  views: number;
  date: string;
  categories: HomestayCategory[];
}

/* ================= DATA ================= */
const allVillas: Villa[] = [
  {
    id: 1,
    image: homestay1,
    title: "Homestay Dekat UIN Sunan Kalijaga",
    description: "Dibawah ini adalah kumpulan Homestay Dekat UIN Sunan Kalijaga. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan. Anda juga dapat memesan langsung melalui website kami.",
    price: 450000,
    rating: 9.2,
    capacity: 6,
    location: "Dekat UIN",
    views: 2741,
    date: "23 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 2,
    image: homestay2,
    title: "Homestay Dekat JEC Jogja",
    description: "Jogja Expo Center atau yang biasa dikenal dengan JEC merupakan salah satu tempat pengadaan event di Jogja. Nah, dibawah ini adalah homestay dekat jec jogja yang berjarak dekat dengan lokasi.",
    price: 500000,
    rating: 9.3,
    capacity: 8,
    location: "Dekat JEC",
    views: 3437,
    date: "21 Agustus 2025",
    categories: ["GROUP"],
  },
  {
    id: 3,
    image: homestay3,
    title: "Homestay Jogja Dekat RS Sardjito",
    description: "Jika anda ada kegiatan di dekat RS Sardjito, homestay dibawah ini adalah opsi terbaik apalagi jika membawa rombongan lebih dari 4 orang. Homestay Jogja dekat RS Sardjito dengan fasilitas lengkap.",
    price: 400000,
    rating: 9.1,
    capacity: 5,
    location: "Dekat RS Sardjito",
    views: 2813,
    date: "20 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 4,
    image: homestay4,
    title: "Homestay Dekat Tugu Jogja",
    description: "Tugu Jogja menjadi salah satu icon dari kota Yogyakarta. Berikut adalah daftar homestay dekat tugu Jogja dengan jarak maksimal 4 KM. Anda dapat memesan langsung melalui website kami.",
    price: 550000,
    rating: 9.5,
    capacity: 6,
    location: "Dekat Tugu",
    views: 4680,
    date: "19 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 5,
    image: homestay1,
    title: "Homestay Jogja Dekat UMY",
    description: "Berikut adalah list pilihan homestay yang lokasinya dekat dengan UMY. Setiap homestay memiliki fasilitas yang berbeda, silahkan pilih sesuai dengan kebutuhan anda. Homestay Jogja Dekat UMY.",
    price: 425000,
    rating: 9.0,
    capacity: 4,
    location: "Dekat UMY",
    views: 1463,
    date: "18 Agustus 2025",
    categories: ["HONEYMOON"],
  },
  {
    id: 6,
    image: homestay2,
    title: "Homestay Jogja Dekat UPN",
    description: "Pilihan tepat untuk menginap dekat UPN Veteran adalah homestay. Lokasinya strategis, memudahkan akses ke kampus, tempat makan, dan pusat perbelanjaan. Dengan harga terjangkau dan fasilitas lengkap.",
    price: 475000,
    rating: 9.2,
    capacity: 6,
    location: "Dekat UPN",
    views: 1565,
    date: "17 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 7,
    image: homestay3,
    title: "Homestay Jogja Dekat UNY",
    description: "Mencari homestay dekat UNY? Berikut Homestay Jogja dekat UNY adalah pilihan tepat. Lokasinya strategis, mudah diakses, dan harganya terjangkau. Rasakan suasana nyaman seperti di rumah sendiri.",
    price: 450000,
    rating: 9.1,
    capacity: 5,
    location: "Dekat UNY",
    views: 2694,
    date: "16 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 8,
    image: homestay4,
    title: "Homestay Jogja Dekat UGM",
    description: "Homestay Jogja dekat UGM yang ada dibawah ini adalah berjarak maksimal 3 Km dari lokasi kampus pusat UGM. Jika ingin melihat homestay yang lainnya bisa menggunakan fitur pencarian.",
    price: 500000,
    rating: 9.4,
    capacity: 7,
    location: "Dekat UGM",
    views: 1800,
    date: "15 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 9,
    image: homestay1,
    title: "Villa Jogja Murah dan Estetik",
    description: "Jogja memang memiliki daya tarik sendiri untuk wisatawan. Villa menjadi pilihan yang menarik karena lebih privacy dan harganya murah. Dibawah ini Villa Jogja yang bisa dijadikan pilihan untuk liburan Anda.",
    price: 850000,
    rating: 9.7,
    capacity: 10,
    location: "Sleman",
    views: 7635,
    date: "13 Juni 2025",
    categories: ["POOL", "GROUP"],
  },
  {
    id: 10,
    image: homestay2,
    title: "Homestay Jogja Aesthetic",
    description: "Berlibur ke Jogja tentu ingin memakai akomodasi yang terbaik. Berikut adalah beberapa rekomendasi homestay jogja aesthetic yang dapat temen-temen gunakan disaat liburan ke Jogja.",
    price: 650000,
    rating: 9.5,
    capacity: 8,
    location: "Bantul",
    views: 3540,
    date: "27 Juni 2025",
    categories: ["HONEYMOON"],
  },
  {
    id: 11,
    image: homestay3,
    title: "Homestay Jogja 3 Kamar",
    description: "Berikut adalah homestay Jogja 3 kamar di berbagai lokasi strategis. Setiap homestaynya kami sewakan dengan full 1 rumah dengan berbagai fasilitas layaknya ada di rumah sendiri.",
    price: 550000,
    rating: 9.3,
    capacity: 6,
    location: "Kota Jogja",
    views: 5928,
    date: "10 Agustus 2025",
    categories: ["BUDGET"],
  },
  {
    id: 12,
    image: homestay4,
    title: "Homestay Jogja Private Pool",
    description: "Homestay Jogja Private Pool. Berikut adalah homestay dengan fasilitas kolam renang pribadi. Lokasinya berada di berbagai daerah. Jika anda ingin melihat fasilitas detailnya silahkan klik homestay.",
    price: 900000,
    rating: 9.8,
    capacity: 10,
    location: "Sleman",
    views: 8069,
    date: "5 Agustus 2025",
    categories: ["POOL", "GROUP"],
  },
  {
    id: 13,
    image: homestay1,
    title: "WHouse Pramesthi",
    description: "Homestay dengan kids pool. Homestay 4 kamar dengan fasilitas lengkap termasuk kolam renang anak yang aman dan nyaman untuk keluarga.",
    price: 900000,
    rating: 9.3,
    capacity: 12,
    location: "Jogja",
    views: 2741,
    date: "23 Agustus 2025",
    categories: ["POOL", "GROUP", "BUDGET", "FOUR_ROOM"],
  },
  {
    id: 14,
    image: homestay2,
    title: "Griya Buwono / Jotawang",
    description: "Homestay untuk rombongan besar. Villa nyaman dengan kapasitas besar cocok untuk gathering keluarga atau rombongan dengan harga terjangkau.",
    price: 700000,
    rating: 9.3,
    capacity: 15,
    location: "Jotawang",
    views: 3437,
    date: "21 Agustus 2025",
    categories: ["GROUP", "FOUR_ROOM"],
  },
  {
    id: 15,
    image: homestay3,
    title: "Pegagan",
    description: "Homestay 4 kamar dengan fasilitas lengkap. Villa dengan taman luas, ruang keluarga besar, dan berbagai fasilitas modern untuk kenyamanan Anda.",
    price: 780000,
    rating: 9.4,
    capacity: 10,
    location: "Pegagan",
    views: 2813,
    date: "20 Agustus 2025",
    categories: ["FOUR_ROOM", "GROUP"],
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredVillas = allVillas.filter((villa) => {
    const matchesSearch = villa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         villa.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           villa.categories.includes(selectedCategory as HomestayCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{__html: `
        .explore-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        
        .img-hover {
          transition: transform 0.5s ease;
        }
        
        .card-hover:hover .img-hover {
          transform: scale(1.05);
        }
      `}} />
      
      <Header />

      {/* Hero Section */}
      <div className="explore-hero text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore berbagai homestay terbaik di Jogja!!!
            </h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b py-8">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pengen ke Mana Nih?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="Cari lokasi atau nama homestay..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date In-Out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="date"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Orang
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="number"
                    placeholder="2"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Kategori</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all" 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Semua Homestay
                </button>
                {homestayCategories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.key
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Trending Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Trending Homestay!!!</h3>
                <div className="space-y-4">
                  {allVillas.slice(0, 3).map((villa) => (
                    <div 
                      key={villa.id}
                      className="cursor-pointer group"
                      onClick={() => navigate(`/homestay/${toSlug(villa.title)}`)}
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={villa.image} 
                            alt={villa.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {villa.title}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{villa.views.toLocaleString()}x dilihat</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Homestay Cards */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p className="text-gray-600">
                Menampilkan <span className="font-semibold text-gray-900">{filteredVillas.length}</span> dari {allVillas.length} homestay
              </p>
            </div>

            {filteredVillas.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Homestay tidak ditemukan
                </h3>
                <p className="text-gray-600 mb-6">
                  Coba ubah kata kunci atau filter pencarian Anda
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  variant="outline"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredVillas.map((villa) => (
                  <Card 
                    key={villa.id}
                    className="card-hover cursor-pointer overflow-hidden bg-white border-0 shadow-sm"
                    onClick={() => navigate(`/homestay/${toSlug(villa.title)}`)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Image */}
                      <div className="md:col-span-1">
                        <div className="relative h-64 md:h-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                          <img
                            src={villa.image}
                            alt={villa.title}
                            className="w-full h-full object-cover img-hover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                              {villa.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                          {villa.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{villa.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{villa.capacity} orang</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{villa.views.toLocaleString()}x dilihat</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Mulai dari</p>
                            <p className="text-2xl font-bold text-blue-600">
                              Rp {villa.price.toLocaleString('id-ID')}
                            </p>
                            <p className="text-xs text-gray-500">per malam</p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredVillas.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">4</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;