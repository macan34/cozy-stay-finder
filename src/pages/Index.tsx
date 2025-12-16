import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HomestaySection, { poolHomestays, budgetHomestays, familyHomestays, bestHomestays } from '@/components/HomestaySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        <HomestaySection
          title="Homestay di Jogja Dengan Kolam Renang Rasa Villa!!!"
          homestays={poolHomestays}
        />
        
        <div className="bg-muted">
          <HomestaySection
            title="Homestay Jogja Murah"
            homestays={budgetHomestays}
          />
        </div>
        
        <HomestaySection
          title="Homestay Jogja 4 Kamar"
          homestays={familyHomestays}
        />
        
        <div className="bg-muted">
          <HomestaySection
            title="Homestay Jogja Terbaik"
            subtitle="Nikmati Keseruan Bersama Rombongan Dengan Memilih Homestay Jogja Terbaik"
            homestays={bestHomestays}
          />
        </div>

        <HomestaySection
          title="Homestay honeymoon di Jogja"
          homestays={familyHomestays}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;