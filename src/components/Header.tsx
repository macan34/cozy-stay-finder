import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown, Search, ShoppingCart, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/', hasDropdown: true },
    { label: 'Explore Homestay!', href: '/explore' },
    { label: 'Artikel', href: '/artikel', hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Header */}
      <div className="bg-header">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-success">
              <Home className="w-5 h-5 text-success-foreground" />
            </div>
            <div className="text-header-foreground">
              <span className="text-xl font-bold">WHOUSE</span>
              <span className="block text-[10px] tracking-wider opacity-80">HOMESTAY MANAGEMENT</span>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 text-header-foreground hover:opacity-80 transition-opacity">
              <User className="w-5 h-5" />
              <span>Masuk</span>
            </button>
            <button className="flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <LogIn className="w-5 h-5" />
              <span>Jadi Host!</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-header-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-nav">
        <div className="container">
          <div className="hidden md:flex items-center justify-between py-2">
            {/* Left Nav */}
            <div className="flex items-center gap-1">
              <Link to="/" className="nav-link flex items-center gap-2">
                <Home className="w-4 h-4" />
              </Link>
              
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <button
                      className="nav-link flex items-center gap-1"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link 
                      to={item.href} 
                      className={`nav-link ${location.pathname === item.href ? 'text-warning' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Nav */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-nav-foreground hover:opacity-80">
                <ShoppingCart className="w-5 h-5" />
              </a>
              <button className="flex items-center gap-2 text-nav-foreground hover:opacity-80">
                <span>Cari</span>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-nav animate-slide-down">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block nav-link ${location.pathname === item.href ? 'text-warning' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-white/20" />
            <button className="w-full nav-link text-left flex items-center gap-2">
              <User className="w-5 h-5" />
              Masuk
            </button>
            <button className="w-full bg-success text-success-foreground px-4 py-2 rounded-lg flex items-center gap-2 justify-center">
              <LogIn className="w-5 h-5" />
              Jadi Host!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;