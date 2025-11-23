import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NextImage from 'next/image';
import { Search, Filter, X, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import productsData from '@/data/products.json';
import { useCart } from '@/context/CartContext';

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

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
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Head>
        <title>Catálogo | ISAROMAS</title>
        <meta name="description" content="Explorá nuestra colección completa de aromas." />
      </Head>

      {/* Navbar (Simple) */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <NextImage 
              src="/isaromas_logo.png" 
              alt="Logo ISAROMAS" 
              width={150} 
              height={50} 
              className="object-contain"
              priority
            />
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-sm text-gray-500">
                {filteredProducts.length} productos
            </div>
            <button 
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-isaromas-pink transition-colors"
            >
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-isaromas-pink text-gray-800 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {totalItems}
                    </span>
                )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-gray-700 font-medium"
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
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Velas, aromas..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-isaromas-pink focus:ring-2 focus:ring-isaromas-pink/20 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-between">
                  Categorías
                </h3>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === null ? 'bg-isaromas-pink/20 text-pink-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Todos
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category ? 'bg-isaromas-pink/20 text-pink-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
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
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No encontramos productos</h3>
                <p className="text-gray-500 mt-1">Intenta con otra búsqueda o categoría.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                    className="mt-4 text-isaromas-pink font-medium hover:underline"
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
