import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Instagram, Music2, Youtube } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ArtikelTos = () => {
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
            Syarat dan Ketentuan Umum
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mb-4" />
          <p className="text-primary-foreground/80">
            Syarat dan Ketentuan Umum (Terms and Conditions of Service)
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
            <span className="text-warning font-medium">Syarat dan Ketentuan Umum</span>
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
                  Syarat dan Ketentuan Umum
                  <ChevronDown className="w-5 h-5 text-primary" />
                </h2>
              </div>
              <hr className="border-border mb-6" />

              <div className="prose prose-lg max-w-none text-text">
                <h3 className="text-lg font-bold mb-4">Pendahuluan</h3>
                <ol className="list-decimal pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    Terima kasih atas kunjungan Anda ke Website kami. Kami berharap kunjungan Anda dapat bermanfaat dan memberi kenyamanan dalam mengakses dan menggunakan seluruh layanan yang tersedia di Website kami. Kami selaku penyedia layanan terus berupaya memperbaiki dan meningkatkan kualitas pelayanan Kami. Kami menerima dan menghargai segala bentuk kritik dan saran dari Anda. Perihal tersebut dapat Anda sampaikan melalui surel booking@homestayjogja.co.id atau melalui kontak Customer Service kami di 0858-4274-8470.
                  </li>
                  <li>
                    Website ini dimiliki, dioperasionalkan, dan diadakan oleh PT Media Inovasi Berkah Nusantara atau dengan nama brand WHouse Homestay Management, perseroan terbatas yang berdiri atas dasar hukum Republik Indonesia. Layanan kami tersedia secara online melalui website www.homestayjogja.co.id atau berbagai akses, media, perangkat dan platform digital lainnya, baik yang sudah ada atau akan tersedia di kemudian hari.
                  </li>
                </ol>

                <h3 className="text-lg font-bold mt-8 mb-4">Umum</h3>
                <ol className="list-decimal pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    Dengan mengakses dan menggunakan layanan Website atau layanan Kami yang lain, maka Anda menyatakan telah membaca, memahami, menyetujui, dan menyatakan tunduk pada Syarat dan Ketentuan Umum ini.
                  </li>
                  <li>
                    Syarat dan Ketentuan Umum ini dapat Kami ubah, tambah, dan atau hapus sewaktu-waktu sesuai dengan pengembangan website, kebijakan, dan peraturan perundang-undangan. Anda kami anjurkan untuk mengunjungi Website Kami secara berkala agar dapat mengetahui adanya perubahan tersebut.
                  </li>
                  <li>
                    Syarat dan Ketentuan Umum ini terdiri atas pemaparan Syarat dan Ketentuan Umum yang berlaku untuk setiap akses Layanan yang tersedia pada Website, serta syarat dan ketentuan khusus yang mengatur lebih lanjut dalam penggunaan Layanan tertentu.
                  </li>
                </ol>

                <h3 className="text-lg font-bold mt-8 mb-4">Penggunaan Informasi, Data, dan Konten</h3>
                <ol className="list-decimal pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    Seluruh produk yang terdapat di Website Kami sepenuhnya dimiliki oleh Kami atau pihak ketiga yang memberikan hak pengelolaan kepada Kami. Maka secara tegas Kami tidak memberikan hak apapun kepada Anda untuk menggunakan segala informasi, data dan konten yang terdapat di Website ini ataupun melalui layanan Kami di platform digital lainnya untuk keperluan komersil.
                  </li>
                  <li>
                    Anda setuju untuk tidak menggunakan informasi, data dan konten yang tersedia di layanan Kami untuk keperluan komersil tanpa persetujuan tertulis terlebih dahulu dari Kami.
                  </li>
                </ol>

                <h3 className="text-lg font-bold mt-8 mb-4">Hak Kekayaan Intelektual</h3>
                <ol className="list-decimal pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    Seluruh konten yang ada di dalam layanan Kami termasuk di dalamnya namun tidak terbatas pada logo, ikon, gambar, teks, grafik, foto, video, audio, musik, suara, desain, software, source code, spesifikasi teknis, dokumentasi, laporan, dan konten lain yang dihasilkan oleh Kami adalah milik Kami atau pihak yang bekerjasama dengan Kami.
                  </li>
                </ol>
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

            {/* Trending Posts */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text">Artikel Lainnya</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <hr className="border-border mb-4" />
              <div className="space-y-4">
                <Link to="/artikel/privacy" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    Kebijakan Privasi
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Kebijakan privasi dan perlindungan data pengguna
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

export default ArtikelTos;