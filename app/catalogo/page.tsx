'use client';

// React
import { useState, useMemo } from 'react';

// Iconos
import { Search, Filter, X } from 'lucide-react';

// Componentes
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';


// Datos
import productsData from '@/data/products.json';
import { normalizeProduct, Product } from '@/types/product';

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Normalize products to ensure proper typing
  const products: Product[] = productsData.map(normalizeProduct);

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return Array.from(cats);
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-isaromas-cream">
      <Navbar />

      <main className="flex-grow pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 container mx-auto">
        <ScrollReveal>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-isaromas-text-main mb-3 sm:mb-4 tracking-tight relative inline-block">
            Nuestro Catálogo
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1 bg-isaromas-primary/50 rounded-full"></div>
          </h1>
          <p className="text-base sm:text-lg text-isaromas-text-secondary font-light max-w-2xl mx-auto px-4">
            Explorá nuestra colección completa de aromas y encontrá el perfecto para vos.
          </p>
        </div>
        </ScrollReveal>



        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded-xl shadow-lg border border-isaromas-card-border text-isaromas-primary font-semibold hover:bg-pink-50 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter size={20} /> Filtros
          </button>

          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-y-0 left-0 z-30 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 lg:relative lg:transform-none lg:w-64 lg:bg-transparent lg:shadow-none lg:inset-auto lg:max-w-none flex flex-col
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {/* Header con botón cerrar más visible */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-isaromas-card-border lg:mb-6 lg:border-0 lg:p-0">
              <h2 className="text-xl font-bold text-isaromas-text-main">Filtros</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)} 
                className="lg:hidden text-isaromas-text-secondary hover:text-isaromas-primary p-2 rounded-lg hover:bg-pink-50 transition-all duration-200"
                aria-label="Cerrar filtros"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-0 space-y-6 sm:space-y-8">
              {/* Search */}
              <div>
                <label className="block text-sm font-bold text-isaromas-text-main mb-3 uppercase tracking-wide">Buscar</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Velas, aromas..." 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-isaromas-card-border focus:border-isaromas-primary focus:ring-2 focus:ring-isaromas-pink-light outline-none transition-all bg-white shadow-sm hover:shadow-md text-isaromas-text-main placeholder:text-isaromas-text-muted"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsMobileFilterOpen(false);
                      }
                    }}
                  />
                  <Search className="absolute left-4 top-3.5 text-isaromas-icon-muted" size={18} />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-isaromas-text-main mb-4 flex items-center justify-between uppercase tracking-wide text-sm">
                  Categorías
                </h3>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 tracking-wide ${
                      selectedCategory === null 
                        ? 'bg-isaromas-primary text-white shadow-lg scale-105' 
                        : 'text-isaromas-text-secondary hover:bg-isaromas-pink-light/50 hover:text-isaromas-primary hover:scale-105 border border-isaromas-card-border'
                    }`}
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsMobileFilterOpen(false);
                    }}
                  >
                    Todos
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 tracking-wide ${
                        selectedCategory === category 
                          ? 'bg-isaromas-primary text-white shadow-lg scale-105' 
                          : 'text-isaromas-text-secondary hover:bg-isaromas-pink-light/50 hover:text-isaromas-primary hover:scale-105 border border-isaromas-card-border'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsMobileFilterOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botones de acción en móvil */}
            <div className="lg:hidden border-t border-isaromas-card-border p-4 sm:p-6 bg-isaromas-cream space-y-3">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-isaromas-primary hover:bg-isaromas-primary-hover text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search size={20} strokeWidth={2.5} />
                Ver Resultados
              </button>
              <button
                onClick={() => {
                  setIsMobileFilterOpen(false);
                }}
                className="w-full bg-white hover:bg-pink-50 text-isaromas-text-secondary border-2 border-isaromas-card-border py-2.5 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16 md:py-24 bg-white rounded-2xl sm:rounded-3xl border border-isaromas-card-border px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-isaromas-pink-light/30 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-isaromas-primary shadow-sm">
                  <Search size={28} className="sm:w-9 sm:h-9" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-isaromas-text-main mb-2 tracking-tight">No encontramos productos</h3>
                <p className="text-sm sm:text-base text-isaromas-text-secondary mb-4 sm:mb-6 font-light">Intenta con otra búsqueda o categoría.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-isaromas-primary text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-isaromas-primary-hover tracking-wide text-sm sm:text-base"
                >
                    Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
