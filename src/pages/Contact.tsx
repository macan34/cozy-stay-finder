import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative bg-header py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-header-foreground mb-4">
            Hubungi Kami
          </h1>
          <nav className="flex items-center gap-2 text-sm text-header-foreground/80">
            <Link to="/" className="hover:text-warning transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-warning">Kontak</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Kirim Pesan
                </h2>
                <p className="text-muted-foreground mb-8">
                  Punya pertanyaan atau ingin bekerja sama? Isi formulir di bawah ini dan tim kami akan menghubungi Anda segera.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nomor Telepon
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xx-xxxx-xxxx"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subjek *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subjek pesan"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pesan *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pesan Anda di sini..."
                      required
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="text-lg font-bold text-foreground mb-4">Informasi Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Alamat</h4>
                      <p className="text-sm text-muted-foreground">
                        Jl. Malioboro No. 123<br />
                        Yogyakarta 55271
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Telepon</h4>
                      <p className="text-sm text-muted-foreground">
                        +62 274 123456<br />
                        +62 812 3456 7890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        info@whouse.id<br />
                        booking@whouse.id
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Jam Operasional</h4>
                      <p className="text-sm text-muted-foreground">
                        Senin - Jumat: 08:00 - 17:00<br />
                        Sabtu: 08:00 - 12:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Peta Lokasi</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-header rounded-xl p-6 text-header-foreground">
                <h3 className="text-lg font-bold mb-3">Ikuti Kami</h3>
                <p className="text-sm opacity-90 mb-4">
                  Dapatkan update terbaru dan promo menarik dari WHOUSE!
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📘</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📷</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">🐦</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📺</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
