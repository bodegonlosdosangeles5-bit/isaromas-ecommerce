import React from 'react';
import { CreditCard, MessageCircle } from 'lucide-react';

const PaymentNotice: React.FC = () => {
  return (
    <div className="bg-isaromas-pink-light/30 border border-isaromas-pink-light rounded-2xl px-6 py-4 mb-8">
      <div className="flex items-center justify-center gap-3 text-center">
        <CreditCard size={20} className="text-isaromas-primary flex-shrink-0" />
        <p className="text-sm font-medium text-isaromas-text-main">
          Pagás por <span className="font-semibold text-isaromas-primary">Mercado Pago</span> y coordinamos entrega por <span className="font-semibold text-isaromas-primary">WhatsApp</span>
        </p>
        <MessageCircle size={20} className="text-isaromas-primary flex-shrink-0" />
      </div>
    </div>
  );
};

export default PaymentNotice;
