import { ChevronRight } from 'lucide-react';
import HomestayCard from './HomestayCard';

import homestay1 from '@/assets/homestay-1.jpg';
import homestay2 from '@/assets/homestay-2.jpg';
import homestay3 from '@/assets/homestay-3.jpg';
import homestay4 from '@/assets/homestay-4.jpg';

interface HomestayData {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  rating?: number;
  capacity?: number;
  isSpecial?: boolean;
  managedBy?: string;
}

interface HomestaySectionProps {
  title: string;
  subtitle?: string;
  homestays: HomestayData[];
  showViewMore?: boolean;
}

// Sample data for different sections
export const poolHomestays: HomestayData[] = [
  {
    id: 1,
    image: homestay1,
    title: 'WHouse Natu (Villa Honeymoon)',
    description: 'Villa Honeymoon dilengkapi dengan 1 kamar dengan kolam renang pribadi yang tertutup. Tersedia juga breakfast dan berbagai fasilitas menarik lainnya.',
    price: 675000,
    rating: 9.5,
  },
  {
    id: 2,
    image: homestay2,
    title: 'WHouse Watu (Villa Honeymoon)',
    description: 'Villa Honeymoon dilengkapi dengan 1 kamar dengan kolam renang pribadi yang tertutup. Tersedia juga breakfast dan berbagai fasilitas menarik.',
    price: 675000,
    rating: 9.4,
  },
  {
    id: 3,
    image: homestay3,
    title: 'Omah Putih (Honeymoon)',
    description: 'Homestay ini berlokasi tidak jauh dari Tugu Jogja & St. Tugu Yogyakarta, Anda hanya perlu berkendara beberapa menit untuk sampai.',
    price: 800000,
    rating: 9.6,
  },
  {
    id: 4,
    image: homestay4,
    title: 'WHouse Pramesthi (Kids Pool)',
    description: 'Homestay ini berlokasi di Jogja bagian Timur, dekat dengan Gedung Jogja Expo Center. Anda juga dapat menikmati berbagai fasilitas.',
    price: 900000,
    rating: 9.3,
  },
];

export const budgetHomestays: HomestayData[] = [
  {
    id: 5,
    image: homestay2,
    title: 'WHouse Freesia 2',
    description: 'Unit Freesia adalah homestay yang terdiri dari 2 kamar tidur, di dalam 1 cluster kami memiliki 4 unit yang nyaman.',
    price: 475000,
  },
  {
    id: 6,
    image: homestay4,
    title: 'WHouse Freesia 1',
    description: 'Unit Freesia adalah homestay yang terdiri dari 2 kamar tidur, di dalam 1 cluster kami memiliki 4 unit yang nyaman.',
    price: 475000,
  },
  {
    id: 7,
    image: homestay3,
    title: 'WHouse Freesia 3',
    description: 'Unit Freesia adalah homestay yang terdiri dari 2 kamar tidur, di dalam 1 cluster kami memiliki 4 unit yang nyaman.',
    price: 475000,
  },
  {
    id: 8,
    image: homestay1,
    title: 'WHouse Freesia 4',
    description: 'Unit Freesia adalah homestay yang terdiri dari 2 kamar tidur, di dalam 1 cluster kami memiliki 4 unit yang nyaman.',
    price: 475000,
  },
];

export const familyHomestays: HomestayData[] = [
  {
    id: 9,
    image: homestay4,
    title: 'Griya Buwono / Jotawang',
    description: 'Homestay untuk keluarga ini dilengkapi dengan berbagai fasilitas yang akan menjamin kenyamanan Anda selama menginap.',
    price: 700000,
    capacity: 15,
  },
  {
    id: 10,
    image: homestay3,
    title: 'Gembira Loka',
    description: 'Homestay ini cocok untuk rombongan karena memiliki ruangan yang cukup luas. Suasana homestaynya asri dan nyaman.',
    price: 750000,
    capacity: 12,
  },
  {
    id: 11,
    image: homestay1,
    title: 'Pegagan',
    description: 'Homestay asri dengan 4 kamar tidur, dan dilengkapi dengan wifi serta TV prabayar. Berlokasi di Jogja bagian selatan.',
    price: 780000,
    capacity: 16,
  },
  {
    id: 12,
    image: homestay2,
    title: 'Gembira Loka 2',
    description: 'Homestay ini berlokasi strategis di tengah Kota Yogyakarta, letaknya tidak jauh dari wisata Gembira Loka Zoo.',
    price: 780000,
    capacity: 14,
  },
];

export const bestHomestays: HomestayData[] = [
  {
    id: 13,
    image: homestay1,
    title: 'Homestay WHouse Cuwathu',
    description: 'Homestay minimalis ini berlokasi tidak jauh dari Situs Sejarah Candi Kalasan. Homestay ini memiliki fasilitas lengkap.',
    price: 650000,
    location: 'KABUPATEN SLEMAN',
    rating: 9.59,
    capacity: 11,
    isSpecial: true,
    managedBy: 'WHouse Indonesia',
  },
  {
    id: 14,
    image: homestay3,
    title: 'Homestay Kotagede',
    description: 'Homestay ini berlokasi dekat dengan kawasan sentra pengrajin perak, salah satu kerajinan yang cukup populer di Jogja.',
    price: 600000,
    location: 'KOTA YOGYAKARTA',
    rating: 9.60,
    capacity: 12,
    isSpecial: true,
    managedBy: 'WHouse Indonesia',
  },
  {
    id: 15,
    image: homestay2,
    title: 'Griya Buwono / Jotawang',
    description: 'Homestay untuk keluarga ini dilengkapi dengan berbagai fasilitas yang akan menjamin kenyamanan Anda selama menginap.',
    price: 700000,
    location: 'KOTA YOGYAKARTA',
    rating: 9.47,
    capacity: 15,
    isSpecial: true,
    managedBy: 'WHouse Indonesia',
  },
];

const HomestaySection = ({ title, subtitle, homestays, showViewMore = true }: HomestaySectionProps) => {
  return (
    <section className="py-12 md:py-16" id="explore">
      <div className="container">
        {/* Stars decoration */}
        <div className="flex justify-center gap-2 mb-4">
          <span className="text-accent/50 text-sm">✦</span>
          <span className="text-accent text-lg">★</span>
          <span className="text-accent/50 text-sm">✦</span>
        </div>

        {/* Title */}
        <h2 className="section-title mb-2">{title}</h2>
        
        {/* Underline */}
        <div className="w-12 h-1 bg-accent mx-auto mb-4" />
        
        {subtitle && (
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {homestays.map((homestay) => (
            <HomestayCard key={homestay.id} {...homestay} />
          ))}
        </div>

        {/* View More Button */}
        {showViewMore && (
          <div className="text-center mt-8">
            <a
              href="/explore"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Lihat Lainnya
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomestaySection;