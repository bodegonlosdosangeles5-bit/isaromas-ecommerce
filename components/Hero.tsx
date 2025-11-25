'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import Image from 'next/image';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);

  // Generate fixed particle positions on mount
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      width: 40 + (i * 7) % 80,
      height: 40 + (i * 7) % 80,
      left: (i * 23) % 100,
      top: (i * 31) % 100,
      r: 239 + (i % 10),
      g: 163 + (i % 50),
      b: 182 + (i % 30),
      duration: 15 + (i % 20),
      delay: (i * 0.7) % 5,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        minHeight: '600px',
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(245, 208, 254, 0.4) 0%, 
            rgba(255, 237, 213, 0.3) 25%,
            rgba(255, 246, 248, 0.2) 50%,
            rgba(254, 240, 250, 0.3) 75%,
            rgba(255, 237, 213, 0.2) 100%
          ),
          linear-gradient(135deg, #FFF6F8 0%, #FFF0F4 50%, #FFF6F8 100%)
        `,
      }}
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 - Top Right - Purple/Pink */}
        <div 
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-3xl opacity-30 sm:opacity-40 animate-gradient-float"
          style={{
            background: 'radial-gradient(circle, rgba(219, 39, 119, 0.3), rgba(168, 85, 247, 0.2), transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '0s',
          }}
        />
        
        {/* Orb 2 - Bottom Left - Rose */}
        <div 
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl opacity-25 sm:opacity-35 animate-gradient-float"
          style={{
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.25), rgba(236, 72, 153, 0.2), transparent 70%)',
            animation: 'float 25s ease-in-out infinite reverse',
            animationDelay: '5s',
          }}
        />
        
        {/* Orb 3 - Center Top - Peach/Pink */}
        <div 
          className="absolute top-10 sm:top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] rounded-full blur-3xl opacity-20 sm:opacity-30 animate-gradient-float"
          style={{
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2), rgba(249, 168, 212, 0.2), transparent 70%)',
            animation: 'float 30s ease-in-out infinite',
            animationDelay: '10s',
          }}
        />

        {/* Floating Particles - Hidden on mobile for performance */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="hidden sm:block absolute rounded-full opacity-20 animate-float-particle"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `radial-gradient(circle, rgba(${particle.r}, ${particle.g}, ${particle.b}, 0.3), transparent)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Liquid Glass Cards - Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glass Card 1 */}
        <div 
          className="absolute top-20 right-[10%] w-32 h-32 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl animate-float-glass"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
            boxShadow: '0 8px 32px 0 rgba(239, 163, 182, 0.15)',
            animation: 'float-glass 8s ease-in-out infinite',
            animationDelay: '0s',
          }}
        />
        
        {/* Glass Card 2 */}
        <div 
          className="absolute bottom-32 left-[8%] w-24 h-24 rounded-2xl backdrop-blur-xl bg-white/15 border border-white/25 shadow-2xl animate-float-glass"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
            boxShadow: '0 8px 32px 0 rgba(244, 63, 94, 0.12)',
            animation: 'float-glass 10s ease-in-out infinite reverse',
            animationDelay: '2s',
          }}
        />
        
        {/* Glass Card 3 */}
        <div 
          className="absolute top-1/2 right-[15%] w-20 h-20 rounded-2xl backdrop-blur-xl bg-white/18 border border-white/28 shadow-2xl animate-float-glass"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08))',
            boxShadow: '0 8px 32px 0 rgba(219, 39, 119, 0.1)',
            animation: 'float-glass 12s ease-in-out infinite',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Main Content with Glass Morphism */}
      <div className="container mx-auto px-4 z-10 relative h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 pt-20 md:pt-0">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:pr-8">
            <ScrollReveal className="space-y-6 md:space-y-8 max-w-2xl mx-auto md:mx-0">
              {/* Title */}
              <div className="mb-4 px-2 md:px-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-isaromas-text-main leading-tight tracking-tight">
                  Aromas que{' '}
                  <span className="relative inline-block">
                    <span 
                      className="text-transparent bg-clip-text animate-gradient-text"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6, #EFA3B6, #FBCFE8)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                      }}
                    >
                      Enamoran
                    </span>
                    <svg 
                      className="absolute w-full h-4 -bottom-2 left-0 opacity-60"
                      viewBox="0 0 100 15" 
                      preserveAspectRatio="none"
                    >
                      <path 
                        d="M0 7 Q 50 12 100 7" 
                        stroke="url(#gradient-underline)" 
                        strokeWidth="3" 
                        fill="none"
                        strokeDasharray="200"
                        strokeDashoffset="200"
                        className="animate-draw-path"
                      />
                      <defs>
                        <linearGradient id="gradient-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#DB2777" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#F472B6" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="max-w-3xl mx-auto md:mx-0 px-4 md:px-0">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-isaromas-text-secondary font-light leading-relaxed">
                  Descubrí nuestra línea exclusiva de fragancias artesanales para transformar cada rincón de tu hogar.
                </p>
              </div>

              {/* CTA Buttons with Enhanced Glass Effect */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-6 sm:pt-8 px-4 md:px-0">
                <Link 
                  href="/catalogo" 
                  className="group relative overflow-hidden px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all hover-button"
                  style={{
                    background: 'linear-gradient(135deg, #DB2777, #EC4899, #F472B6)',
                    backgroundSize: '200% 200%',
                    color: 'white',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Ver Catálogo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #EC4899, #F472B6, #EFA3B6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite',
                    }}
                  />
                </Link>
                
                <Link 
                  href="#destacados" 
                  className="relative px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 transition-all hover-button backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                    borderColor: 'rgba(239, 163, 182, 0.6)',
                    color: '#2B2B2B',
                    boxShadow: '0 8px 32px 0 rgba(239, 163, 182, 0.2)',
                  }}
                >
                  <span className="relative z-10">Más Vendidos</span>
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 163, 182, 0.1), rgba(244, 63, 94, 0.05))',
                    }}
                  />
                </Link>
              </div>

              {/* Decorative Sparkles */}
              <div className="absolute -top-4 left-1/4 opacity-30 animate-sparkle">
                <Sparkles className="w-6 h-6 text-isaromas-primary" />
              </div>
              <div className="absolute -bottom-8 right-1/4 opacity-25 animate-sparkle-delayed">
                <Sparkles className="w-5 h-5 text-isaromas-rose" />
              </div>
            </ScrollReveal>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 order-2 flex justify-center md:justify-end items-center relative h-full md:h-auto">
             <ScrollReveal className="w-full max-w-lg md:max-w-none h-full flex items-center justify-center" delay={200}>
                {/* Desktop Image */}
                <div className="hidden md:block relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-pink-100/50">
                    <Image
                        src="/images/hero-isaromas-desktop.webp"
                        alt="Velas de soja artesanales ISAROMAS con frutillas, en tonos pastel"
                        fill
                        className="object-cover object-center hover:scale-105 transition-transform duration-700"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Mobile Image */}
                <div className="block md:hidden relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-pink-100/50 mt-8 mb-20">
                    <Image
                        src="/images/hero-isaromas-mobile.webp"
                        alt="Velas de soja artesanales ISAROMAS con frutillas, en tonos pastel"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </ScrollReveal>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <div className="w-6 h-10 rounded-full border-2 border-isaromas-primary/50 flex justify-center">
            <div className="w-1 h-3 bg-isaromas-primary rounded-full mt-2 animate-scroll-dot" />
          </div>
          <span className="text-xs text-isaromas-text-secondary font-light">Scroll</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;

