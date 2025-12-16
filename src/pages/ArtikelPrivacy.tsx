import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Instagram, Music2, Youtube } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ArtikelPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Kebijakan Privasi
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mb-4" />
          <p className="text-primary-foreground/80">
            Kebijakan Privasi dan Perlindungan Data Pengguna
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-text-muted hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <Link to="/artikel" className="text-text-muted hover:text-primary transition-colors">
              Artikel
            </Link>
            <ChevronRight className="w-4 h-4 text-text-muted" />
            <span className="text-warning font-medium">Kebijakan Privasi</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text flex items-center gap-2">
                  Kebijakan Privasi
                  <ChevronDown className="w-5 h-5 text-primary" />
                </h2>
              </div>
              <hr className="border-border mb-6" />

              <div className="prose prose-lg max-w-none text-text">
                <h3 className="text-lg font-bold mb-4">Pendahuluan</h3>
                <p className="text-text-muted leading-relaxed text-justify mb-4">
                  Kebijakan Privasi ini menjelaskan bagaimana WHouse Homestay Management mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami.
                </p>

                <h3 className="text-lg font-bold mt-8 mb-4">Informasi yang Kami Kumpulkan</h3>
                <ol className="list-decimal pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    <strong>Informasi Pribadi:</strong> Nama, alamat email, nomor telepon, dan alamat yang Anda berikan saat melakukan pemesanan atau mendaftar akun.
                  </li>
                  <li>
                    <strong>Informasi Pembayaran:</strong> Detail kartu kredit atau metode pembayaran lain yang diperlukan untuk memproses transaksi.
                  </li>
                  <li>
                    <strong>Informasi Penggunaan:</strong> Data tentang bagaimana Anda menggunakan website kami, termasuk halaman yang dikunjungi dan waktu akses.
                  </li>
                </ol>

                <h3 className="text-lg font-bold mt-8 mb-4">Penggunaan Informasi</h3>
                <p className="text-text-muted leading-relaxed text-justify mb-4">
                  Kami menggunakan informasi yang dikumpulkan untuk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
                  <li>Memproses dan mengelola pemesanan homestay Anda</li>
                  <li>Mengirimkan konfirmasi dan informasi terkait pemesanan</li>
                  <li>Meningkatkan layanan dan pengalaman pengguna</li>
                  <li>Mengirimkan promosi dan penawaran khusus (dengan persetujuan Anda)</li>
                  <li>Memenuhi kewajiban hukum dan peraturan yang berlaku</li>
                </ul>

                <h3 className="text-lg font-bold mt-8 mb-4">Keamanan Data</h3>
                <p className="text-text-muted leading-relaxed text-justify">
                  Kami menerapkan langkah-langkah keamanan yang tepat untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran. Data sensitif seperti informasi pembayaran dienkripsi menggunakan teknologi SSL.
                </p>

                <h3 className="text-lg font-bold mt-8 mb-4">Hak Anda</h3>
                <p className="text-text-muted leading-relaxed text-justify mb-4">
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
                  <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                  <li>Meminta koreksi atas informasi yang tidak akurat</li>
                  <li>Meminta penghapusan informasi pribadi Anda</li>
                  <li>Menarik persetujuan untuk komunikasi pemasaran</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Author */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text">Tentang Penulis</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <hr className="border-border mb-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">W</span>
                </div>
                <div>
                  <h4 className="font-bold text-text">WHouse Indonesia</h4>
                  <p className="text-xs text-text-muted">SOLUSI CEPAT BOOKING HOMESTAY</p>
                </div>
              </div>
              <p className="text-sm text-text-muted mb-4">
                Pesan Homestay di Jogja murah dan mudah di mana lagi kalau bukan di WHouse Indonesia.
              </p>
              <div className="flex gap-2">
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Instagram className="w-5 h-5 text-primary-foreground" />
                </a>
                <a href="#" className="w-10 h-10 bg-text rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Music2 className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text">Artikel Lainnya</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <hr className="border-border mb-4" />
              <div className="space-y-4">
                <Link to="/artikel/tos" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    Syarat dan Ketentuan Umum
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Terms and Conditions of Service
                  </p>
                </Link>
                <hr className="border-border" />
                <Link to="/artikel/faq" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    FAQ
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Pertanyaan yang sering diajukan
                  </p>
                </Link>
                <hr className="border-border" />
                <Link to="/artikel" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    Semua Artikel
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Lihat semua artikel dan berita terbaru
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtikelPrivacy;