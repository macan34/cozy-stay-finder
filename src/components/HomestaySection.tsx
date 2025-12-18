/* =====================================================
   DATA, TYPE, & HELPER (AMAN UNTUK DI-IMPORT)
===================================================== */

import { useState, useEffect } from 'react';
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

// Hook to fetch homestays from API
export const useHomestays = () => {
  const [homestays, setHomestays] = useState<HomestayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/homestays');
        if (!response.ok) {
          throw new Error('Failed to fetch homestays');
        }
        const data = await response.json();
        setHomestays(
          data.map((h: any) => ({
            ...h,
            image:
              typeof h.image === 'string' && h.image.startsWith('/uploads')
                ? `http://localhost:5000${h.image}`
                : h.image,
            rating: Number.isFinite(Number(h.rating)) ? Number(h.rating) : 0,
            price: Number.isFinite(Number(h.price)) ? Number(h.price) : h.price,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHomestays();
  }, []);

  return { homestays, loading, error };
};

export const filterByCategory = (
  category: HomestayCategory,
  homestays: HomestayData[]
): HomestayData[] =>
  homestays.filter(h => h.categories.includes(category));

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
