import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import productsData from '@/data/products.json';

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(productsData.map(p => p.category));
    return Array.from(cats);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-rose-50/20 to-pink-50/10">
      <Head>
        <title>Catálogo | ISAROMAS</title>
        <meta name="description" content="Explorá nuestra colección completa de aromas." />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 pt-28">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle Mejorado */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded-xl shadow-lg border-2 border-pink-200 text-pink-700 font-semibold hover:bg-pink-50 transition-all duration-300 hover:scale-105"
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
              <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Search Mejorado */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Buscar</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Velas, aromas..." 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 outline-none transition-all bg-white shadow-sm hover:shadow-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Categories Mejorado */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between uppercase tracking-wide text-sm">
                  Categorías
                </h3>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === null 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105' 
                        : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:scale-105 border-2 border-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todos
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        selectedCategory === category 
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105' 
                          : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:scale-105 border-2 border-gray-200'
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
              <div className="text-center py-24">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 text-gray-400 shadow-lg">
                  <Search size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No encontramos productos</h3>
                <p className="text-gray-600 mb-6">Intenta con otra búsqueda o categoría.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
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
