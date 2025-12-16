import { MapPin, Calendar, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomestayCard from "@/components/HomestayCard";
import { poolHomestays } from "@/components/HomestaySection";
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";
import { useNavigate, Link } from "react-router-dom";

/* ================= UTIL ================= */
const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/* ================= DATA ================= */



// const exploreCategories: ExploreCategory[] = [
//   {
//     id: 'uin',
//     title: 'Homestay Dekat UIN Sunan Kalijaga',
//     image: homestay1,
//     description: 'Dibawah ini adalah kumpulan Homestay Dekat UIN Sunan Kalijaga. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan.',
//     date: '23 Agustus 2025',
//     views: 2717,
//   },
//   {
//     id: 'jec',
//     title: 'Homestay Dekat JEC Jogja',
//     image: homestay2,
//     description: 'Jogja Expo Center atau yang biasa dikenal dengan JEC merupakan salah satu tempat pengadaan event di Jogja. Homestay dekat JEC tersedia dengan berbagai fasilitas.',
//     date: '21 Agustus 2025',
//     views: 3408,
//   },
//   {
//     id: 'sardjito',
//     title: 'Homestay Jogja Dekat RS Sardjito',
//     image: homestay3,
//     description: 'Rumah Sakit Sardjito merupakan salah satu rumah sakit terbesar di Jogja. Kami menyediakan homestay terdekat untuk kebutuhan penginapan keluarga pasien.',
//     date: '20 Agustus 2025',
//     views: 4521,
//   },
//   {
//     id: 'ugm',
//     title: 'Homestay Dekat UGM',
//     image: homestay4,
//     description: 'Universitas Gadjah Mada (UGM) adalah salah satu kampus terbaik di Indonesia. Tersedia berbagai pilihan homestay dekat UGM untuk mahasiswa dan tamu.',
//     date: '19 Agustus 2025',
//     views: 5632,
//   },
//   {
//     id: 'malioboro',
//     title: 'Homestay Dekat Malioboro',
//     image: homestay1,
//     description: 'Malioboro adalah destinasi wisata utama di Jogja. Homestay dekat Malioboro cocok untuk wisatawan yang ingin menikmati suasana kota Jogja.',
//     date: '18 Agustus 2025',
//     views: 8945,
//   },
//   {
//     id: 'kraton',
//     title: 'Homestay Dekat Kraton Jogja',
//     image: homestay2,
//     description: 'Kraton Yogyakarta merupakan pusat budaya dan sejarah Jogja. Nikmati penginapan bernuansa tradisional di homestay dekat Kraton.',
//     date: '17 Agustus 2025',
//     views: 3256,
//   },
// ];

const trendingHomestays = [
  {
    id: 'trending-1',
    title: 'Homestay Jogja 3 Kamar',
    image: homestay1,
    description: 'Berikut adalah homestay Jogja 3 kamar di berbagai lokasi strategis. Setiap homestay kami sewakan dengan full 1 rumah.',
    views: 118793,
  },
  {
    id: 'trending-2',
    title: 'Rekomendasi Villa Di Jogja',
    image: homestay2,
    description: 'Villa di Jogja yang kami miliki. Villa Eudora, Villa Kadita, Villa Aurora, Villa Amiena, Villa Jogja Gamelan.',
    views: 118054,
  },
  {
    id: 'trending-3',
    title: 'Homestay Jogja Private Pool',
    image: homestay3,
    description: 'Homestay Jogja Private Pool. Berikut adalah homestay dengan fasilitas kolam renang pribadi.',
    views: 95421,
  },
];

// All villas data
const allVillas = [
  ...poolHomestays,
  {
    id: 5,
    image: homestay1,
    title: 'Villa Eudora',
    description: 'Villa mewah di Jogja dengan fasilitas lengkap dan pemandangan indah.',
    price: 850000,
    rating: 9.7,
    capacity: 8,
  },
  {
    id: 6,
    image: homestay2,
    title: 'Villa Kadita',
    description: 'Villa modern dengan desain minimalis dan kolam renang pribadi.',
    price: 750000,
    rating: 9.5,
    capacity: 6,
  },
  {
    id: 7,
    image: homestay3,
    title: 'Villa Aurora',
    description: 'Villa dengan taman luas dan fasilitas BBQ untuk keluarga.',
    price: 900000,
    rating: 9.6,
    capacity: 10,
  },
  {
    id: 8,
    image: homestay4,
    title: 'Villa Amiena',
    description: 'Villa tradisional Jogja dengan sentuhan modern dan suasana tenang.',
    price: 700000,
    rating: 9.4,
    capacity: 7,
  },
  {
    id: 9,
    image: homestay1,
    title: 'Villa Jogja Gamelan',
    description: 'Villa dengan nuansa budaya Jogja dan musik gamelan sebagai tema.',
    price: 800000,
    rating: 9.3,
    capacity: 9,
  },
];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-white">
            Explore berbagai villa terbaik di Jogja
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mt-4" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <nav className="flex gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span>›</span>
            <span className="text-primary font-medium">Explore</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <h2 className="section-title text-center mb-6">
          Villa Terbaik di Jogja
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVillas.map((villa) => (
            <div
              key={villa.id}
              onClick={() => navigate(`/explore/${toSlug(villa.title)}`)}
              className="cursor-pointer"
            >
              <HomestayCard {...villa} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
