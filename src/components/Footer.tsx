import {
  Home,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

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
                <span className="block text-[10px] tracking-wider opacity-80">
                  HOMESTAY MANAGEMENT
                </span>
              </div>
            </div>

            <p className="text-sm opacity-80 mb-4">
              Platform booking homestay terpercaya di Yogyakarta dengan lebih dari
              200 properti yang siap dipesan.
            </p>

            <div className="flex gap-3">
              <a aria-label="Facebook" className="social-btn"><Facebook className="w-4 h-4" /></a>
              <a aria-label="Instagram" className="social-btn"><Instagram className="w-4 h-4" /></a>
              <a aria-label="Twitter" className="social-btn"><Twitter className="w-4 h-4" /></a>
              <a aria-label="Youtube" className="social-btn"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Halaman</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link">Beranda</Link></li>
              <li><Link to="/explore" className="footer-link">Explore Homestay</Link></li>
              <li><Link to="/artikel" className="footer-link">Artikel</Link></li>
              <li><Link to="/tentang" className="footer-link">Tentang Kami</Link></li>
              <li><Link to="/syarat-ketentuan" className="footer-link">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* Homestay Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategori Homestay</h3>
            <ul className="space-y-2">
              <li><Link to="/pool" className="footer-link">Homestay dengan Kolam Renang</Link></li>
              <li><Link to="/murah" className="footer-link">Homestay Murah</Link></li>
              <li><Link to="/4-kamar" className="footer-link">Homestay 4 Kamar</Link></li>
              <li><Link to="/rombongan" className="footer-link">Homestay untuk Rombongan</Link></li>
              <li><Link to="/honeymoon" className="footer-link">Homestay Honeymoon</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-1 opacity-80" />
                <span className="text-sm opacity-80">
                  Jl. Kaliurang KM 5.5, Sleman, Yogyakarta
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 opacity-80" />
                <a href="tel:+6281234567890" className="footer-link">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 opacity-80" />
                <a href="mailto:info@homestayjogja.co.id" className="footer-link">
                  info@homestayjogja.co.id
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 opacity-80" />
                <span className="text-sm opacity-80">
                  Senin - Minggu: 08:00 - 22:00
                </span>
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
