import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import HomestaySection, {
  homestayCategories,
  filterByCategory,
  useHomestays,
} from '@/components/HomestaySection';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { homestays, loading, error } = useHomestays();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Memuat data homestay...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat data homestay</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />

        {homestayCategories.map((cat, i) => (
          <div key={cat.key} className={i % 2 ? 'bg-muted' : ''}>
            <HomestaySection
              title={cat.title}
              subtitle={cat.subtitle}
              homestays={filterByCategory(cat.key, homestays)}
              categorySlug={cat.slug}
            />
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
