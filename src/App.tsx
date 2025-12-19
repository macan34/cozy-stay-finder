import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import CategoryPage from "./pages/CategoryPage";
import Artikel from "./pages/Artikel";
import ArtikelTos from "./pages/ArtikelTos";
import ArtikelKebijakan from "./pages/ArtikelKebijakan";
import ArtikelPrivacy from "./pages/ArtikelPrivacy";
import ArtikelFaq from "./pages/ArtikelFaq";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
const AdminPanel = React.lazy(() => import("@/pages/AdminPanel"));
import HomestayDetail from "@/pages/HomestayDetail";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/homestay/:slug" element={<HomestayDetail />} />
            <Route path="/explore/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/tos" element={<ArtikelTos />} />
            <Route path="/artikel/kebijakan" element={<ArtikelKebijakan />} />
            <Route path="/artikel/privacy" element={<ArtikelPrivacy />} />
            <Route path="/artikel/faq" element={<ArtikelFaq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
  <React.Suspense fallback={<div>Loading...</div>}>
    <AdminPanel />
  </React.Suspense>
} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
