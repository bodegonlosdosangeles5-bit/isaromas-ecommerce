'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WhatsAppButton: React.FC = () => {
  const { isCartOpen } = useCart();

  if (isCartOpen) return null;

  return (
    <a
      href="https://wa.me/5491125146197"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-isaromas-primary hover:bg-isaromas-primary-hover text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} className="fill-white text-white" />
      <span className="font-medium hidden md:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
        Comprar / Consultar
      </span>
    </a>
  );
};

export default WhatsAppButton;
