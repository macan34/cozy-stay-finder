import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Instagram, Music2, Youtube, Calendar, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ArtikelKebijakan = () => {
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
            Kebijakan Pembatalan, Deposit dan Refund
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mb-4" />
          <p className="text-primary-foreground/80">
            WHouse Indonesia (homestayjogja.co.id)
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
            <span className="text-warning font-medium">Kebijakan Pembatalan</span>
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
                  Kebijakan Pembatalan, Deposit dan Refund
                  <ChevronDown className="w-5 h-5 text-primary" />
                </h2>
              </div>
              <hr className="border-border mb-6" />

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-6 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  22 Mei 2020
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  80,813 kali
                </span>
              </div>

              <div className="prose prose-lg max-w-none text-text">
                <h3 className="text-lg font-bold mb-4 text-primary">PERGANTIAN UNIT DAN ATAU RESCHEDULE</h3>
                <ul className="list-disc pl-6 space-y-4 text-text-muted leading-relaxed text-justify">
                  <li>
                    <strong>PERGANTIAN UNIT</strong> yang dimaksud di sini adalah perubahan unit homestay karena permintaan dari customer dan bukan merupakan kesalahan dari manajemen (penentuan masuk atau tidaknya dalam kategori kesalahan, merupakan wewenang penuh dari manajemen), maka mengikuti prosedur dan kebijakan pembatalan "Deposit Down Payment" sesuai yang ada pada poin berikutnya.
                  </li>
                  <li>
                    <strong>RESCHEDULE</strong> (termasuk di dalamnya pergantian tanggal atau pengurangan masa menginap), maka mengikuti prosedur dan kebijakan pembatalan "Deposit Down Payment" sesuai yang ada pada poin berikutnya.
                  </li>
                </ul>

                <h3 className="text-lg font-bold mt-8 mb-4 text-primary">KEBIJAKAN PEMBATALAN</h3>
                
                <h4 className="text-md font-bold mt-6 mb-3">Kebijakan Deposit Down Payment (DP)</h4>
                <ul className="list-disc pl-6 space-y-3 text-text-muted leading-relaxed text-justify">
                  <li>
                    Pembatalan yang diajukan <strong>lebih dari 168 jam (7 x 24 jam)</strong> sebelum Check IN maka uang dapat 100% di depositkan untuk next trip tanpa dikurangi sepeser pun, deposit berlaku selama 2 Tahun sejak tanggal pembatalan. Lebih dari 2 tahun tidak ada klaim, maka otomatis uang hangus.
                  </li>
                  <li>
                    Deposit yang diajukan antara <strong>168 jam sampai 72 jam (3 x 24 jam)</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">35%</span> dari total DP, sisanya akan di masukan ke saldo deposit tamu, berlaku 2 Tahun sejak tanggal pembatalan.
                  </li>
                  <li>
                    Deposit yang diajukan antara <strong>72 jam sampai 24 jam</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">50%</span> dari total DP, sisanya akan di masukan ke saldo deposit tamu, berlaku 2 Tahun sejak tanggal pembatalan.
                  </li>
                  <li>
                    Deposit yang diajukan <strong>dibawah 24 jam</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">75%</span> dari total DP, sisanya akan di masukan ke saldo deposit tamu, berlaku 2 Tahun sejak tanggal pembatalan.
                  </li>
                </ul>

                <h4 className="text-md font-bold mt-6 mb-3">Kebijakan Klaim Deposit</h4>
                <ul className="list-disc pl-6 space-y-3 text-text-muted leading-relaxed text-justify">
                  <li>Uang yang telah di depositkan berlaku 2 tahun sejak tanggal keluarnya Invoice, jika melebihi batas waktu tidak ada klaim maka akan kami anggap hangus.</li>
                  <li>Klaim deposit bisa langsung menghubungi Customer Service kami selama jam kerja.</li>
                  <li>Disaat akan mengklaim deposit untuk pemesanan homestay lainnya, tamu harus melampirkan Foto KTP sesuai yang ada pada nama pemesan di Invoice sebagai bukti.</li>
                  <li>Harga homestay yang berlaku saat akan mengajukan klaim, sesuai dengan harga yang tertera di website dan waktu saat mengajukan klaim, bukan harga yang dipakai saat pemesanan awal.</li>
                  <li>Homestay yang dipakai saat klaim deposit adalah homestay yang ready pada saat itu, bukan harus menggunakan homestay yang sama sesuai pesanan awal (kecuali homestay masih ready bisa memakai unit yang sama).</li>
                  <li>Jika klaim dilakukan pada saat high season atau banyak homestay yang sudah terbooking, maka tamu wajib mengikuti rekomendasi dari WHouse atau memilih homestay yang masih tersedia.</li>
                  <li>Pemesanan unit di Homestay berdasarkan yang tercepat terlebih dahulu.</li>
                  <li>Jika ada perselisihan, maka tamu akan mengikuti saran dari WHouse.</li>
                  <li>Apabila pada saat klaim deposit, tidak ada homestay yang ready, maka tamu wajib menunggu sampai terdapat homestay yang tersedia/ready.</li>
                  <li>Dana yang sudah didepositkan, dapat direfund dalam bentuk dana minimal setelah 1 bulan (30 x 24 jam) dari tanggal keluarnya invoice deposit ini. Refund dikenakan pemotongan sebesar <span className="text-destructive font-semibold">40%</span> dari dana yang didepositkan.</li>
                </ul>

                <h4 className="text-md font-bold mt-6 mb-3">Kebijakan Refund Down Payment (DP)</h4>
                <ul className="list-disc pl-6 space-y-3 text-text-muted leading-relaxed text-justify">
                  <li>Refund yang diajukan <strong>lebih dari 168 jam (7 x 24 jam)</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">45%</span> dari total DP yang telah di transfer.</li>
                  <li>Refund yang diajukan antara <strong>168 jam sampai 72 jam (3 x 24 jam)</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">75%</span> dari total DP yang telah di transfer.</li>
                  <li>Refund yang diajukan antara <strong>72 jam sampai 48 jam (2 x 24 jam)</strong> sebelum Check IN dikenakan biaya pembatalan <span className="text-destructive font-semibold">85%</span> dari total DP yang telah di transfer.</li>
                  <li>Refund yang diajukan antara <strong>48 jam sampai 24 Jam</strong> sebelum Check IN setelah keberangkatan dikenakan biaya pembatalan <span className="text-destructive font-semibold">95%</span> dari total DP yang telah di transfer.</li>
                </ul>

                <h4 className="text-md font-bold mt-6 mb-3">Kebijakan Refund 100% Karena Kematian dan Sakit Berat</h4>
                <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
                  <li>Menyertakan bukti yang meyakinkan</li>
                  <li>Surat Dokter/Surat Duka</li>
                </ul>

                <h4 className="text-md font-bold mt-6 mb-3">Kebijakan Bencana Alam</h4>
                <ul className="list-disc pl-6 space-y-2 text-text-muted leading-relaxed">
                  <li>Bukti bencana Alam, 100% uang akan di depositkan berlaku 2 Tahun</li>
                </ul>

                {/* Summary Table */}
                <div className="mt-8 overflow-x-auto">
                  <h4 className="text-md font-bold mb-3">Ringkasan Biaya Pembatalan</h4>
                  <table className="w-full border border-border text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-4 py-2 text-left">Waktu Sebelum Check-In</th>
                        <th className="border border-border px-4 py-2 text-center">Deposit</th>
                        <th className="border border-border px-4 py-2 text-center">Refund</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-muted">
                      <tr>
                        <td className="border border-border px-4 py-2">&gt; 168 jam (7 hari)</td>
                        <td className="border border-border px-4 py-2 text-center text-success font-medium">0%</td>
                        <td className="border border-border px-4 py-2 text-center text-destructive font-medium">45%</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border px-4 py-2">168 - 72 jam (3-7 hari)</td>
                        <td className="border border-border px-4 py-2 text-center text-warning font-medium">35%</td>
                        <td className="border border-border px-4 py-2 text-center text-destructive font-medium">75%</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-2">72 - 48 jam (2-3 hari)</td>
                        <td className="border border-border px-4 py-2 text-center text-warning font-medium">50%</td>
                        <td className="border border-border px-4 py-2 text-center text-destructive font-medium">85%</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border px-4 py-2">48 - 24 jam (1-2 hari)</td>
                        <td className="border border-border px-4 py-2 text-center text-destructive font-medium">75%</td>
                        <td className="border border-border px-4 py-2 text-center text-destructive font-medium">95%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                <Link to="/artikel/faq" className="block group">
                  <h4 className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                    FAQ
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    Pertanyaan yang sering diajukan
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

export default ArtikelKebijakan;