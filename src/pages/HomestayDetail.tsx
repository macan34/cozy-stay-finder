import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allHomestays } from '@/components/HomestaySection';

/* ================= UTIL ================= */
const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/* ================= DATA ================= */
const facilities = [
  { icon: Wifi, label: "WiFi Gratis" },
  { icon: Car, label: "Parkir" },
  { icon: Coffee, label: "Dapur" },
  { icon: Tv, label: "TV" },
  { icon: Wind, label: "AC" },
  { icon: UtensilsCrossed, label: "Breakfast" },
];

const HomestayDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();



  const homestay = allHomestays.find(
    (h) => toSlug(h.title) === slug
  );

  /* Redirect jika data tidak ditemukan */
  useEffect(() => {
    if (!homestay) {
      navigate("/explore", { replace: true });
    }
  }, [homestay, navigate]);

  if (!homestay) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">›</span>
            <Link
              to="/explore"
              className="text-muted-foreground hover:text-primary"
            >
              Explore
            </Link>
            <span className="text-muted-foreground">›</span>
            <span className="text-primary font-medium">
              {homestay.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        {/* Image */}
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <img
            src={homestay.image}
            alt={homestay.title}
            className="w-full h-full object-cover"
          />
          <button className="absolute left-4 top-1/2 -translate-y-1/2 btn-circle">
            <ChevronLeft />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 btn-circle">
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              {homestay.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {homestay.location && (
                <span className="flex items-center gap-1 text-primary text-sm">
                  <MapPin className="w-4 h-4" />
                  {homestay.location}
                </span>
              )}
              {homestay.rating && (
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  {homestay.rating.toFixed(2)}
                </span>
              )}
              {homestay.capacity && (
                <span className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4" />
                  {homestay.capacity} orang
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-8">
              {homestay.description}
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {facilities.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center p-3 bg-muted rounded-lg"
                >
                  <f.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs mt-1">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sticky top-4 bg-card border rounded-lg p-6">
            <div className="text-2xl font-bold text-primary mb-4">
              Rp {formatPrice(homestay.price)} / malam
            </div>
            <button className="w-full btn-primary">
              Pesan Sekarang
            </button>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomestayDetail;
