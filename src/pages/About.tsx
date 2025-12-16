import { Link } from 'react-router-dom';
import { Home, Users, Target, Award, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-header py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-header-foreground mb-4">
            Tentang Kami
          </h1>
          <nav className="flex items-center gap-2 text-sm text-header-foreground/80">
            <Link to="/" className="hover:text-warning transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-warning">Tentang Kami</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Introduction */}
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Siapa Kami?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  WHOUSE Homestay Management adalah platform manajemen homestay terpercaya yang berbasis di Yogyakarta. 
                  Kami hadir untuk menghubungkan pemilik properti dengan tamu yang mencari pengalaman menginap yang nyaman dan berkesan.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Dengan pengalaman bertahun-tahun di industri hospitality, kami memahami kebutuhan baik dari sisi host maupun tamu. 
                  Tim kami yang profesional siap membantu mengelola properti Anda dengan standar tertinggi.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kami percaya bahwa setiap perjalanan layak mendapatkan tempat menginap yang sempurna, 
                  dan setiap properti memiliki potensi untuk memberikan pengalaman yang luar biasa.
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-success" />
                    Visi
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi platform manajemen homestay terdepan di Indonesia yang memberikan pengalaman menginap 
                    berkualitas tinggi dengan sentuhan lokal yang autentik.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-warning" />
                    Misi
                  </h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Menyediakan homestay berkualitas dengan harga terjangkau</li>
                    <li>• Membantu pemilik properti memaksimalkan potensi aset mereka</li>
                    <li>• Memberikan pelayanan tamu yang ramah dan profesional</li>
                    <li>• Mendukung pertumbuhan pariwisata lokal</li>
                  </ul>
                </div>
              </div>

              {/* Values */}
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-destructive" />
                  Nilai-Nilai Kami
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Kepercayaan</h4>
                    <p className="text-sm text-muted-foreground">
                      Membangun hubungan yang transparan dan jujur dengan semua pihak.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Kualitas</h4>
                    <p className="text-sm text-muted-foreground">
                      Selalu memberikan standar pelayanan dan properti terbaik.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Inovasi</h4>
                    <p className="text-sm text-muted-foreground">
                      Terus berkembang dan beradaptasi dengan kebutuhan pasar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Pencapaian Kami</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">100+</div>
                    <div className="text-sm text-muted-foreground">Properti Terkelola</div>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg">
                    <div className="text-3xl font-bold text-success">5000+</div>
                    <div className="text-sm text-muted-foreground">Tamu Puas</div>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg">
                    <div className="text-3xl font-bold text-warning">4.8</div>
                    <div className="text-sm text-muted-foreground">Rating Rata-rata</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-header rounded-xl p-6 text-header-foreground">
                <h3 className="text-lg font-bold mb-3">Bergabung Bersama Kami</h3>
                <p className="text-sm opacity-90 mb-4">
                  Ingin menjadi bagian dari keluarga WHOUSE? Daftarkan properti Anda sekarang!
                </p>
                <Link
                  to="/contact"
                  className="block w-full bg-success text-success-foreground text-center py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
