import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomestayCard from "@/components/HomestayCard";
import { allHomestays, homestayCategories, HomestayCategory, toSlug } from "@/components/HomestaySection";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const categoryKey = category?.toUpperCase() as HomestayCategory;
  const categoryData = homestayCategories.find(cat => cat.key === categoryKey);
  const filteredHomestays = allHomestays.filter(h => h.categories.includes(categoryKey));

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Kategori tidak ditemukan</h1>
          <Link to="/explore" className="text-primary hover:underline">Kembali ke Explore</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-white">
            {categoryData.title}
          </h1>
          <div className="w-16 h-1 bg-warning mx-auto mt-4" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <nav className="flex gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span>›</span>
            <Link to="/explore" className="text-muted-foreground hover:text-primary">
              Explore
            </Link>
            <span>›</span>
            <span className="text-primary font-medium">{categoryData.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          {categoryData.subtitle}
        </p>

        {filteredHomestays.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHomestays.map((homestay) => (
              <Link
                key={homestay.id}
                to={`/homestay/${toSlug(homestay.title)}`}
                className="block"
              >
                <HomestayCard {...homestay} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">Tidak ada homestay dalam kategori ini.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
