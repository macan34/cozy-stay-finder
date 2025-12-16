import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

import HomestaySection, {
  homestayCategories,
  filterByCategory,
} from '@/components/HomestaySection';


const Index = () => {
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
      homestays={filterByCategory(cat.key)}
    />
  </div>
))}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
