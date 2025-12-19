import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown, ShoppingCart, Search, LogIn, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const location = useLocation();

  const artikelDropdownItems = [
    { label: 'Semua Artikel', href: '/artikel' },
    { label: 'Syarat dan Ketentuan Umum', href: '/artikel/tos' },
    { label: 'Kebijakan Pembatalan', href: '/artikel/kebijakan' },
    { label: 'Kebijakan Privasi', href: '/artikel/privacy' },
    { label: 'FAQ', href: '/artikel/faq' },
  ];

  const homeDropdownItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Kontak', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    alert(`Mencari: ${searchQuery}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top Header - Logo & Auth */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold tracking-tight">ADAKAMAR</span>
                <span className="block text-[9px] tracking-widest opacity-90 uppercase">Homestay Management</span>
              </div>
            </Link>

            {/* Right Section - Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 text-white hover:bg-white/10 rounded-lg transition-colors">
                <LogIn className="w-4 h-4" />
                <span className="font-medium">Masuk</span>
              </Link>
              <button className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-semibold rounded-lg transition-colors shadow-md">
                Jadi Host! +
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex items-center justify-between py-3">
            {/* Left Navigation */}
            <div className="flex items-center gap-6">
              {/* Home Icon */}
              <Link to="/" className="text-white/90 hover:text-white transition-colors">
                <Home className="w-5 h-5" />
              </Link>
              
              {/* Home Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('home')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium py-2">
                  Home
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === 'home' && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-48 bg-white rounded-lg shadow-xl py-2">
                      {homeDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Explore Homestay */}
              <Link 
                to="/explore" 
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Explore Homestay!
              </Link>

              {/* Artikel Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('artikel')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium py-2">
                  Artikel
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === 'artikel' && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-56 bg-white rounded-lg shadow-xl py-2">
                      {artikelDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-4">
              {/* Shopping Cart */}
              <button 
                className="relative text-white/90 hover:text-white transition-colors"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Search Button */}
              <button 
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="font-medium">Search</span>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-700 border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Mobile Search & Cart */}
            <div className="flex gap-2 mb-3">
              <button 
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
              <button 
                className="relative flex items-center justify-center gap-2 px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Home Submenu */}
            <div className="space-y-1">
              <span className="block text-white font-semibold text-sm uppercase tracking-wide">Home</span>
              {homeDropdownItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block pl-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Explore Link */}
            <Link
              to="/explore"
              className="block py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore Homestay!
            </Link>
            
            {/* Mobile Artikel Submenu */}
            <div className="space-y-1">
              <span className="block text-white font-semibold text-sm uppercase tracking-wide">Artikel</span>
              {artikelDropdownItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block pl-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <hr className="border-white/20 my-3" />
            
            {/* Mobile Action Buttons */}
            <div className="space-y-2">
              <Link to="/login" className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Masuk</span>
              </Link>
              <button className="w-full px-4 py-3 bg-cyan-400 hover:bg-cyan-500 text-blue-900 font-semibold rounded-lg transition-colors shadow-md">
                Jadi Host! +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-slide-down">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Cari Homestay</h3>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSearch}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Masukkan nama homestay, lokasi, atau kata kunci..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cari
                  </button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-500">
                Populer: <span className="text-blue-600 cursor-pointer hover:underline">Villa Bali</span>, <span className="text-blue-600 cursor-pointer hover:underline">Beachfront</span>, <span className="text-blue-600 cursor-pointer hover:underline">Mountain View</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end">
          <div className="bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Keranjang belanja Anda kosong</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-lg font-bold text-blue-600 mt-2">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-700">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        Rp {getTotalPrice().toLocaleString('id-ID')}
                      </span>
                    </div>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;