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
  }, []);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-isaromas-cream">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4 container mx-auto">
        <ScrollReveal>
        <div className="text-center mb-12">
          
          <h1 className="text-4xl md:text-5xl font-bold text-isaromas-text-main mb-4 tracking-tight relative inline-block">
            Nuestro Catálogo
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-isaromas-primary/50 rounded-full"></div>
          </h1>
          <p className="text-lg text-isaromas-text-secondary font-light max-w-2xl mx-auto">
            Explorá nuestra colección completa de aromas y encontrá el perfecto para vos.
          </p>
        </div>
        </ScrollReveal>



        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded-xl shadow-lg border border-isaromas-card-border text-isaromas-primary font-semibold hover:bg-pink-50 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter size={20} /> Filtros
          </button>

          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-0 z-40 bg-white p-6 transform transition-transform duration-300 lg:relative lg:transform-none lg:w-64 lg:bg-transparent lg:p-0 lg:block
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="text-xl font-bold text-isaromas-text-main">Filtros</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-isaromas-text-secondary">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
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
                    onClick={() => setSelectedCategory(null)}
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
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border border-isaromas-card-border">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-isaromas-pink-light/30 rounded-2xl mb-6 text-isaromas-primary shadow-sm">
                  <Search size={36} />
                </div>
                <h3 className="text-2xl font-bold text-isaromas-text-main mb-2 tracking-tight">No encontramos productos</h3>
                <p className="text-isaromas-text-secondary mb-6 font-light">Intenta con otra búsqueda o categoría.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-isaromas-primary text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-isaromas-primary-hover tracking-wide"
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
