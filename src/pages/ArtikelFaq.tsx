import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Instagram, Music2, Youtube } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ArtikelFaq = () => {
  const faqItems = [
    {
      question: 'Bagaimana cara melakukan pemesanan homestay?',
      answer: 'Anda dapat melakukan pemesanan melalui website kami dengan memilih homestay yang diinginkan, menentukan tanggal check-in dan check-out, lalu mengisi data diri dan melakukan pembayaran. Anda juga dapat menghubungi Customer Service kami di 0858-4274-8470 untuk bantuan pemesanan.'
    },
    {
      question: 'Apa saja metode pembayaran yang tersedia?',
      answer: 'Kami menerima berbagai metode pembayaran termasuk transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit. Semua transaksi diproses dengan aman melalui sistem pembayaran terenkripsi.'
    },
    {
      question: 'Apakah bisa membatalkan atau mengubah jadwal pemesanan?',
      answer: 'Ya, pembatalan atau perubahan jadwal dapat dilakukan sesuai dengan kebijakan pembatalan masing-masing homestay. Umumnya, pembatalan gratis dapat dilakukan hingga 24-48 jam sebelum tanggal check-in. Silakan cek detail kebijakan di halaman homestay yang Anda pilih.'
    },
    {
      question: 'Berapa lama proses konfirmasi pemesanan?',
      answer: 'Konfirmasi pemesanan akan dikirimkan melalui email dan WhatsApp dalam waktu maksimal 1x24 jam setelah pembayaran diterima. Untuk pemesanan mendadak, kami akan mengonfirmasi dalam waktu 1-3 jam.'
    },
    {
      question: 'Apakah harga sudah termasuk sarapan?',
      answer: 'Ketersediaan sarapan berbeda-beda untuk setiap homestay. Informasi mengenai fasilitas termasuk sarapan dapat dilihat pada deskripsi detail homestay. Beberapa homestay juga menawarkan opsi tambahan sarapan dengan biaya tertentu.'
    },
    {
      question: 'Bagaimana cara menghubungi pihak homestay saat menginap?',
      answer: 'Setelah pemesanan dikonfirmasi, Anda akan menerima informasi kontak pemilik atau pengelola homestay melalui email konfirmasi. Anda juga dapat menghubungi Customer Service WHouse 24/7 untuk bantuan selama menginap.'
    },
    {
      question: 'Apakah ada deposit yang harus dibayar?',
      answer: 'Beberapa homestay mungkin memerlukan deposit keamanan yang akan dikembalikan saat check-out jika tidak ada kerusakan. Informasi mengenai deposit akan tercantum pada halaman detail homestay dan konfirmasi pemesanan.'
    },
    {
      question: 'Jam berapa check-in dan check-out?',
      answer: 'Secara umum, waktu check-in adalah pukul 14:00 WIB dan check-out pukul 12:00 WIB. Namun, waktu ini dapat berbeda untuk setiap homestay. Early check-in atau late check-out dapat diatur dengan menghubungi pihak homestay terlebih dahulu (mungkin dikenakan biaya tambahan).'
    },
  ];

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
            FAQ - Pertanyaan Umum
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mb-4" />
          <p className="text-primary-foreground/80">
            Frequently Asked Questions
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
            <span className="text-warning font-medium">FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text flex items-center gap-2">
                  Pertanyaan yang Sering Diajukan
                  <ChevronDown className="w-5 h-5 text-primary" />
                </h2>
              </div>
              <hr className="border-border mb-6" />

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-text hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-muted leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-text-muted">
                  Tidak menemukan jawaban yang Anda cari? Hubungi Customer Service kami di{' '}
                  <a href="tel:085842748470" className="text-primary font-medium hover:underline">
                    0858-4274-8470
                  </a>{' '}
                  atau email{' '}
                  <a href="mailto:booking@homestayjogja.co.id" className="text-primary font-medium hover:underline">
                    booking@homestayjogja.co.id
                  </a>
                </p>
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
                <Link to="/artikel/privacy" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    Kebijakan Privasi
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Kebijakan privasi dan perlindungan data
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

export default ArtikelFaq;