'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface ProductVariant {
  aroma: string;
  color?: string;
  size?: string;
  gender?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  variants: ProductVariant[];
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/productos/${product.id}`} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-isaromas-card-border shadow-sm hover-card h-full flex flex-col relative">
        {/* Badge de Categoría */}
        <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-isaromas-text-secondary rounded-full shadow-sm border border-isaromas-card-border">
                {product.category}
            </span>
        </div>

        {/* Imagen */}
        <div className="aspect-square bg-gradient-to-br from-isaromas-cream to-pink-50 relative overflow-hidden p-6 flex items-center justify-center hover-image">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-isaromas-text-main mb-1 leading-tight tracking-tight group-hover:text-isaromas-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-isaromas-text-secondary line-clamp-2 mb-4 font-light">
            {product.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-isaromas-card-border/50">
            <span className="text-xl font-bold text-isaromas-text-main">
                ${product.price.toLocaleString()}
            </span>
            <div className="bg-isaromas-primary text-white p-2 rounded-full shadow-md hover-button group-hover:bg-isaromas-primary-hover">
                <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
