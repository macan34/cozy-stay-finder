import { useState } from 'react';
import { MapPin, Calendar, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomestayModal from '@/components/HomestayModal';
import homestay1 from '@/assets/homestay-1.jpg';
import homestay2 from '@/assets/homestay-2.jpg';
import homestay3 from '@/assets/homestay-3.jpg';
import homestay4 from '@/assets/homestay-4.jpg';

interface ExploreCategory {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  views: number;
}

const exploreCategories: ExploreCategory[] = [
  {
    id: 'uin',
    title: 'Homestay Dekat UIN Sunan Kalijaga',
    image: homestay1,
    description: 'Dibawah ini adalah kumpulan Homestay Dekat UIN Sunan Kalijaga. Setiap homestay memiliki fasilitas yang berbeda, silahkan sesuaikan dengan kebutuhan.',
    date: '23 Agustus 2025',
    views: 2717,
  },
  {
    id: 'jec',
    title: 'Homestay Dekat JEC Jogja',
    image: homestay2,
    description: 'Jogja Expo Center atau yang biasa dikenal dengan JEC merupakan salah satu tempat pengadaan event di Jogja. Homestay dekat JEC tersedia dengan berbagai fasilitas.',
    date: '21 Agustus 2025',
    views: 3408,
  },
  {
    id: 'sardjito',
    title: 'Homestay Jogja Dekat RS Sardjito',
    image: homestay3,
    description: 'Rumah Sakit Sardjito merupakan salah satu rumah sakit terbesar di Jogja. Kami menyediakan homestay terdekat untuk kebutuhan penginapan keluarga pasien.',
    date: '20 Agustus 2025',
    views: 4521,
  },
  {
    id: 'ugm',
    title: 'Homestay Dekat UGM',
    image: homestay4,
    description: 'Universitas Gadjah Mada (UGM) adalah salah satu kampus terbaik di Indonesia. Tersedia berbagai pilihan homestay dekat UGM untuk mahasiswa dan tamu.',
    date: '19 Agustus 2025',
    views: 5632,
  },
  {
    id: 'malioboro',
    title: 'Homestay Dekat Malioboro',
    image: homestay1,
    description: 'Malioboro adalah destinasi wisata utama di Jogja. Homestay dekat Malioboro cocok untuk wisatawan yang ingin menikmati suasana kota Jogja.',
    date: '18 Agustus 2025',
    views: 8945,
  },
  {
    id: 'kraton',
    title: 'Homestay Dekat Kraton Jogja',
    image: homestay2,
    description: 'Kraton Yogyakarta merupakan pusat budaya dan sejarah Jogja. Nikmati penginapan bernuansa tradisional di homestay dekat Kraton.',
    date: '17 Agustus 2025',
    views: 3256,
  },
];

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

const Explore = () => {
  const [selectedHomestay, setSelectedHomestay] = useState<ExploreCategory | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Explore berbagai homestay terbaik di Jogja!!!
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mt-4" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </a>
            <span className="text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">Explore</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {exploreCategories.map((category) => (
                <article 
                  key={category.id}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedHomestay(category)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-start gap-2">
                      {category.title}
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                      {category.description}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">W</span>
                      </div>
                      <span className="text-sm text-muted-foreground">by WHouse Indonesia</span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {category.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {category.views.toLocaleString()}x dilihat
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar - Trending */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-card p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Trending Homestay!!!</h2>
                <span className="text-primary">▼</span>
              </div>

              <div className="space-y-4">
                {trendingHomestays.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-20 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute inset-x-0 bottom-0 bg-primary text-white text-xs py-1 hover:bg-primary-dark transition-colors">
                        Lihat
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-primary hover:underline cursor-pointer line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views.toLocaleString()}x dilihat
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {/* Modal */}
      {selectedHomestay && (
        <HomestayModal
          homestay={{
            title: selectedHomestay.title,
            description: selectedHomestay.description,
            price: 350000,
            location: 'Yogyakarta',
            rating: 4.8,
            capacity: 6,
            image: selectedHomestay.image,
          }}
          isOpen={!!selectedHomestay}
          onClose={() => setSelectedHomestay(null)}
        />
      )}
    </div>
  );
};

export default Explore;
