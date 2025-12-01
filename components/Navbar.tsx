'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Home, HelpCircle, Sparkles, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Evitar error de hidratación - solo mostrar badge después de montar en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('mousemove', handleMouseMove);
      return () => nav.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl border-b border-white/30 shadow-lg shadow-isaroma-pink-light/10'
          : 'bg-isaroma-cream/95 backdrop-blur-xl border-b border-white/20 shadow-md shadow-isaroma-pink-light/5'
      }`}
      style={{
        background: scrolled
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(245, 208, 254, 0.15) 0%, 
              rgba(255, 237, 213, 0.1) 50%,
              rgba(255, 246, 248, 0.12) 100%
            ),
            linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 246, 248, 0.95))`
          : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(245, 208, 254, 0.2) 0%, 
              rgba(255, 237, 213, 0.15) 50%,
              rgba(255, 246, 248, 0.18) 100%
            ),
            linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 246, 248, 0.9))`,
      }}
    >
      {/* Floating particles in navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-[10%] w-32 h-32 rounded-full blur-2xl opacity-20 animate-gradient-float"
          style={{
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.2), rgba(168, 85, 247, 0.15), transparent 70%)',
            animation: 'float 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-0 left-[15%] w-24 h-24 rounded-full blur-xl opacity-15 animate-gradient-float"
          style={{
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.15), transparent 70%)',
            animation: 'float 12s ease-in-out infinite reverse',
            animationDelay: '2s',
          }}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo/Brand Text */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 transition-all duration-300 hover:scale-105 relative"
          >
            <div className="relative">
              {scrolled ? (
                <span 
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold relative z-10 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-text 3s ease infinite',
                  }}
                >
                  ISAROMA
                </span>
              ) : (
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-isaroma-text-main relative z-10 transition-all duration-300">
                  ISAROMA
                </span>
              )}
              <div 
                className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                style={{
                  width: isActive('/') ? '100%' : '0',
                  background: 'linear-gradient(90deg, #DB2777, #EC4899, #F472B6)',
                  backgroundSize: '200% 100%',
                  animation: isActive('/') ? 'gradient 3s ease infinite' : 'none',
                }}
              />
              {/* Sparkle decoration */}
              {isActive('/') && (
                <Sparkles className="absolute -top-1 -right-6 w-4 h-4 text-isaroma-primary animate-sparkle opacity-60" />
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="group relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 nav-link"
            >
              <span
                className={`relative z-10 transition-all duration-300 ${
                  isActive('/')
                    ? 'font-bold nav-link-active'
                    : 'text-isaroma-text-menu group-hover:font-semibold'
                }`}
              >
                INICIO
              </span>
              <div
                className={`absolute bottom-0 left-0 h-0.5 rounded-full nav-underline ${
                  isActive('/') ? 'nav-underline-active' : ''
                }`}
              />
            </Link>
            <Link
              href="/catalogo"
              className="group relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 nav-link"
            >
              <span
                className={`relative z-10 transition-all duration-300 ${
                  isActive('/catalogo')
                    ? 'font-bold nav-link-active'
                    : 'text-isaroma-text-menu group-hover:font-semibold'
                }`}
              >
                CATÁLOGO
              </span>
              <div
                className={`absolute bottom-0 left-0 h-0.5 rounded-full nav-underline ${
                  isActive('/catalogo') ? 'nav-underline-active' : ''
                }`}
              />
            </Link>
            <Link
              href="/#faq"
              className="group relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 text-isaroma-text-menu hover:font-semibold nav-link"
            >
              <span className="relative z-10">FAQ</span>
              <div className="absolute bottom-0 left-0 h-0.5 rounded-full nav-underline" />
            </Link>
            <Link
              href="/#contacto"
              className="group relative px-4 py-2 font-medium text-sm tracking-wide transition-all duration-300 text-isaroma-text-menu hover:font-semibold nav-link"
            >
              <span className="relative z-10">CONTACTO</span>
              <div className="absolute bottom-0 left-0 h-0.5 rounded-full nav-underline" />
            </Link>
          </div>

          {/* Cart Icon */}
          <button 
            onClick={toggleCart} 
            className="group hidden md:block relative p-3 rounded-xl backdrop-blur-sm bg-white/30 border border-white/30 hover:bg-white/50 hover:border-white/50 transition-all duration-300 hover-button"
            style={{
              boxShadow: '0 4px 16px rgba(239, 163, 182, 0.15)',
            }}
            aria-label="Abrir carrito"
          >
            {totalItems > 0 ? (
              <ShoppingBag 
                size={22} 
                strokeWidth={2}
                className="transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #DB2777, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              />
            ) : (
              <ShoppingBag 
                size={22} 
                strokeWidth={2}
                className="text-isaroma-text-main group-hover:text-isaroma-primary transition-colors duration-300"
              />
            )}
            {mounted && totalItems > 0 && (
              <span 
                className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg ring-2 ring-white animate-bounce-slow"
                style={{
                  background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                  boxShadow: '0 2px 8px rgba(219, 39, 119, 0.4)',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl backdrop-blur-sm bg-white/30 border border-white/30 hover:bg-white/50 transition-all duration-300"
              style={{
                boxShadow: '0 2px 8px rgba(239, 163, 182, 0.15)',
              }}
              aria-label="Abrir carrito"
            >
              {totalItems > 0 ? (
                <ShoppingBag 
                  size={22} 
                  strokeWidth={2}
                  className="transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                />
              ) : (
                <ShoppingBag 
                  size={22} 
                  strokeWidth={2}
                  className="text-isaroma-text-main transition-colors duration-300"
                />
              )}
              {mounted && totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md animate-bounce-slow ring-1 ring-white"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899)',
                    boxShadow: '0 2px 6px rgba(219, 39, 119, 0.4)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl backdrop-blur-sm bg-white/30 border border-white/30 hover:bg-white/50 transition-all duration-300"
              style={{
                boxShadow: '0 2px 8px rgba(239, 163, 182, 0.15)',
              }}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? (
                <X 
                  size={24} 
                  strokeWidth={2}
                  className="text-isaroma-primary transition-colors duration-300"
                  style={{
                    color: 'transparent',
                    background: 'linear-gradient(135deg, #DB2777, #EC4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
              ) : (
                <Menu 
                  size={24} 
                  strokeWidth={2}
                  className="text-isaroma-text-main hover:text-isaroma-primary transition-colors duration-300"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden border-t border-white/20 py-4 animate-fade-in backdrop-blur-xl bg-white/40"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 246, 248, 0.4))',
            }}
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  isActive('/')
                    ? 'text-white shadow-lg'
                    : 'text-isaroma-text-secondary hover:text-white'
                }`}
                style={
                  isActive('/')
                    ? {
                        background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                        backgroundSize: '200% 200%',
                        boxShadow: '0 4px 16px rgba(219, 39, 119, 0.3)',
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.3)',
                      }
                }
              >
                <div className="flex items-center gap-2 relative z-10">
                  <Home size={18} />
                  Inicio
                </div>
                {!isActive('/') && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                      backgroundSize: '200% 200%',
                    }}
                  />
                )}
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
                  isActive('/catalogo')
                    ? 'text-white shadow-lg'
                    : 'text-isaroma-text-secondary hover:text-white'
                }`}
                style={
                  isActive('/catalogo')
                    ? {
                        background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                        backgroundSize: '200% 200%',
                        boxShadow: '0 4px 16px rgba(219, 39, 119, 0.3)',
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.3)',
                      }
                }
              >
                <span className="relative z-10">Catálogo</span>
                {!isActive('/catalogo') && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                      backgroundSize: '200% 200%',
                    }}
                  />
                )}
              </Link>
              <Link
                href="/#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group px-4 py-3 rounded-xl font-semibold text-isaroma-text-secondary hover:text-white transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <HelpCircle size={18} />
                  FAQ
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                    backgroundSize: '200% 200%',
                  }}
                />
              </Link>
              <Link
                href="/#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group px-4 py-3 rounded-xl font-semibold text-isaroma-text-secondary hover:text-white transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <Mail size={18} />
                  Contacto
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                    backgroundSize: '200% 200%',
                  }}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
