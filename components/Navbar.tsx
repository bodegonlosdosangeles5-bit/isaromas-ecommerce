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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-isaromas-card-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand Text */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <span className="text-2xl md:text-3xl font-extrabold text-isaromas-text-main">
                ISAROMAS
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-isaromas-primary group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className={`relative px-2 py-2 font-medium text-sm tracking-wide transition-colors link-underline ${
                isActive('/')
                  ? 'text-isaromas-primary font-bold'
                  : 'text-isaromas-text-menu hover:text-isaromas-primary'
              }`}
            >
              INICIO
            </Link>
            <Link
              href="/catalogo"
              className={`relative px-2 py-2 font-medium text-sm tracking-wide transition-colors link-underline ${
                isActive('/catalogo')
                  ? 'text-isaromas-primary font-bold'
                  : 'text-isaromas-text-menu hover:text-isaromas-primary'
              }`}
            >
              CATÁLOGO
            </Link>
            <Link
              href="/#contacto"
              className="text-sm font-medium text-isaromas-text-menu hover:text-isaromas-primary tracking-wide transition-colors link-underline"
            >
              CONTACTO
            </Link>
          </div>

          {/* Cart Icon */}
          <button 
            onClick={toggleCart} 
            className="relative p-2 text-isaromas-text-main hover:text-isaromas-primary transition-colors hover-button"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={24} strokeWidth={2} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-isaromas-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-pulse ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-isaromas-icon-muted hover:text-isaromas-primary transition-all duration-300"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={24} strokeWidth={2} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-isaromas-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-isaromas-icon-muted hover:text-isaromas-primary transition-colors"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-isaromas-card-border py-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-isaromas-primary text-white shadow-lg'
                    : 'text-isaromas-text-secondary hover:bg-pink-50 hover:text-isaromas-primary'
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
                    ? 'bg-isaromas-primary text-white shadow-lg'
                    : 'text-isaromas-text-secondary hover:bg-pink-50 hover:text-isaromas-primary'
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
