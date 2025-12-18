/* =====================================================
   DATA, TYPE, & HELPER (AMAN UNTUK DI-IMPORT)
===================================================== */

import homestay1 from '@/assets/homestay-1.jpg';
import homestay2 from '@/assets/homestay-2.jpg';
import homestay3 from '@/assets/homestay-3.jpg';
import homestay4 from '@/assets/homestay-4.jpg';
import { Link } from "react-router-dom";

/* ================= UTIL: SLUG GENERATOR ================= */
export const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export type HomestayCategory =
  | 'POOL'
  | 'BUDGET'
  | 'FOUR_ROOM'
  | 'GROUP'
  | 'HONEYMOON';

export interface HomestayData {
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
  categories: HomestayCategory[];
}

export const allHomestays: HomestayData[] = [
  {
    id: 1,
    image: homestay1,
    title: 'WHouse Natu (Villa Honeymoon)',
    description: 'Villa honeymoon dengan kolam renang pribadi.',
    price: 675000,
    rating: 9.5,
    categories: ['POOL', 'HONEYMOON'],
  },
  {
    id: 2,
    image: homestay2,
    title: 'WHouse Watu (Villa Honeymoon)',
    description: 'Villa honeymoon privat dengan kolam renang.',
    price: 675000,
    rating: 9.4,
    categories: ['POOL', 'HONEYMOON'],
  },
  {
    id: 3,
    image: homestay3,
    title: 'Omah Putih',
    description: 'Homestay romantis dekat pusat kota.',
    price: 800000,
    rating: 9.6,
    categories: ['HONEYMOON'],
  },
  {
    id: 4,
    image: homestay4,
    title: 'WHouse Pramesthi',
    description: 'Homestay dengan kids pool.',
    price: 900000,
    rating: 9.3,
    categories: ['POOL', 'GROUP', 'BUDGET'],
  },
  {
    id: 5,
    image: homestay2,
    title: 'WHouse Freesia 2',
    description: 'Homestay murah dan nyaman.',
    price: 475000,
    categories: ['BUDGET', 'POOL'],
  },
  {
    id: 6,
    image: homestay4,
    title: 'WHouse Freesia 1',
    description: 'Homestay murah untuk keluarga kecil.',
    price: 475000,
    categories: ['BUDGET'],
  },
  {
    id: 7,
    image: homestay3,
    title: 'Griya Buwono / Jotawang',
    description: 'Homestay untuk rombongan besar.',
    price: 700000,
    capacity: 15,
    categories: ['GROUP', 'FOUR_ROOM'],
  },
  {
    id: 8,
    image: homestay1,
    title: 'Pegagan',
    description: 'Homestay 4 kamar dengan fasilitas lengkap.',
    price: 780000,
    capacity: 16,
    categories: ['FOUR_ROOM', 'GROUP'],
  },
];

export const homestayCategories: {
  key: HomestayCategory;
  title: string;
  subtitle: string;
  slug: string;
}[] = [
  {
    key: 'POOL',
    title: 'Homestay dengan Kolam Renang',
    subtitle: 'Privasi dan kenyamanan ekstra',
    slug: 'homestay-jogja-private-pool',
  },
  {
    key: 'BUDGET',
    title: 'Homestay Murah',
    subtitle: 'Harga terjangkau, tetap nyaman',
    slug: 'homestay-jogja-murah',
  },
  {
    key: 'FOUR_ROOM',
    title: 'Homestay 4 Kamar',
    subtitle: 'Ideal untuk keluarga besar',
    slug: 'homestay-jogja-4-kamar',
  },
  {
    key: 'GROUP',
    title: 'Homestay untuk Rombongan',
    subtitle: 'Kapasitas besar dan fasilitas lengkap',
    slug: 'homestay-jogja-untuk-rombongan',
  },
  {
    key: 'HONEYMOON',
    title: 'Homestay Honeymoon',
    subtitle: 'Suasana romantis dan privat',
    slug: 'homestay-jogja-honeymoon',
  },
];

export const filterByCategory = (
  category: HomestayCategory
): HomestayData[] =>
  allHomestays.filter(h => h.categories.includes(category));

/* =====================================================
   COMPONENT
===================================================== */

import { ChevronRight } from 'lucide-react';
import HomestayCard from './HomestayCard';

interface HomestaySectionProps {
  title: string;
  subtitle?: string;
  homestays: HomestayData[];
  showViewMore?: boolean;
  categoryKey?: HomestayCategory;
  categorySlug?: string;
}

const HomestaySection = ({
  title,
  subtitle,
  homestays,
  showViewMore = true,
  categorySlug,
}: HomestaySectionProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container">

        <h2 className="section-title text-center mb-2">{title}</h2>

        <div className="w-12 h-1 bg-accent mx-auto mb-4" />

        {subtitle && (
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homestays.map((h) => (
            <Link
              key={h.id}
              to={`/homestay/${toSlug(h.title)}`}
              className="block"
            >
              <HomestayCard {...h} />
            </Link>
          ))}
        </div>

        {showViewMore && categorySlug && (
          <div className="text-center mt-8">
            <Link
              to={`/explore/${categorySlug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
            >
              Lihat Lainnya
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomestaySection;
