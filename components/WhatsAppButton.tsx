'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import { generateQueryMessage, generateCartMessage } from '@/utils/whatsapp';

const WhatsAppButton: React.FC = () => {
  const { isCartOpen, items, totalPrice } = useCart();
  const pathname = usePathname();

  if (isCartOpen) return null;

  const getWhatsAppUrl = () => {
    const baseUrl = "https://wa.me/5491125146197";
    let message = "";

    if (pathname === '/carrito' || pathname === '/cart') {
       message = encodeURIComponent(generateCartMessage(items, totalPrice));
    } else {
       message = generateQueryMessage();
    }

    return `${baseUrl}?text=${message}`;
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-isaroma-primary hover:bg-isaroma-primary-hover text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} className="fill-white text-white" />
      <span className="font-medium hidden md:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
        Consultar
      </span>
    </a>
  );
};

export default WhatsAppButton;
