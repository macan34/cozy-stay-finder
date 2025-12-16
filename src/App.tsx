import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ExploreDetail from "./pages/HomestayDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:slug" element={<ExploreDetail />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/artikel/tos" element={<ArtikelTos />} />
          <Route path="/artikel/kebijakan" element={<ArtikelKebijakan />} />
          <Route path="/artikel/privacy" element={<ArtikelPrivacy />} />
          <Route path="/artikel/faq" element={<ArtikelFaq />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
