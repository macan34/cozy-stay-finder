import { Home, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-success">
                <Home className="w-5 h-5 text-success-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">WHOUSE</span>
                <span className="block text-[10px] tracking-wider opacity-80">HOMESTAY MANAGEMENT</span>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Platform booking homestay terpercaya di Yogyakarta dengan lebih dari 200 properti yang siap dipesan.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Halaman</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Beranda</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Explore Homestay</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Artikel</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Tentang Kami</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Syarat & Ketentuan</a>
              </li>
            </ul>
          </div>

          {/* Homestay Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategori Homestay</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Homestay dengan Kolam Renang</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Homestay Murah</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Homestay 4 Kamar</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Homestay untuk Rombongan</a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Homestay Honeymoon</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-80">Jl. Kaliurang KM 5.5, Caturtunggal, Depok, Sleman, Yogyakarta 55281</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 opacity-80" />
                <a href="tel:+6281234567890" className="text-sm opacity-80 hover:opacity-100 transition-opacity">+62 812 3456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 opacity-80" />
                <a href="mailto:info@homestayjogja.co.id" className="text-sm opacity-80 hover:opacity-100 transition-opacity">info@homestayjogja.co.id</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-80">Senin - Minggu: 08:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-4">
          <p className="text-sm text-center opacity-60">
            © 2024 Homestay Jogja. All rights reserved. Managed by WHouse Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;