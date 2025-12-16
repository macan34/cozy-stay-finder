import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomestayCard from "@/components/HomestayCard";
import {
  allHomestays,
  filterByCategory,
  homestayCategories,
  HomestayCategory,
} from "@/components/HomestaySection";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import homestay1 from "@/assets/homestay-1.jpg";
import homestay2 from "@/assets/homestay-2.jpg";
import homestay3 from "@/assets/homestay-3.jpg";
import homestay4 from "@/assets/homestay-4.jpg";
import { useNavigate, Link } from "react-router-dom";

/* ================= UTIL ================= */
const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ================= DATA ================= */

const allVillas = [
  ...filterByCategory("POOL"),
  {
    id: 100,
    image: homestay1,
    title: "Villa Eudora",
    description: "Villa mewah dengan fasilitas lengkap.",
    price: 850000,
    rating: 9.7,
    capacity: 8,
    categories: ["POOL", "GROUP"] as HomestayCategory[],
  },
  {
    id: 101,
    image: homestay2,
    title: "Villa Kadita",
    description: "Villa modern dengan kolam renang pribadi.",
    price: 750000,
    rating: 9.5,
    capacity: 6,
    categories: ["POOL", "HONEYMOON"] as HomestayCategory[],
  },
  {
    id: 102,
    image: homestay3,
    title: "Villa Aurora",
    description: "Villa dengan taman luas.",
    price: 900000,
    rating: 9.6,
    capacity: 10,
    categories: ["GROUP"] as HomestayCategory[],
  },
];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container">
          <nav className="flex gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span>›</span>
            <span className="text-primary font-medium">Explore</span>
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-muted/30 py-6 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <Input placeholder="Cari homestay..." className="flex-1" />
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter Kategori" />
              </SelectTrigger>
              <SelectContent>
                {homestayCategories.map((cat) => (
                  <SelectItem key={cat.key} value={cat.key}>
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {/* Categories Section */}
        <h2 className="section-title text-center mb-6">
          Kategori Homestay
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {homestayCategories.map((category) => (
            <Link key={category.key} to={`/${category.key.toLowerCase()}`}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.subtitle}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
