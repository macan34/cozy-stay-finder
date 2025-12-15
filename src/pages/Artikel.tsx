import { Calendar, Eye, Tag, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import homestay1 from '@/assets/homestay-1.jpg';
import homestay2 from '@/assets/homestay-2.jpg';
import homestay3 from '@/assets/homestay-3.jpg';
import homestay4 from '@/assets/homestay-4.jpg';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  image?: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 'hubungi-kami',
    title: 'Hubungi Kami',
    excerpt: 'HomestayJogja.co.id adalah agen penyedia homestay di Jogja dengan menyediakan lebih dari 100 unit tersebar diseluruh Yogyakarta. Segera pesan penginapan Anda',
    date: '23 Desember 2024',
    views: 14894,
    category: 'Artikel',
  },
  {
    id: 'cara-pemesanan',
    title: 'Cara Pemesanan',
    excerpt: 'Anda ingin memesan homestay di Jogja secara online dengan cepat, mudah dan aman? Simak cara pesan homestay online di Jogja berikut ini. Ada berbagai macam..',
    date: '10 Februari 2017',
    views: 5531,
    category: 'Artikel',
  },
  {
    id: 'peluang-usaha',
    title: 'Peluang Usaha',
    excerpt: 'Jika Anda memiliki unit homestay dan ingin bekerja sama dengan kami, kami menyambut dengan senang hati untuk bekerja bersama And...',
    date: '9 Februari 2017',
    views: 3760,
    category: 'Artikel',
  },
  {
    id: 'tips-memilih-homestay',
    title: '10 Tips Memilih Homestay di Jogja',
    excerpt: 'Tips dan trik memilih homestay terbaik di Jogja untuk liburan keluarga atau perjalanan bisnis Anda. Pastikan kenyamanan dengan panduan lengkap ini.',
    date: '15 Januari 2024',
    views: 8920,
    category: 'Tips',
    image: homestay1,
    featured: true,
  },
  {
    id: 'wisata-jogja',
    title: 'Destinasi Wisata Populer di Jogja',
    excerpt: 'Jelajahi berbagai destinasi wisata menarik di Yogyakarta yang wajib dikunjungi. Dari Candi Prambanan hingga Pantai Parangtritis.',
    date: '20 November 2023',
    views: 12450,
    category: 'Wisata',
  },
  {
    id: 'kuliner-jogja',
    title: 'Kuliner Khas Jogja yang Wajib Dicoba',
    excerpt: 'Nikmati berbagai kuliner khas Jogja yang menggugah selera. Gudeg, Bakpia, hingga Sate Klathak yang legendaris.',
    date: '5 Oktober 2023',
    views: 9870,
    category: 'Kuliner',
  },
];

const trendingPosts = [
  {
    id: 'trending-1',
    title: 'Kebijakan Pembatalan, Deposit dan Refund WHouse Indonesia',
    excerpt: 'PERGANTIAN UNIT DAN ATAU RESCHEDULE • PERGANTIAN UNIT yang dimaksud ...',
    views: 80764,
    image: homestay2,
  },
  {
    id: 'trending-2',
    title: 'Syarat dan Ketentuan Sewa Homestay',
    excerpt: 'Berikut adalah syarat dan ketentuan yang berlaku untuk semua tamu yang menyewa homestay...',
    views: 45230,
    image: homestay3,
  },
  {
    id: 'trending-3',
    title: 'FAQ - Pertanyaan yang Sering Diajukan',
    excerpt: 'Kumpulan pertanyaan yang sering ditanyakan oleh calon tamu sebelum melakukan pemesanan...',
    views: 32150,
    image: homestay4,
  },
];

const Artikel = () => {
  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            Artikel
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
            <span className="text-primary font-medium">Artikel</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Regular Articles */}
              {regularArticles.slice(0, 3).map((article) => (
                <article 
                  key={article.id}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary group-hover:underline flex items-start gap-2">
                      {article.title}
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    </h3>
                    <p className="text-muted-foreground text-sm mt-3 line-clamp-4">
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">W</span>
                      </div>
                      <span className="text-sm text-muted-foreground">by WHouse Indonesia</span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Featured Article with Image */}
              {featuredArticle && (
                <article 
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer md:col-span-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <h3 className="text-xl font-bold leading-tight">
                          {featuredArticle.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* More Articles */}
              {regularArticles.slice(3).map((article) => (
                <article 
                  key={article.id}
                  className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary group-hover:underline flex items-start gap-2">
                      {article.title}
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    </h3>
                    <p className="text-muted-foreground text-sm mt-3 line-clamp-4">
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">W</span>
                      </div>
                      <span className="text-sm text-muted-foreground">by WHouse Indonesia</span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* About Author */}
            <div className="bg-card rounded-lg shadow-card p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Tentang Penulis</h2>
                <span className="text-primary">▼</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">W</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">WHouse Indonesia</h4>
                  <p className="text-xs text-muted-foreground">SOLUSI CEPAT BOOKING HOMESTAY</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Pesan Homestay di Jogja murah dan mudah di mana lagi kalau bukan di WHouse Indonesia.
              </p>

              {/* Social Links */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
                  <span className="text-xs">f</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                  <span className="text-xs">ig</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  <span className="text-xs">yt</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <span className="text-xs">tk</span>
                </a>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-card rounded-lg shadow-card p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Trending Posts</h2>
                <span className="text-primary">▼</span>
              </div>

              <div className="space-y-4">
                {trendingPosts.map((item) => (
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
                      <h4 className="text-sm font-medium text-primary hover:underline cursor-pointer line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.excerpt}
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
    </div>
  );
};

export default Artikel;
