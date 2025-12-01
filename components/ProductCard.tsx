'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/productos/${product.id}`} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-isaroma-card-border shadow-sm hover-card h-full flex flex-col relative">
        {/* Badge de Categoría */}
        <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-isaroma-primary rounded-full shadow-sm border border-isaroma-pink-light">
                {product.category}
            </span>
        </div>

        {/* Imagen */}
        <div className="aspect-[4/5] bg-gradient-to-br from-isaroma-cream to-pink-50 relative overflow-hidden p-6 flex items-center justify-center hover-image">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full ${product.imageFit === "cover" ? "object-cover" : "object-contain"} drop-shadow-md`}
          />
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-isaroma-text-main mb-2 leading-tight tracking-tight group-hover:text-isaroma-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.benefits.map((benefit, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 bg-isaroma-bg-hover text-xs font-medium text-isaroma-primary-hover rounded-full border border-isaroma-card-border"
                >
                  {benefit}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-sm text-isaroma-text-secondary line-clamp-2 mb-4 font-light">
            {product.description}
          </p>
          
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-isaroma-card-border/50">
            {product.id !== 'experiencia-personalizada-001' ? (
                <span className="text-xl font-bold text-isaroma-text-main">
                    {formatPrice(product.price)}
                </span>
            ) : (
                <span className="text-sm font-bold text-isaroma-primary uppercase tracking-wider">
                    Personalizar
                </span>
            )}
            <div className="bg-isaroma-primary text-white p-2 rounded-full shadow-md hover-button group-hover:bg-isaroma-primary-hover">
                <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
