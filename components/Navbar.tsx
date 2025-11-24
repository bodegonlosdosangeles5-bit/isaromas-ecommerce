'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Home } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Evitar error de hidratación - solo mostrar badge después de montar en cliente
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-100/50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand Text */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                ISAROMAS
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 ${
                isActive('/')
                  ? 'text-pink-600'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Inicio
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></span>
              )}
            </Link>
            <Link
              href="/catalogo"
              className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 ${
                isActive('/catalogo')
                  ? 'text-pink-600'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Catálogo
              {isActive('/catalogo') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></span>
              )}
            </Link>
            <button
              onClick={toggleCart}
              className="relative p-3 text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-110 rounded-full hover:bg-pink-50 group"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={22} strokeWidth={2} className="group-hover:stroke-pink-600" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg animate-pulse ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-all duration-300"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-pink-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home size={18} />
                  Inicio
                </div>
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/catalogo')
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                Catálogo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

